import Breadcrumbs from '../../../components/Breadcrumbs';
import Innerlinks from 'components/Innerlinks';
import Listing from '../../../layout/ListingLayout';
import React, {useEffect, useMemo} from 'react';
import useAsync from '../../../hook/useAsync';
import withPreparedProps from '../../../hoc/withPreparedProps';
import {SettingEditRoute} from '../routes';
import {TaskCancellationListRoute} from 'feature/classifier/routes';
import {UserListRoute} from 'feature/user/routes';
import {generatePath, Link} from 'react-router-dom';
import {useAuth} from '../../../context/auth';
import {useTranslation} from 'react-i18next';
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

const SettingListLayout = withPreparedProps(Listing, props => {
  const {apiQuery} = useAuth();
  const {t: tb} = useTranslation('setting', {keyPrefix: 'breadcrumbs'});
  const {t} = useTranslation('setting', {keyPrefix: 'list.column'});
  const {t: tp} = useTranslation('setting');
  const [state, fork] = useAsync(chain(maybeToAsync('"setting" prop is expected in the response', getProp('setting')),
    apiQuery(
      `
        query {
          setting {
          
          }
        }
      `
    ))
  );

  const c = useMemo(() => getColumn(t, props => (
    <Link to={generatePath(SettingEditRoute.props.path, {id: props?.id})}>
      {props?.children}
    </Link>
  )), [t]);

  useEffect(() => fork(), []);

  return {
    list: safe(isArray, state.data).option([]),
    rowKeyLens: getPropOr(0, 'id'),
    breadcrumbs: (
      <Breadcrumbs>
        <Breadcrumbs.Item><span className='font-semibold'>{tb`settings`}</span></Breadcrumbs.Item>
        <Breadcrumbs.Item hideSlash>{tb`allData`}</Breadcrumbs.Item>
      </Breadcrumbs>
    ),
    innerlinks: (
      <Innerlinks>
        <Innerlinks.Item isCurrent={true}>{tp('Settings')}</Innerlinks.Item>
        <Innerlinks.Item to={TaskCancellationListRoute.props.path}>{tp('Classifiers')}</Innerlinks.Item>
        <Innerlinks.Item to={UserListRoute.props.path}>{tp('Users')}</Innerlinks.Item>
      </Innerlinks>
    ),
    // TODO: Adjust column names regarding response data
    tableColumns: [
      c('id', ne, identity),
    ],
  }
});

export default SettingListLayout;
