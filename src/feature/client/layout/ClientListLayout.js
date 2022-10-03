import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {generatePath, Link, useNavigate} from 'react-router-dom';

import Listing from '../../../layout/ListingLayout';
import Breadcrumbs from '../../../components/Breadcrumbs';
import withPreparedProps from '../../../hoc/withPreparedProps';

import {useTranslation} from 'react-i18next';
import {useAuth} from '../../../context/auth';

import {
  getPropOr,
  identity,
  map,
  pipe,
  safe,
  and,
  hasProp,
  propSatisfies,
  isTruthy,
  pick,
  not,
  isEmpty,
  flip,
} from 'crocks';
import {alt} from 'crocks/pointfree';
import Innerlinks from 'components/Innerlinks';
import {HelpListRoute} from 'feature/help/routes';
import useClients from '../api/useClients';
import {ClientEditRoute} from '../routes';
import {useFilter} from 'hook/useFilter';
import Button from 'components/Button';
import {DocumentDownloadIcon, FilterIcon} from '@heroicons/react/solid';
import {format} from 'date-fns';
import {ClientCreateRoute} from '../routes';
import {useObjectsDropdown} from 'feature/task/api/taskEditApi';
import raw from 'raw.macro';
import {exportTableToExcel} from 'util/utils';


const ClientListLayout = withPreparedProps(Listing, props => {
  const [data, setData] = useState();
  const {apiQuery} = useAuth();
  const {t: tb} = useTranslation('client', {keyPrefix: 'breadcrumbs'});
  const {t: tc} = useTranslation('client', {keyPrefix: 'field'});
  const {t} = useTranslation('client', {keyPrefix: 'list.column'});
  const {t: tp} = useTranslation('client');
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
        <Link to={generatePath(ClientEditRoute.props.path, {id})}>
          {children || fallback}
        </Link>
      )
    },
  });

  const boolCol = useMemo(() => pipe(String, t), [t]);
  const dateCol = (d) => format(new Date(d), 'Y-MM-dd HH:mm');
  const toStringValue = pipe(
    a => String(a || '').trim(),
    safe(not(isEmpty)),
  );

  
  const auth = useAuth();
  const _search = flip(auth.api)(raw('../api/graphql/GetUsersByObjects.graphql'));
  const _getByQuery = flip(auth.api)(raw('../api/graphql/GetClientsByQuery.graphql'));

  const {data: objectsDropdown} = useObjectsDropdown({filters: {}});

  // custom filter
  const clientsFilter = useCallback((state, filtersData) => {
    // console.log(state);

    if (state['object_id']) {
      _search({where: {
        users: {
          object_id: {_in: state['object_id']}
        }
      }}).fork(console.error, (users) => {
        // console.log(users.object[0]?.users);

        const ids = users.object[0]?.users.map(u => u.user_id);
        // console.log(ids);

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

        // by role 'customer'
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
                      'registrations.roles': 'customer'
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
          // console.log(data, 'byQuery');
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
      })
    })

    const filterEmail = {
      'wildcard': {
        'username': {
          'value': `${state['username'] ? `*${state['username'].replaceAll('%', '')}*` : '*'}`
        }
      }
    };

    const filterMobilePhone = {
      'wildcard': {
        'mobilePhone': {
          'value': `${state['mobilePhone'] ? `*${state['mobilePhone'].replaceAll('%', '')}*` : '*'}`
        }
      }
    };

    if (state['username']) mustFilter.push(filterEmail);
    if (state['mobilePhone']) mustFilter.push(filterMobilePhone);
    
    // by role 'customer'
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
                  'registrations.roles': 'customer'
                }
              }
            ]
          }
        }
      }
    })

    // console.log(mustFilter);

    return {query: JSON.stringify({
      'bool': {
        'must': mustFilter
      }
    })};
  }, []);

  // TODO: Adjust column names regarding response data
  const tableColumns = [
    c('fullName', identity, true),
    c('contract_no', identity, true),
    c('mobilePhone', identity, true),
    c('username', identity, true),
  ];

  const filtersData = [
    {key: 'fullName', label: 'Name Surname', filter: 'text'},
    {key: 'username', label: 'Email', filter: 'text'},
    {key: 'mobilePhone', label: 'Phone', filter: 'text'},
    {key: 'object_id', label: 'Object', filter: 'autocomplete', values: objectsDropdown || [], displayValue: (v) => {
      const obj = objectsDropdown?.find(o => o.value === v);
      return obj?.name ?? obj?.value;
    }},
  ]
  const handleExport = useCallback(() => exportTableToExcel(data, new Date()), [data]);

  const downloadBtn =  <DocumentDownloadIcon onClick={handleExport} className='w-6 h-6 ml-2 text-gray-300 cursor-pointer inline-block focus:ring-0' />

  const [queryParams, filters, columns, defaultFilter, toggleFilter] = useFilter(
    'client',
    tableColumns,
    filtersData,
    [],
    clientsFilter,
    downloadBtn
  );

  const api = useClients({filters: queryParams});
  // console.log(api?.data);

  useEffect(() => {
    setData(api.data);
  }, [api.data]);

  
  return {
    list: api?.data || [],
    rowKeyLens: getPropOr(0, 'id'),
    breadcrumbs: (
      <Breadcrumbs>
        <Breadcrumbs.Item><span className='font-semibold'>{tb`clients`}</span></Breadcrumbs.Item>
        <Button.NoBg onClick={toggleFilter}>
          {defaultFilter.id ? defaultFilter.name : tb('allData') }
          <FilterIcon className='w-6 h-6 ml-2 text-gray-300 cursor-pointer inline-block focus:ring-0' />
        </Button.NoBg>
      </Breadcrumbs>
    ),
    innerlinks: (
      <Innerlinks>
        <Innerlinks.Item isCurrent={true}>{tp('Clients')}</Innerlinks.Item>
        <Innerlinks.Item to={HelpListRoute.props.path}>{tp('Helps')}</Innerlinks.Item>
      </Innerlinks>
    ),
    buttons: (
      <>
        <Button onClick={() => nav(ClientCreateRoute.props.path)}>{tp('create')}</Button>
      </>
    ),
    tableColumns,
    columns,
    filters,
  }
});

export default ClientListLayout;
