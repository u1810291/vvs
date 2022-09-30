import Breadcrumbs from 'components/Breadcrumbs';
import Listing from 'layout/ListingLayout';
import withPreparedProps from 'hoc/withPreparedProps';
import {ObjectCreateRoute, ObjectEditRoute} from '../routes';
import {alt} from 'crocks/pointfree';
import {generatePath, Link, useNavigate} from 'react-router-dom';
import {titleCase} from '@s-e/frontend/transformer/string';
import {useMemo, useEffect, useCallback, useState} from 'react';
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
  isNil,
  map,
  not,
  objOf,
  pipe,
  safe,
  constant,
  // tap,
} from 'crocks';
import {useObjects} from '../api';
import {useFilter} from 'hook/useFilter';
import {useAuth} from 'context/auth';
import {DocumentDownloadIcon, FilterIcon} from '@heroicons/react/solid';
import Button from 'components/Button';
import {KeyBoxListRoute} from 'feature/keybox/routes';
import {ModemListRoute} from 'feature/modem/routes';
import Innerlinks from 'components/Innerlinks';
import {useClientDropdown} from 'feature/client/api/useClients';
import {format} from 'date-fns';
import {exportTableToExcel} from 'util/utils';


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


const ObjectList = withPreparedProps(Listing, (props) => {
  const [data, setData] = useState();
  const nav = useNavigate();
  const {api} = useAuth();
  const {t: tb} = useTranslation('object', {keyPrefix: 'breadcrumbs'});
  const {t: tp} = useTranslation('object');
  const {t} = useTranslation('object', {keyPrefix: 'list.column'});

  
  const c = useMemo(() => getColumn(t, props => (
    <Link to={generatePath(ObjectEditRoute.props.path, {id: props?.id})}>
      {props?.children}
    </Link>
  )), [t]);

  const {data: clientsDropdown} = useClientDropdown();
  // console.log(clientsDropdown);

  const nnil = not(isNil);
  const ne = not(isEmpty);
  const userToStr = e => !e?.length ? '-' : e?.map(({user_id}, ixd) => `${clientsDropdown?.find(c => c.value === user_id)?.name}${ixd !== e.length - 1 ? ', ' : ''}`);
  const boolToStr = e => e ? t`YES` : t`NO`;
  const dateCol = (d) => format(new Date(d), 'Y-MM-dd HH:mm');

  const tableColumns = [
    c('name', ne, identity, true),
    c('city', ne, titleCase, true),
    c('address', ne, identity, true),
    c('contract_object_no', ne, identity, true),
    c('contract_no', ne, identity, true),
    c('is_crew_autoasigned', constant(true), boolToStr, true),
    c('created_at', ne, dateCol, false),
    c('users', constant(true), userToStr, false),
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
        return clientsDropdown?.find(c => c.value === v)?.name;
      }
    },
  ];
  const handleExport = useCallback(() => exportTableToExcel(data, new Date()), [data]);

  const downloadBtn = () => <DocumentDownloadIcon onClick={handleExport} className='w-6 h-6 ml-2 text-gray-300 cursor-pointer inline-block focus:ring-0' />

  const [queryParams, filters, columns, defaultFilter, toggleFilter] = useFilter(
    'object',
    tableColumns,
    filtersData,
    null,
    null,
    downloadBtn
  );
  
  const list = useObjects({filters: queryParams})
  
  useEffect(() => {
    setData(list.data);
  }, [list.data]);

  useEffect(() => {
    // console.log(queryParams);
    list.mutate()
  }, [queryParams]);

 
  return {
    list: safe(isArray, list?.data).option([]),
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
  }
});

export default ObjectList;
