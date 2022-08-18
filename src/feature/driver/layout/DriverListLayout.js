import Breadcrumbs, {RouteAsBreadcrumb} from '../../../components/Breadcrumbs';
import ListingLayout from '../../../layout/ListingLayout';
import React, {useMemo} from 'react';
import withPreparedProps from '../../../hoc/withPreparedProps';
import DriverRoute, {DriverCreateRoute, DriverEditRoute} from '../routes';
import {useTranslation} from 'react-i18next';
import {getPropOr, identity, pipe, safe, and, hasProp, map, isTruthy, propSatisfies, pick} from 'crocks';
import useDrivers from '../api/useDrivers';
import {alt} from 'crocks/pointfree';
import {generatePath, Link, useNavigate} from 'react-router-dom';
import Button from 'components/Button';
import {useFilter} from 'hook/useFilter';
import {FilterIcon} from '@heroicons/react/solid';

const DriverListLayout = withPreparedProps(ListingLayout, () => {
  const {t} = useTranslation('driver', {keyPrefix: 'list'});
  const {t: tb} = useTranslation('driver', {keyPrefix: 'breadcrumbs'});
  const nav = useNavigate();

  const c = useMemo(() => (prop, mapper = identity, status) => ({
    key: prop,
    headerText: t(prop),
    status,
    itemToProps: item => pipe(
      safe(and(hasProp('id'), propSatisfies(prop, isTruthy))),
      map(item => ({id: item?.id, children: mapper(item?.[prop])})),
      alt(pipe(
        safe(hasProp('id')),
        map(pick(['id'])),
      )(item)),
    )(item),
    Component: ({id, children, fallback = '—'}) => {
      if (!id && !children) return fallback;
      if (!id) return children || fallback;
      return (
        <Link to={generatePath(DriverEditRoute.props.path, {id})}>
          {children || fallback}
        </Link>
      )
    },
  }), [t]);

  const boolCol = useMemo(() => pipe(String, t), [t]);

  const tableColumns = [
    c('id', identity, false),
    c('firstName', identity, true),
    c('lastName', identity, true),
    c('username', identity, false),
    c('verified', boolCol, false),
    c('mobilePhone', identity, false),
    c('middleName', identity, false),
    c('email', identity, false),
    c('birthDate', identity, false),
    c('is_online', boolCol, true),
  ];

  const filtersData = [
    {key: 'firstName', label: 'firstName', filter: 'text'},
    {key: 'lastName', label: 'lastName', filter: 'text'},
    {key: 'is_online', label: 'Status', filter: 'select', values: ['deactivated', 'offline', 'online']},
  ];
  
  const [queryParams, filters, columns, defaultFilter, toggleFilter] = useFilter(
    'driver',
    tableColumns,
    filtersData
  );

  const api = useDrivers({filters: queryParams});

  return {
    list: api?.data || [],
    rowKeyLens: getPropOr(0, 'id'),
    buttons: <Button onClick={() => nav(DriverCreateRoute.props.path)}>{t`create`}</Button>,
    breadcrumbs: (
      <Breadcrumbs>
        <RouteAsBreadcrumb route={DriverRoute}/>
        <Breadcrumbs.Item><span className='font-semibold'>{tb`drivers`}</span></Breadcrumbs.Item>
        <Breadcrumbs.Item>
          <Button.NoBg onClick={toggleFilter}>
            {defaultFilter.id ? defaultFilter.name : tb('allData') } 
            <FilterIcon className='w-6 h-6 ml-2 text-gray-300 cursor-pointer inline-block focus:ring-0' />
          </Button.NoBg>
        </Breadcrumbs.Item>
      </Breadcrumbs>
    ),
    filters,
    columns,

    /**
     * @type {Array<import('../../../layout/ListingLayout/index.js').TableColumnComponent>}
     */
    tableColumns,
  }
});

export default DriverListLayout;
