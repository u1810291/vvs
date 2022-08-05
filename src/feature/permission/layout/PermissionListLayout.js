import React, {useMemo} from 'react';
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

import {PermissionEditRoute, PermissionCreateRoute} from '../routes';
import {usePermissions} from '../api';
import {titleCase} from '@s-e/frontend/transformer/string';

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
        <Button onClick={() => nav(PermissionCreateRoute.props.path)}>{tp('create')}</Button>
      </>
    ),
    tableColumns: [
      c('id', ne, identity),
      c('request', ne, titleCase),
      c('status', ne, ts),
      c('created_at', ne, identity),
      c('updated_at', ne, identity),
    ],
  }
});

export default PermissionListLayout;
