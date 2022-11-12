import Breadcrumbs from 'components/Breadcrumbs';
import {FilterIcon} from '@heroicons/react/solid';
import Button from 'components/Button';
import React, {useMemo, useEffect} from 'react';
import useRequests from '../api/useRequests';
import {DislocationZoneActivityForecastEditRoute as RequestEditRoute, DislocationZoneActivityForecastNewRoute as RequestNewRoute} from '../routes';
import {format} from 'date-fns';
import {generatePath, Link, useNavigate} from 'react-router-dom';
import {joinString} from '@s-e/frontend/transformer/array';
import {predictionOutputToSingleDigit} from '../utils';
import {useFilter} from 'hook/useFilter';
import {useTranslation} from 'react-i18next';
import locationsData from '../data/locations.json';
import {
  Maybe,
  and,
  branch,
  chain,
  find,
  getPath,
  getPathOr,
  getProp,
  getPropOr,
  hasProps,
  isArray,
  isEmpty,
  map,
  merge,
  not,
  option,
  pipe,
  propEq,
  safe,
  setPath,
  isTruthy,
  unsetPath,
  pathSatisfies,
} from 'crocks';
import {getValue, getName} from '../component/Locations';
import withPreparedProps from 'hoc/withPreparedProps';
import Listing from 'layout/ListingLayout';
import {AuthContextProvider} from '../context/auth';

const locationsFilterList = pipe(
  safe(isArray),
  map(map(a => ({value: getValue(a), name: getName(a)}))),
  option([]),
)(locationsData);

const fixLocationsQuery = pipe(
  getPath(['where', '_and', 'locations', '_in']),
  chain(safe(and(isArray, not(isEmpty)))),
  map(map(pipe(
    a => a.split(';'),
    ([city, suburb, latitude, longitude]) => ({
      city,
      suburb,
      latitude: Number(latitude),
      longitude: Number(longitude),
    }),
    a => `((%${a.city}%${a.suburb}%)|(%${a.suburb}%${a.city}%))`,
  ))),
  map(pipe(
    joinString('|'),
    _similar => ({_cast: {String: {_similar}}})
  )),
);

const fixUserCompanQuery  = input => pipe(
  safe(pathSatisfies(['where', '_and', 'userCompany'], isTruthy)),
  map(vars => setPath(['where', '_and', 'user', 'company'], vars?.where?._and?.userCompany, vars)),
  map(unsetPath(['where', '_and', 'userCompany'])),
  option(input)
)(input);

const transformQueryFilters = pipe(
  branch,
  map(fixLocationsQuery),
  merge((entire, whereAndLocations) => (
    whereAndLocations
    .map(locations => setPath(['where', '_and', 'locations'], locations, entire))
    .option(entire)
  )),
  fixUserCompanQuery,
);

