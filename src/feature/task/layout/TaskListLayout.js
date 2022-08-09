import React, {useEffect, useMemo} from 'react';
import {generatePath, Link} from 'react-router-dom';

import Listing from '../../../layout/ListingLayout';
import Breadcrumbs from '../../../components/Breadcrumbs';
import withPreparedProps from '../../../hoc/withPreparedProps';

import {useTranslation} from 'react-i18next';
import {useAuth} from '../../../context/auth';
import useAsync from '../../../hook/useAsync';
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
import maybeToAsync from 'crocks/Async/maybeToAsync';

import {TaskEditRoute} from '../routes';
import {FilterIcon} from '@heroicons/react/solid';
import {useFilter} from 'hook/useFilter';
import InputGroup from 'components/atom/input/InputGroup';
import SelectBox from 'components/atom/input/SelectBox';


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

  const tableName = 'task';
  const [query, queryParams, filters, columns, defaultFilter, toggleFilter] = useFilter(
    tableName, 
    `
      received
      object_name
      name
      reason
      operator
    `,
    tableColumns,
    [
      {key: 'received', type: 'String', label: 'Date from-to', filter: 'date'},
      {key: 'operator', type: 'String', label: 'Operator', filter: 'multiselect', Component: SelectBox, Child: SelectBox.Option, values: []},
      {key: 'object', type: 'String', label: 'Object', filter: 'multiselect', Component: SelectBox, Child: SelectBox.Option, values: []},
      {key: 'address', type: 'String', label: 'Object\'s address', filter: 'text', Component: InputGroup},
      {key: 'type', type: 'String', label: 'Type', filter: 'multiselect', Component: SelectBox, Child: SelectBox.Option, values: []},
      {key: 'groups', type: 'String', label: 'Groups (?)', filter: 'multiselect', Component: SelectBox, Child: SelectBox.Option, values: []},
      {key: 'status', type: 'String', label: 'Status', filter: 'multiselect', Component: SelectBox, Child: SelectBox.Option, values: ['View Obj', 'Cancelled', 'New', 'Completed']},
      {key: 'reason', type: 'String', label: 'Reason', filter: 'multiselect', Component: SelectBox, Child: SelectBox.Option, values: []},
      {key: 'crew', type: 'String', label: 'Crew', filter: 'multiselect', Component: SelectBox, Child: SelectBox.Option, values: []},
      {key: 'driver', type: 'String', label: 'Driver', filter: 'multiselect', Component: SelectBox, Child: SelectBox.Option, values: []},

      {key: 'guess', type: 'String', label: 'On time (T/F)?', filter: 'multiselect', Component: SelectBox, Child: SelectBox.Option, values: ['True', 'False']},
      // {key: 'contract_object_no', type: 'String', label: 'Object No', filter: 'text', Component: InputGroup},
      
      // {key: 'latitude', type: 'numeric', label: 'Latitude', filter: 'range', Component: InputGroup},
      // {key: 'longitude', type: 'numeric', label: 'Longitude', filter: 'range', Component: InputGroup},

      // {key: 'contract_no', type: 'String', label: 'Contract No', filter: 'text', Component: InputGroup},
      // {key: 'address', type: 'String', label: 'Address', filter: 'text', Component: InputGroup},
    ]
  );

  const [state, fork] = useAsync(chain(maybeToAsync(`"${tableName}" prop is expected in the response`, getProp(tableName)),
    api(queryParams, query)
  ));
  
  useEffect(() => {
    fork()
  }, [queryParams]);


  return {
    list: safe(isArray, state.data).option([]),
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
    filters,
    tableColumns,
    columns
  }
});

export default TaskListLayout;
