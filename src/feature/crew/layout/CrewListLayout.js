import React, {useEffect, useMemo} from 'react';
import {generatePath, Link} from 'react-router-dom';

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
import {CrewEditRoute} from '../routes';
import InputGroup from 'components/atom/input/InputGroup';
import SelectBox from 'components/atom/input/SelectBox';

const getColumn = curry((t, Component, key, pred, mapper) => ({
  Component,
  headerText: t(key),
  key,
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

const CrewListLayout = withPreparedProps(Listing, props => {
  const {api} = useAuth();
  const {t: tb} = useTranslation('crew', {keyPrefix: 'breadcrumbs'});
  const {t} = useTranslation('crew', {keyPrefix: 'list.column'});

  const tableName = 'crew';
  const [query, filterValues, filters] = useFilter(
    tableName,
    `
      id
      status
      driver_name
      phone_number
      is_assigned_automatically
    `, 
    [
      {key: 'driver_name', type: 'String', label: 'Driver name', filter: 'text', Component: InputGroup},
      {key: 'phone_number', type: 'String', label: 'Phone name', filter: 'text', Component: InputGroup},
      {key: 'status', type: '[crew_status_enum!]', label: 'Status', filter: 'multiselect', Component: SelectBox, Child: SelectBox.Option, values: ['BREAK', 'BUSY', 'OFFLINE', 'READY']},
      // {key: 'is_assigned_automatically', type: '[boolean!]', label: 'Is assigned automatically', filter: 'multiselect', Component: SelectBox, values: [true, false]},
    ]
  );

  const [state, fork] = useAsync(chain(maybeToAsync(`"${tableName}" prop is expected in the response`, getProp(tableName)),
    api(filterValues, query)
  ));
  
  useEffect(() => {
    fork()
  }, [filterValues]);

  const c = useMemo(() => getColumn(t, props => (
    <Link to={generatePath(CrewEditRoute.props.path, {id: props?.id})}>
      {props?.children}
    </Link>
  )), [t]);

  useEffect(() => fork(), []);

  return {
    list: safe(isArray, state.data).option([]),
    rowKeyLens: getPropOr(0, 'id'),
    breadcrumbs: (
      <Breadcrumbs>
        <Breadcrumbs.Item><span className='font-semibold'>{tb`crews`}</span></Breadcrumbs.Item>
        <Breadcrumbs.Item>{tb`all_data`}</Breadcrumbs.Item>
      </Breadcrumbs>
    ),
    filters: filters,
    tableColumns: [
      c('id', ne, identity),
      c('name', ne, identity),
      c('status', ne, identity),
      c('driver_name', ne, identity),
      c('phone_number', ne, identity),
      c('is_assigned_automatically', ne, identity)
    ],
  }
});

export default CrewListLayout;
