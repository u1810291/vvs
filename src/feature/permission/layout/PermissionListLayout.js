import React, {useMemo, useEffect} from 'react';
import {generatePath, Link, useNavigate} from 'react-router-dom';

import Listing from 'layout/ListingLayout';
import Breadcrumbs from 'components/Breadcrumbs';
import withPreparedProps from 'hoc/withPreparedProps';

import {useTranslation} from 'react-i18next';

import {
  chain,
  curry,
  getProp,
  getPropOr,
  identity,
  isEmpty,
  map,
  not,
  objOf,
  pipe,
  safe,
  isArray,
  isString,
  option,
  constant,
  isObject,
  Maybe,
} from 'crocks';
import {alt} from 'crocks/pointfree';
const {Just} = Maybe;

import {PermissionEditRoute} from '../routes';
import {usePermissions} from '../api';
import {titleCase} from '@s-e/frontend/transformer/string';
import DashboardRoute from 'feature/dashboard/routes';
import {TaskListRoute} from 'feature/task/routes';
import Innerlinks from 'components/Innerlinks';
import {BreachListRoute} from 'feature/breach/routes';
import {FilterIcon} from '@heroicons/react/solid';
import Button from 'components/Button';
import {useFilter} from 'hook/useFilter';
import DynamicStatus from 'feature/permission/component/PermissionStatus';




const getColumn = curry((t, Component, key, pred, mapper, status, styles) => ({
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
    alt(Just(item)),
  )(item),
  styles: pipe(
    safe(isString),
    option(''),
  )(styles)
}));

const ne = not(isEmpty);
const nullToStr = e => !e ? '-' : e;

const PermissionListLayout = withPreparedProps(Listing, () => {
  const {t: tb} = useTranslation('permission', {keyPrefix: 'breadcrumbs'});
  const {t: tp} = useTranslation('permission');
  const {t: ts} = useTranslation('permission', {keyPrefix: 'status'});
  const {t} = useTranslation('permission', {keyPrefix: 'list.column'});
  const nav = useNavigate();


  const c = useMemo(() => getColumn(t, props => (
    <Link to={generatePath(PermissionEditRoute.props.path, {id: props?.id})}>
      {props?.children}
    </Link>
  )), [t]);

  const cs = useMemo(() => getColumn(t, props => (
    <Link to={generatePath(PermissionEditRoute.props.path, {id: props?.id})}>
      <DynamicStatus status={props?.status}/>
    </Link>
  )), [t]);

  const tableColumns = [
    c('id', ne, identity, false, null),
    c('created_at', ne, identity, true, null),
    c('request_id', ne, titleCase, true, null),
    cs('status', constant(true), nullToStr, true, null),
    c('crew_id', ne, identity, true, null),
    c('crew_id.driver_name', ne, identity, true, null),
    c('updated_at', ne, identity, false, null),
  ];

  const filtersData = [
    {key: 'created_at', label: 'Created_at', filter: 'date'},
    {key: 'reason', label: 'Reason', filter: 'select', values: []},
    {key: 'crew', label: 'Crew', filter: 'text'},
    {key: 'driver', label: 'Driver', filter: 'text'},
  ];

  const [queryParams, filters, columns, defaultFilter, toggleFilter] = useFilter(
    'crew_permission',
    tableColumns,
    filtersData
  );
  
  const api = usePermissions({filters: queryParams})
  
  useEffect(() => {
    api.mutate()
  }, [queryParams]);

  return {
    // list: safe(isArray, api?.data).option([]),
    list: pipe(safe(isObject), chain(getProp('data')), chain(safe(isArray)), option([]))(api),
    rowKeyLens: getPropOr(0, 'id'),
    breadcrumbs: (
      <Breadcrumbs>
        <Breadcrumbs.Item><span className='font-semibold'>{tb`permissions`}</span></Breadcrumbs.Item>
        <Breadcrumbs.Item>
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
  }
});

export default PermissionListLayout;
