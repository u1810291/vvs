import React, {useEffect, useMemo} from 'react';
import {generatePath, Link} from 'react-router-dom';

import Listing from 'layout/ListingLayout';

import Breadcrumbs from 'components/Breadcrumbs';

import withPreparedProps from 'hoc/withPreparedProps';

import {BreachEditRoute} from 'feature/breach/routes';

import useAsync from 'hook/useAsync';

import {useAuth} from 'context/auth';

import {not} from 'crocks/logic';
import {alt, chain} from 'crocks/pointfree';
import {getPropOr, objOf, pipe} from 'crocks/helpers';
import {isEmpty, hasProps, isArray} from 'crocks/predicates';
import {Maybe, map, safe, curry, getProp, getPath} from 'crocks';

import maybeToAsync from 'crocks/Async/maybeToAsync';

import {useTranslation} from 'react-i18next';
import {format, intervalToDuration, formatDuration} from 'date-fns';
import {useFilter} from 'hook/useFilter';

const getColumn = curry((t, Component, key, mapper) => ({
  Component,
  headerText: t(key),
  key,
  itemToProps: item => pipe(
    mapper,
    alt(Maybe.Just('-')),
    map(objOf('children')),
    map(a => ({...item, ...a}))
  )(item)
}));

const BreachListLayout = withPreparedProps(Listing, props => {
  const {api} = useAuth();
  const {t: tb} = useTranslation('breach', {keyPrefix: 'breadcrumbs'});
  const {t} = useTranslation('breach', {keyPrefix: 'list.column'});

  const tableName = 'crew_breach';
  const [query, filterValues, filters] = useFilter(
    tableName,
    `
      id
      end_time
      start_time
      crew {
        name
        driver_name
      }
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

  const column = useMemo(() => getColumn(t, props =>
    props?.id &&
      <Link to={generatePath(BreachEditRoute.props.path, {id: props?.id})}>
        {props?.children}
      </Link>
  ), [t]);


  return {
    list: safe(isArray, state.data).option([]),
    rowKeyLens: getPropOr(0, 'id'),
    breadcrumbs: (
      <Breadcrumbs>
        <Breadcrumbs.Item>
          <span className='font-semibold'>
            {tb`breach`}
          </span>
        </Breadcrumbs.Item>
        <Breadcrumbs.Item>
          {tb`allData`}
        </Breadcrumbs.Item>
      </Breadcrumbs>
    ),
    filters,
    tableColumns: [
      column('id', pipe(getProp('id'))),
      column(
        'start_time',
        pipe(
          getProp('start_time'),
          chain(safe(not(isEmpty))),
          map(date => format(new Date(date), 'Y-MM-d HH:mm'))
        )
      ),
      column(
        'time_outside_the_zone',
        pipe(
          safe(hasProps(['start_time', 'end_time'])),
          map(({start_time, end_time}) =>
            formatDuration(
              intervalToDuration({
                start: new Date(start_time),
                end: new Date(end_time)
              })
            )
          )
        )
      ),
      column('crew_name', pipe(getPath(['crew', 'name']))),
      column('driver_name', pipe(getPath(['crew', 'driver_name']))),
    ]
  }
});

export default BreachListLayout;
