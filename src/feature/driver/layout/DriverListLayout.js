import Breadcrumbs from '../../../components/Breadcrumbs';
import ListingLayout from '../../../layout/ListingLayout';
import React, {useEffect, useMemo} from 'react';
import withPreparedProps from '../../../hoc/withPreparedProps';
import {DriverCreateRoute, DriverEditRoute} from '../routes';
import {useTranslation} from 'react-i18next';
import {
  getPropOr, 
  curry, 
  getProp,
  pipe, 
  safe, 
  map, 
  Maybe,
  isString,
  option,
  objOf,
  // identity, 
  // and, 
  // hasProp, 
  // isTruthy, 
  // propSatisfies, 
  // pick, 
} from 'crocks';
import useDrivers, {useDriverDropdown} from '../api/useDrivers';
import {alt} from 'crocks/pointfree';
import {generatePath, Link, useNavigate} from 'react-router-dom';
import Button from 'components/Button';
import {FilterIcon} from '@heroicons/react/solid';
import {useFilter} from 'hook/useFilter';
// import DriverOnlineTag from '../component/DriverOnlineTag';


const getColumn = curry((t, Component, key, mapper, status, styles) => ({
  Component,
  headerText: t(key),
  key,
  status,
  itemToProps: item => pipe(
    mapper,
    map(objOf('children')),
    map(a => ({...item, ...a})),
    alt(Maybe.Just('-')),
  )(item),
  styles: pipe(
    safe(isString),
    option(''),
  )(styles)
}));



const DriverListLayout = withPreparedProps(ListingLayout, () => {
  const {t} = useTranslation('driver', {keyPrefix: 'list'});
  const {t: tc} = useTranslation('driver', {keyPrefix: 'field'});
  const {t: tos} = useTranslation('driver', {keyPrefix: 'onlineStatus'});
  const {t: tb} = useTranslation('driver', {keyPrefix: 'breadcrumbs'});
  const nav = useNavigate();

  // const c = (prop, mapper = identity, status) => ({
  //   key: prop,
  //   headerText: tc(prop),
  //   status,
  //   itemToProps: item => pipe(
  //     safe(and(hasProp('id'), propSatisfies(prop, isTruthy))),
  //     map(item => ({id: item?.id, children: mapper(item?.[prop])})),
  //     alt(pipe(
  //       safe(hasProp('id')),
  //       map(pick(['id'])),
  //     )(item)),
  //   )(item),
  //   Component: ({id, children, fallback = '—'}) => {
  //     if (!id && !children) return fallback;
  //     if (!id) return children || fallback;
  //     return (
  //       <Link to={generatePath(DriverEditRoute.props.path, {id})}>
  //         {children || fallback}
  //       </Link>
  //     )
  //   },
  // });

  const c = useMemo(() => getColumn(t, props => (
    props?.id && <Link className={props?.className} to={generatePath(DriverEditRoute.props.path, {id: props?.id})}>
      {props?.children}
    </Link>
  )), [t]);

  const boolCol = useMemo(() => pipe(String, t), [t]);
  const getFullName = (v) => {
    console.log(v);
    return '-';
  }

  
  const {data: driverDropdown} = useDriverDropdown();

  const tableColumns = [
    c('id', pipe(getProp('id')), false, null),
    c('fullName', pipe(getProp('fullName'), map(fn => getFullName(fn))), true, null),
    c('firstName', pipe(getProp('firstName')), true, null),
    c('lastName', pipe(getProp('lastName')), true, null),
    c('username', pipe(getProp('username')), false, null),
    c('verified', pipe(getProp('verified')), false, null),
    c('email', pipe(getProp('email')), false, null),
    // {
    //   key: 'status',
    //   headerText: tc`status`,
    //   itemToProps: Maybe.Just,
    //   Component: withPreparedProps(DriverOnlineTag, identity),
    // }
  ];

  const filtersData = [
    {key: 'fullName', label: 'Name Surname', filter: 'autocomplete', values: driverDropdown || [], displayValue: (v) => {
      return driverDropdown?.find(d => d.value === v)?.name;
    }},
    {key: 'status', label: 'Status', filter: 'multiselect', values: ['OFFLINE', 'ONLINE', 'DEACTIVATED']},
  ]

  const [queryParams, filters, columns, defaultFilter, toggleFilter] = useFilter(
    'crew_driver',
    tableColumns,
    filtersData
  );

  const api = useDrivers();

  useEffect(() => {
    api.mutate()
  }, [queryParams]);

  return {
    list: api?.data || [],
    rowKeyLens: getPropOr(0, 'id'),
    buttons: <Button onClick={() => nav(DriverCreateRoute.props.path)}>{t`create`}</Button>,
    breadcrumbs: (
      <Breadcrumbs>
        <Breadcrumbs.Item hasSlash={false}><span className='font-semibold'>{tb`drivers`}</span></Breadcrumbs.Item>
        <Button.NoBg onClick={toggleFilter}>
          {defaultFilter.id ? defaultFilter.name : tb('allData') } 
          <FilterIcon className='w-6 h-6 ml-2 text-gray-300 cursor-pointer inline-block focus:ring-0' />
        </Button.NoBg>
      </Breadcrumbs>
    ),
    /**
     * @type {Array<import('../../../layout/ListingLayout/index.js').TableColumnComponent>}
     */
    tableColumns,
    columns,
    filters,
  }
});

export default DriverListLayout;
