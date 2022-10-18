import Breadcrumbs from 'components/Breadcrumbs';
import Button from 'components/Button';
import Innerlinks from 'components/Innerlinks';
import Listing from 'layout/ListingLayout';
import withPreparedProps from 'hoc/withPreparedProps';
import {FilterIcon} from '@heroicons/react/solid';
import {KeyBoxListRoute} from 'feature/keybox/routes';
import {ModemListRoute} from 'feature/modem/routes';
import {ObjectCreateRoute, ObjectEditRoute} from '../routes';
import {alt} from 'crocks/pointfree';
import {format} from 'date-fns';
import {generatePath, Link, useNavigate} from 'react-router-dom';
import {titleCase} from '@s-e/frontend/transformer/string';
import {useClientDropdown} from 'feature/client/api/useClients';
import {useFilter} from 'hook/useFilter';
import {useMemo, useEffect} from 'react';
import {useObjects} from '../api';
import {useTranslation} from 'react-i18next';
import {
  Maybe,
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
  constant,
} from 'crocks';



const getColumn = curry((t, Component, key, pred, mapper, status, isSortable) => ({
  Component,
  headerText: t(key),
  key,
  status,
  isSortable,
  itemToProps: item => pipe(
    getProp(key),
    chain(safe(pred)),
    map(mapper),
    map(objOf('children')),
    map(a => ({...item, ...a})),
    alt(Maybe.Just(item)),
  )(item),
}));

const ObjectList = withPreparedProps(Listing, (props) => {
  const nav = useNavigate();
  const {t: tb} = useTranslation('object', {keyPrefix: 'breadcrumbs'});
  const {t: tp} = useTranslation('object');
  const {t} = useTranslation('object', {keyPrefix: 'list.column'});
  const c = useMemo(() => getColumn(t, props => (
    <Link to={generatePath(ObjectEditRoute.props.path, {id: props?.id})}>
      {props?.children}
    </Link>
  )), [t]);

  const {data: clientsDropdown} = useClientDropdown();
  const ne = not(isEmpty);
  const userToStr = e => !e?.length ? '-' : e?.map(({user_id}, ixd) => `${clientsDropdown?.find(c => c.value === user_id)?.name}${ixd !== e.length - 1 ? ', ' : ''}`);
  const boolToStr = e => e ? t`YES` : t`NO`;
  const dateCol = (d) => format(new Date(d), 'Y-MM-dd HH:mm');

  const tableColumns = [
    c('name', ne, identity, true, true),
    c('city', ne, titleCase, true, true),
    c('address', ne, identity, true, true),
    c('contract_object_no', ne, identity, true, true),
    c('contract_no', ne, identity, true, true),
    c('is_crew_autoasigned', constant(true), boolToStr, true, true),
    c('created_at', ne, dateCol, false, true),
    c('users', constant(true), userToStr, false, false),
  ];

  const filtersData = [
    {key: 'name', label: 'Name', filter: 'text'},
    {key: 'contract_object_no', label: 'Object No', filter: 'text'},
    {key: 'latitude', label: 'Latitude', filter: 'range'},
    {key: 'longitude', label: 'Longitude', filter: 'range'},
    {key: 'contract_no', label: 'Contract No', filter: 'text'},
    {key: 'address', label: 'Address', filter: 'text'},
    {key: 'is_crew_autoasigned', label: 'Auto assigned?', filter: 'select', values: ['ANY', 'YES', 'NO']},
    {
      key: 'users.user_id', 
      label: 'Client', 
      filter: 'autocomplete', 
      values: clientsDropdown || [] , 
      displayValue: (v) => {
        return clientsDropdown?.find(c => c.id === v)?.fullName;
      }
    },
  ];

  const [queryParams, filters, columns, defaultFilter, toggleFilter, setExportData, sortColumnKey, setSortColumn] = useFilter(
    'object',
    tableColumns,
    filtersData,
  );
  
  const list = useObjects({filters: queryParams})
  
  useEffect(() => {
    list.mutate()
    setExportData(list.data);
  }, [queryParams, sortColumnKey]);

 
  return {
    list: safe(isArray, list?.data).option([]),
    rowKeyLens: getPropOr(0, 'id'),
    breadcrumbs: (
      <Breadcrumbs>
        <Breadcrumbs.Item><span className='font-semibold'>{tb`objects`}</span></Breadcrumbs.Item>
        <Breadcrumbs.Item hideSlash>
          <Button.NoBg onClick={toggleFilter}>
            {defaultFilter.id ? defaultFilter.name : tb('allData') } 
            <FilterIcon className='w-6 h-6 ml-2 text-gray-300 cursor-pointer inline-block focus:ring-0' />
          </Button.NoBg>
        </Breadcrumbs.Item>
      </Breadcrumbs>
    ),
    buttons: (
      <>
        <Button onClick={() => nav(ObjectCreateRoute.props.path)}>{tp('create')}</Button>
      </>
    ),
    innerlinks: (
      <Innerlinks>
        <Innerlinks.Item isCurrent={true}>{tp('Objects')}</Innerlinks.Item>
        <Innerlinks.Item to={ModemListRoute.props.path}>{tp('Modems')}</Innerlinks.Item>
        <Innerlinks.Item to={KeyBoxListRoute.props.path}>{tp('Key Boxes')}</Innerlinks.Item>
      </Innerlinks>
    ),
    filters,
    tableColumns,
    columns,
    sortColumnKey,
    setSortColumn,
  }
});

export default ObjectList;
