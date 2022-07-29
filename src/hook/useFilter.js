import {onInputEventOrEmpty} from '@s-e/frontend/callbacks/event/input';
import {useEffect, useMemo, useReducer, useState} from 'react';
import {map} from 'crocks';
import Button from 'components/Button';
import Nullable from 'components/atom/Nullable';
import {format} from 'date-fns';

// import {CalendarIcon} from '@heroicons/react/outline';
import {generate} from 'shortid';
import InputGroup from 'components/atom/input/InputGroup';
import DatePicker from 'components/DatePicker';



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

    case 'DATE':
      if (action.value) {
        const year = action.value.getFullYear();
        const month = action.value.getMonth();
        const day = action.value.getDate();

        // prevState[`${action.key}`] = `${format(new Date(year, month, day, 0, 0, 0), 'Y-MM-dd\'T\'HH:mm:ss.SSSXXX')}`;
        prevState[`${action.key}_start`] = `${format(new Date(year, month, day, 0, 0, 0), 'Y-MM-dd\'T\'HH:mm:ss.SSSXXX')}`;
        prevState[`${action.key}_end`] = `${format(new Date(year, month, day, 23, 59, 59), 'Y-MM-dd\'T\'HH:mm:ss.SSSXXX')}`;
      } else {
        // delete prevState[`${action.key}`];
        delete prevState[`${action.key}_start`];
        delete prevState[`${action.key}_end`];
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

    case 'APPLY':
      return action.filter;

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
    // console.log(f);


    // if sigle date filter
    if (f.filter === 'date' ) {
      const keyStart = `${f.key}_start`;
      const keyEnd = `${f.key}_end`;

      if (keyStart in currentValues && keyEnd in currentValues && currentValues[keyStart] && currentValues[keyEnd] || f?.initial) {
        let param = `\$${f.key}_start: ${f.type}, \$${f.key}_end: ${f.type}`;
        let pred = `{${f.key}: {_gte: $${f.key}_start}}, {${f.key}: {_lte: $${f.key}_end}}`;
      
        params.push(param);
        where.push(pred);
      }
    }

    // if text, select, multiselect
    else if (f.key in currentValues && currentValues[f.key] || f?.initial) {
      let param = `\$${f.key}: ${f.type}`;
      let pred = '';

      // where: 
      // +check if text -> _ilike
      // +check if select -> _eq
      // +check if multiselect -> _in []
      // check if date -> _gte && _lte
      // check if date range -> _gte && _lte

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

      params.push(param);
      where.push(pred);
    }

  });

  return [
    params.length > 0 ? `(${params.join(', ')})` : '',
    where.length > 0 ? `(where: {_and: [${where.join(', ')}]})` : '',
  ];
}

const prepQuery = (tableName, query, filters, currentValues) => {
  const [params, where] = prepParts(filters, currentValues);

  let finalQuery = `query ${tableName}${params}{
    ${tableName}${where} {
      ${query}
  }
}`;

  return finalQuery;
}

// get saved filters for [tableName] from localStorage
// structure: listingFilters: {'object': [{}], 'tasks': []}

const getAllFilters = () => {
  return JSON.parse(localStorage.getItem(LS_KEY_NAME)) ?? {};
}

const getSavedFilters = (tableName) => {
  const all = getAllFilters();
  return tableName in all ? all[tableName] : [];
}

export const useFilter = (tableName, q, filtersData, initialState) => {
  const [state, dispatch] = useReducer(updater, initialState ?? prepInitials(filtersData));
  const query = useMemo(() => prepQuery(tableName, q, filtersData, state), [state]);

  // get saved for 'tableName' from filters
  const [savedFilters, setSavedFilters] = useState(getSavedFilters(tableName));

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

    const newFilter = {
      id: generate(),
      name: 'New filter',
      starred: false,   // ???
      editMode: false,
      props: {
        tableName,
        query,
        filtersData,
        state
    }
  }
    
    const newFilters = [...savedFilters, newFilter];
    
    const allSaved = getAllFilters();
    allSaved[tableName] = newFilters;
    localStorage.setItem(LS_KEY_NAME, JSON.stringify(allSaved));

    //[...savedFilters, allSaved[tableName][allSaved[tableName].length - 1]]

    setSavedFilters(newFilters); 
}

  // delete filter
  const deleteFilter = (e) => {
    const id = e.target.id;
    const newFilters = savedFilters.filter(f => f.id !== id);
    
    const allSaved = getAllFilters();
    allSaved[tableName] = newFilters;
    localStorage.setItem(LS_KEY_NAME, JSON.stringify(allSaved));

    setSavedFilters(newFilters);
}

  // edit filter
  const editFilter = (e) => {
    const id = e.target.id;

    updateFilter(id, 'editMode', true);
}

  // update filter
  const updateFilter = (id, prop, value) => {
    const newFilters = [...savedFilters];

    newFilters.map(f => {
      if (f.id === id) {
        f[prop] = value;
    }
  })

    setSavedFilters(newFilters);
}

  // on filter name changed
  const onFilterNameChanged = (e) => {
    if (e.key !== 'Enter') return;

    const id = e.target.id;
    const newName = e.target.value;

    updateFilter(id, 'name', newName);
    updateFilter(id, 'editMode', false);

    const allSaved = getAllFilters();
    allSaved[tableName] = savedFilters;
    localStorage.setItem(LS_KEY_NAME, JSON.stringify(allSaved));
}

  // apply filter
  const applyFilter = (e) => {
    const id = e.target.id;
    const filter = savedFilters.find(f => f.id === id);

    dispatch({type: 'APPLY', filter: filter.props.state});
}

  const filters = useMemo(() => {
    // console.log('filters rendered');

    return <>
      <Nullable on={savedFilters.length > 0}>
        {savedFilters.map(({id, editMode, name}) => 
          <div key={id} className={'flex flex-row'}>
            
            <Nullable on={editMode}>
              <InputGroup id={id} defaultValue={name} onKeyDown={onFilterNameChanged}/>
            </Nullable>

            <Nullable on={!editMode}>
              <span onClick={applyFilter} id={id} className={'cursor-pointer hover:opacity-50 active:opacity-80'}>{name}</span>
            </Nullable>

            <Button.Xs onClick={editFilter} id={id} className={'h-5 w-5 cursor-pointer hover:opacity-50 mr-2'}>Edit</Button.Xs>
            <Button.Xs onClick={deleteFilter} id={id} className={'h-5 w-5 cursor-pointer hover:opacity-50'}>
              Delete
            </Button.Xs>

          </div>
        )}
      </Nullable>

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
        
        else if (filter === 'date') {
          return <>
            <DatePicker 
              key={key} 
              label={label} 
              defaultValue={state[key]} 
              onChange={v => dispatch({type: filter.toUpperCase(), value: v, key: key})} 
            />

          </>
      }

        return <Component 
          inputwrapperClassName='relative'
          inputClassName='focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-10 sm:text-sm border-gray-300 rounded-full'
          key={key} 
          label={label}
          defaultValue={state[key] ? state[key].replace(/%/g, '') : ''}
          onChange={onInputEventOrEmpty(v => dispatch({type: filter.toUpperCase(), value: v, key: key}))} />
    })}
      


      {/* Date picker range */}

      <Button onClick={saveFilter}>Save Filter</Button>

    </>
  }, [state, savedFilters]
  );

  return [
    query,
    state,
    filters,
  ]
}