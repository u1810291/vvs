import Breadcrumbs from 'components/Breadcrumbs';
import {AuthContextProvider, useAuth} from '../context/auth';
import {FilterIcon} from '@heroicons/react/solid';
import Button from 'components/Button';
import React, {useMemo, useEffect} from 'react';
import useRequests from '../api/useRequests';
import withPreparedProps from 'hoc/withPreparedProps';
import {DislocationZoneActivityForecastEditRoute as RequestEditRoute, DislocationZoneActivityForecastNewRoute as RequestNewRoute} from '../routes';
import {format} from 'date-fns';
import {generatePath, Link, useNavigate} from 'react-router-dom';
import {joinString} from '@s-e/frontend/transformer/array';
import {predictionOutputToSingleDigit} from '../utils';
import {useFilter} from '../hook/useFilter';
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
  reduce,
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
  flip,
  identity,
} from 'crocks';
import {getValue, getName} from '../component/Locations';
import Listing from 'layout/ListingLayout';
import useUsers from 'feature/user/api/useUsers';
import raw from 'raw.macro';
import {GRAPHQL_MAX_INT} from 'graphql';

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

const answerToOutput = pipe(
  getProp('answer'),
  chain(safe(isTruthy)),
  map(map(getPathOr(0, ['prediction', 'output']))),
  map(predictionOutputToSingleDigit),
  option('-'),
);

const RequestListLayout = withPreparedProps(Listing, () => {
  const {t} = useTranslation('request');
  const navigate = useNavigate();
  const onCreateClick = useMemo(() => () => navigate(RequestNewRoute.props.path), [navigate]);

  const tableColumns = [
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
      status: true,
      isSortable: true,
    },
    {
      key: 'id',
      headerText: t`field.id`,
      itemToProps: Maybe.Just,
      Component: props => (
        <Link to={generatePath(RequestEditRoute.props.path, {id: props?.id})}>
          {props?.id}
        </Link>
      ),
      status: true,
      isSortable: true,
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
      status: true,
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
      status: true,
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
      status: true,
    },
    {
      key: 'answer',
      headerText: t`field.answer`,
      itemToProps: Maybe.Just,
      Component: props => {
        return (
          <Link className='truncate inline-block max-w-xs' to={generatePath(RequestEditRoute.props.path, {id: props?.id})}>
            {answerToOutput(props)}
          </Link>
        )
      },
      status: true,
    },
  ];

  const requestsUnfiltered = useRequests({});
  const users = useUsers({});

  const auth = useAuth();
  const _byLat = flip(auth.api)(raw('../api/graphql/GetByLatitude.graphql'));
  const _byLng = flip(auth.api)(raw('../api/graphql/GetByLongitude.graphql'));

  // const updateFilterQuery = (key, params) => {
  //   console.log(params);
  //   const newQueryParams = {...queryParams};
  //   newQueryParams?.where?._and = {
  //     [key]: {...newParams?.where?._and?.[key], ...params}
  //   } 
  //   queryParams = newQU
  // }

  const requestsFilterList = pipe(
    safe(isArray),
    map(map(a => ({value: a?.id, name: a?.id}))),
    option([]),
  )((requestsUnfiltered?.data || []));

  const userCompanyFilterList = pipe(
    safe(isArray),
    map(reduce((carry, item) => (
      getPath(['company'], item)
      .chain(safe(isTruthy))
      .map(company => [...new Set([...carry, company])])
      .option(carry)
    ), [])),
    map(map(a => ({value: a, name: a}))),
    option([]),
  )((users?.data || []));

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
      filter: 'daterange',
    },
    {
      key: 'userCompany',
      label: t`field.userCompany`,
      filter: 'autocomplete',
      values: userCompanyFilterList,
      displayValue: pipe(
        v => find(propEq('value', v), userCompanyFilterList),
        chain(getProp('name')),
        option('?'),
      )
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
      filter: 'date_from',
      custom: (v, filters) => {
        if (filters?.date_from && filters?.date_to) {
          return {date_from: {_gte: filters?.date_from}, date_to: {_lte: filters?.date_to}}; 
        } else {
          return {_or: [{date_from: {_gte: filters?.date_from}}, {date_to: {_gte: filters?.date_from}}]};
        }
      }
    },
    {
      key: 'date_to',
      label: t`field.date_to`,
      filter: 'date_to',
      custom: (v, filters) => {
        if (filters?.date_from && filters?.date_to) {
          return {date_from: {_gte: filters?.date_from}, date_to: {_lte: filters?.date_to}}; 
        } else {
          return {_or: [{date_from: {_lte: filters?.date_to}}, {date_to: {_lte: filters?.date_to}}]};
        }
      }
    },
    {
      key: 'latitude',
      label: t`field.latitude`,
      filter: 'range',
      custom: (v, filters) => {
        _byLat({from: filters?.latitude_start, to: filters?.latitude_end ?? GRAPHQL_MAX_INT}).fork(console.log, (res) => {
          const ids = res?.request_by_lat?.map(r => r.id);
          const uniqueIds = [...new Set(ids)];

          // const prevIds = queryParams?.where?._and?.id?._in;
          // queryParams['where']['_and']['id']['_in'] = prevIds != undefined ? {...prevIds, ...uniqueIds} : uniqueIds;
          // requests.mutate();
          // console.log(queryParams);
        });
      }
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

  // export data
  useEffect(() => {
    const res = [];

    for (let j = 0; j < requests?.data?.length; j++) {
      const item = requests?.data[j];

      for (let i = 0; i < item?.answer?.length; i++) {
        res.push({
          'id': getPropOr('-', 'id', item),
          'location': `${item.answer[i].request?.city} ${item.answer[i].request?.suburb}`,
          'company': getPathOr('-', ['user', 'company'], item),
          'date': item.answer[i].request?.date,
          'answer': item.answer[i].prediction?.output[0]
        })
      }
    }

    setExportData(res);
  }, [requests?.data]);

  /**
   * Workaround: useFilter is depending on manual work
   *
   * When auth recreated,
   * mutate can refetch data with correct auth headers.
   */
  useEffect(() => {
    identity(auth);
    requests.mutate();
  }, [queryParams, sortColumnKey, auth]);

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
