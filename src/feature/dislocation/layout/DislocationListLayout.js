import React, {useMemo} from 'react';
import {generatePath, Link, useNavigate} from 'react-router-dom';
import Listing from '../../../layout/ListingLayout';
import Breadcrumbs from '../../../components/Breadcrumbs';
import withPreparedProps from '../../../hoc/withPreparedProps';
import {useTranslation} from 'react-i18next';
import {useAuth} from '../../../context/auth';
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
import {DislocationCreateRoute, DislocationEditRoute} from '../routes';
import Innerlinks from 'components/Innerlinks';
import {CrewListRoute} from 'feature/crew/routes';
import {DriverListRoute} from 'feature/driver/routes';
import Button from '../../../components/Button';
import useDislocationZones from '../api/useDislocationZones';

const getColumn = curry((t, Component, key, pred, mapper, isSortable) => ({
  Component,
  headerText: t(key),
  key,
  isSortable,
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

const DislocationListLayout = withPreparedProps(Listing, props => {
  const nav = useNavigate();
  const {apiQuery} = useAuth();
  const {t: tp} = useTranslation('dislocation');
  const {t: th} = useTranslation('dislocation', {keyPrefix: 'list.header'});
  const {t: tb} = useTranslation('dislocation', {keyPrefix: 'breadcrumbs'});
  const {t} = useTranslation('dislocation', {keyPrefix: 'list.column'});
  
  const api = useDislocationZones({filters: {}});

  const c = useMemo(() => getColumn(t, props => (
    <Link to={generatePath(DislocationEditRoute.props.path, {id: props?.id})}>
      {props?.children}
    </Link>
  )), [t]);


  return {
    api,
    list: api?.data?.flat() ?? [],
    rowKeyLens: getPropOr(0, 'id'),
    breadcrumbs: (
      <Breadcrumbs>
        <Breadcrumbs.Item hideSlash><span className='font-semibold'>{tb`dislocations`}</span></Breadcrumbs.Item>
      </Breadcrumbs>
    ),
    buttons: (
      <>
        <Button.Pxl onClick={() => nav(DislocationCreateRoute.props.path)}>{th('button.create')}</Button.Pxl>
      </>
    ),
    innerlinks: (
      <Innerlinks>
        <Innerlinks.Item to={CrewListRoute.props.path}>{th('links.crews')}</Innerlinks.Item>
        <Innerlinks.Item to={DriverListRoute.props.path}>{th('links.drivers')}</Innerlinks.Item>
        <Innerlinks.Item isCurrent={true}>{th('links.dislocation_zones')}</Innerlinks.Item>
      </Innerlinks>
    ),
    tableColumns: [
      c('name', ne, identity, false),
    ],
  }
});

export default DislocationListLayout;
