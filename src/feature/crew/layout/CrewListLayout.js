import React, {useEffect, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {generatePath, Link, useNavigate} from 'react-router-dom';

import {FilterIcon} from '@heroicons/react/solid';

import {useAuth} from 'context/auth';

import {useFilter} from 'hook/useFilter';

import Listing from 'layout/ListingLayout';

import withPreparedProps from 'hoc/withPreparedProps';

import Button from 'components/Button';
import Innerlinks from 'components/Innerlinks';
import Breadcrumbs from 'components/Breadcrumbs';

import {useCrews} from 'feature/crew/api/crewEditApi';
import {DriverListRoute} from 'feature/driver/routes';
import {DislocationListRoute} from 'feature/dislocation/routes';
import {CrewCreateRoute, CrewEditRoute} from 'feature/crew/routes';
import DynamicStatus from 'feature/crew/component/CrewStatus';

import {Maybe, safe, getProp} from 'crocks';
import {constant} from 'crocks/combinators';
import {alt, chain, map, option} from 'crocks/pointfree';
import {curry, getPropOr, objOf, pipe} from 'crocks/helpers';
import {isArray, isBoolean, isObject, isString} from 'crocks/predicates';
import {useDislocationZonesDropdown} from 'feature/dislocation/api/dislocationEditApi';



const {Just} = Maybe;

const getColumn = curry((t, Component, key, pred, mapper, status, styles) => ({
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
    alt(Just(item))
  )(item),
  styles: pipe(
    safe(isString),
    option(''),
  )(styles)
}));

const CrewListLayout = withPreparedProps(Listing, () => {
  const {api} = useAuth();
  const nav = useNavigate();
  const {t: tb} = useTranslation('crew', {keyPrefix: 'breadcrumbs'});
  const {t: th} = useTranslation('crew', {keyPrefix: 'list.header'});
  const {t: ts} = useTranslation('crew', {keyPrefix: 'list.status'});
  const {t: tc} = useTranslation('crew', {keyPrefix: 'list.column'});

  const c = useMemo(() => getColumn(tc, props => (
    <Link className={props?.className} to={generatePath(CrewEditRoute.props.path, {id: props?.id})}>
      {props?.children}
    </Link>
  )), [tc]);

  const cs = useMemo(() => getColumn(tc, props => (
    <Link to={generatePath(CrewEditRoute.props.path, {id: props?.id})}>
      <DynamicStatus className={'w-20'} status={props?.status}/>
    </Link>
  )), [tc]);

  const nullToStr = e => !e ? '-' : e;
  const boolToStr = e => e ? ts`YES` : ts`NO`;
  const arrToStr = e => !e?.length ? '-' : e?.map(({crew_zone}, ixd) => `${crew_zone?.name}${ixd !== e.length -1 ? ', ' : ''}`);

  const tableColumns = [
    c('id', constant(true), nullToStr, false, 'text-regent'),
    c('name', constant(true), nullToStr, true, 'text-bluewood'),
    c('abbreviation', constant(true), nullToStr, true, 'text-regent'),
    c('calendars', constant(true), arrToStr, true, 'text-steel'),
    cs('status', constant(true), nullToStr, true, null),
    c('is_assigned_automatically', isBoolean, boolToStr, true, 'text-regent')
  ];

  const {data: crewZones} = useDislocationZonesDropdown();

  const filtersData = [
    {
      key: 'name',
      label: tc('name'),
      filter: 'text'
    },
    {
      key: 'abbreviation',
      label: tc('abbreviation'),
      filter: 'text'
    },
    {
      key: 'zone',
      label: tc('calendars'),
      filter: 'autocomplete',
      values: crewZones || []
    },
    {
      key: 'status',
      label: tc('status'),
      filter: 'multiselect',
      values: [{value: 'BREAK', name: 'Break'}, {value: 'BUSY', name: 'Busy'}, {value: 'OFFLINE', name: 'Offline'}, {value: 'READY', name: 'Ready'}, {value: 'DRIVE_BACK', name: 'Returning'}]
    },
    {
      key: 'is_assigned_automatically',
      label: tc('is_assigned_automatically'),
      filter: 'select',
      values: [{value: null, name: 'Any'}, {value: 'YES', name: 'Yes'}, {value: 'NO', name: 'No'}]
    }
  ];

  const [queryParams, filters, columns, defaultFilter, toggleFilter] = useFilter(
    'crew',
    tableColumns,
    filtersData
  );

  const list = useCrews({filters: queryParams});

  useEffect(() => {
    console.log(queryParams);
    list.mutate();
  }, [queryParams]);

  return {
    list: pipe(safe(isObject), chain(getProp('data')), chain(safe(isArray)), option([]))(list),
    rowKeyLens: getPropOr(0, 'id'),
    breadcrumbs: (
      <Breadcrumbs>
        <Breadcrumbs.Item><span className='font-semibold'>{tb('crews')}</span></Breadcrumbs.Item>
        <Breadcrumbs.Item>
          <Button.NoBg onClick={toggleFilter}>
            {defaultFilter.id ? defaultFilter.name : tb('all_data') }
            <FilterIcon className='w-6 h-6 ml-2 inline-block cursor-pointer text-geyser' />
          </Button.NoBg>
        </Breadcrumbs.Item>
      </Breadcrumbs>
    ),
    buttons: (
      <Button.Pxl onClick={() => nav(CrewCreateRoute.props.path)}>{th('create')}</Button.Pxl>
    ),
    innerlinks: (
      <Innerlinks>
        <Innerlinks.Item isCurrent={true} >{th('crews')}</Innerlinks.Item>
        <Innerlinks.Item to={DriverListRoute.props.path}>{th('drivers')}</Innerlinks.Item>
        <Innerlinks.Item to={DislocationListRoute.props.path}>{th('dislocation_zones')}</Innerlinks.Item>
      </Innerlinks>
    ),
    filters,
    tableColumns,
    columns
  }
});

export default CrewListLayout;
