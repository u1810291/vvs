import {onInputEventOrEmpty} from '@s-e/frontend/callbacks/event/input';
import {useEffect, useMemo, useReducer, useState} from 'react';
import {map} from 'crocks';
import Button from 'components/Button';
import Nullable from 'components/atom/Nullable';

// import {CalendarIcon} from '@heroicons/react/outline';
import {generate} from 'shortid';
import InputGroup from 'components/atom/input/InputGroup';
import DateTimePicker from 'components/DateTimePicker';



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

const prepQuery = (tableName, query, filters, currentValues) => {
  const [params, where] = prepParts(filters, currentValues);

  let finalQuery = `query ${tableName}s${params}{
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
            <DateTimePicker key={key} />

            {/* <div className='relative grid grid-cols-1 gap-x-14 md:grid-cols-2'>
              <button
                type='button'
                className='absolute -top-1 -left-1.5 flex items-center justify-center p-1.5 text-gray-400 hover:text-gray-500'
              >
                <span className='sr-only'>Previous month</span>
                <ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />
              </button>
              <button
                type='button'
                className='absolute -top-1 -right-1.5 flex items-center justify-center p-1.5 text-gray-400 hover:text-gray-500'
              >
                <span className='sr-only'>Next month</span>
                <ChevronRightIcon className='h-5 w-5' aria-hidden='true' />
              </button>
              {months.map((month, monthIdx) => (
                <section
                  key={monthIdx}
                  className={classNames(monthIdx === months.length - 1 && 'hidden md:block', 'text-center')}
                >
                  <h2 className='font-semibold text-gray-900'>{month.name}</h2>
                  <div className='mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500'>
                    <div>M</div>
                    <div>T</div>
                    <div>W</div>
                    <div>T</div>
                    <div>F</div>
                    <div>S</div>
                    <div>S</div>
                  </div>
                  <div className='isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200'>
                    {month.days.map((day, dayIdx) => (
                      <button
                        key={day.date}
                        type='button'
                        className={classNames(
                          day.isCurrentMonth ? 'bg-white text-gray-900' : 'bg-gray-50 text-gray-400',
                          dayIdx === 0 && 'rounded-tl-lg',
                          dayIdx === 6 && 'rounded-tr-lg',
                          dayIdx === month.days.length - 7 && 'rounded-bl-lg',
                          dayIdx === month.days.length - 1 && 'rounded-br-lg',
                          'relative py-1.5 hover:bg-gray-100 focus:z-10'
                        )}
                      >
                        <time
                          dateTime={day.date}
                          className={classNames(
                            day.isToday && 'bg-indigo-600 font-semibold text-white',
                            'mx-auto flex h-7 w-7 items-center justify-center rounded-full'
                          )}
                        >
                          {day.date.split('-').pop().replace(/^0/, '')}
                        </time>
                      </button>
                    ))}
                  </div>
                </section>
              ))}
            </div> */}
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