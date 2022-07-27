import {onInputEventOrEmpty} from '@s-e/frontend/callbacks/event/input';
import {useMemo, useReducer} from 'react';
// import InputGroup from 'components/atom/input/InputGroup';
// import {onInputEventOrEmpty} from '@s-e/frontend/callbacks/event/input';
// import SelectBox from 'components/atom/input/SelectBox';
// import {map} from 'crocks';
// import { withComponentFactory } from 'util/react';
// import { option } from 'crocks/pointfree';


// TODO: 
// +1) use reducer for filter updaters; 
// +2) move out UI elements 
// 3) set updater & keys as prop to UI elements
// ask about link to column picker (hidden column -> hides filter)
// ask about date filter
// ask about date range filter
// ask about saving filter (localhost + JSON.stringify)
// ask about filter styles ?


// filter fields
// const [cities, setCities] = useState([]);
// const [providerMin] = useState(0);
// const [providerMax, setRange] = useState(15000);

// [{key: 'name', type: 'String'},
// {key: 'address', type: 'String', initial: '%%'},]
// => { address: '%%'}

const updater = (state, action) => {
  // console.log(state);
  // console.log(action);
  
  const prevState = {...state};

  switch (action.type) {
    case 'TEXT':
      if (action.value) {
        prevState[action.key] = `%${action.value}%`;
      } else {
        delete prevState[action.key];
      }
  
      return {...prevState};
    
    case 'SELECT':
      if (!(action.key in prevState)) {
        prevState[action.key] = action.value.key;
      } else {
        var idx = prevState[action.key].indexOf(action.value.key);
  
        if (idx !== -1) {
          delete prevState[action.key];
        } else {
          prevState[action.key] = action.value.key;
        }
      }
  
      return {...prevState};

    case 'MULTISELECT':
      if (!(action.key in prevState)) {
        prevState[action.key] = [action.value.key];
      } else {
        var idx = prevState[action.key].indexOf(action.value.key);
  
        if (idx !== -1) {
          prevState[action.key] = [
            ...prevState[action.key].slice(0, idx),
            ...prevState[action.key].slice(idx + 1)
          ];
        } else {
          prevState[action.key] = [...prevState[action.key], action.value.key];
        }
      }

      if (prevState[action.key].length == 0) delete prevState[action.key];

      return {...prevState};    

    // updateSelectFilter = ...
    // updateRangeFilter = ...

    default:
      return prevState;
  }
}

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
      // +check if text -> _ilike
      // +check if select -> _eq
      // +check if multiselect -> _in []
      // check if date ->
      // check if range -> _gte && _lte
      let pred = '';

      switch (f.filter) {
        case 'select':
          pred = `{${f.key}: {_eq: $${f.key}}}`;
          break;
        
        case 'multiselect':
          pred = `{${f.key}: {_in: $${f.key}}}`;
          break;
        
        default:
          pred = `{${f.key}: {_ilike: $${f.key}}}`; // default is text
      }

      where.push(pred);
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
  const [state, dispatch] = useReducer(updater, prepInitials(filtersData));

  const query = useMemo(() => prepQuery(name, q, filtersData, state), [state]);

  // console.log('initial', filtersData);



  // useEffect(() => {
  //   setQuery(prepQuery(name, q, filtersData, state));

  //   console.log('filter now: ' + state.toString());
  //   console.log('query now: ' + query);
  // }, [state])


  const filters = (
    <>
      {filtersData.map(({key, label, filter, Component}) => (
        <Component 
          inputwrapperClassName='relative'
          inputClassName='focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-10 sm:text-sm border-gray-300 rounded-full'
          key={key} 
          label={label} 
          onChange={onInputEventOrEmpty(v => dispatch({type: filter.toUpperCase(), value: v, key: key}))} />     
      ))}

      {/* <SelectBox className={'lg:w-1/3 xl:w-1/4'} onChange={v => dispatch({type: 'SELECT', value: v, key: 'provider_name'})} label='Select provider_name' value={'provider_name' in state ? state['provider_name'] : ''}>
        {map(
          value => (
            <SelectBox.Option key={value} value={value}>
              {value}
            </SelectBox.Option>
          ),
          ['MONAS', 'PROVIDER_2']  // get from initials
          // 'initial' in filtersData['cities'] ? filtersData['cities'].initial : []
        )}
      </SelectBox>

      <SelectBox className={'lg:w-1/3 xl:w-1/4'} onChange={v => dispatch({type: 'MULTISELECT', value: v, key: 'city'})} label='Select cities' value={'city' in state ? state['city'].join(', ') : ''} multiple={true}>
        {map(
          value => (
            <SelectBox.Option key={value} value={value}>
              {value}
            </SelectBox.Option>
          ),
          ['KAUNAS', 'UTENA', 'VILNIUS']  // get from initials
          // 'initial' in filtersData['cities'] ? filtersData['cities'].initial : []
        )}
      </SelectBox> */}

      {/* Date picker */}

      {/* 
        <label className='block'>Selected range: {providerMax}</label>
        <input type='range' min={0} max={15000} value={providerMax} onChange={onInputEventOrEmpty(setRangeFilter)} /> */}
    </>
  );

  return [
    query,
    state,
    filters,
  ]
}