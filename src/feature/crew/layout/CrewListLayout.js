import Breadcrumbs from 'components/Breadcrumbs';
import Button from 'components/Button';
import DynamicStatus from 'components/atom/Status';
import Innerlinks from 'components/Innerlinks';
import Listing from 'layout/ListingLayout';
import React, {useEffect, useMemo} from 'react';
import withPreparedProps from 'hoc/withPreparedProps';
import {CrewCreateRoute, CrewEditRoute} from 'feature/crew/routes';
import {DislocationListRoute} from 'feature/dislocation/routes';
import {DriverListRoute} from 'feature/driver/routes';
import {FilterIcon} from '@heroicons/react/solid';
import {Maybe, safe, getProp} from 'crocks';
import {alt, chain, map, option} from 'crocks/pointfree';
import {constant} from 'crocks/combinators';
import {curry, getPropOr, objOf, pipe} from 'crocks/helpers';
import {generatePath, Link, useNavigate} from 'react-router-dom';
import {isBoolean, isString} from 'crocks/predicates';
import {useCrews} from 'feature/crew/api/crewEditApi';
import {useDislocationZonesDropdown} from 'feature/dislocation/api/dislocationEditApi';
import {useFilter} from 'hook/useFilter';
import {useTranslation} from 'react-i18next';

const {Just} = Maybe;

const getColumn = curry((t, Component, key, pred, mapper, status, styles, isSortable) => ({
  Component,
  headerText: t(key),
  key,
  status,
  isSortable,
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
      <DynamicStatus t={'crew'} className={'w-20'} status={props?.status}/>
    </Link>
  )), [tc]);

  const nullToStr = e => !e ? '-' : e;
  const boolToStr = e => e ? ts`YES` : ts`NO`;
  const arrToStr = e => !e?.length ? '-' : e?.map(({crew_zone}, ixd) => `${crew_zone?.name}${ixd !== e.length -1 ? ', ' : ''}`);

  const {data: crewZones} = useDislocationZonesDropdown();

  const tableColumns = [
    c('id', constant(true), nullToStr, false, 'text-regent', true),
    c('name', constant(true), nullToStr, true, 'text-bluewood', true),
    c('abbreviation', constant(true), nullToStr, true, 'text-regent', true),
    c('calendars', constant(true), arrToStr, true, 'text-steel', false),
    cs('status', constant(true), nullToStr, true, null, true),
    c('is_assigned_automatically', isBoolean, boolToStr, true, 'text-regent', true),
    c('device_id', constant(true), nullToStr, false, 'text-regent', true),
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
      key: 'device_id',
      label: tc('device_id'),
      filter: 'text'
    },
    {
      key: 'calendars.crew_zone.id',
      label: tc('calendars'),
      filter: 'autocomplete',
      values: crewZones || [],
      displayValue: (v) => crewZones?.find(c => c.value === v)?.name,
    },
    {
      key: 'status',
      label: tc('status'),
      filter: 'multiselect',
      values: ['BREAK', 'BUSY', 'READY', 'DRIVE_BACK', 'LOGGED_OUT'], // TODO: from database ?
      displayValue: (v) => v,
    },
    {
      key: 'is_assigned_automatically',
      label: tc('is_assigned_automatically'),
      filter: 'select',
      values: ['ANY', 'YES', 'NO']
    }
  ];

  const [queryParams, filters, columns, defaultFilter, toggleFilter, setExportData, sortColumnKey, setSortColumn] = useFilter(
    'crew',
    tableColumns,
    filtersData,
  );

  const api = useCrews({filters: queryParams});
  
  useEffect(() => {
    setExportData(api.data);
    api.mutate();
  }, [queryParams, sortColumnKey]);

  return {
    api,
    list: api?.data?.flat() ?? [],
    rowKeyLens: getPropOr(0, 'id'),
    breadcrumbs: (
      <Breadcrumbs>
        <Breadcrumbs.Item><span className='font-semibold'>{tb('crews')}</span></Breadcrumbs.Item>
        <Breadcrumbs.Item hideSlash>
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
    columns,
    sortColumnKey, 
    setSortColumn
  }
});

export default CrewListLayout;
