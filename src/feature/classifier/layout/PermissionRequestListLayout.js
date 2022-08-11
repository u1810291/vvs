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

import {PermissionRequestCreateRoute, PermissionRequestEditRoute} from '../routes';
import {useCrewRequest} from '../../permission/api';
import {titleCase} from '@s-e/frontend/transformer/string';
import {TaskCancellationListRoute, TaskTypeListRoute} from 'feature/classifier/routes';
import Innerlinks from 'components/Innerlinks';

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
  const {t: tb} = useTranslation('classifier', {keyPrefix: 'breadcrumbs'});
  const {t: tp} = useTranslation('classifier');
  const {t} = useTranslation('classifier', {keyPrefix: 'list.column'});
  const nav = useNavigate();
  const swr = useCrewRequest();

  const c = useMemo(() => getColumn(t, props => (
    <Link to={generatePath(PermissionRequestEditRoute.props.path, {id: props?.value})}>
      {props?.children}
    </Link>
  )), [t]);

  return {
    list: swr?.data?.crew_request || [],
    rowKeyLens: getPropOr(0, 'value'),
    breadcrumbs: (
      <Breadcrumbs>
        <Breadcrumbs.Item><span className='font-semibold'>{tb`classifiers`}</span></Breadcrumbs.Item>
        <Breadcrumbs.Item>{tp`permission_requests`}</Breadcrumbs.Item>
      </Breadcrumbs>
    ),
    buttons: (
      <>
        <Button onClick={() => nav(PermissionRequestCreateRoute.props.path)}>{tp('create')}</Button>
      </>
    ),
    innerlinks: (
      <Innerlinks>
        <Innerlinks.Item to={TaskCancellationListRoute.props.path}>{tp('task_cancellations')}</Innerlinks.Item>
        <Innerlinks.Item isCurrent={true}>{tp('permission_requests')}</Innerlinks.Item>
        <Innerlinks.Item to={TaskTypeListRoute.props.path}>{tp('task_types')}</Innerlinks.Item>
      </Innerlinks>
    ),
    tableColumns: [
      c('value', ne, identity),
      c('duration', ne, titleCase),
    ],
  }
});

export default PermissionListLayout;
