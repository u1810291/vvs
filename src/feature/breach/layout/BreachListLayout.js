import React, {useEffect, useMemo} from 'react';
import {generatePath, Link} from 'react-router-dom';

import Listing from '../../../layout/ListingLayout';
import Breadcrumbs from '../../../components/Breadcrumbs';
import withPreparedProps from '../../../hoc/withPreparedProps';

import {useTranslation} from 'react-i18next';
import {useAuth} from '../../../context/auth';
import useAsync from '../../../hook/useAsync';

import {format, intervalToDuration, formatDuration} from 'date-fns';

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
  safe,
  hasProps
} from 'crocks';
import {pick} from 'crocks/helpers';
import {alt} from 'crocks/pointfree';
import maybeToAsync from 'crocks/Async/maybeToAsync';

import {BreachEditRoute} from '../routes';
import {useFilter} from 'hook/useFilter';

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

const getColumns = curry((t, Component, key, pred, mapper, headerText) => ({
  Component,
  headerText: t(headerText),
  key,
  itemToProps: item => pipe(
    safe(hasProps(key)),
    chain(safe(pred)),
    map(pick(key)),
    map(mapper),
    map(objOf('children')),
    map(a => ({...item, ...a})),
    alt(Maybe.Just(item)),
  )(item)
}));

const ne = not(isEmpty);
const Span = props => <span {...props}/>;

const BreachListLayout = withPreparedProps(Listing, props => {
  const {api} = useAuth();
  const {t: tb} = useTranslation('breach', {keyPrefix: 'breadcrumbs'});
  const {t} = useTranslation('breach', {keyPrefix: 'list.column'});

  const tableName = 'crew_breach';
  const [query, filterValues, filters] = useFilter(
    tableName,
    `
      id
      crew_id
      driver_id
      end_time
      start_time
    `, 
    [
      {key: 'start_time', type: 'timestamptz', label: 'Started At', filter: 'date'},
      {key: 'end_time', type: 'timestamptz', label: 'Ended At', filter: 'date'},
    ]);

  const [state, fork] = useAsync(chain(maybeToAsync(`"${tableName}" prop is expected in the response`, getProp(tableName)),
    api(filterValues, query)
  ));
  
  useEffect(() => {
    fork()
  }, [filterValues]);

  const c = useMemo(() => getColumn(t, props => (
    <Link to={generatePath(BreachEditRoute.props.path, {id: props?.id})}>
      {props?.children}
    </Link>
  )), [t]);

  const cs = useMemo(() => getColumns(t, props => (
    <Link to={generatePath(BreachEditRoute.props.path, {id: props?.id})}>
      {props?.children}
    </Link>
  )), [t]);


  return {
    list: safe(isArray, state.data).option([]),
    rowKeyLens: getPropOr(0, 'id'),
    breadcrumbs: (
      <Breadcrumbs>
        <Breadcrumbs.Item><span className='font-semibold'>{tb`breaches`}</span></Breadcrumbs.Item>
        <Breadcrumbs.Item>{tb`allData`}</Breadcrumbs.Item>
      </Breadcrumbs>
    ),
    filters,
    tableColumns: [
      c('id', ne, identity),
      c('start_time', ne, (date) => format(new Date(date), 'Y-MM-d HH:mm')),
      cs(
        ['start_time', 'end_time'],
        ne,
        ({start_time, end_time}) => formatDuration(intervalToDuration({start: new Date(start_time), end: new Date(end_time)})),
        'time_outside_the_zone'
      ),
      c('crew_id', ne, identity),
      c('driver_id', ne, identity),
    ],
  }
});

export default BreachListLayout;
