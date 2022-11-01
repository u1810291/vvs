import NotificationSimple, {NOTIFICATION_ICON_CLASS_NAME} from 'feature/ui-notifications/components/NotificationSimple';
import useAsyncSwr, {useAsyncSwrInfinite} from 'hook/useAsyncSwr';
import {CheckCircleIcon, XCircleIcon} from '@heroicons/react/outline';
import {every} from 'util/array';
import {removeFalsyFields} from 'util/obj';
import {useAsyncEffect} from 'hook/useAsync';
import {useAuth} from 'context/auth';
import {useEffect} from 'react';
import {useMemo} from 'react';
import {generatePath, useNavigate} from 'react-router-dom';
import {useNotification} from 'feature/ui-notifications/context';
import {useTranslation} from 'react-i18next';
import {
  Async,
  Result,
  alt,
  and,
  chain,
  constant,
  flip,
  getPath,
  getPropOr,
  hasProp,
  ifElse,
  isArray,
  isEmpty,
  isFunction,
  isNil,
  isObject,
  isString,
  isTruthy,
  map,
  not,
  option,
  pipe,
  reduce,
  resultToAsync,
  safe,
  identity,
  curry,
  // tap,
} from 'crocks';

export const mapToString = ifElse(
  isNil,
  constant(''),
  String,
);

export const mapToNullableString = pipe(
  safe(not(isEmpty)),
  map(String),
  option(null),
);

export const mapToNullableNumber = pipe(
  safe(not(isEmpty)),
  map(parseFloat),
  chain(safe(not(isNaN))),
  option(null),
);

/**
 * @param {object} props
 * @param {string} props.graphQl
 * @param {(auth: import('context/auth').AuthContextValue) => (data) => import('crocks/Async').default} props.asyncMapFromApi
 */
export const createUseListWithAuth = ({graphQl, asyncMapFromApi}) => () => {
  const auth = useAuth();

  return useAsyncSwr([graphQl], (query) => (
    auth.apiQuery(query)
    .chain(asyncMapFromApi(auth))
  ));
}

/**
 * @param {object} props
 * @param {string} props.graphQl
 * @param {(auth: import('context/auth').AuthContextValue) => (data) => import('crocks/Async').default} props.asyncMapFromApi
 */
 export const createUseListWithAuthQuery = ({graphQl, asyncMapFromApi}) => ({filters}) => {
  const auth = useAuth();

  return useAsyncSwr([graphQl, filters], (query) => (
    auth.api(filters, query)
    .chain(asyncMapFromApi(auth))
  ));
}

/**
 * @param {object} props
 * @param {string} props.graphQl
 * @param {(data) => import('crocks/Async').default} props.asyncMapFromApi
 */
export const createUseList = ({graphQl, asyncMapFromApi = Async.Resolved}) => () => {
  const {apiQuery} = useAuth();

  return useAsyncSwr([graphQl], (query) => (
    apiQuery(query)
    .chain(asyncMapFromApi)
  ));
}



export const createUseApiList = ({
  graphQl, 
  asyncMapFromApi = Async.Resolved,
  mapFromApiUsingAuth = false,
  infinite = false,
}) => ({filters}) => {
  const {api, ...auth} = useAuth();

  if (infinite) {
    return useAsyncSwrInfinite([graphQl, filters], (params) => (
      api(params[1], params[0])
      .chain(r => mapFromApiUsingAuth
        ? asyncMapFromApi({api, ...auth})(r)
        : asyncMapFromApi(r))
    ));
  }

  return useAsyncSwr([graphQl, filters], (query) => (
    api(filters, query)
    .chain(r => mapFromApiUsingAuth
      ? asyncMapFromApi({api, ...auth})(r)
      : asyncMapFromApi(r))
  ));
}







/**
 * @param {object} props
 * @param {string} props.graphQl
 * @param {(data) => import('crocks/Async').default} props.asyncMapFromApi
 */
export const createUseWhereList = ({graphQl, asyncMapFromApi, infinite = false}) => ({filters}) => {
  const {api} = useAuth();

  if (infinite) {
    return useAsyncSwrInfinite([graphQl, filters], (params) => (
      api(params[1], params[0])
      .chain(asyncMapFromApi)
    ));
  }

  return useAsyncSwr([graphQl, filters], (query) => (
    api(filters, query)
    .chain(asyncMapFromApi)
  ));
}

export const errorToText = curry((mapper, error) => pipe(
  safe(isObject),
  map(pipe(
    removeFalsyFields,
    Object.entries,
    a => a.filter(([key, value]) => key !== 'id' && isString(value)),
    reduce((carry, [key, value]) => [
      ...carry,
      <span className='block' key={key}>{mapper(value)}</span>
    ], []),
  )),
  alt(pipe(
    safe(and(isArray, every(hasProp('message')))),
    map(reduce((carry, {message}) => [
      ...carry,
      <span className='block' key={message}>{mapper(message)}</span>
    ], [])),
  )(error)),
  option(JSON.stringify(error)),
)(error));

