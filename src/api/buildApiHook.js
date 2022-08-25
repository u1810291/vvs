import NotificationSimple, {NOTIFICATION_ICON_CLASS_NAME} from 'feature/ui-notifications/components/NotificationSimple';
import useAsyncSwr from 'hook/useAsyncSwr';
import {CheckCircleIcon, XCircleIcon} from '@heroicons/react/outline';
import {useAsyncEffect} from 'hook/useAsync';
import {useAuth} from 'context/auth';
import {useEffect} from 'react';
import {useMemo} from 'react';
import {useNavigate} from 'react-router-dom';
import {useNotification} from 'feature/ui-notifications/context';
import {useTranslation} from 'react-i18next';
import {
  Async,
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
  isTruthy,
  map,
  not,
  option,
  pipe,
  resultToAsync,
  safe,
  Result,
  reduce,
  isObject,
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

const errorToText = pipe(
  safe(isObject),
  map(pipe(
    Object.entries,
    reduce((carry, [key, value]) => [
      ...carry,
      <span className='block' key={key}>{value}</span>
    ], []),
  )),
  option(JSON.stringify),
);

/**
 * @param {Object} props
 * @param {String} props.getGraphQl - GraphQL Query to RETRIEVE the single entity.
 * @param {String} props.createGraphql - GraphQL Query to CREATE the single entity.
 * @param {String} props.updateGraphQl - GraphQL Query to UPDATE the single entity.
 * @param {String} props.deleteGraphQl - GraphQL Query to DELETE the single entity.
 * @param {(data: any) => import('crocks/Async').default} [props.asyncMapFromApi = Async.Resolved]  - Async function that has oppurtunity to modify the data just before using it from API.
 * @param {(data: any) => import('crocks/Async').default} [props.asyncMapToApi = Async.Resolved]  - Async function that has oppurtunity to modify the data just before sending it to API.
 */
export const createUseOne = ({
  getGraphQl,
  createGraphql,
  updateGraphQl,
  deleteGraphQl,
  asyncMapFromApi = Async.Resolved,
  asyncMapToApi = Async.Resolved,
  asyncRemoveMapToApi = Async.Resolved,
}) => ({
  id,
  saveRef,
  formResult,
  setForm,
  successRedirectPath,
  removeRef
}) => {
  const nav = useNavigate();
  const {api} = useAuth();
  const {notify} = useNotification();
  const {t} = useTranslation();
  const getSwr = useAsyncSwr(
    [getGraphQl, {id}],
    (query, params) => id
      ? api(params, query).chain(asyncMapFromApi)
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
    // chain(tap(console.log)),
    chain(flip(api)(updateGraphQl))
  ), [api]);

  const remove = useMemo(() => pipe(
    resultToAsync,
    map(a => ({...a, id})),
    // chain(tap(console.log)),
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
          {errorToText(error)}
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
          {errorToText(error)}
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
