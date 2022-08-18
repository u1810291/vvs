import React, {useMemo} from 'react';
import {generatePath, Link, useNavigate} from 'react-router-dom';

import Button from 'components/Button';
import Listing from 'layout/ListingLayout';
import Breadcrumbs from 'components/Breadcrumbs';
import withPreparedProps from 'hoc/withPreparedProps';

import {useTranslation} from 'react-i18next';

import {
  // chain,
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
  // safe,
  getPath,
} from 'crocks';
import {alt} from 'crocks/pointfree';

import {KeyBoxEditRoute, KeyBoxCreateRoute} from '../routes';
import {titleCase} from '@s-e/frontend/transformer/string';
import {useKeyBoxes} from '../api';
import {ModemListRoute} from 'feature/modem/routes';
import {ObjectListRoute} from 'feature/object/routes';
import Innerlinks from 'components/Innerlinks';



const getColumn = curry((t, Component, key, mapper) => ({
  Component,
  headerText: t(key),
  key,
  itemToProps: item => pipe(
    // getProp(key),
    // chain(safe(pred)),
    mapper,
    map(objOf('children')),
    map(a => ({...item, ...a})),
    alt(Maybe.Just(item)),
  )(item),
}));

const ne = not(isEmpty);
const Span = props => <span {...props}/>;

const KeyBoxListLayout = withPreparedProps(Listing, props => {
  const {t: tb} = useTranslation('keybox', {keyPrefix: 'breadcrumbs'});
  const {t: tp} = useTranslation('keybox');
  const {t: ts} = useTranslation('keybox', {keyPrefix: 'status'});
  const {t} = useTranslation('keybox', {keyPrefix: 'list.column'});
  const nav = useNavigate();

  const c = useMemo(() => getColumn(t, props => (
    <Link to={generatePath(KeyBoxEditRoute.props.path, {id: props?.id})}>
      {props?.children}
    </Link>
  )), [t]);

  return {
    list: useKeyBoxes()?.data || [],
    rowKeyLens: getPropOr(0, 'id'),
    breadcrumbs: (
      <Breadcrumbs>
        <Breadcrumbs.Item><span className='font-semibold'>{tb`key_boxes`}</span></Breadcrumbs.Item>
      </Breadcrumbs>
    ),
    buttons: (
      <>
        <Button onClick={() => nav(KeyBoxCreateRoute.props.path)}>{tp('create')}</Button>
      </>
    ),
    innerlinks: (
      <Innerlinks>
        <Innerlinks.Item to={ObjectListRoute.props.path}>{tp('Objects')}</Innerlinks.Item>
        <Innerlinks.Item to={ModemListRoute.props.path}>{tp('Modems')}</Innerlinks.Item>
        <Innerlinks.Item isCurrent={true}>{tp('Key Boxes')}</Innerlinks.Item>
      </Innerlinks>
    ),
    tableColumns: [
      // c('id', ne, identity),
      c('set_name', pipe(getProp('set_name')), titleCase),
      c('crew_name', pipe(getPath(['crew', 'name'])), ts),
    ],
  }
});

export default KeyBoxListLayout;
