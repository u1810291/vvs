import Breadcrumbs from '../../../components/Breadcrumbs';
import ListingLayout from '../../../layout/ListingLayout';
import React, {useMemo} from 'react';
import withPreparedProps from '../../../hoc/withPreparedProps';
import {DriverCreateRoute, DriverEditRoute} from '../routes';
import {useTranslation} from 'react-i18next';
import {getPropOr, identity, pipe, safe, and, hasProp, map, isTruthy, propSatisfies, pick, Maybe} from 'crocks';
import useDrivers from '../api/useDrivers';
import {alt} from 'crocks/pointfree';
import {generatePath, Link, useNavigate} from 'react-router-dom';
import Button from 'components/Button';
import DriverOnlineTag from '../component/DriverOnlineTag';
import {withComponentFactory} from 'util/react';

const DriverListLayout = withPreparedProps(ListingLayout, () => {
  const {t} = useTranslation('driver', {keyPrefix: 'list'});
  const {t: tc} = useTranslation('driver', {keyPrefix: 'field'});
  const {t: tos} = useTranslation('driver', {keyPrefix: 'onlineStatus'});
  const {t: tb} = useTranslation('driver', {keyPrefix: 'breadcrumbs'});
  const nav = useNavigate();

  const c = (prop, mapper = identity, status) => ({
    key: prop,
    headerText: tc(prop),
    status,
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
  });

  const boolCol = useMemo(() => pipe(String, t), [t]);

  const tableColumns = [
    c('id', identity, false),
    c('firstName', identity, true),
    c('lastName', identity, true),
    c('username', identity, false),
    c('verified', boolCol, false),
    c('mobilePhone', identity, false),
    c('middleName', identity, false),
    c('email', identity, false),
    c('birthDate', identity, false),
    {
      key: 'status',
      headerText: tc`status`,
      itemToProps: Maybe.Just,
      Component: withComponentFactory(DriverOnlineTag, {t: tos}),
    }
  ];

  const api = useDrivers();

  return {
    list: api?.data || [],
    rowKeyLens: getPropOr(0, 'id'),
    buttons: <Button onClick={() => nav(DriverCreateRoute.props.path)}>{t`create`}</Button>,
    breadcrumbs: (
      <Breadcrumbs>
        <Breadcrumbs.Item><span className='font-semibold'>{tb`drivers`}</span></Breadcrumbs.Item>
      </Breadcrumbs>
    ),
    /**
     * @type {Array<import('../../../layout/ListingLayout/index.js').TableColumnComponent>}
     */
    tableColumns,
  }
});

export default DriverListLayout;
