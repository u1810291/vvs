import React, {useCallback, useMemo} from 'react';
import {generatePath, Link, useNavigate} from 'react-router-dom';

import Button from 'components/Button';
import Listing from 'layout/ListingLayout';
import Breadcrumbs from 'components/Breadcrumbs';
import withPreparedProps from 'hoc/withPreparedProps';

import {useTranslation} from 'react-i18next';

import {
  chain,
  curry,
  getProp,
  getPropOr,
  identity,
  isEmpty,
  map,
  Maybe,
  not,
  objOf,
  pipe,
  safe
} from 'crocks';
import {alt} from 'crocks/pointfree';

import {PermissionEditRoute, PermissionCreateRoute, PermissionRequestListRoute} from '../routes';
import {usePermissions} from '../api';
import {titleCase} from '@s-e/frontend/transformer/string';
import DashboardRoute from 'feature/dashboard/routes';
import {TaskListRoute} from 'feature/task/routes';
import Innerlinks from 'components/Innerlinks';
import {BreachListRoute} from 'feature/breach/routes';




const getColumn = curry((t, Component, key, pred, mapper) => ({
  Component,
  headerText: t(key),
  key,
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

const PermissionListLayout = withPreparedProps(Listing, () => {
  const {t: tb} = useTranslation('permission', {keyPrefix: 'breadcrumbs'});
  const {t: tp} = useTranslation('permission');
  const {t: ts} = useTranslation('permission', {keyPrefix: 'status'});
  const {t} = useTranslation('permission', {keyPrefix: 'list.column'});
  const nav = useNavigate();


  const c = useMemo(() => getColumn(t, props => (
    <Link to={generatePath(PermissionEditRoute.props.path, {id: props?.id})}>
      {props?.children}
    </Link>
  )), [t]);

  return {
    list: usePermissions()?.data || [],
    rowKeyLens: getPropOr(0, 'id'),
    breadcrumbs: (
      <Breadcrumbs>
        <Breadcrumbs.Item><span className='font-semibold'>{tb`permissions`}</span></Breadcrumbs.Item>
        <Breadcrumbs.Item>{tb`allData`}</Breadcrumbs.Item>
      </Breadcrumbs>
    ),
    buttons: (
      <>
        <Button.NoBg onClick={useCallback(() => nav(PermissionRequestListRoute.props.path), [nav])}>
          {tp(
            PermissionRequestListRoute.props.translationKey,
            {ns: PermissionRequestListRoute.props.translationNs
          })}
        </Button.NoBg>
        <Button onClick={useCallback(() => nav(PermissionCreateRoute.props.path), [nav])}>{tp('create')}</Button>
      </>
    ),
    innerlinks: (
      <Innerlinks>
        <Innerlinks.Item to={DashboardRoute.props.path}>{tp('Dashboard')}</Innerlinks.Item>
        <Innerlinks.Item to={TaskListRoute.props.path}>{tp('Tasks')}</Innerlinks.Item>
        <Innerlinks.Item isCurrent={true}>{tp('Permissions')}</Innerlinks.Item>
        <Innerlinks.Item to={BreachListRoute.props.path}>{tp('Breaches')}</Innerlinks.Item>
      </Innerlinks>
    ),
    tableColumns: [
      c('id', ne, identity),
      c('request_id', ne, titleCase),
      c('status', ne, ts),
      c('created_at', ne, identity),
      c('updated_at', ne, identity),
    ],
  }
});

export default PermissionListLayout;
