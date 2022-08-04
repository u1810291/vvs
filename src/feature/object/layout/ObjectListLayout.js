import Breadcrumbs from 'components/Breadcrumbs';
import Listing from 'layout/ListingLayout';
import withPreparedProps from 'hoc/withPreparedProps';
import {ObjectCreateRoute, ObjectEditRoute} from '../routes';
import {alt} from 'crocks/pointfree';
import {generatePath, Link, useNavigate} from 'react-router-dom';
import {titleCase} from '@s-e/frontend/transformer/string';
import {useMemo, useEffect} from 'react';
// import {useObjects} from '../api';
import {useTranslation} from 'react-i18next';
import {
  Maybe,
  and,
  chain,
  curry,
  getProp,
  getPropOr,
  identity,
  isArray,
  isEmpty,
  isNil,
  map,
  not,
  objOf,
  pipe,
  safe,
  maybeToAsync,
} from 'crocks';
import {useFilter} from 'hook/useFilter';
import InputGroup from 'components/atom/input/InputGroup';
import SelectBox from 'components/atom/input/SelectBox';
import {useAuth} from 'context/auth';
import useAsync from 'hook/useAsync';
import Button from 'components/Button';

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

const nnil = not(isNil);
const ne = not(isEmpty);

const ObjectList = withPreparedProps(Listing, (props) => {
  const nav = useNavigate();
  const {api} = useAuth();
  const {t: tb} = useTranslation('object', {keyPrefix: 'breadcrumbs'});
  const {t} = useTranslation('object', {keyPrefix: 'list.column'});
  // const swr = useObjects();

  const tableName = 'object';
  const [query, filterValues, filters] = useFilter(
    tableName,
    `
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
    `, [
    {key: 'name', type: 'String', label: 'Name', filter: 'text', Component: InputGroup},
    {key: 'address', type: 'String', label: 'Address', filter: 'text', Component: InputGroup},
    {key: 'provider_name', type: 'provider_enum!', label: 'Provider', filter: 'select', Component: SelectBox, Child: SelectBox.Option, values: ['MONAS', 'PROVIDER_2']},
    {key: 'city', type: '[city_enum!]', label: 'City', filter: 'multiselect', Component: SelectBox, Child: SelectBox.Option, values: ['KAUNAS', 'VILNIUS', 'URENA']},
  ]);

  const [state, fork] = useAsync(chain(
    maybeToAsync(`"${tableName}" prop is expected in the response`, getProp(tableName)),
    api(filterValues, query)
  ));

  const c = useMemo(() => getColumn(t, props => (
    <Link to={generatePath(ObjectEditRoute.props.path, {id: props?.id})}>
      {props?.children}
    </Link>
  )), [t]);

  useEffect(() => {fork()}, [filterValues]);
 
  return {
    list: safe(isArray, state.data).option([]),
    rowKeyLens: getPropOr(0, 'id'),
    breadcrumbs: (
      <Breadcrumbs>
        <Breadcrumbs.Item><span className='font-semibold'>{tb`objects`}</span></Breadcrumbs.Item>
        <Breadcrumbs.Item>{tb`allData`}</Breadcrumbs.Item>
      </Breadcrumbs>
    ),
    buttons: (
      <>
        <Button onClick={() => nav(ObjectCreateRoute.props.path)}>New</Button>
      </>
    ),
    filters,
    tableColumns: [
      c('id', ne, identity),
      c('name', ne, identity),
      c('city', ne, titleCase),
      c('address', ne, identity),
      c('phone', ne, identity),
      c('longitude', nnil, identity),
      c('latitude', nnil, identity),
      c('contract_no', ne, identity),
      c('contract_object_no', ne, identity),
      c('provider_name', ne, titleCase),
      c('provider_id', isFinite, identity),
      c('navision_id', and(not(isEmpty), isFinite), identity),
      c('is_atm', ne, bool => bool ? t('bool.yes') : t('bool.no')),
    ],
  }
});

export default ObjectList;
