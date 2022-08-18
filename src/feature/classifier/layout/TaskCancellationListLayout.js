import React, {useMemo} from 'react';
import {generatePath, Link, useNavigate} from 'react-router-dom';

import Listing from '../../../layout/ListingLayout';
import Breadcrumbs from '../../../components/Breadcrumbs';
import withPreparedProps from '../../../hoc/withPreparedProps';

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
  safe,
  // hasProps
} from 'crocks';
// import {pick} from 'crocks/helpers';
import {alt} from 'crocks/pointfree';

import {PermissionRequestListRoute, TaskCancellationEditRoute, TaskCancellationCreateRoute, TaskTypeListRoute} from '../routes';
import Button from 'components/Button';
import Innerlinks from 'components/Innerlinks';
import {useTaskCancellations} from '../api';






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

const TaskCancellationListLayout = withPreparedProps(Listing, props => {
  const {t: tb} = useTranslation('classifier', {keyPrefix: 'breadcrumbs'});
  const {t: tp} = useTranslation('classifier');
  const {t} = useTranslation('classifier', {keyPrefix: 'list.column'});

  const nav = useNavigate();
  const swr = useTaskCancellations();

  const c = useMemo(() => getColumn(t, props => (
    <Link to={generatePath(TaskCancellationEditRoute.props.path, {id: props?.value})}>
      {props?.children}
    </Link>
  )), [t]);



  return {
    list: swr?.data?.event_cancellation || [],
    rowKeyLens: getPropOr(0, 'value'),
    breadcrumbs: (
      <Breadcrumbs>
        <Breadcrumbs.Item><span className='font-semibold'>{tb`classifiers`}</span></Breadcrumbs.Item>
        <Breadcrumbs.Item>{tp`task_cancellations`}</Breadcrumbs.Item>
      </Breadcrumbs>
    ),
    buttons: (
      <>
        <Button onClick={() => nav(TaskCancellationCreateRoute.props.path)}>{tp('create')}</Button>
      </>
    ),
    innerlinks: (
      <Innerlinks>
        <Innerlinks.Item isCurrent={true}>{tp('task_cancellations')}</Innerlinks.Item>
        <Innerlinks.Item to={PermissionRequestListRoute.props.path}>{tp('permission_requests')}</Innerlinks.Item>
        <Innerlinks.Item to={TaskTypeListRoute.props.path}>{tp('task_types')}</Innerlinks.Item>
      </Innerlinks>
    ),
    tableColumns: [
      c('value', ne, identity),
      // c('comment', ne, identity),
    ],
  }
});

export default TaskCancellationListLayout;