const RequestListLayout = withPreparedProps(Listing, () => {
  const {t} = useTranslation('request');
  const navigate = useNavigate();
  const onCreateClick = useMemo(() => () => navigate(RequestNewRoute.props.path), [navigate]);

  const tableColumns = [
    {
      key: 'id',
      headerText: t`field.id`,
      itemToProps: Maybe.Just,
      Component: props => (
        <Link to={generatePath(RequestEditRoute.props.path, {id: props?.id})}>
          {props?.id}
        </Link>
      ),
    },
    {
      key: 'created_at',
      headerText: t`field.created_at`,
      itemToProps: Maybe.Just,
      Component: props => (
        <Link to={generatePath(RequestEditRoute.props.path, {id: props?.id})}>
          {pipe(
            getProp('created_at'),
            map(pipe(
              jsonDate => new Date(jsonDate),
              date => format(date, 'yyyy-MM-dd')
            )),
            option('-')
          )(props)}
        </Link>
      ),
    },
    {
      key: 'userCompany',
      headerText: t`field.userCompany`,
      itemToProps: Maybe.Just,
      Component: props => (
        <Link to={generatePath(RequestEditRoute.props.path, {id: props?.id})}>
          {getPathOr('-', ['user', 'company'], props)}
        </Link>
      ),
    },
    {
      key: 'locations',
      headerText: t`field.locations`,
      itemToProps: Maybe.Just,
      Component: props => {
        const value = pipe(
          getProp('locations'),
          map(map(l => `${l.city} ${l.suburb}`)),
          map(joinString(', ')),
          option('-'),
        )(props);

        return (
          <Link title={value} className='truncate inline-block max-w-xs' to={generatePath(RequestEditRoute.props.path, {id: props?.id})}>
            {value}
          </Link>
        )
      },
    },
    {
      key: 'dateRange',
      headerText: t`field.dateRange`,
      itemToProps: Maybe.Just,
      Component: props => {
        const value = pipe(
          safe(hasProps(['date_from', 'date_to'])),
          map(a => `${a.date_from} - ${a.date_to}`),
          option('-'),
        )(props);

        return (
          <Link title={value} className='truncate inline-block max-w-xs' to={generatePath(RequestEditRoute.props.path, {id: props?.id})}>
            {value}
          </Link>
        )
      },
    },
    {
      key: 'answer',
      headerText: t`field.answer`,
      itemToProps: Maybe.Just,
      Component: props => {
        return (
          <Link className='truncate inline-block max-w-xs' to={generatePath(RequestEditRoute.props.path, {id: props?.id})}>
            {pipe(
              getProp('answer'),
              chain(safe(isTruthy)),
              map(map(getPathOr(0, ['prediction', 'output']))),
              map(predictionOutputToSingleDigit),
              option('-'),
            )(props)}
          </Link>
        )
      },
    },
  ];

  const requestsUnfiltered = useRequests({});

  const requestsFilterList = pipe(
    safe(isArray),
    map(map(a => ({value: a?.id, name: a?.id}))),
    option([]),
  )((requestsUnfiltered?.data || []));

  const filtersData = [
    {
      key: 'id',
      label: t`field.id`,
      filter: 'autocomplete',
      values: requestsFilterList,
      displayValue: pipe(
        v => find(propEq('value', v), requestsFilterList),
        chain(getProp('name')),
        option('?'),
      )
    },
    {
      key: 'created_at',
      label: t`field.created_at`,
      filter: 'date',
    },
    {
      key: 'locations',
      label: t`field.locations`,
      filter: 'autocomplete',
      values: locationsFilterList,
      displayValue: pipe(
        v => find(propEq('value', v), locationsFilterList),
        chain(getProp('name')),
        option('?'),
      )
    },
    {
      key: 'date_from',
      label: t`field.date_from`,
      filter: 'date',
    },
    {
      key: 'date_to',
      label: t`field.date_to`,
      filter: 'date',
    },
  ];

  const [
  queryParams,
  filters,
  columns,
  defaultFilter,
  toggleFilter,
  setExportData,
  sortColumnKey,
  setSortColumn
  ] = useFilter('request', tableColumns, filtersData);

  const requests = useRequests({filters: transformQueryFilters(queryParams)});

  useEffect(() => {
    requests.mutate();
  }, [queryParams, sortColumnKey]);

  return {
    list: safe(isArray, requests.data).option([]),
    rowKeyLens: getPropOr(0, 'id'),
    breadcrumbs: (
      <Breadcrumbs>
        <Breadcrumbs.Item><span className='font-semibold'>{t`breadcrumbs.requests`}</span></Breadcrumbs.Item>
        <Breadcrumbs.Item hideSlash>
          <Button.NoBg onClick={toggleFilter}>
            {defaultFilter.id ? defaultFilter.name : t`breadcrumbs.allData` }
            <FilterIcon className='w-6 h-6 ml-2 text-geyser cursor-pointer inline-block focus:ring-0' />
          </Button.NoBg>
        </Breadcrumbs.Item>
      </Breadcrumbs>
    ),
    buttons: <Button onClick={onCreateClick}>{t`listing.button.new`}</Button>,
    tableColumns,
    filters,
    columns,
    sortColumnKey, 
    setSortColumn,
  }
});

const AuthorizedRequestListLayout = () => (
  <AuthContextProvider>
    <RequestListLayout />
  </AuthContextProvider>
);

export default AuthorizedRequestListLayout;
