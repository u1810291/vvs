import React, {useMemo} from 'react';
import {generatePath, Link, useNavigate} from 'react-router-dom';

import Button from 'components/Button';
import Listing from 'layout/ListingLayout';
import Breadcrumbs from 'components/Breadcrumbs';
import withPreparedProps from 'hoc/withPreparedProps';

import {useTranslation} from 'react-i18next';

import {
  getPropOr,
  identity,
  map,
  pipe,
  safe,
  and,
  hasProp,
  propSatisfies,
  pick,
  isTruthy,
  option,
} from 'crocks';
import {alt} from 'crocks/pointfree';
import {mPgIntervalToStr} from 'util/datetime';
import {PermissionRequestCreateRoute, PermissionRequestEditRoute} from '../routes';
import {useCrewRequest} from '../../permission/api';
import {TaskCancellationListRoute, TaskTypeListRoute} from 'feature/classifier/routes';
import Innerlinks from 'components/Innerlinks';



const PermissionListLayout = withPreparedProps(Listing, () => {
  const {t: tb} = useTranslation('classifier', {keyPrefix: 'breadcrumbs'});
  const {t: tp} = useTranslation('classifier');
  const {t} = useTranslation('classifier', {keyPrefix: 'list.column'});
  const nav = useNavigate();
  const swr = useCrewRequest();

  const c = useMemo(() => (prop, mapper = identity, status) => ({
    key: prop,
    headerText: t(prop),
    status,
    itemToProps: item => pipe(
      safe(and(hasProp('value'), propSatisfies(prop, isTruthy))),
      map(item => ({id: item?.value, children: mapper(item?.[prop])})),
      alt(pipe(
        safe(hasProp('value')),
        map(pick(['value'])),
      )(item)),
    )(item),
    Component: ({id, children, fallback = '—'}) => {
      if (!id && !children) return fallback;
      if (!id) return children || fallback;
      return (
        <Link to={generatePath(PermissionRequestEditRoute.props.path, {id})}>
          {children || fallback}
        </Link>
      )
    },
  }), [t]);

  const boolCol = useMemo(() => pipe(String, t), [t]);


  return {
    list: swr?.data || [],
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
      c('value', identity),
      c('duration', pipe(
        mPgIntervalToStr,
        map(({hours, minutes}) => `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`),
        option(''),
      ),),
      c('is_assigned_while_in_breaks', boolCol),
    ],
  }
});

export default PermissionListLayout;
