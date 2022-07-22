import Listing from 'layout/ListingLayout';
import maybeToAsync from 'crocks/Async/maybeToAsync';
import useAsync from 'hook/useAsync';
import {titleCase} from '@s-e/frontend/transformer/string';
import {useAuth} from 'context/auth';
import {useEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import withPreparedProps from 'hoc/withPreparedProps';
import {
  and,
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
  safe,
} from 'crocks';
import Breadcrumbs from 'components/Breadcrumbs';
import {generatePath, Link} from 'react-router-dom';
import {ObjectEditRoute} from '../routes';
import {alt} from 'crocks/pointfree';
import InputGroup from 'components/atom/input/InputGroup';
import {onInputEventOrEmpty} from '@s-e/frontend/callbacks/event/input';
// import {asciifyLT} from '@s-e/frontend/transformer/string';

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

const getFilterText = curry((t, Component, key, pred, mapper) => ({
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

const ObjectList = withPreparedProps(Listing, (props) => {
  const [name, setName] = useState('%%');

  const {api} = useAuth();
  const {t: tb} = useTranslation('object', {keyPrefix: 'breadcrumbs'});
  const {t} = useTranslation('object', {keyPrefix: 'list.column'});
  const [state, fork] = useAsync(chain(maybeToAsync('"object" prop is expected in the response', getProp('object')),
    api({name}, 
      `
        query Objects($name: String) {
          object(where: {name: {_ilike: $name}}) {
            address
            city
            contract_no
            contract_object_no
            id
            is_atm
            longitude
            latitude
            name
            provider_name
            provider_id
            phone
            navision_id
          }
        }
      `)
  ));

  const setNameFilter = v => {
    // let q = asciifyLT(v.replace(/\W+/gm, ''));
    setName(`%${v}%`);
  }

  const c = useMemo(() => getColumn(t, props => (
    <Link to={generatePath(ObjectEditRoute.props.path, {id: props?.id})}>
      {props?.children}
    </Link>
  )), [t]);

  const ft = useMemo(() => getFilterText(t, props => (
    <div>{props?.id}</div>
  )), [t]);

  useEffect(() => { 
    console.log('name query: ', name);
    fork() 
  }, [name]);

  return {
    list: safe(isArray, state.data).option([]),
    rowKeyLens: getPropOr(0, 'id'),
    breadcrumbs: (
      <Breadcrumbs>
        <Breadcrumbs.Item><span className='font-semibold'>{tb`objects`}</span></Breadcrumbs.Item>
        <Breadcrumbs.Item>{tb`allData`}</Breadcrumbs.Item>
      </Breadcrumbs>
    ),
    filters: (
      <InputGroup
        inputwrapperClassName='relative'
        inputClassName='focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-10 sm:text-sm border-gray-300 rounded-full'
        
        label='Filter name'
        onChange={onInputEventOrEmpty(setNameFilter)}
      />
    ),
    tableColumns: [
      c('id', ne, identity),
      c('name', ne, identity),
      c('city', ne, titleCase),
      c('address', ne, identity),
      c('phone', ne, identity),
      c('longitude', ne, identity),
      c('latitude', ne, identity),
      c('contract_no', ne, identity),
      c('contract_object_no', ne, identity),
      c('provider_name', ne, titleCase),
      c('provider_id', isFinite, identity),
      c('navision_id',and(not(isEmpty), isFinite) , identity),
      c('is_atm', ne, bool => bool ? t('bool.yes') : t('bool.no')),
    ],
  }
});

export default ObjectList;
