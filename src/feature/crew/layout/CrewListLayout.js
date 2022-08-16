import React, {useCallback, useEffect, useMemo} from 'react';
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
import {isArray, isBoolean, isObject} from 'crocks/predicates';

const {Just} = Maybe;

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
    alt(Just(item))
  )(item)
}));

const CrewListLayout = withPreparedProps(Listing, () => {
  const {api} = useAuth();
  const nav = useNavigate();
  const {t: tb} = useTranslation('crew', {keyPrefix: 'breadcrumbs'});
  const {t: th} = useTranslation('crew', {keyPrefix: 'list.header'});
  const {t: ts} = useTranslation('crew', {keyPrefix: 'list.status'});
  const {t: tc} = useTranslation('crew', {keyPrefix: 'list.column'});

  const c = useMemo(() => getColumn(tc, props => (
    <Link to={generatePath(CrewEditRoute.props.path, {id: props?.id})}>
      {props?.children}
    </Link>
  )), [tc]);

  const cs = useMemo(() => getColumn(tc, props => (
    <Link to={generatePath(CrewEditRoute.props.path, {id: props?.id})}>
      <DynamicStatus status={props?.status}/>
    </Link>
  )), [tc]);

  const boolToStr = useCallback((e) => e ? ts`YES` : ts`NO`, [tc]);
  const nullToStr = useCallback((e) => !e ? '-' : e, [tc]);

  const tableColumns = [
    c('id', constant(true), nullToStr, false),
    c('name', constant(true), nullToStr, true),
    c('abbreviation', constant(true), nullToStr, true),
    cs('status', constant(true), nullToStr, true),
    c('is_assigned_automatically', isBoolean, boolToStr, true)
  ];

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
      key: 'status',
      label: tc('status'),
      filter: 'multiselect',
      values: ['BREAK', 'BUSY', 'OFFLINE', 'READY']
    },
    {
      key: 'is_assigned_automatically',
      label: tc('is_assigned_automatically'),
      filter: 'multiselect',
      values: ['YES', 'NO']
    }
  ];

  const [queryParams, filters, columns, defaultFilter, toggleFilter] = useFilter(
    'crew',
    tableColumns,
    filtersData
  );

  const list = useCrews({filters: queryParams});

  useEffect(() => {
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
