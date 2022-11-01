import Breadcrumbs from 'components/Breadcrumbs';
import Button from 'components/Button';
import Innerlinks from 'components/Innerlinks';
import Listing from 'layout/ListingLayout';
import React, {useEffect, useMemo} from 'react';
import withPreparedProps from 'hoc/withPreparedProps';
import {KeyBoxEditRoute, KeyBoxCreateRoute} from '../routes';
import {ModemListRoute} from 'feature/modem/routes';
import {ObjectListRoute} from 'feature/object/routes';
import {alt} from 'crocks/pointfree';
import {generatePath, Link, useNavigate} from 'react-router-dom';
// import {titleCase} from '@s-e/frontend/transformer/string';
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
import {useFilter} from 'hook/useFilter';



const getColumn = curry((t, Component, key, mapper, isSortable) => ({
  Component,
  headerText: t(key),
  key,
  isSortable,
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

  const tableColumns = [
    c('set_name', pipe(getProp('set_name')), true),
    c('crew_name', pipe(getPath(['crew', 'name'])), false),
  ];

  const filtersData = [
    {key: 'set_name', label: 'set_name', filter: 'text'},
  ];

  const [queryParams, filters, columns, defaultFilter, toggleFilter, setExportData, sortColumnKey, setSortColumn] = useFilter(
    'keybox',
    tableColumns,
    filtersData,
  );

  const api = useKeyBoxes({filters: queryParams});
  
  useEffect(() => {
    api.mutate();
  }, [queryParams, sortColumnKey]);

  return {
    api,
    list: api?.data?.flat() ?? [],
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
    tableColumns,
    sortColumnKey, 
    setSortColumn
  }
});

export default KeyBoxListLayout;
