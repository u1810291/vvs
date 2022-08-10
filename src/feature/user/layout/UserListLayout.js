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

import {UserEditRoute} from '../routes';
import Innerlinks from 'components/Innerlinks';
import {SettingListRoute} from 'feature/setting/routes';

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

const UserListLayout = withPreparedProps(Listing, props => {
  const {apiQuery} = useAuth();
  const {t: tb} = useTranslation('user', {keyPrefix: 'breadcrumbs'});
  const {t} = useTranslation('user', {keyPrefix: 'list.column'});
  const {t: tp} = useTranslation('user');
  // TODO: Prepare 'users' data in Hasura to be fetched
  const [state, fork] = useAsync(chain(maybeToAsync('"user" prop is expected in the response', getProp('user')),
    apiQuery(
      `
        query {
          user {
          
          }
        }
      `
    ))
  );

  const c = useMemo(() => getColumn(t, props => (
    <Link to={generatePath(UserEditRoute.props.path, {id: props?.id})}>
      {props?.children}
    </Link>
  )), [t]);

  useEffect(() => fork(), []);

  return {
    list: safe(isArray, state.data).option([]),
    rowKeyLens: getPropOr(0, 'id'),
    breadcrumbs: (
      <Breadcrumbs>
        <Breadcrumbs.Item><span className='font-semibold'>{tb`users`}</span></Breadcrumbs.Item>
        <Breadcrumbs.Item>{tb`allData`}</Breadcrumbs.Item>
      </Breadcrumbs>
    ),
    innerlinks: (
      <Innerlinks>
        <Innerlinks.Item to={SettingListRoute.props.path}>{tp('Settings')}</Innerlinks.Item>
        <Innerlinks.Item to={'#'}>{tp('Classifiers')}</Innerlinks.Item>
        <Innerlinks.Item isCurrent={true}>{tp('Users')}</Innerlinks.Item>
      </Innerlinks>
    ),
    // TODO: Adjust column names regarding response data
    tableColumns: [
      c('id', ne, identity),
      c('name', ne, identity),
      c('status', ne, identity),
    ],
  }
});

export default UserListLayout;
