import Breadcrumbs from '../../../components/Breadcrumbs';
import ListingLayout from '../../../layout/ListingLayout';
import React, {useEffect, useMemo} from 'react';
import withPreparedProps from '../../../hoc/withPreparedProps';
import {DriverCreateRoute, DriverEditRoute} from '../routes';
import {useTranslation} from 'react-i18next';
import {
  getPropOr, 
  curry, 
  getProp,
  pipe, 
  safe, 
  map, 
  Maybe,
  isString,
  option,
  objOf,
  identity,
  not,
  isEmpty,
  hasProps,
} from 'crocks';
import useDrivers from '../api/useDrivers';
import {alt} from 'crocks/pointfree';
import {generatePath, Link, useNavigate} from 'react-router-dom';
import Button from 'components/Button';
import {FilterIcon} from '@heroicons/react/solid';
import {useFilter} from 'hook/useFilter';
import DriverOnlineTag from '../component/DriverOnlineTag';
import {CrewListRoute} from 'feature/crew/routes';
import {DislocationListRoute} from 'feature/dislocation/routes';
import Innerlinks from 'components/Innerlinks';


const getColumn = curry((t, Component, key, mapper, status, styles) => ({
  Component,
  headerText: t(key),
  key,
  status,
  itemToProps: item => pipe(
    mapper,
    map(objOf('children')),
    map(a => ({...item, ...a})),
    alt(Maybe.Just('-')),
  )(item),
  styles: pipe(
    safe(isString),
    option(''),
  )(styles)
}));



const DriverListLayout = withPreparedProps(ListingLayout, () => {
  const {t} = useTranslation('driver', {keyPrefix: 'list'});
  const {t: tc} = useTranslation('driver', {keyPrefix: 'field'});
  const {t: tos} = useTranslation('driver', {keyPrefix: 'onlineStatus'});
  const {t: tb} = useTranslation('driver', {keyPrefix: 'breadcrumbs'});
  const {t: th} = useTranslation('driver', {keyPrefix: 'list.header'});
  const nav = useNavigate();

  // const c = (prop, mapper = identity, status) => ({
  //   key: prop,
  //   headerText: tc(prop),
  //   status,
  //   itemToProps: item => pipe(
  //     safe(and(hasProp('id'), propSatisfies(prop, isTruthy))),
  //     map(item => ({id: item?.id, children: mapper(item?.[prop])})),
  //     alt(pipe(
  //       safe(hasProp('id')),
  //       map(pick(['id'])),
  //     )(item)),
  //   )(item),
  //   Component: ({id, children, fallback = '—'}) => {
  //     if (!id && !children) return fallback;
  //     if (!id) return children || fallback;
  //     return (
  //       <Link to={generatePath(DriverEditRoute.props.path, {id})}>
  //         {children || fallback}
  //       </Link>
  //     )
  //   },
  // });

  const c = useMemo(() => getColumn(t, props => (
    props?.id && <Link className={props?.className} to={generatePath(DriverEditRoute.props.path, {id: props?.id})}>
      {props?.children}
    </Link>
  )), [t]);

  const boolCol = useMemo(() => pipe(String, t), [t]);
  const toStringValue = pipe(
    a => String(a || '').trim(),
    safe(not(isEmpty)),
  );

  
  // const {data: driverDropdown} = useDriversDropdown();
  
  // console.log(api?.data);

  // custom filter
  const driversFilter = (state, filtersData) => {
    return {'query': JSON.stringify({
      'bool': {
        'must': [
          {
            'wildcard': {
              'fullName': {
                'value': `${state['fullName'] ? `*${state['fullName'].replaceAll('%', '')}*` : '*'}`
              }
            }
          },
          {
            'nested': {
              'path': 'registrations',
              'query': {
                'bool': {
                  'must': [
                    {
                      'match': {
                        'registrations.applicationId': 'efd4e504-4179-42d8-b6b2-97886a5b6c29'
                      }
                    },
                    {
                      'match': {
                        'registrations.roles': 'crew'
                      }
                    }
                  ]
                }
              }
            }
          }
        ]
      }
    })};
  }

  
  const tableColumns = [
    c('fullName', pipe(a => getProp('fullName', a)
      .alt((
        safe(hasProps(['firstName', 'lastName']), a)
        .map(({firstName, lastName}) => `${firstName} ${lastName}`)
        .chain(toStringValue)
      ))
      .alt(getProp('firstName', a).chain(toStringValue))
      .alt(getProp('lastName', a).chain(toStringValue))
      .alt(getProp('id', a).chain(toStringValue))
    ), true, null),
    {
      key: 'status',
      headerText: tc`status`,
      itemToProps: Maybe.Just,
      Component: withPreparedProps(DriverOnlineTag, identity),
      status: true,
      styles: null,
    }
  ];

  const filtersData = [
    {key: 'fullName', label: 'Name Surname', filter: 'text',},
    {key: 'status', label: 'Status', filter: 'multiselect', values: ['OFFLINE', 'ONLINE', 'DEACTIVATED']},
  ]

  const [queryParams, filters, columns, defaultFilter, toggleFilter] = useFilter(
    'crew_driver',
    tableColumns,
    filtersData,
    [],
    driversFilter
  );

  const api = useDrivers({filters: queryParams});

  useEffect(() => {
    // console.log(queryParams);
    api.mutate()
  }, [queryParams]);

  // console.log(api?.data);

  return {
    list: api?.data || [],
    rowKeyLens: getPropOr(0, 'id'),
    buttons: <Button onClick={() => nav(DriverCreateRoute.props.path)}>{t`create`}</Button>,
    breadcrumbs: (
      <Breadcrumbs>
        <Breadcrumbs.Item hasSlash={false}><span className='font-semibold'>{tb`drivers`}</span></Breadcrumbs.Item>
        <Button.NoBg onClick={toggleFilter}>
          {defaultFilter.id ? defaultFilter.name : tb('allData') } 
          <FilterIcon className='w-6 h-6 ml-2 text-gray-300 cursor-pointer inline-block focus:ring-0' />
        </Button.NoBg>
      </Breadcrumbs>
    ),
    innerlinks: (
      <Innerlinks>
        <Innerlinks.Item to={CrewListRoute.props.path}>{th('crews')}</Innerlinks.Item>
        <Innerlinks.Item isCurrent={true}>{th('drivers')}</Innerlinks.Item>
        <Innerlinks.Item to={DislocationListRoute.props.path}>{th('dislocation_zones')}</Innerlinks.Item>
      </Innerlinks>
    ),
    /**
     * @type {Array<import('../../../layout/ListingLayout/index.js').TableColumnComponent>}
     */
    tableColumns,
    columns,
    filters,
  }
});

export default DriverListLayout;
