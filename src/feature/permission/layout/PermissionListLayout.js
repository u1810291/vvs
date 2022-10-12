import React, {useMemo, useEffect, useState} from 'react';
import {generatePath, Link, useNavigate} from 'react-router-dom';

import Listing from 'layout/ListingLayout';
import Breadcrumbs from 'components/Breadcrumbs';
import withPreparedProps from 'hoc/withPreparedProps';

import {useTranslation} from 'react-i18next';

import {
  curry,
  getPropOr,
  isEmpty,
  map,
  not,
  objOf,
  pipe,
  safe,
  isString,
  option,
  getProp,
  Maybe,
  getPath,
  // tap,
  // chain,
} from 'crocks';
import {alt} from 'crocks/pointfree';

import {PermissionEditRoute} from '../routes';
import {useCrewRequestDropdown, usePermissions} from '../api';
import DashboardRoute from 'feature/dashboard/routes';
import {TaskListRoute} from 'feature/task/routes';
import Innerlinks from 'components/Innerlinks';
import {BreachListRoute} from 'feature/breach/routes';
import {FilterIcon} from '@heroicons/react/solid';
import Button from 'components/Button';
import {useFilter} from 'hook/useFilter';
import DynamicStatus from 'feature/permission/component/PermissionStatus';
import {useCrewDropdown} from 'feature/crew/api/crewEditApi';
import useDriversDropdown from 'feature/driver/api/useDriversDropdown';
import {format} from 'date-fns';


const getColumn = curry((t, Component, key, mapper, status, styles, isSortable) => ({
  Component,
  headerText: t(key),
  key,
  status,
  isSortable,
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

const ne = not(isEmpty);
const nullToStr = e => !e ? '-' : e;

const PermissionListLayout = withPreparedProps(Listing, () => {
  const [data, setData] = useState();
  const {t: tb} = useTranslation('permission', {keyPrefix: 'breadcrumbs'});
  const {t: tp} = useTranslation('permission');
  const {t: ts} = useTranslation('permission', {keyPrefix: 'status'});
  const {t} = useTranslation('permission', {keyPrefix: 'list.column'});
  const nav = useNavigate();


  const c = useMemo(() => getColumn(t, props => (
    props?.id && <Link className={props?.className} to={generatePath(PermissionEditRoute.props.path, {id: props?.id})}>
      {props?.children}
    </Link>
  )), [t]);

  const cs = useMemo(() => getColumn(t, props => (
    props?.id && <Link to={generatePath(PermissionEditRoute.props.path, {id: props?.id})}>
      <DynamicStatus t={'permission'} status={props?.status}/>
    </Link>
  )), [t]);

  const {data: crewRequestDropdown} = useCrewRequestDropdown();
  const {data: crewDropdown} = useCrewDropdown();
  const {data: driverDropdown} = useDriversDropdown();

  const tableColumns = [
    // c('id', pipe(getProp('id')), false, null),
    c('created_at', pipe(getProp('created_at'), map(d => format(new Date(d), 'Y-MM-dd HH:mm'))), true, null, true),
    c('request_id', pipe(getProp('request_id')), true, null, true),
    cs('status', pipe(getProp('status')), true, null, true),
    c('crew_name', pipe(getPath(['crew', 'name'])), true, 'text-steel', false),
    c('crew.driver_user_id', pipe(getPath(['crew', 'driver_user_id']), map(d => driverDropdown?.find(dr => dr.value === d)?.name)), true, 'text-steel', false),
  ];

  const filtersData = [
    {key: 'created_at', label: 'Created_at', filter: 'daterange'},
    {key: 'request_id', label: 'Reason', filter: 'autocomplete', values: crewRequestDropdown || [], displayValue: (v) => {
      return crewRequestDropdown?.find(c => c.value === v)?.name;
    }},
    {key: 'status', label: 'Status', filter: 'multiselect', values: ['ALLOWED', 'CANCELLED', 'COMPLETE', 'ASKED', 'REJECTED']},
    {key: 'crew_id', label: 'Crew', filter: 'autocomplete', values: crewDropdown || [], displayValue: (v) => {
      return crewDropdown?.find(c => c.value === v)?.name;
    }},
    {key: 'crew.driver_user_id', label: 'Driver', filter: 'autocomplete', values: driverDropdown || [], displayValue: (v) => {
      return driverDropdown?.find(d => d.value === v)?.name;
    }},
  ];

  const [queryParams, filters, columns, defaultFilter, toggleFilter, setExportData, sortColumnKey, setSortColumn] = useFilter(
    'crew_permission',
    tableColumns,
    filtersData,
  );

  const api = usePermissions({filters: queryParams})
  
  useEffect(() => {
    // console.log(queryParams);
    setExportData(api.data);
    api.mutate()
  }, [queryParams, sortColumnKey]);

  return {
    // list: safe(isArray, api?.data).option([]),
    list: api?.data || [],
    rowKeyLens: getPropOr(0, 'id'),
    breadcrumbs: (
      <Breadcrumbs>
        <Breadcrumbs.Item><span className='font-semibold'>{tb`permissions`}</span></Breadcrumbs.Item>
        <Breadcrumbs.Item hideSlash>
          <Button.NoBg onClick={toggleFilter}>
            {defaultFilter.id ? defaultFilter.name : tb('allData') }
            <FilterIcon className='w-6 h-6 ml-2 text-geyser cursor-pointer inline-block focus:ring-0' />
          </Button.NoBg>
        </Breadcrumbs.Item>
      </Breadcrumbs>
    ),
    buttons: (
      <>
        {/* <Button onClick={useCallback(() => nav(PermissionCreateRoute.props.path), [nav])}>{tp('create')}</Button> */}
      </>
    ),
    innerlinks: (
      <Innerlinks>
        <Innerlinks.Item to={DashboardRoute.props.path}>{tp('Dashboard')}</Innerlinks.Item>
        <Innerlinks.Item to={TaskListRoute.props.path}>{tp('Tasks')}</Innerlinks.Item>
        <Innerlinks.Item isCurrent={true}>{tp('Permissions')}</Innerlinks.Item>
        <Innerlinks.Item to={BreachListRoute.props.path}>{tp('Breaches')}</Innerlinks.Item>
      </Innerlinks>
    ),
    tableColumns,
    filters,
    columns,
    sortColumnKey, 
    setSortColumn
  }
});

export default PermissionListLayout;
