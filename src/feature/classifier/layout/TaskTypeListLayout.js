import Breadcrumbs from '../../../components/Breadcrumbs';
import Button from 'components/Button';
import Innerlinks from 'components/Innerlinks';
import Listing from '../../../layout/ListingLayout';
import React, {useMemo} from 'react';
import withPreparedProps from '../../../hoc/withPreparedProps';
import {PermissionRequestListRoute, TaskTypeEditRoute, TaskTypeCreateRoute, TaskCancellationListRoute} from '../routes';
import {generatePath, Link, useNavigate} from 'react-router-dom';
import {titleCase} from '@s-e/frontend/transformer/string';
import {useTaskTypes} from '../api';
import {useTranslation} from 'react-i18next';
import {
  chain,
  curry,
  getProp,
  getPropOr,
  // identity,
  isEmpty,
  map,
  Maybe,
  not,
  objOf,
  pipe,
  safe,
} from 'crocks';
import {alt} from 'crocks/pointfree';

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

const TaskTypeListLayout = withPreparedProps(Listing, props => {
  const {t: tb} = useTranslation('classifier', {keyPrefix: 'breadcrumbs'});
  const {t: tp} = useTranslation('classifier');
  const {t} = useTranslation('classifier', {keyPrefix: 'list.column'});

  const nav = useNavigate();
  const swr = useTaskTypes();

  const c = useMemo(() => getColumn(t, props => (
    <Link to={generatePath(TaskTypeEditRoute.props.path, {id: props?.value})}>
      {props?.children}
    </Link>
  )), [t]);



  return {
    list: swr?.data?.event_type || [],
    rowKeyLens: getPropOr(0, 'value'),
    breadcrumbs: (
      <Breadcrumbs>
        <Breadcrumbs.Item><span className='font-semibold'>{tb`classifiers`}</span></Breadcrumbs.Item>
        <Breadcrumbs.Item> hideSlash{tp`task_types`}</Breadcrumbs.Item>
      </Breadcrumbs>
    ),
    buttons: (
      <>
        <Button onClick={() => nav(TaskTypeCreateRoute.props.path)}>{tp('create')}</Button>
      </>
    ),
    innerlinks: (
      <Innerlinks>
        <Innerlinks.Item to={TaskCancellationListRoute.props.path}>{tp('task_cancellations')}</Innerlinks.Item>
        <Innerlinks.Item to={PermissionRequestListRoute.props.path}>{tp('permission_requests')}</Innerlinks.Item>
        <Innerlinks.Item isCurrent={true}>{tp('task_types')}</Innerlinks.Item>
      </Innerlinks>
    ),
    tableColumns: [
      c('value', ne, titleCase),
      // c('comment', ne, identity),
    ],
  }
});

export default TaskTypeListLayout;
