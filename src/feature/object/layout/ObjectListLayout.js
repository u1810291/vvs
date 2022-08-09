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
  // and,
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
  // tap,
  // getPath,
} from 'crocks';
import {useFilter} from 'hook/useFilter';
import InputGroup from 'components/atom/input/InputGroup';
// import SelectBox from 'components/atom/input/SelectBox';
// import useDebounce from 'hook/useDebounce';
import {useAuth} from 'context/auth';
import useAsync from 'hook/useAsync';
import {FilterIcon} from '@heroicons/react/solid';
import Button from 'components/Button';


const getColumn = curry((t, Component, key, pred, mapper, status) => ({
  Component,
  headerText: t(key),
  key,
  status,
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
  const {t: to} = useTranslation('object');
  const {t} = useTranslation('object', {keyPrefix: 'list.column'});
  // const swr = useObjects();

  
  const c = useMemo(() => getColumn(t, props => (
    <Link to={generatePath(ObjectEditRoute.props.path, {id: props?.id})}>
      {props?.children}
    </Link>
  )), [t]);

  const tableColumns = [
    c('name', ne, identity, true),
    c('city', ne, titleCase, true),
    c('address', ne, identity, true),
    c('contract_object_no', ne, identity, true),
    c('contract_no', ne, identity, true),
    c('is_crew_autoasigned', ne, identity, true),
    c('created', ne, identity, false),
    c('user_id', ne, identity, false),
  ]

  const tableName = 'object';
  const [query, queryParams, filters, columns, defaultFilter, toggleFilter] = useFilter(
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
      
    `,
    tableColumns,
    [
      // groups ???
      {key: 'name', type: 'String', label: 'Name', filter: 'text', Component: InputGroup},
      {key: 'contract_object_no', type: 'String', label: 'Object No', filter: 'text', Component: InputGroup},
      
      {key: 'latitude', type: 'numeric', label: 'Latitude', filter: 'range', Component: InputGroup},
      {key: 'longitude', type: 'numeric', label: 'Longitude', filter: 'range', Component: InputGroup},

      {key: 'contract_no', type: 'String', label: 'Contract No', filter: 'text', Component: InputGroup},
      {key: 'address', type: 'String', label: 'Address', filter: 'text', Component: InputGroup},

      // {key: 'provider_name', type: 'provider_enum!', label: 'Provider', filter: 'select', Component: SelectBox, Child: SelectBox.Option, values: ['MONAS', 'PROVIDER_2']},
      // {key: 'city', type: '[city_enum!]', label: 'City', filter: 'multiselect', Component: SelectBox, Child: SelectBox.Option, values: ['KAUNAS', 'VILNIUS', 'URENA']},
      
      // automatically send crew? (yes, no)
      // client
    ]
  );

  const [state, fork] = useAsync(chain(maybeToAsync(`"${tableName}" prop is expected in the response`, getProp(tableName)),
    api(queryParams, query)
  ));
  
  useEffect(() => {
    // console.log(queryParams);
    // console.log(query);

    fork()
  }, [queryParams]);


 
  return {
    list: safe(isArray, state.data).option([]),
    rowKeyLens: getPropOr(0, 'id'),
    breadcrumbs: (
      <Breadcrumbs>
        <Breadcrumbs.Item><span className='font-semibold'>{tb`objects`}</span></Breadcrumbs.Item>
        <Breadcrumbs.Item>
          <Button.NoBg onClick={toggleFilter}>
            {defaultFilter.id ? defaultFilter.name : tb('allData') } 
            <FilterIcon className='w-6 h-6 ml-2 text-gray-300 cursor-pointer inline-block focus:ring-0' />
          </Button.NoBg>
          
        </Breadcrumbs.Item>
      </Breadcrumbs>
    ),
    buttons: (
      <>
        <Button onClick={() => nav(ObjectCreateRoute.props.path)}>{to('create')}</Button>
      </>
    ),
    filters,
    tableColumns,
    columns,
  }
});

export default ObjectList;
