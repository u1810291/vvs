import Breadcrumbs from '../../../components/Breadcrumbs';
import Innerlinks from 'components/Innerlinks';
import Listing from '../../../layout/ListingLayout';
import React, {useCallback, useEffect} from 'react';
import withPreparedProps from '../../../hoc/withPreparedProps';
import {SettingListRoute} from 'feature/setting/routes';
import {TaskCancellationListRoute} from 'feature/classifier/routes';
import {UserCreateRoute, UserEditRoute} from '../routes';
import {alt} from 'crocks/pointfree';
import {generatePath, Link, useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {
  getPropOr,
  identity,
  isEmpty,
  map,
  not,
  pipe,
  safe,
  and,
  hasProp,
  propSatisfies,
  isTruthy,
  pick,
} from 'crocks';
import useUsers from '../api/useUsers';
import {FilterIcon} from '@heroicons/react/solid';
import Button from 'components/Button';
import {useFilter} from 'hook/useFilter';


const ne = not(isEmpty);

const UserListLayout = withPreparedProps(Listing, props => {
  const {t: tb} = useTranslation('user', {keyPrefix: 'breadcrumbs'});
  const {t} = useTranslation('user', {keyPrefix: 'list.column'});
  const {t: tp} = useTranslation('user');
  const nav = useNavigate();

  const c = (prop, mapper = identity, status, isSortable) => ({
    key: prop,
    headerText: t(prop),
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
        <Link to={generatePath(UserEditRoute.props.path, {id})}>
          {children || fallback}
        </Link>
      )
    },
  });
  
  const roleToStr = (reg) => {
    return reg.find(r => r.applicationId === 'efd4e504-4179-42d8-b6b2-97886a5b6c29').roles.join(', ');
  }

  const customFilter = useCallback((state, filtersData) => {    
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

    if (state['username']) mustFilter.push(filterEmail);

    mustFilter.push({
      'nested': {
        'path': 'registrations',
        'query': {
          'terms': {
            'registrations.roles': state['roles'] ?? ['admin', 'operator', 'master_operator', 'support']
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
    c('fullName', identity, true, false),
    c('registrations', roleToStr, true, false),
    c('status', identity, true, false),
  ];

  const filtersData = [
    {key: 'fullName', label: 'Name Surname', filter: 'text'},
    {key: 'username', label: 'Email', filter: 'text'},
    {key: 'roles', label: 'Role', filter: 'multiselect', values: ['admin', 'master_operator', 'operator', 'support']},
  ]

  const [queryParams, filters, columns, defaultFilter, toggleFilter, setExportData, sortColumnKey, setSortColumn] = useFilter(
    'user',
    tableColumns,
    filtersData,
    {canArchive: true},
    [],
    customFilter,
  );

  const api = useUsers({filters: queryParams});

  useEffect(() => {
    if (!isEmpty(queryParams)) {
      api.mutate();
    }    
    setExportData(api.data);
  }, [queryParams, sortColumnKey]);

  return {
    list: api?.data ?? [],
    rowKeyLens: getPropOr(0, 'id'),
    breadcrumbs: (
      <Breadcrumbs>
        <Breadcrumbs.Item><span className='font-semibold'>{tb`users`}</span></Breadcrumbs.Item>
        <Button.NoBg onClick={toggleFilter}>
          {defaultFilter.id ? defaultFilter.name : tb('allData') }
          <FilterIcon className='w-6 h-6 ml-2 text-gray-300 cursor-pointer inline-block focus:ring-0' />
        </Button.NoBg>
      </Breadcrumbs>
    ),
    innerlinks: (
      <Innerlinks>
        <Innerlinks.Item to={SettingListRoute.props.path}>{tp('Settings')}</Innerlinks.Item>
        <Innerlinks.Item to={TaskCancellationListRoute.props.path}>{tp('Classifiers')}</Innerlinks.Item>
        <Innerlinks.Item isCurrent={true}>{tp('Users')}</Innerlinks.Item>
      </Innerlinks>
    ),    
    buttons: (
      <>
        <Button onClick={() => nav(UserCreateRoute.props.path)}>{tp('create')}</Button>
      </>
    ),
    tableColumns,
    columns,
    filters,
    sortColumnKey, 
    setSortColumn
  }
});

export default UserListLayout;
