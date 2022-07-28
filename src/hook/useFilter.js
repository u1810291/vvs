import {onInputEventOrEmpty} from '@s-e/frontend/callbacks/event/input';
import {useEffect, useMemo, useReducer, useState} from 'react';
import {map} from 'crocks';
import Button from 'components/Button';


// TODO: 
// +1) use reducer for filter updaters; 
// +2) move out UI elements 
// +3) set updater & keys as prop to UI elements
// ask about link to column picker (hidden column -> hides filter)
// ask about date filter
// ask about date range filter
// ask about saving filter (localhost + JSON.stringify)
// ask about filter styles ?


// CONST
const LS_KEY_NAME = 'listingFilters';




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
      // check if date -> _eq
      // check if date range -> _gte && _lte
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

  return finalQuery;
}

// get saved filters for [name] from localStorage
// structure: listingFilters: { 'object': [{}], 'tasks': [] }

const getAllFilters = () => {
  return JSON.parse(localStorage.getItem(LS_KEY_NAME)) ?? {};
}

const getSavedFilters = (name) => {
  const allSaved = getAllFilters();
  return name in allSaved ? allSaved[name] : [];
}

export const useFilter = (name, q, filtersData, initialState) => {
  const [state, dispatch] = useReducer(updater, initialState ?? prepInitials(filtersData));
  const query = useMemo(() => prepQuery(name, q, filtersData, state), [state]);

  // get saved for 'name' from filters
  const [savedFilters, setSavedFilters] = useState(getSavedFilters(name));

  useEffect(() => {
    console.log(savedFilters);


  }, []);

  // can save filter
  const canSave = () => {
    // check whether state has any value ?
    return true;
  }

  // save filter
  const saveFilter = () => {
    if (!canSave()) return;

    const allSaved = getAllFilters();
    
    const newFilter = {
      name: 'New filter',
      starred: 'false',   // ???
      props: {
        name: name,
        query: query,
        filtersData: filtersData,
        initialState: state,
      }
    }

    if (name in allSaved) {
      allSaved[name].push({...newFilter, id: allSaved[name].length + 1});
    } else {
      allSaved[name] = [{...newFilter, id: 1}];
    }

    localStorage.setItem(LS_KEY_NAME, JSON.stringify(allSaved));

    savedFilters.push(allSaved[name].slice(-1))
    setSavedFilters({...savedFilters})

    console.log('new filters', savedFilters);
  }

  const filters = useMemo(() =>
    <>
      <div className={'flex flex-col'}>
        SAVED FILTERS:
        {savedFilters.map(({id, name}) => 
          <div key={id} className={'flex flex-row'}>
            {name}
            <Button.Xs>Edit</Button.Xs>
            <Button.Xs>Delete</Button.Xs>
          </div>
        )}
      </div>

      {filtersData.map(({key, label, filter, Component, Child, values}) => {
        if (filter === 'select' || filter === 'multiselect') {
          let currentValue = '';
          if (key in state && filter === 'select') {
            currentValue = state[key];
          } else if (key in state && filter === 'multiselect') {
            currentValue = state[key].join(', ');
          }

          return <Component 
            inputwrapperClassName='relative'
            inputClassName='focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-10 sm:text-sm border-gray-300 rounded-full'
            key={key} 
            label={label} 
            onChange={v => dispatch({type: filter.toUpperCase(), value: v, key: key})}
            multiple={filter === 'multiselect' ? true : false}  
            value={currentValue} 
          >
            {map(
              value => (
                <Child key={value} value={value}>
                  {value}
                </Child>
              ),
              values ?? []
            )}
          </Component>
        }

        return <Component 
          inputwrapperClassName='relative'
          inputClassName='focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-10 sm:text-sm border-gray-300 rounded-full'
          key={key} 
          label={label} 
          onChange={onInputEventOrEmpty(v => dispatch({type: filter.toUpperCase(), value: v, key: key}))} />
      })}
      
      {/* Date picker */}
      {/* Date picker range */}

      <Button onClick={saveFilter}>Save Filter</Button>

    </>, [state, savedFilters]
  );

  return [
    query,
    state,
    filters,
  ]
}