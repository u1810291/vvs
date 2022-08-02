import {onInputEventOrEmpty} from '@s-e/frontend/callbacks/event/input';
import {useEffect, useMemo, useReducer, useState} from 'react';
import {map} from 'crocks';
import Button from 'components/Button';
import Nullable from 'components/atom/Nullable';
import {format} from 'date-fns';

import {generate} from 'shortid';
import InputGroup from 'components/atom/input/InputGroup';
import DatePicker from 'components/DatePicker';
import {PencilIcon, TrashIcon, StarIcon} from '@heroicons/react/solid';
import {useSearchParams} from 'react-router-dom';



// CONST
const LS_KEY_NAME = 'listingFilters';
const DEFAULT_FILTER_NAME = 'New filter';
const APPLY_FILTER_PARAM = 'af';




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

const prepParts = (filters, values) => {
  const params = [];
  const where = [];

  filters.map(f => {
    // console.log(f);

    // if sigle date filter
    if (f.filter === 'date' ) {
      const keyStart = `${f.key}_start`;
      const keyEnd = `${f.key}_end`;

      if (keyStart in values && keyEnd in values && values[keyStart] && values[keyEnd] || f?.initial) {
        let param = `\$${f.key}_start: ${f.type}, \$${f.key}_end: ${f.type}`;
        let pred = `{${f.key}: {_gte: $${f.key}_start}}, {${f.key}: {_lte: $${f.key}_end}}`;
      
        params.push(param);
        where.push(pred);
      }
    }

    // TODO: check if date range -> _gte && _lte

    // if text, select, multiselect
    else if (f.key in values && values[f.key] || f?.initial) {
      let param = `\$${f.key}: ${f.type}`;
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
  const [params] = useSearchParams();

  // get saved for 'tableName' from filters
  const [savedFilters, setSavedFilters] = useState(getSavedFilters(tableName)); // TODO: is this a heavy operation? maybe 'useMemo'...

  // is this ok way?
  useEffect(() => {
    console.log('route params', params);

    if (params.get(APPLY_FILTER_PARAM)) {
      applyFilter(params.get(APPLY_FILTER_PARAM));
    }
  }, []);

  useEffect(() => {
    // save to local storage
    saveToStorage();
  }, [savedFilters]);


  const saveToStorage = () => {
    console.log('save to storage');

    const allSaved = getAllFilters();
    allSaved[tableName] = savedFilters;
    localStorage.setItem(LS_KEY_NAME, JSON.stringify(allSaved));
    
    window.dispatchEvent(new Event('storage'))
  }

  // can save filter
  const canSave = () => {
    let canSave = false;

    for (const [key, value] of Object.entries(state)) {
      if (value !== undefined || value !== null) {
        canSave = true;
        break;
      }
    }
    
    return canSave;
  }

  // save filter
  const saveFilter = () => {
    if (!canSave()) return;

    const id = generate();
    const newFilter = {
      id,
      name: DEFAULT_FILTER_NAME,
      starred: false,   // ???
      editMode: false,
      url: `${window.location.pathname}?${APPLY_FILTER_PARAM}=${id}`,  // will not work in Next.js SSR
      props: {
        tableName,
        query,
        filtersData,
        state 
      }
    }
      
    const newFilters = [...savedFilters, newFilter];
    
    setSavedFilters(newFilters);
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

  // delete filter
  const deleteFilter = (e) => {
    const id = e.currentTarget.id;
    const newFilters = savedFilters.filter(f => f.id !== id);
    
    setSavedFilters(newFilters);
  }

  // edit filter
  const editFilter = (e) => {
    const id = e.currentTarget.id;
    updateFilter(id, 'editMode', true);
  } 

  // star filter
  const starFilter = (e) => {
    const id = e.currentTarget.id;
    const filter = savedFilters.find(f => f.id === id);

    updateFilter(id, 'starred', !filter.starred);
  }

  // on filter name changed
  const onFilterNameChanged = (e) => {
    if (e.key !== 'Enter') return;

    const id = e.target.id;
    const newName = e.target.value;

    updateFilter(id, 'name', newName);
    updateFilter(id, 'editMode', false);
  }

  // blur
  const onFilterBlur = (e) => {
    const id = e.target.id;
    updateFilter(id, 'editMode', false);
  }

  // apply filter
  const applyFilter = (id) => {
    const filter = savedFilters.find(f => f.id === id);
    // TODO: check if filter found
    dispatch({type: 'APPLY', filter: filter.props.state});
  }
  
  const onApplyFilter = (e) => {
    const id = e.target.id;
    applyFilter(id);
  }



  const filters = useMemo(() => {
    // console.log('filters rendered with state', state, filtersData);

    return <>
      <Nullable on={savedFilters.length > 0}>
        {savedFilters.map(({id, editMode, name, starred}) => 
          <div key={id} className={'flex flex-row'}>
            
            <Nullable on={editMode}>
              <InputGroup id={id} defaultValue={name} onKeyDown={onFilterNameChanged} onBlur={onFilterBlur} autoFocus />
            </Nullable>

            <Nullable on={!editMode}>
              <span onClick={onApplyFilter} id={id} className={'cursor-pointer hover:opacity-50 active:opacity-80'}>{name}</span>
            </Nullable>

            <PencilIcon onClick={editFilter} id={id} className={'h-5 w-5 cursor-pointer hover:opacity-50 ml-1 mr-1'} />
            <TrashIcon onClick={deleteFilter} id={id} className={'h-5 w-5 cursor-pointer hover:opacity-50 mr-1'} />
            <StarIcon onClick={starFilter} id={id} className={`${starred ? 'bg-yellow-500' : ''} h-5 w-5 cursor-pointer hover:opacity-50`} />

          </div>
        )}
      </Nullable>

      {filtersData.map(({key, label, filter, Component, Child, values}) => {
        // select or multiselect
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
        
        // date
        else if (filter === 'date') {
          // console.log('it is a date with: ', state[`${key}_start`]);

          return <DatePicker 
            key={key} 
            label={label} 
            defaultValue={state[`${key}_start`] ? new Date(state[`${key}_start`]) : null} 
            onChange={v => dispatch({type: filter.toUpperCase(), value: v, key: key})} 
          />
        }

        // TODO: Date picker range

        // rest (text)
        return <Component 
          inputwrapperClassName='relative'
          inputClassName='focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-10 sm:text-sm border-gray-300 rounded-full'
          key={key} 
          label={label}
          defaultValue={state[key] ? state[key].replace(/%/g, '') : ''}
          onChange={onInputEventOrEmpty(v => dispatch({type: filter.toUpperCase(), value: v, key: key}))} />
        })}

        <Button className={'mt-2'} onClick={saveFilter}>Save Filter</Button>
      </>
    }, [state, savedFilters]
  );

  return [
    query,
    state,
    filters,
  ]
}