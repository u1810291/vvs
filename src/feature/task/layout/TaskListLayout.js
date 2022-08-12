import React, {useEffect, useMemo} from 'react';
import {generatePath, Link} from 'react-router-dom';
import Listing from '../../../layout/ListingLayout';
import Breadcrumbs from '../../../components/Breadcrumbs';
import withPreparedProps from '../../../hoc/withPreparedProps';
import {useTranslation} from 'react-i18next';
import {useAuth} from '../../../context/auth';
import Button from 'components/Button';

import {
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
  safe
} from 'crocks';
import {alt} from 'crocks/pointfree';

import {TaskEditRoute} from '../routes';
import {FilterIcon} from '@heroicons/react/solid';
import {useFilter} from 'hook/useFilter';
import {PermissionListRoute} from 'feature/permission/routes';
import DashboardRoute from 'feature/dashboard/routes';
import Innerlinks from 'components/Innerlinks';
import {BreachListRoute} from 'feature/breach/routes';
import {useTasks} from '../api';




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

const ne = not(isEmpty);
const Span = props => <span {...props}/>;


// Tasks List Layout
const TaskListLayout = withPreparedProps(Listing, props => {
  const {api} = useAuth();
  const {t: tb} = useTranslation('task', {keyPrefix: 'breadcrumbs'});
  const {t} = useTranslation('task', {keyPrefix: 'list.column'});
  const {t: tp} = useTranslation('task');

  const c = useMemo(() => getColumn(t, props => (
    <Link to={generatePath(TaskEditRoute.props.path, {id: props?.id})}>
      {props?.children}
    </Link>
  )), [t]);


  const tableColumns = [
    c('received', ne, identity, true),
    c('object_name', ne, identity, true),
    c('name', ne, identity, true),
    c('crew', ne, identity, true),
    c('approximate_time', ne, identity, true),
    c('response_time', ne, identity, true),
    c('time_at_object', ne, identity, true),
    c('status', ne, identity, true),
    c('reason', ne, identity, true),
  ];

  const filtersData = [
    {key: 'received', label: 'Date from-to', filter: 'date'},
    {key: 'operator', label: 'Operator', filter: 'multiselect', values: []},
    {key: 'object', label: 'Object', filter: 'multiselect', values: []},
    {key: 'address', label: 'Object\'s address', filter: 'text'},
    {key: 'type', label: 'Type', filter: 'multiselect', values: []},
    {key: 'groups', label: 'Groups (?)', filter: 'multiselect', values: []},
    {key: 'status', label: 'Status', filter: 'multiselect', values: ['View Obj', 'Cancelled', 'New', 'Completed']},
    {key: 'reason', label: 'Reason', filter: 'multiselect', values: []},
    {key: 'crew', label: 'Crew', filter: 'multiselect', values: []},
    {key: 'driver', label: 'Driver', filter: 'multiselect', values: []},
    {key: 'guess', type: 'String', label: 'On time (T/F)?', filter: 'multiselect', values: ['True', 'False']},
  ]

  const [queryParams, filters, columns, defaultFilter, toggleFilter] = useFilter(
    'task', 
    tableColumns,
    filtersData,
  );

  const list = useTasks({filters: queryParams});
  
  useEffect(() => {
    list.mutate()
  }, [queryParams]);


  return {
    list: safe(isArray, list?.data).option([]),
    rowKeyLens: getPropOr(0, 'id'),
    breadcrumbs: (
      <Breadcrumbs>
        <Breadcrumbs.Item><span className='font-semibold'>{tb`tasks`}</span></Breadcrumbs.Item>
        <Breadcrumbs.Item>
          <Button.NoBg onClick={toggleFilter}>
            {defaultFilter.id ? defaultFilter.name : tb('allData') } 
            <FilterIcon className='w-6 h-6 ml-2 text-gray-300 cursor-pointer inline-block focus:ring-0' />
          </Button.NoBg>
        </Breadcrumbs.Item>
      </Breadcrumbs>
    ),
    innerlinks: (
      <Innerlinks>
        <Innerlinks.Item to={DashboardRoute.props.path}>{tp('Dashboard')}</Innerlinks.Item>
        <Innerlinks.Item isCurrent={true}>{tp('Tasks')}</Innerlinks.Item>
        <Innerlinks.Item to={PermissionListRoute.props.path}>{tp('Permissions')}</Innerlinks.Item>
        <Innerlinks.Item to={BreachListRoute.props.path}>{tp('Breaches')}</Innerlinks.Item>
      </Innerlinks>
    ),
    filters,
    tableColumns,
    columns
  }
});

export default TaskListLayout;
