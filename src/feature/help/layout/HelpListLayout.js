import Breadcrumbs from '../../../components/Breadcrumbs';
import Innerlinks from 'components/Innerlinks';
import Listing from '../../../layout/ListingLayout';
import React, {useMemo} from 'react';
import withPreparedProps from '../../../hoc/withPreparedProps';
import {ClientListRoute} from 'feature/client/routes';
import {HelpEditRoute} from '../routes';
import {alt} from 'crocks/pointfree';
import {generatePath, Link} from 'react-router-dom';
import {useAuth} from '../../../context/auth';
import {useTranslation} from 'react-i18next';
import {
  chain,
  curry,
  getProp,
  getPropOr,
  isArray,
  isEmpty,
  isString,
  map,
  Maybe,
  not,
  objOf,
  pipe,
  safe,
  option,
  // getPath,
} from 'crocks';
import useQuestions from '../api/useQuestions';
import {format} from 'date-fns';
import DynamicStatus from 'components/atom/Status';


const getColumn = curry((t, Component, key, mapper, status, styles) => ({
  Component,
  headerText: t(key),
  key,
  status,
  itemToProps: item => pipe(
    mapper,
    alt(Maybe.Just('-')),
    map(objOf('children')),
    map(a => ({...item, ...a}))
  )(item),
  styles: pipe(
    safe(isString),
    option(''),
  )(styles)
}));

const ne = not(isEmpty);

const HelpListLayout = withPreparedProps(Listing, props => {
  const {apiQuery} = useAuth();
  const {t: tb} = useTranslation('help', {keyPrefix: 'breadcrumbs'});
  const {t} = useTranslation('help', {keyPrefix: 'list.column'});
  const {t: tp} = useTranslation('help');
  // TODO: Prepare 'helps' data in Hasura to be fetched
  
  const api = useQuestions();

  const c = useMemo(() => getColumn(t, props => (
    <Link to={generatePath(HelpEditRoute.props.path, {id: props?.id})}>
      {props?.children}
    </Link>
  )), [t]);
  
  const cs = useMemo(() => getColumn(t, props => (
    <Link to={generatePath(HelpEditRoute.props.path, {id: props?.id})}>
      <DynamicStatus t={'help'} className={'w-20'} status={props?.status}/>
    </Link>
  )), [t]);

  return {
    list: safe(isArray, api?.data).option([]),
    rowKeyLens: getPropOr(0, 'id'),
    breadcrumbs: (
      <Breadcrumbs>
        <Breadcrumbs.Item><span className='font-semibold'>{tb`helps`}</span></Breadcrumbs.Item>
        <Breadcrumbs.Item hideSlash>{tb`allData`}</Breadcrumbs.Item>
      </Breadcrumbs>
    ),
    innerlinks: (
      <Innerlinks>
        <Innerlinks.Item to={ClientListRoute.props.path}>{tp('Clients')}</Innerlinks.Item>
        <Innerlinks.Item isCurrent={true}>{tp('Help')}</Innerlinks.Item>
      </Innerlinks>
    ),
    tableColumns: [
      c(
        'created_at',
        pipe(
          getProp('created_at'),
          chain(safe(not(isEmpty))),
          map(date => format(new Date(date), 'Y-MM-dd HH:mm'))
        ),
        true, null,
      ),
      c('fullName', 
        pipe(
          getProp('fullName'),
          chain(safe(not(isEmpty))),
        ), true, 'text-steel'),
      c('subject', pipe(getProp('subject')), true, null),
      c('answer_type', pipe(getProp('answer_type')),true, null),
      cs('status', pipe(getProp('status')),true, null),
    ],
  }
});

export default HelpListLayout;
