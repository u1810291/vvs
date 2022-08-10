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

import {HelpEditRoute} from '../routes';
import Innerlinks from 'components/Innerlinks';
import {ClientListRoute} from 'feature/client/routes';

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

const HelpListLayout = withPreparedProps(Listing, props => {
  const {apiQuery} = useAuth();
  const {t: tb} = useTranslation('help', {keyPrefix: 'breadcrumbs'});
  const {t} = useTranslation('help', {keyPrefix: 'list.column'});
  const {t: tp} = useTranslation('help');
  // TODO: Prepare 'helps' data in Hasura to be fetched
  const [state, fork] = useAsync(chain(maybeToAsync('"help" prop is expected in the response', getProp('help')),
    apiQuery(
      `
        query {
          help {
          
          }
        }
      `
    ))
  );

  const c = useMemo(() => getColumn(t, props => (
    <Link to={generatePath(HelpEditRoute.props.path, {id: props?.id})}>
      {props?.children}
    </Link>
  )), [t]);

  useEffect(() => fork(), []);

  return {
    list: safe(isArray, state.data).option([]),
    rowKeyLens: getPropOr(0, 'id'),
    breadcrumbs: (
      <Breadcrumbs>
        <Breadcrumbs.Item><span className='font-semibold'>{tb`helps`}</span></Breadcrumbs.Item>
        <Breadcrumbs.Item>{tb`allData`}</Breadcrumbs.Item>
      </Breadcrumbs>
    ),
    innerlinks: (
      <Innerlinks>
        <Innerlinks.Item to={ClientListRoute.props.path}>{tp('Clients')}</Innerlinks.Item>
        <Innerlinks.Item isCurrent={true}>{tp('Helps')}</Innerlinks.Item>
      </Innerlinks>
    ),
    // TODO: Adjust column names regarding response data
    tableColumns: [
      c('id', ne, identity),
      c('date', ne, identity),
      c('type', ne, identity),
      c('status', ne, identity),
    ],
  }
});

export default HelpListLayout;
