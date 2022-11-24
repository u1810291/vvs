import React, {useEffect, useMemo} from 'react';
// import {generatePath, Link} from 'react-router-dom';

import {FilterIcon} from '@heroicons/react/solid';

import Listing from 'layout/ListingLayout';

import withPreparedProps from 'hoc/withPreparedProps';

import {useFilter} from 'hook/useFilter';
import {generatePath, Link, useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

import Button from 'components/Button';
import Innerlinks from 'components/Innerlinks';
import Breadcrumbs from 'components/Breadcrumbs';

import {useTasks} from 'feature/task/api';
import {TaskCreateRoute, TaskEditRoute} from 'feature/task/routes';
import {BreachListRoute} from 'feature/breach/routes';
import {DashboardEditRoute} from 'feature/dashboard/routes';
import {PermissionListRoute} from 'feature/permission/routes';
import {useObjectsDropdown} from 'feature/task/api/taskEditApi';

import {Maybe, safe, getProp} from 'crocks';
import {not} from 'crocks/logic';
import {constant} from 'crocks/combinators';
import {alt, chain, map, option} from 'crocks/pointfree';
import {curry, getPropOr, objOf, pipe} from 'crocks/helpers';
import {isString, isEmpty, hasProps} from 'crocks/predicates';

import {format} from 'date-fns';
import TaskStatusTag from '../component/TaskStatusTag';

const {Just} = Maybe;

const getColumn = curry((t, Component, key, pred, mapper, status, styles, isSortable) => ({
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
    alt(Just(item))
  )(item),
  styles: pipe(
    safe(isString),
    option(''),
  )(styles)
}));

const TaskListLayout = withPreparedProps(Listing, props => {
  const nav = useNavigate();
  const {t: tb} = useTranslation('task', {keyPrefix: 'breadcrumbs'});
  const {t: th} = useTranslation('task', {keyPrefix: 'list.header'});
  const {t: ts} = useTranslation('task', {keyPrefix: 'status'});
  const {t: tc} = useTranslation('task', {keyPrefix: 'list.column'});

  const c = useMemo(() => getColumn(tc, props => (
    <Link className={props?.className} to={generatePath(TaskEditRoute.props.path, {id: props?.id})}>
        {props?.children}
    </Link>
  )), [tc]);

  const bullet = '\u2022';
  const nullToStr = e => !e ? '-' : e;
  const boolToStr = e => e ? ts`YES` : ts`NO`;
  const getName = pipe(getProp('name'), option('-'));
  const concatNameAdress = pipe(
    safe(hasProps(['name', 'address'])),
    map(({name, address}) => `${name} ${bullet} ${address}`),
    option('-')
  );
  const formatDate = pipe(
    safe(not(isEmpty)),
    map(created_at => format(new Date(created_at), 'Y-MM-d HH:mm')),
    option('-')
  );

  const {data: objects} = useObjectsDropdown();

  const tableColumns = [
    c('created_at', constant(true), formatDate, true, 'text-regent', true),
    c('id', constant(true), nullToStr, false, 'text-regent', true),
    c('object', constant(true), concatNameAdress, true, 'text-regent', false),
    c('name', constant(true), nullToStr, true, 'text-bluewood', true),
    c('crew', constant(true), getName, true, 'text-regent', false),
    getColumn(
      tc,
      props => <TaskStatusTag {...props}/>,
      'status',
      constant(true),
      nullToStr,
      true,
      null,
      true,
    ),
    c('reason', constant(true), nullToStr, true, 'text-bluewood', true),
    c('guess', constant(true), boolToStr, false, 'text-regent', true),
  ];


  const filtersData = [
    {key: 'created_at', label: tc('created_at'), filter: 'date'},
    {key: 'changed_by_user_id', label: 'Operator', filter: 'multiselect', values: []},
    {
      key: 'object_id',
      label: tc('object'),
      filter: 'autocomplete',
      values: pipe(safe(not(isEmpty)), option([]))(objects),
      displayValue: (v) => objects?.find(c => c.value === v)?.name
    },
    {key: 'address', label: 'Object\'s address', filter: 'text'},
    {key: 'event_type', label: 'Type', filter: 'multiselect', values: ['APVAŽIAVIMAS', 'INKASACIJA', 'KITA']},
    {key: 'group', label: 'Group (?)', filter: 'multiselect', values: []},
    {
      key: 'status',
      label: tc('status'),
      filter: 'multiselect',
      values: [
        'NEW',
        'WAIT_FOR_APPROVAL',
        'ON_THE_ROAD',
        'INSPECTION',
        'INSPECTION_DONE',
        'FINISHED',
        'CANCELLED',
        'CANCELLED_BY_CLIENT',
      ],
      custom: (value, filters) => {
        const statuses = value.map(v => v.toUpperCase());
        if (statuses.includes('CANCELLED_BY_CLIENT')) statuses.push('CANCELLED_BY_CLIENT_CONFIRMED');
        return {_in: statuses}
      }
    },
    {key: 'reason', label: 'Reason', filter: 'multiselect', values: []},
    {key: 'crew_id', label: 'Crew', filter: 'multiselect', values: []},
    {key: 'crew.driver_user_id', label: 'Driver', filter: 'multiselect', values: []},
    {key: 'on_time', label: 'On time (T/F)?', filter: 'multiselect', values: ['Yes', 'No']},
  ];

  const [queryParams, filters, columns, defaultFilter, toggleFilter, setExportData, sortColumnKey, setSortColumn] = useFilter(
    'events',
    tableColumns,
    filtersData,
    {canArchive: true},
  );

  const api = useTasks({filters: queryParams});

  useEffect(() => {
    api.mutate();
  }, [queryParams, sortColumnKey]);

  
  
  return {
    api,
    list: api?.data?.flat() ?? [],
    rowKeyLens: getPropOr(0, 'id'),
    breadcrumbs: (
      <Breadcrumbs>
        <Breadcrumbs.Item><span className='font-semibold'>{tb`tasks`}</span></Breadcrumbs.Item>
        <Breadcrumbs.Item hideSlash>
          <Button.NoBg onClick={toggleFilter}>
            {defaultFilter.id ? defaultFilter.name : tb('all_data') }
            <FilterIcon className='w-6 h-6 ml-2 text-gray-300 cursor-pointer inline-block focus:ring-0' />
          </Button.NoBg>
        </Breadcrumbs.Item>
      </Breadcrumbs>
    ),
    buttons: (
      <Button.Pxl onClick={() => nav(TaskCreateRoute.props.path)}>{th('create')}</Button.Pxl>
    ),
    innerlinks: (
      <Innerlinks>
        <Innerlinks.Item to={DashboardEditRoute.props.path}>{th('dashboard')}</Innerlinks.Item>
        <Innerlinks.Item isCurrent={true}>{th('tasks')}</Innerlinks.Item>
        <Innerlinks.Item to={PermissionListRoute.props.path}>{th('permissions')}</Innerlinks.Item>
        <Innerlinks.Item to={BreachListRoute.props.path}>{th('breaches')}</Innerlinks.Item>
      </Innerlinks>
    ),
    filters,
    tableColumns,
    columns,
    sortColumnKey, 
    setSortColumn
  }
});

export default TaskListLayout;
