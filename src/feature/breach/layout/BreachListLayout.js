import React, {useEffect, useMemo} from 'react';
import {generatePath, Link} from 'react-router-dom';
import Listing from 'layout/ListingLayout';
import Breadcrumbs from 'components/Breadcrumbs';
import withPreparedProps from 'hoc/withPreparedProps';
import {BreachEditRoute} from 'feature/breach/routes';
import {useAuth} from 'context/auth';
import {not} from 'crocks/logic';
import {alt, chain} from 'crocks/pointfree';
import {getPropOr, objOf, pipe} from 'crocks/helpers';
import {isEmpty, hasProps, isArray, isString} from 'crocks/predicates';
import {Maybe, map, safe, curry, getProp, getPath, option} from 'crocks';
import {useTranslation} from 'react-i18next';
import {format, intervalToDuration, formatDuration} from 'date-fns';
import {useFilter} from 'hook/useFilter';
import {FilterIcon} from '@heroicons/react/solid';
import Button from 'components/Button';
import {TaskListRoute} from 'feature/task/routes';
import Innerlinks from 'components/Innerlinks';
import {PermissionListRoute} from 'feature/permission/routes';
import DashboardRoute from 'feature/dashboard/routes';
import {useBreaches} from '../api/breachEditApi';
import {useCrewDropdown} from 'feature/crew/api/crewEditApi';



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

const BreachListLayout = withPreparedProps(Listing, props => {
  const {api} = useAuth();
  const {t: tb} = useTranslation('breach', {keyPrefix: 'breadcrumbs'});
  const {t} = useTranslation('breach', {keyPrefix: 'list.column'});
  const {t: tp} = useTranslation('breach');

  const column = useMemo(() => getColumn(t, props =>
    props?.id &&
      <Link className={props?.className} to={generatePath(BreachEditRoute.props.path, {id: props?.id})}>
        {props?.children}
      </Link>
  ), [t]);


  const tableColumns = [
    // column('id', pipe(getProp('id')), true, null,),
    column(
      'start_time',
      pipe(
        getProp('start_time'),
        chain(safe(not(isEmpty))),
        map(date => format(new Date(date), 'Y-MM-d HH:mm'))
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
    // column('crew_id', pipe(getProp('crew_id')), true, 'text-steel'),
    column('crew_name', pipe(getPath(['crew', 'name'])), true, 'text-steel'),
    // column('driver_name', pipe(getPath(['crew', 'driver_name'])), true, 'text-steel'),
  ]

  const {data: crewDropdown} = useCrewDropdown();
  // console.log(crewDropdown);

  const filtersData = [
    // {key: 'start_time', label: 'Started At', filter: 'date'},
    // {key: 'end_time', label: 'Ended At', filter: 'date'},
    {key: 'crew_id', label: 'Crew', filter: 'autocomplete', values: crewDropdown || []},
    // [
    //   {value: '741a3a7d-38ef-4e75-821e-b096771ed8bb', name: '9RG1'}, 
    //   {value: 'db4b46af-a700-46a1-a638-34d8efbfcedc', name: '8GB'}
    // ]},
    {key: 'driver_id', label: 'Driver', filter: 'multiselect', values: [{value: 1, name: 'driver 1'}, {value: 2, name: 'driver 2'}]},
    {key: 'time_outside_the_zone', label: 'Time outside zone', filter: 'range'},
  ];

  const [queryParams, filters, columns, defaultFilter, toggleFilter] = useFilter(
    'crew_breach',
    tableColumns,
    filtersData
  );

  const list = useBreaches({filters: queryParams})

  useEffect(() => {
    console.log(queryParams);
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
