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
  safe
} from 'crocks';
import Breadcrumbs from 'components/Breadcrumbs';
import {generatePath, Link} from 'react-router-dom';
import {ObjectEditRoute} from '../routes';
import {alt} from 'crocks/pointfree';
import InputGroup from 'components/atom/input/InputGroup';
import {onInputEventOrEmpty} from '@s-e/frontend/callbacks/event/input';
// import {asciifyLT} from '@s-e/frontend/transformer/string';
import {useCity} from '../api';
import SelectBox from 'components/atom/input/SelectBox';
// import useDebounce from 'hook/useDebounce';


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

  // filter fields
  const [name, setName] = useState('%%');
  const [address, setAddress] = useState('%%');
  const [cities, setCities] = useState([]);
  const [providerMin] = useState(0);
  const [providerMax, setRange] = useState(15000);

  const {api} = useAuth();
  const {t: tb} = useTranslation('object', {keyPrefix: 'breadcrumbs'});
  const {t} = useTranslation('object', {keyPrefix: 'list.column'});
  const [state, fork] = useAsync(chain(maybeToAsync('"object" prop is expected in the response', getProp('object')),
    api({name, address, cities, providerMin, providerMax}, 
      `
        query Objects($name: String, $address: String, $cities: [city_enum!], $providerMin:Int, $providerMax:Int) {
          object(where: {_and: [{name: {_ilike: $name}}, {address: {_ilike: $address}}, {city: {_in: $cities}}], provider_id: {_gte: $providerMin, _lte: $providerMax}}) {
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


  // api calls for filter
  const citiesDb = useCity(true);

  const [minRange, forkMinRange] = useAsync(chain(maybeToAsync('"object" prop is expected in the response', getProp('object')),
    api(undefined, 
      `
        query MinProviderId {
          object(limit: 1, order_by: {provider_id: asc}) {
            provider_id
          }
        }
      `)
  ));

  const [maxRange, forkMaxRange] = useAsync(chain(maybeToAsync('"object" prop is expected in the response', getProp('object')),
    api(undefined, 
      `
        query MaxProviderId {
          object(limit: 1, order_by: {provider_id: desc}) {
            provider_id
          }
        }
      `)
  ));

  // filter setters
  const setNameFilter = v => {
    // let q = asciifyLT(v.replace(/\W+/gm, ''));
    setName(`%${v}%`);
  }

  const setAddressFilter = v => {
    // let q = asciifyLT(v.replace(/\W+/gm, ''));
    setAddress(`%${v}%`);
  }

  const setCitiesFilter = v => {
    var idx = cities.indexOf(v.key);

    if (idx !== -1) {
      setCities(prevCities => [
        ...prevCities.slice(0, idx),
        ...prevCities.slice(idx + 1)
      ]);  
      return;
    }

    setCities(prevCities => [...prevCities, v.key]);
  }

  const setRangeFilter = v => {
    console.log(v);
    setRange(v);
  }









  const c = useMemo(() => getColumn(t, props => (
    <Link to={generatePath(ObjectEditRoute.props.path, {id: props?.id})}>
      {props?.children}
    </Link>
  )), [t]);

  // const ft = useMemo(() => getFilterText(t, props => (
  //   <div>{props?.id}</div>
  // )), [t]);


  useEffect(() => {
    // setCities(citiesDb);
    console.log('cities from api', citiesDb);
    // setCities(citiesDb);

    forkMinRange();
    forkMaxRange();

  }, [])

  useEffect(() => { 
    // console.log('name query: ', name);
    console.log('cities query', cities);

    fork() 
  }, [name, address, cities, providerMax]);



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
      <>
        <InputGroup
          inputwrapperClassName='relative'
          inputClassName='focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-10 sm:text-sm border-gray-300 rounded-full'
          
          label='Filter name'
          onChange={onInputEventOrEmpty(setNameFilter)}
        />

        <InputGroup
          inputwrapperClassName='relative'
          inputClassName='focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-10 sm:text-sm border-gray-300 rounded-full'
          
          label='Filter address'
          onChange={onInputEventOrEmpty(setAddressFilter)}
        />

        <SelectBox className={'lg:w-1/3 xl:w-1/4'} onChange={setCitiesFilter} label='Select cities' value={cities.join(', ')} multiple={true}>
          {map(
            value => (
              <SelectBox.Option key={value} value={value}>
                {value}
              </SelectBox.Option>
            ),
            citiesDb
          )}
        </SelectBox>
        
        <label className='block'>Selected range: {providerMax}</label>
        <input type='range' min={0} max={15000} value={providerMax} onChange={onInputEventOrEmpty(setRangeFilter)} />
      </>
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