/**
 * @param {Object} props
 * @param {String} props.getGraphQl - GraphQL Query to RETRIEVE the single entity.
 * @param {String} props.createGraphql - GraphQL Query to CREATE the single entity.
 * @param {String} props.updateGraphQl - GraphQL Query to UPDATE the single entity.
 * @param {String} props.deleteGraphQl - GraphQL Query to DELETE the single entity.
 * @param {boolean} [props.mapFromApiUsingAuth = false] - Should asyncMapFromApi first parameter should be auth hook
 * @param {(data: any) => import('crocks/Async').default} [props.asyncMapFromApi = Async.Resolved]  - Async function that has oppurtunity to modify the data just before using it from API.
 * @param {(data: any) => import('crocks/Async').default} [props.asyncMapToApi = Async.Resolved]  - Async function that has oppurtunity to modify the data just before sending it to API.
 */
export const createUseOne = ({
  getGraphQl,
  createGraphql,
  updateGraphQl,
  deleteGraphQl,
  mapFromApiUsingAuth = false,
  asyncMapFromApi = Async.Resolved,
  asyncMapToApi = Async.Resolved,
  asyncRemoveMapToApi = Async.Resolved,
}) => ({
  id,
  saveRef,
  formResult,
  setForm,
  successRedirectPath,
  removeRef,
  errorMapper = identity,
  newObjectPath = null, // to get id of a created object
  editRedirectPath = null,
}) => {
  const nav = useNavigate();
  const {api, ...auth} = useAuth();
  const {notify} = useNotification();
  const {t} = useTranslation();
  const getSwr = useAsyncSwr(
    [getGraphQl, {id}],
    (query, params) => id
      ? api(params, query).chain(
          r => mapFromApiUsingAuth
            ? asyncMapFromApi({api, ...auth})(r)
            : asyncMapFromApi(r)
        )
      : Async.Rejected('id missing')
  );

  const create = useMemo(() => pipe(
    resultToAsync,
    chain(asyncMapToApi),
    chain(flip(api)(createGraphql))
  ), [api]);

  const update = useMemo(() => pipe(
    resultToAsync,
    map(a => ({...a, id})),
    chain(asyncMapToApi),  
    chain(flip(api)(updateGraphQl))
  ), [api, id]);

  const remove = useMemo(() => pipe(
    resultToAsync,
    map(a => ({...a, id})),
    chain(asyncRemoveMapToApi),
    chain(flip(api)(deleteGraphQl))
  ), [api, id]);

  useEffect(() => {
    if (isFunction(setForm)) setForm(getSwr.data);
  }, [getSwr.data, setForm]);

  useEffect(() => {
    if (!(hasProp('current', saveRef) && formResult)) return;
    
    saveRef.current = (callback) => (id ? update(formResult) : create(formResult)).fork(
      error => {
        notify(
          <NotificationSimple
            Icon={XCircleIcon}
            iconClassName={NOTIFICATION_ICON_CLASS_NAME.DANGER}
            heading={t`apiError`}
          >
            {errorToText(errorMapper, error)}
          </NotificationSimple>
        )
      },
      (pk) => {
        notify(
          <NotificationSimple
            Icon={CheckCircleIcon}
            iconClassName={NOTIFICATION_ICON_CLASS_NAME.SUCCESS}
            heading={t`success`}
            />
        );

        if (editRedirectPath) nav(generatePath(editRedirectPath, {id: id ?? pipe(option(''))(getPath(newObjectPath, pk))}));

        if (successRedirectPath) nav(successRedirectPath);

        isFunction(callback) && callback(pk);
      }
    );
  }, [saveRef?.current, formResult, t, nav, notify, successRedirectPath]);


  useEffect(() => {
    if (!hasProp('current', removeRef)) return;
    
    removeRef.current = (pk, callback) => remove(Result(pk)).fork(
      error => {
        notify(
        <NotificationSimple
          Icon={XCircleIcon}
          iconClassName={NOTIFICATION_ICON_CLASS_NAME.DANGER}
          heading={t`apiError`}
        >
          {errorToText(errorMapper, error)}
        </NotificationSimple>
      )},
      () => {
        notify(
          <NotificationSimple 
            Icon={CheckCircleIcon}
            iconClassName={NOTIFICATION_ICON_CLASS_NAME.SUCCESS}
            heading={t`success`}
          />
        );
        
        if (successRedirectPath) nav(successRedirectPath);
                
        isFunction(callback) && callback();
      }
    );    
  }, [removeRef?.current, t, nav, notify, successRedirectPath]);

  return {
    ...getSwr,
    update,
    create,
    remove,
  }
};

export const createUseEnum = ({
  graphQl,
  itemsProp,
  valueProp
}) => (isSimplified = false) => {
  const {apiQuery} = useAuth();
  const effect = useAsyncEffect(apiQuery(graphQl));

  if (isSimplified) return (
    getPath(['data', itemsProp], effect)
    .chain(safe(isArray))
    .map(pipe(
      map(getPropOr(null, valueProp)),
      arr => arr.filter(isTruthy)
    ))
    .option([])
  )
  
  return effect;
};
