import React, {useEffect, useMemo} from 'react';
import {generatePath, Link} from 'react-router-dom';

import Listing from '../../../layout/ListingLayout';
import Breadcrumbs from '../../../components/Breadcrumbs';
import withPreparedProps from '../../../hoc/withPreparedProps';

import {useTranslation} from 'react-i18next';
import {useAuth} from '../../../context/auth';
import useAsync from '../../../hook/useAsync';

import {
  chain,
  curry,
  getProp,
  getPropOr,
  identity,
  isArray,
  isEmpty,
  map,
  Maybe,
  not,
  objOf,
  pipe,
  safe
} from 'crocks';
import {alt} from 'crocks/pointfree';
import maybeToAsync from 'crocks/Async/maybeToAsync';

import {PermissionEditRoute} from '../routes';

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

const PermissionListLayout = withPreparedProps(Listing, props  => {
  const {apiQuery} = useAuth();
  const {t: tb} = useTranslation('permission', {keyPrefix: 'breadcrumbs'});
  const {t} = useTranslation('permission', {keyPrefix: 'list.column'});
  // TODO: Prepare 'Permission' data in Hasura to be fetched
  const [state, fork] = useAsync(chain(maybeToAsync('"permission" prop is expected in the response', getProp('permission')),
    apiQuery(
      `
        query {
          permission {

          }
        }
      `
    ))
  );

  const c = useMemo(() => getColumn(t, props => (
    <Link to={generatePath(PermissionEditRoute.props.path, {id: props?.id})}>
      {props?.children}
    </Link>
  )), [t]);

  useEffect(() => fork(), []);

  return {
    list: safe(isArray, state.data).option([]),
    rowKeyLens: getPropOr(0, 'id'),
    breadcrumbs: (
      <Breadcrumbs>
        <Breadcrumbs.Item><span className='font-semibold'>{tb`permissions`}</span></Breadcrumbs.Item>
        <Breadcrumbs.Item>{tb`allData`}</Breadcrumbs.Item>
      </Breadcrumbs>
    ),
    // TODO: Adjust column names regarding response data
    tableColumns: [
      c('id', ne, identity),
      c('name', ne, identity),
      c('status', ne, identity),
      c('date', ne, identity),
      c('name', ne, identity),
      c('driver_name', ne, identity),
    ],
  }
});

export default PermissionListLayout;
