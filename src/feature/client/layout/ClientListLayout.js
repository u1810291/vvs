import Breadcrumbs from '../../../components/Breadcrumbs';
import Button from 'components/Button';
import Innerlinks from 'components/Innerlinks';
import Listing from '../../../layout/ListingLayout';
import React, {useCallback, useEffect, useMemo} from 'react';
import raw from 'raw.macro';
import useClients from '../api/useClients';
import withPreparedProps from '../../../hoc/withPreparedProps';
import {ClientCreateRoute} from '../routes';
import {ClientEditRoute} from '../routes';
import {FilterIcon} from '@heroicons/react/solid';
import {HelpListRoute} from 'feature/help/routes';
import {alt} from 'crocks/pointfree';
import {format} from 'date-fns';
import {generatePath, Link, useNavigate} from 'react-router-dom';
import {useAuth} from '../../../context/auth';
import {useFilter} from 'hook/useFilter';
import {useObjectsDropdown} from 'feature/task/api/taskEditApi';
import {useTranslation} from 'react-i18next';
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

const ClientListLayout = withPreparedProps(Listing, () => {
  const {t: tb} = useTranslation('client', {keyPrefix: 'breadcrumbs'});
  const {t: tc} = useTranslation('client', {keyPrefix: 'field'});
  const {t} = useTranslation('client', {keyPrefix: 'list.column'});
  const {t: tp} = useTranslation('client');
  const nav = useNavigate();

  const c = (prop, mapper = identity, status, isSortable) => ({
    key: prop,
    headerText: tc(prop),
    status,
    isSortable,
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
    if (state['object_id']) {
      _search({where: {
        users: {
          object_id: {_in: state['object_id']}
        }
      }}).fork(console.error, (users) => {
        const ids = users.object[0]?.users.map(u => u.user_id);
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

    return {query: JSON.stringify({
      'bool': {
        'must': mustFilter
      }
    })};
  }, []);

  // TODO: Adjust column names regarding response data
  const tableColumns = [
    c('fullName', identity, true, false),
    c('contract_no', identity, true, false),
    c('mobilePhone', identity, true, false),
    c('username', identity, true, false),
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

  const [queryParams, filters, columns, defaultFilter, toggleFilter, setExportData, sortColumnKey, setSortColumn] = useFilter(
    'client',
    tableColumns,
    filtersData,
    [],
    clientsFilter,
  );

  const api = useClients({filters: queryParams});

  useEffect(() => {
    if (!isEmpty(queryParams)) {
      api.mutate();
    }    
    setExportData(api.data);
  }, [queryParams, sortColumnKey]);

  
  return {
    list: api?.data || [],
    rowKeyLens: getPropOr(0, 'id'),
    breadcrumbs: (
      <Breadcrumbs>
        <Breadcrumbs.Item hideSlash><span className='font-semibold'>{tb`clients`}</span></Breadcrumbs.Item>
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
    sortColumnKey, 
    setSortColumn
  }
});

export default ClientListLayout;
