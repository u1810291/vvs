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
import Innerlinks from 'components/Innerlinks';
import {DriverEditRoute} from '../routes';
import {CrewListRoute} from 'feature/crew/routes';
import {DislocationListRoute} from 'feature/dislocation/routes';





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

const DriverListLayout = withPreparedProps(Listing, props => {
  const {apiQuery} = useAuth();
  const {t: tp} = useTranslation('driver');
  const {t: tb} = useTranslation('driver', {keyPrefix: 'breadcrumbs'});
  const {t} = useTranslation('driver', {keyPrefix: 'list.column'});
  // TODO: Prepare 'Driver' data in Hasura to be fetched
  const [state, fork] = useAsync(chain(maybeToAsync('"driver" prop is expected in the response', getProp('driver')),
    apiQuery(
      `
        query {
          driver {

          }
        }
      `
    ))
  );

  const c = useMemo(() => getColumn(t, props => (
    <Link to={generatePath(DriverEditRoute.props.path, {id: props?.id})}>
      {props?.children}
    </Link>
  )), [t]);

  useEffect(() => fork(), []);

  return {
    list: safe(isArray, state.data).option([]),
    rowKeyLens: getPropOr(0, 'id'),
    breadcrumbs: (
      <Breadcrumbs>
        <Breadcrumbs.Item><span className='font-semibold'>{tb`drivers`}</span></Breadcrumbs.Item>
        <Breadcrumbs.Item>{tb`allData`}</Breadcrumbs.Item>
      </Breadcrumbs>
    ),
    innerlinks: (
      <Innerlinks>
        <Innerlinks.Item to={CrewListRoute.props.path}>{tp('Crews')}</Innerlinks.Item>
        <Innerlinks.Item isCurrent={true} >{tp('Drivers')}</Innerlinks.Item>
        <Innerlinks.Item to={DislocationListRoute.props.path}>{tp('Dislocation zones')}</Innerlinks.Item>
      </Innerlinks>
    ),

    // TODO: Adjust column names regarding response data
    tableColumns: [
      c('id', ne, identity),
      c('full_name', ne, identity),
      c('status', ne, identity),
    ],
  }
});

export default DriverListLayout;
