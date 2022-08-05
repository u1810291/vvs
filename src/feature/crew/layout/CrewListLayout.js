import React, {useEffect, useMemo} from 'react';
import {generatePath, Link, useNavigate} from 'react-router-dom';

import Listing from '../../../layout/ListingLayout';
import Breadcrumbs from '../../../components/Breadcrumbs';
import withPreparedProps from '../../../hoc/withPreparedProps';

import {useTranslation} from 'react-i18next';
import {useAuth} from '../../../context/auth';
import useAsync from '../../../hook/useAsync';

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
import {useFilter} from 'hook/useFilter';
import {CrewCreateRoute, CrewEditRoute} from '../routes';
import InputGroup from 'components/atom/input/InputGroup';
import SelectBox from 'components/atom/input/SelectBox';
import Button from 'components/Button';
import {FilterIcon} from '@heroicons/react/solid';

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

const CrewListLayout = withPreparedProps(Listing, () => {
  const {api} = useAuth();
  const {t: tb} = useTranslation('crew', {keyPrefix: 'breadcrumbs'});
  const {t: tc} = useTranslation('crew');
  const {t} = useTranslation('crew', {keyPrefix: 'list.column'});
  const nav = useNavigate();

  const c = useMemo(() => getColumn(t, props => (
    <Link to={generatePath(CrewEditRoute.props.path, {id: props?.id})}>
      {props?.children}
    </Link>
  )), [t]);

  const tableColumns = [
    c('id', ne, identity, false),
    c('name', ne, identity, true),
    c('status', ne, identity, true),
    c('driver_name', ne, identity, true),
    c('phone_number', ne, identity, true),
    c('is_assigned_automatically', ne, identity, true)
  ];

  const tableName = 'crew';
  const [query, queryParams, filters, columns, defaultFilter, toggleFilter] = useFilter(
    tableName,
    `
      name
      id
      status
      driver_name
      phone_number
      is_assigned_automatically
    `, 
    tableColumns,
    [
      {key: 'driver_name', type: 'String', label: 'Driver name', filter: 'text', Component: InputGroup},
      {key: 'phone_number', type: 'String', label: 'Phone name', filter: 'text', Component: InputGroup},
      {key: 'status', type: '[crew_status_enum!]', label: 'Status', filter: 'multiselect', Component: SelectBox, Child: SelectBox.Option, values: ['BREAK', 'BUSY', 'OFFLINE', 'READY']},
      // {key: 'is_assigned_automatically', type: '[boolean!]', label: 'Is assigned automatically', filter: 'multiselect', Component: SelectBox, values: [true, false]},
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
        <Breadcrumbs.Item><span className='font-semibold'>{tb`crews`}</span></Breadcrumbs.Item>
        <Breadcrumbs.Item>
          {defaultFilter.id ? defaultFilter.name : tb('allData') } <FilterIcon onClick={toggleFilter} className='w-6 h-6 ml-2 text-gray-300 cursor-pointer inline-block hover:opacity-50' />
        </Breadcrumbs.Item>
      </Breadcrumbs>
    ),
    buttons: (
      <>
        <Button onClick={() => nav(CrewCreateRoute.props.path)}>{tc('create')}</Button>
      </>
    ),
    filters,
    tableColumns,
    columns
  }
});

export default CrewListLayout;
