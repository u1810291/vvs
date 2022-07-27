import {useState, useMemo} from 'react';
import InputGroup from 'components/atom/input/InputGroup';
import {onInputEventOrEmpty} from '@s-e/frontend/callbacks/event/input';
import SelectBox from 'components/atom/input/SelectBox';
import {map} from 'crocks';
// import { option } from 'crocks/pointfree';


// TODO: 1) use reducer for filter updaters; 2) move out UI elements 3) set updater & keys as prop to UI elements

// filter fields
// const [cities, setCities] = useState([]);
// const [providerMin] = useState(0);
// const [providerMax, setRange] = useState(15000);

// [{key: 'name', type: 'String'},
// {key: 'address', type: 'String', initial: '%%'},]
// => { address: '%%'}

const prepInitials = (filters) => {
  const initials = {};

  filters.map(f => {
    if (f?.initial) {
      initials[f.key] = f.initial;
    }
  });

  return initials;
}

const prepParts = (filters, currentValues) => {
  const params = [];
  const where = [];

  filters.map(f => {
    if (f.key in currentValues && currentValues[f.key] || f?.initial) {
      params.push(`\$${f.key}: ${f.type}`);

      // where: 
      // check if select -> _eq
      // check if multi select -> _in []
      // check if range -> _gte && _lte
      // check if date ->

      where.push(`{${f.key}: {_ilike: $${f.key}}}`);
    }
  });

  return [
    params.length > 0 ? `(${params.join(', ')})` : '',
    where.length > 0 ? `(where: {_and: [${where.join(', ')}]})` : '',
  ];
}

const prepQuery = (name, query, filters, currentValues) => {
  const [params, where] = prepParts(filters, currentValues);

  let finalQuery = `query ${name}s${params}{
    ${name}${where} {
      ${query}
    }
  }`;

  // console.log(initials, finalQuery);

  return finalQuery;
}

export const useFilter = (name, q, filtersData) => {
  const [filterValues, setFilterValues] = useState(prepInitials(filtersData));

  const query = useMemo(() => prepQuery(name, q, filtersData, filterValues), [filterValues]);

  // console.log('initial', filtersData);

  // filter with ilike & %{query}%
  const updateTextFilter = (v, k) => {
    if (v) {
      filterValues[k] = `%${v}%`;
    } else {
      delete filterValues[k];
    }

    setFilterValues({...filterValues})

    console.log('set filter values state: ' + filterValues.toString());
  }

  const updateSelectFilter = (v, k) => {
    console.log('on change', v, k);

    if (!(k in filterValues)) {
      filterValues[k] = [v.key];
    } else {
      var idx = filterValues[k].indexOf(v.key);

      if (idx !== -1) {
        filterValues[k] = [
          ...filterValues[k].slice(0, idx),
          ...filterValues[k].slice(idx + 1)
        ];
      } else {
        filterValues[k] = [...filterValues[k], v.key];
      }
    }

    if (filterValues[k].length == 0) delete filterValues[k];

    setFilterValues({...filterValues});
  }

  // updateSelectFilter = ...
  // updateRangeFilter = ...

  // useEffect(() => {
  //   setQuery(prepQuery(name, q, filtersData, filterValues));

  //   console.log('filter now: ' + filterValues.toString());
  //   console.log('query now: ' + query);
  // }, [filterValues])


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

      <SelectBox className={'lg:w-1/3 xl:w-1/4'} onChange={v => updateSelectFilter(v, 'city')} label='Select cities' value={'city' in filterValues ? filterValues['city'].join(', ') : ''} multiple={true}>
        {map(
          value => (
            <SelectBox.Option key={value} value={value}>
              {value}
            </SelectBox.Option>
          ),
          ['KAUNAS']  // get from initials
          // 'initial' in filtersData['cities'] ? filtersData['cities'].initial : []
        )}
      </SelectBox>

      {/* Date picker */}

      {/* 
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