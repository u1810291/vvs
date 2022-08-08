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
  // identity,
  isEmpty,
  map,
  Maybe,
  not,
  objOf,
  pipe,
  safe
} from 'crocks';
import {alt} from 'crocks/pointfree';

import {KeyEditRoute, KeyCreateRoute} from '../routes';
import {useKeys} from '../api';
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
const Span = props => <span {...props}/>;

const KeyListLayout = withPreparedProps(Listing, props => {
  const {t: tb} = useTranslation('key', {keyPrefix: 'breadcrumbs'});
  const {t: tp} = useTranslation('key');
  const {t: ts} = useTranslation('key', {keyPrefix: 'status'});
  const {t} = useTranslation('key', {keyPrefix: 'list.column'});
  const nav = useNavigate();

  const c = useMemo(() => getColumn(t, props => (
    <Link to={generatePath(KeyEditRoute.props.path, {id: props?.id})}>
      {props?.children}
    </Link>
  )), [t]);

  return {
    list: useKeys()?.data || [],
    rowKeyLens: getPropOr(0, 'id'),
    breadcrumbs: (
      <Breadcrumbs>
        <Breadcrumbs.Item><span className='font-semibold'>{tb`keys`}</span></Breadcrumbs.Item>
      </Breadcrumbs>
    ),
    buttons: (
      <>
        <Button onClick={() => nav(KeyCreateRoute.props.path)}>{tp('create')}</Button>
      </>
    ),
    tableColumns: [
      // c('id', ne, identity),
      c('set_name', ne, titleCase),
      c('crew_id', ne, ts),
    ],
  }
});

export default KeyListLayout;
