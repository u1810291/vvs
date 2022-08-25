import NotificationSimple, {NOTIFICATION_ICON_CLASS_NAME} from 'feature/ui-notifications/components/NotificationSimple';
import useAsyncSwr from 'hook/useAsyncSwr';
import {CheckCircleIcon, XCircleIcon} from '@heroicons/react/outline';
import {every} from 'util/array';
import {removeFalsyFields} from 'util/obj';
import {useAsyncEffect} from 'hook/useAsync';
import {useAuth} from 'context/auth';
import {useEffect} from 'react';
import {useMemo} from 'react';
import {useNavigate} from 'react-router-dom';
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
 * @param {(data) => import('crocks/Async').default} props.asyncMapFromApi
 */
export const createUseList = ({graphQl, asyncMapFromApi}) => () => {
  const {apiQuery} = useAuth();

  return useAsyncSwr([graphQl], (query) => (
    apiQuery(query)
    .chain(asyncMapFromApi)
  ));
}

export const createUseWhereList = ({graphQl, asyncMapFromApi}) => ({filters}) => {
  const {api} = useAuth();

  return useAsyncSwr([graphQl, filters], (query) => (
    api(filters, query)
    .chain(asyncMapFromApi)
  ));
}

const errorToText = curry((mapper, error) => pipe(
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
  ), [api]);

  const remove = useMemo(() => pipe(
    resultToAsync,
    map(a => ({...a, id})),
    chain(asyncRemoveMapToApi),
    chain(flip(api)(deleteGraphQl))
  ), [api]);

  useEffect(() => {
    if (isFunction(setForm)) setForm(getSwr.data);
  }, [getSwr.data, setForm]);

  useEffect(() => {
    if (!(hasProp('current', saveRef) && formResult)) return;
    saveRef.current = () => (id ? update(formResult) : create(formResult)).fork(
      error => notify(
        <NotificationSimple
          Icon={XCircleIcon}
          iconClassName={NOTIFICATION_ICON_CLASS_NAME.DANGER}
          heading={t`apiError`}
        >
          {errorToText(errorMapper, error)}
        </NotificationSimple>
      ),
      () => {
        notify(
          <NotificationSimple
            Icon={CheckCircleIcon}
            iconClassName={NOTIFICATION_ICON_CLASS_NAME.SUCCESS}
            heading={t`success`}
            />
        );
        if (successRedirectPath) nav(successRedirectPath);
      }
    );
  }, [saveRef?.current, formResult, t, nav, notify, successRedirectPath]);


  useEffect(() => {
    if (!hasProp('current', removeRef)) return;
    
    removeRef.current = (pk) => remove(Result(pk)).fork(
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
