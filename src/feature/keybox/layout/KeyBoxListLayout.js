import Breadcrumbs from 'components/Breadcrumbs';
import Button from 'components/Button';
import Innerlinks from 'components/Innerlinks';
import Listing from 'layout/ListingLayout';
import React, {useMemo} from 'react';
import withPreparedProps from 'hoc/withPreparedProps';
import {KeyBoxEditRoute, KeyBoxCreateRoute} from '../routes';
import {ModemListRoute} from 'feature/modem/routes';
import {ObjectListRoute} from 'feature/object/routes';
import {alt} from 'crocks/pointfree';
import {generatePath, Link, useNavigate} from 'react-router-dom';
import {titleCase} from '@s-e/frontend/transformer/string';
import {useKeyBoxes} from '../api';
import {useTranslation} from 'react-i18next';
import {
  curry,
  getProp,
  getPropOr,
  map,
  Maybe,
  objOf,
  pipe,
  getPath,
} from 'crocks';

const getColumn = curry((t, Component, key, mapper) => ({
  Component,
  headerText: t(key),
  key,
  itemToProps: item => pipe(
    mapper,
    map(objOf('children')),
    map(a => ({...item, ...a})),
    alt(Maybe.Just(item)),
  )(item),
}));

const KeyBoxListLayout = withPreparedProps(Listing, () => {
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
        <Breadcrumbs.Item hideSlash><span className='font-semibold'>{tb`key_boxes`}</span></Breadcrumbs.Item>
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
      c('set_name', pipe(getProp('set_name')), titleCase),
      c('crew_name', pipe(getPath(['crew', 'name'])), ts),
    ],
  }
});

export default KeyBoxListLayout;
