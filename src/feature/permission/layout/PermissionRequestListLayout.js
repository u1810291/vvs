import React, {useMemo} from 'react';
import {generatePath, Link, useNavigate} from 'react-router-dom';

import Button from 'components/Button';
import Listing from 'layout/ListingLayout';
import Breadcrumbs, {RouteAsBreadcrumb} from 'components/Breadcrumbs';
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

import PermissionRoute, {PermissionCreateRoute, PermissionRequestEditRoute, PermissionRequestListRoute} from '../routes';
import {useCrewRequest} from '../api';
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
  const {t} = useTranslation('permission', {keyPrefix: 'list.column'});
  const nav = useNavigate();
  const swr = useCrewRequest();

  const c = useMemo(() => getColumn(t, props => (
    <Link to={generatePath(PermissionRequestEditRoute.props.path, {id: props?.value})}>
      {props?.children}
    </Link>
  )), [t]);

  return {
    list: swr?.data?.crew_request || [],
    rowKeyLens: getPropOr(0, 'id'),
    breadcrumbs: (
      <Breadcrumbs>
        <RouteAsBreadcrumb route={PermissionRoute}/>
        <Breadcrumbs.Item>{tb`allData`}</Breadcrumbs.Item>
      </Breadcrumbs>
    ),
    buttons: (
      <>
        <Button.NoBg onClick={() => nav(PermissionCreateRoute.props.path)}>{PermissionRequestListRoute.props.translation}</Button.NoBg>
        <Button onClick={() => nav(PermissionCreateRoute.props.path)}>{tp('create')}</Button>
      </>
    ),
    tableColumns: [
      c('value', ne, identity),
      c('comment', ne, titleCase),
    ],
  }
});

export default PermissionListLayout;
