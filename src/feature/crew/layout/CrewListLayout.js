import React, {useEffect, useMemo} from 'react';
import {generatePath, Link, useNavigate} from 'react-router-dom';

import Listing from '../../../layout/ListingLayout';
import Breadcrumbs from '../../../components/Breadcrumbs';
import withPreparedProps from '../../../hoc/withPreparedProps';

import {useTranslation} from 'react-i18next';
import {useAuth} from '../../../context/auth';

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
import {useFilter} from 'hook/useFilter';
import {CrewCreateRoute, CrewEditRoute} from '../routes';
import Button from 'components/Button';
import {FilterIcon} from '@heroicons/react/solid';
import Innerlinks from 'components/Innerlinks';
import {DriverListRoute} from 'feature/driver/routes';
import {DislocationListRoute} from 'feature/dislocation/routes';
import {useCrews} from '../api/crewEditApi';

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
  const {t: th} = useTranslation('crew', {keyPrefix: 'list.header'});
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

  const filtersData = [
    {key: 'driver_name', label: 'Driver name', filter: 'text'},
    {key: 'phone_number', label: 'Phone name', filter: 'text'},
    {key: 'status', label: 'Status', filter: 'multiselect', values: ['BREAK', 'BUSY', 'OFFLINE', 'READY']},
  ]

  const [queryParams, filters, columns, defaultFilter, toggleFilter] = useFilter(
    'crew',
    tableColumns,
    filtersData
  );

  const list = useCrews({filters: queryParams})

  useEffect(() => {
    list.mutate();
  }, [queryParams]);

  return {
    list: safe(isArray, list?.data).option([]),
    rowKeyLens: getPropOr(0, 'id'),
    breadcrumbs: (
      <Breadcrumbs>
        <Breadcrumbs.Item><span className='font-semibold'>{tb`crews`}</span></Breadcrumbs.Item>
        <Breadcrumbs.Item>
          <Button.NoBg onClick={toggleFilter}>
            {defaultFilter.id ? defaultFilter.name : tb('all_data') }
            <FilterIcon className='w-6 h-6 ml-2 text-gray-300 cursor-pointer inline-block focus:ring-0' />
          </Button.NoBg>
        </Breadcrumbs.Item>
      </Breadcrumbs>
    ),
    buttons: (
      <>
        <Button.Pxl onClick={() => nav(CrewCreateRoute.props.path)}>{th('button.create')}</Button.Pxl>
      </>
    ),
    innerlinks: (
      <Innerlinks>
        <Innerlinks.Item isCurrent={true} >{th('links.crews')}</Innerlinks.Item>
        <Innerlinks.Item to={DriverListRoute.props.path}>{th('links.drivers')}</Innerlinks.Item>
        <Innerlinks.Item to={DislocationListRoute.props.path}>{th('links.dislocation_zones')}</Innerlinks.Item>
      </Innerlinks>
    ),
    filters,
    tableColumns,
    columns
  }
});

export default CrewListLayout;
