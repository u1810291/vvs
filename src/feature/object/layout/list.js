import Listing from 'layout/Listing';
import maybeToAsync from 'crocks/Async/maybeToAsync';
import useAsync from 'hook/useAsync';
import {titleCase} from '@s-e/frontend/transformer/string';
import {useAuth} from 'context/auth';
import {useEffect} from 'react';
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
  not,
  objOf,
  pipe,
  safe,
} from 'crocks';
import Breadcrumbs from 'components/Breadcrumbs';

const getColumn = curry((t, Component, key, pred, mapper) => ({
  Component,
  headerText: t(key),
  key,
  itemToProps: pipe(
    getProp(key),
    chain(safe(pred)),
    map(mapper),
    map(objOf('children')),
  ),
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

  useEffect(() => { fork() }, [fork]);

  const c = getColumn(t, Span);

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
