import {useState} from 'react';
import InputGroup from 'components/atom/input/InputGroup';
import {onInputEventOrEmpty} from '@s-e/frontend/callbacks/event/input';
import {pipe, safe, isArray, getPath, isEmpty, map, not, tap, chain} from 'crocks';
import {option} from 'crocks/pointfree';


// filter fields
// const [cities, setCities] = useState([]);
// const [providerMin] = useState(0);
// const [providerMax, setRange] = useState(15000);

// [{key: 'name', type: 'String'},
// {key: 'address', type: 'String', initial: '%%'},]

const prepInitialValues = (filters) => pipe(
  safe(isArray),
  tap(console.log),
  safe(hasProps(['key', 'type', 'initial'])),
  map(f => chain(safe(not(isEmpty), getPath(['initial'], f))), option([])),

  // pick (key)
  // either (fail, result)
  // mapProps ?

  tap(e => console.log(e.toString()))
)(filters);


// => { address: '%%'}

const prepQuery = (query, filterColumns) => {
  return `query Objects($name: String, $address: String) {
    object(where: {_and: [{name: {_ilike: $name}}, {address: {_ilike: $address}}]}) {
      address
      city
      contract_no
      contract_object_no
      id
      is_atm
      longitude
      latitude
      name      provider_id
      phone
      navision_id
    }
  }
  `;
}

export const useFilter = (name, q, filtersData) => {
  const [filterValues, setFilterValues] = useState(prepInitialValues(filtersData));
  const [query, setQuery] = useState(prepQuery(name, q, filtersData));


  console.log(prepInitialValues(filtersData));

  // filter with like & %{query}%
  const updateTextFilter = (v, k) => {
    filterValues[k] = `%${v}%`;

    setFilterValues({
      ...filterValues,
    })
  }

  // updateSelectFilter = ...
  // updateRangeFilter = ...

  const filters = (
    <>
      <InputGroup
        inputwrapperClassName='relative'
        inputClassName='focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-10 sm:text-sm border-gray-300 rounded-full'

        label='Filter name'
        onChange={onInputEventOrEmpty(v => updateTextFilter(v, 'name'))}
      />

      <InputGroup
        inputwrapperClassName='relative'
        inputClassName='focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-10 sm:text-sm border-gray-300 rounded-full'

        label='Filter address'
        onChange={onInputEventOrEmpty(v => updateTextFilter(v, 'address'))}
      />

      {/* <SelectBox className={'lg:w-1/3 xl:w-1/4'} onChange={setCitiesFilter} label='Select cities' value={cities.join(', ')} multiple={true}>
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
        <input type='range' min={0} max={15000} value={providerMax} onChange={onInputEventOrEmpty(setRangeFilter)} /> */}
    </>
  );

  return [
    query,
    filterValues,
    filters,
  ]
}