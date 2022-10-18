import Breadcrumbs from '../../../components/Breadcrumbs';
import Button from 'components/Button';
import DriverOnlineTag from '../component/DriverOnlineTag';
import Innerlinks from 'components/Innerlinks';
import ListingLayout from '../../../layout/ListingLayout';
import React, {useCallback, useEffect, useMemo} from 'react';
import raw from 'raw.macro';
import useDrivers from '../api/useDrivers';
import withPreparedProps from '../../../hoc/withPreparedProps';
import {CrewListRoute} from 'feature/crew/routes';
import {DislocationListRoute} from 'feature/dislocation/routes';
import {DriverCreateRoute, DriverEditRoute} from '../routes';
import {FilterIcon} from '@heroicons/react/solid';
import {alt} from 'crocks/pointfree';
import {generatePath, Link, useNavigate} from 'react-router-dom';
import {useAuth} from 'context/auth';
import {useFilter} from 'hook/useFilter';
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
  flip,
} from 'crocks';

const getColumn = curry((t, Component, key, mapper, status, styles, isSortable) => ({
  Component,
  headerText: t(key),
  key,
  status,
  isSortable,
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
  const {t: tb} = useTranslation('driver', {keyPrefix: 'breadcrumbs'});
  const {t: th} = useTranslation('driver', {keyPrefix: 'list.header'});
  const nav = useNavigate();

  const c = useMemo(() => getColumn(t, props => (
    props?.id && <Link className={props?.className} to={generatePath(DriverEditRoute.props.path, {id: props?.id})}>
      {props?.children}
    </Link>
  )), [t]);

  const toStringValue = pipe(
    a => String(a || '').trim(),
    safe(not(isEmpty)),
  );
  
  const auth = useAuth();
  const _search = flip(auth.api)(raw('../api/graphql/GetUserSettings.graphql'));
  const _getByQuery = flip(auth.api)(raw('../api/graphql/GetDriversByQuery.graphql'));

  const driversFilter = useCallback(state => {
    if ('status' in state) {
      _search({where: {
        _and: {
          is_online: {
            _in: state['status'].map(s => s === 'OFFLINE' ? 'No' : 'Yes') // only OFFLINE/ONLINE 
          }
        }
      }}).fork(console.error, (users) => {
        const ids = users.user_settings.map(u => u.id);

        const mustFilter = [];

        state['fullName']?.split(' ').forEach(s => {
          mustFilter.push({
            'wildcard': {
              'fullName': {
                'value': `*${s.replaceAll('%', '')}*`
              }
            }
          });
        });

        // add ids
        mustFilter.push({
          'terms': {
            'id': ids || []
          }
        });

        // by role 'crew'
        mustFilter.push({
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
        })

        const query = {
          'bool': {
            'must': mustFilter
          }
        }

        _getByQuery({query: JSON.stringify(query)}).fork(console.error, (data) => {
          api.mutate(data.usersByQuery.users);
        })
      });

      return {};
    }

    const mustFilter = [];

    state['fullName']?.split(' ').forEach(s => {
      mustFilter.push({
        'wildcard': {
          'fullName': {
            'value': `*${s.replaceAll('%', '')}*`
          }
        }
      });
    });

    // by role 'crew'
    mustFilter.push({
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
    })

    return {query: JSON.stringify({
      'bool': {
        'must': mustFilter
      }
    })};
  }, []);

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
    ), true, null, false),
    {
      key: 'status',
      headerText: tc`status`,
      itemToProps: Maybe.Just,
      Component: withPreparedProps(DriverOnlineTag, identity),
      status: true,
      styles: null,
      isSortable: true,
    }
  ];

  const filtersData = [
    {key: 'fullName', label: 'Name Surname', filter: 'text',},
    {key: 'status', label: 'Status', filter: 'multiselect', values: ['OFFLINE', 'ONLINE', 'DEACTIVATED']},
  ]

  const [queryParams, filters, columns, defaultFilter, toggleFilter, setExportData, sortColumnKey, setSortColumn] = useFilter(
    'crew_driver',
    tableColumns,
    filtersData,
    [],
    driversFilter
  );
 
  const api = useDrivers({filters: queryParams});

  useEffect(() => {
    if (!isEmpty(queryParams)) {
      api.mutate();
    }
    setExportData(api.data);
  }, [queryParams, sortColumnKey]);

  return {
    list: api?.data || [],
    rowKeyLens: getPropOr(0, 'id'),
    buttons: <Button onClick={() => nav(DriverCreateRoute.props.path)}>{t`create`}</Button>,
    breadcrumbs: (
      <Breadcrumbs>
        <Breadcrumbs.Item hideSlash><span className='font-semibold'>{tb`drivers`}</span></Breadcrumbs.Item>
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
    sortColumnKey, 
    setSortColumn
  }
});

export default DriverListLayout;
