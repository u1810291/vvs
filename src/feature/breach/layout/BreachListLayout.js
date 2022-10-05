import Breadcrumbs from 'components/Breadcrumbs';
import Button from 'components/Button';
import DashboardRoute from 'feature/dashboard/routes';
import Innerlinks from 'components/Innerlinks';
import Listing from 'layout/ListingLayout';
import React, {useEffect, useMemo} from 'react';
import useDriversDropdown from 'feature/driver/api/useDriversDropdown';
import withPreparedProps from 'hoc/withPreparedProps';
import {BreachEditRoute} from 'feature/breach/routes';
import {FilterIcon} from '@heroicons/react/solid';
import {Maybe, map, safe, curry, getProp, getPath, option} from 'crocks';
import {PermissionListRoute} from 'feature/permission/routes';
import {TaskListRoute} from 'feature/task/routes';
import {alt, chain} from 'crocks/pointfree';
import {format, intervalToDuration, formatDuration} from 'date-fns';
import {generatePath, Link} from 'react-router-dom';
import {getPropOr, objOf, pipe} from 'crocks/helpers';
import {isEmpty, hasProps, isArray, isString} from 'crocks/predicates';
import {not} from 'crocks/logic';
import {useBreaches} from '../api/breachEditApi';
import {useCrewDropdown} from 'feature/crew/api/crewEditApi';
import {useFilter} from 'hook/useFilter';
import {useTranslation} from 'react-i18next';

const getColumn = curry((t, Component, key, mapper, status, styles) => ({
  Component,
  headerText: t(key),
  key,
  status,
  itemToProps: item => pipe(
    mapper,
    alt(Maybe.Just('-')),
    map(objOf('children')),
    map(a => ({...item, ...a}))
  )(item),
  styles: pipe(
    safe(isString),
    option(''),
  )(styles)
}));

const BreachListLayout = withPreparedProps(Listing, () => {
  const {t: tb} = useTranslation('breach', {keyPrefix: 'breadcrumbs'});
  const {t} = useTranslation('breach', {keyPrefix: 'list.column'});
  const {t: tp} = useTranslation('breach');

  const column = useMemo(() => getColumn(t, props =>
    props?.id &&
      <Link className={props?.className} to={generatePath(BreachEditRoute.props.path, {id: props?.id})}>
        {props?.children}
      </Link>
  ), [t]);
  
  const {data: crewDropdown} = useCrewDropdown();
  const {data: driverDropdown} = useDriversDropdown();

  const tableColumns = [
    column(
      'start_time',
      pipe(
        getProp('start_time'),
        chain(safe(not(isEmpty))),
        map(date => format(new Date(date), 'Y-MM-dd HH:mm'))
      ),
      true, null,
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
      ), true, null
    ),
    column('crew_name', pipe(getPath(['crew', 'name'])), true, 'text-steel'),
    column('driver_user_id', pipe(
      getProp('driver_user_id'),
      chain(safe(not(isEmpty))),
      map(id => driverDropdown?.find(d => d.value === id)?.name)
    ), true, 'text-steel'),
  ]

  const filtersData = [    
    {key: 'start_time', label: 'Started at', filter: 'daterange'},
    {key: 'crew_id', label: 'Crew', filter: 'autocomplete', values: crewDropdown || [], displayValue: (v) => {
      return crewDropdown?.find(c => c.value === v)?.name;
    }},
    {key: 'driver_user_id', label: 'Driver', filter: 'autocomplete', values: driverDropdown || [], displayValue: (v) => {
      return driverDropdown?.find(d => d.value === v)?.name;
    }},
    {key: 'time_outside_zone', label: 'Time outside zone (seconds)', filter: 'range'},
  ];

  const [queryParams, filters, columns, defaultFilter, toggleFilter, setExportData] = useFilter(
    'crew_breach',
    tableColumns,
    filtersData,
  );

  const list = useBreaches({filters: queryParams})

  useEffect(() => {
    setExportData(list.data)
    list.mutate();
  }, [queryParams]);

  return {
    list: safe(isArray, list?.data).option([]),
    rowKeyLens: getPropOr(0, 'id'),
    breadcrumbs: (
      <Breadcrumbs>
        <Breadcrumbs.Item>
          <span className='font-semibold'>
            {tb`breach`}
          </span>
        </Breadcrumbs.Item>
        <Breadcrumbs.Item hideSlash>
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
        <Innerlinks.Item to={TaskListRoute.props.path}>{tp('Tasks')}</Innerlinks.Item>
        <Innerlinks.Item to={PermissionListRoute.props.path}>{tp('Permissions')}</Innerlinks.Item>
        <Innerlinks.Item isCurrent={true}>{tp('Breaches')}</Innerlinks.Item>
      </Innerlinks>
    ),
    filters,
    tableColumns,
    columns
  }
});

export default BreachListLayout;
