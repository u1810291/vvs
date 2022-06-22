import Listing from 'layout/Listing';
import maybeToAsync from 'crocks/Async/maybeToAsync';
import useAsync from 'hook/useAsync';
import {titleCase} from '@s-e/frontend/transformer/string';
import {useAuth} from 'context/auth';
import {useEffect, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {withAuthorizedHook} from 'hoc/withAuthorizedHook';
import withPreparedProps from 'hoc/withPreparedProps';
import {
  and,
  chain,
  curry,
  getProp,
  getPropOr,
  identity,
  isArray,
  isEmpty,
  map,
  Maybe,
  not,
  objOf,
  pipe,
  safe,
  setProp,
} from 'crocks';
import Breadcrumbs from 'components/Breadcrumbs';
import {generatePath, Link} from 'react-router-dom';
import ObjectRoute, {ObjectEditRoute} from '../routes';
import {alt} from 'crocks/pointfree';

const getColumn = curry((t, Component, key, pred, mapper) => ({
  Component,
  headerText: t(key),
  key,
  itemToProps: item => pipe(
    getProp(key),
    chain(safe(pred)),
    map(mapper),
    map(objOf('children')),
    map(a => ({...item, ...a})),
    alt(Maybe.Just(item)),
  )(item),
}));

const ne = not(isEmpty);
const Span = props => <span {...props}/>;

const ObjectList = withPreparedProps(Listing, (props) => {
  const {apiQuery} = useAuth();
  const {t: tb} = useTranslation('object', {keyPrefix: 'breadcrumbs'});
  const {t} = useTranslation('object', {keyPrefix: 'list.column'});
  const [state, fork] = useAsync(
    apiQuery(
      `
        query {
          object {
            address
            city
            contract_no
            contract_object_no
            id
            is_atm
            longitude
            latitude
            name
            provider_name
            provider_id
            phone
            navision_id
          }
        }
      `
    )
    .chain(maybeToAsync(
      '"object" prop is expected in the response',
      getProp('object')
    ))
  );

  const c = useMemo(() => getColumn(t, props => (
    <Link to={generatePath(ObjectEditRoute.props.path, {id: props?.id})}>
      {props?.children}
    </Link>
  )), [t]);

  useEffect(() => { fork() }, []);

  return {
    list: safe(isArray, state.data).option([]),
    rowKeyLens: getPropOr(0, 'id'),
    breadcrumbs: (
      <Breadcrumbs>
        <Breadcrumbs.Item><span className='font-semibold'>{tb`objects`}</span></Breadcrumbs.Item>
        <Breadcrumbs.Item>{tb`allData`}</Breadcrumbs.Item>
      </Breadcrumbs>
    ),
    tableColumns: [
      c('id', ne, identity),
      c('name', ne, identity),
      c('city', ne, titleCase),
      c('address', ne, identity),
      c('phone', ne, identity),
      c('longitude', ne, identity),
      c('latitude', ne, identity),
      c('contract_no', ne, identity),
      c('contract_object_no', ne, identity),
      c('provider_name', ne, titleCase),
      c('provider_id', isFinite, identity),
      c('navision_id',and(not(isEmpty), isFinite) , identity),
      c('is_atm', ne, bool => bool ? t('bool.yes') : t('bool.yes')),
    ],
  }
});

export default ObjectList;
