import Breadcrumbs, {RouteAsBreadcrumb} from '../../../components/Breadcrumbs';
import ListingLayout from '../../../layout/ListingLayout';
import React, {useMemo} from 'react';
import withPreparedProps from '../../../hoc/withPreparedProps';
import DriverRoute, {DriverCreateRoute, DriverEditRoute} from '../routes';
import {useTranslation} from 'react-i18next';
import {getPropOr, identity, pipe, safe, and, hasProp, map, isTruthy, propSatisfies, pick} from 'crocks';
import useDrivers from '../api/useDrivers';
import {alt} from 'crocks/pointfree';
import {generatePath, Link, useNavigate} from 'react-router-dom';
import Button from 'components/Button';

const DriverListLayout = withPreparedProps(ListingLayout, () => {
  const api = useDrivers();
  const {t} = useTranslation('driver', {keyPrefix: 'list'});
  const nav = useNavigate();

  const c = useMemo(() => (prop, mapper = identity) => ({
    key: prop,
    headerText: t(prop),
    itemToProps: item => pipe(
      safe(and(hasProp('id'), propSatisfies(prop, isTruthy))),
      map(item => ({id: item?.id, children: mapper(item?.[prop])})),
      alt(pipe(
        safe(hasProp('id')),
        map(pick(['id'])),
      )(item)),
    )(item),
    Component: ({id, children, fallback = '—'}) => {
      if (!id && !children) return fallback;
      if (!id) return children || fallback;
      return (
        <Link to={generatePath(DriverEditRoute.props.path, {id})}>
          {children || fallback}
        </Link>
      )
    },
  }), [t]);

  const boolCol = useMemo(() => pipe(String, t), [t]);

  return {
    list: api?.data || [],
    rowKeyLens: getPropOr(0, 'id'),
    buttons: <Button onClick={() => nav(DriverCreateRoute.props.path)}>{t`create`}</Button>,
    breadcrumbs: (
      <Breadcrumbs>
        <RouteAsBreadcrumb route={DriverRoute}/>
        <Breadcrumbs.Item>
          {useTranslation('driver', {keyPrefix: 'breadcrumbs'}).t`allData`}
        </Breadcrumbs.Item>
      </Breadcrumbs>
    ),

    /**
     * @type {Array<import('../../../layout/ListingLayout/index.js').TableColumnComponent>}
     */
    tableColumns: [
      c('id', identity),
      c('firstName'),
      c('lastName'),
      c('username'),
      c('verified', boolCol),
      c('mobilePhone'),
      c('middleName'),
      c('email'),
      c('birthDate'),
      c('is_online', pipe(
        boolCol
      )),
    ],
  }
});

export default DriverListLayout;
