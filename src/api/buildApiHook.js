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

export const createUseList = ({graphQl, asyncMapFromApi}) => () => {
  const {apiQuery} = useAuth();

  return useAsyncSwr([graphQl], (query) => (
    apiQuery(query)
    .chain(asyncMapFromApi)
  ));
}

export const createUseOne = ({
  getGraphQl,
  createGraphql,
  updateGraphQl,
  asyncMapFromApi,
  asyncMapToApi,
}) => ({
  id,
  saveRef,
  formResult,
  setForm,
  successRedirectPath,
}) => {
  const nav = useNavigate();
  const {api} = useAuth();
  const {notify} = useNotification();
  const {t} = useTranslation();
  const getSwr = useAsyncSwr([getGraphQl, {id}], (query, params) => (
    api(params, query)
    .chain(asyncMapFromApi)
  ));

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
          {JSON.stringify(error)}
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
  }, [saveRef?.current, formResult, t, nav, notify, successRedirectPath, formResult]);

  return {
    ...getSwr,
    update,
    create,
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