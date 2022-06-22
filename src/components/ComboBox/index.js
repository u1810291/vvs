import React, {useCallback, useEffect, useState} from 'react'

import {CheckIcon, SelectorIcon} from '@heroicons/react/solid'
import {Combobox} from '@headlessui/react'
import {identity} from 'crocks/combinators'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const ComboBox = ({values = [], label = null, onChange = identity}) => {
  const [query, setQuery] = useState('')
  const [selectedValue, setSelectedValue] = useState()

  const filteredValues =
    query === ''
      ? values
      : values.filter((value) => {
          return value.toLowerCase().includes(query.toLowerCase())
        })


  const filteredValuesClassName = useCallback(({active}) => classNames(
    'relative cursor-default select-none py-2 pl-3 pr-9',
    active ? 'bg-indigo-600 text-white' : 'text-gray-900'
  ), []);

  useEffect(() => onChange(selectedValue), [selectedValue]);

  return (
    <Combobox as='div' value={selectedValue} onChange={setSelectedValue}>
      {label ? (<Combobox.Label className='block text-sm font-medium text-gray-700'>{label}</Combobox.Label>) : null}
      <div className='relative mt-1'>
        <Combobox.Input
          className='w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm'
          onChange={useCallback((event) => setQuery(event.target.value), [setQuery])}
          displayValue={useCallback((value) => value, [])}
        />
        <Combobox.Button className='absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none'>
          <SelectorIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
        </Combobox.Button>

        {filteredValues.length > 0 && (
          <Combobox.Options className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
            {filteredValues.map((value) => (
              <Combobox.Option
                key={value}
                value={value}
                className={filteredValuesClassName}
              >
                {({active, selected}) => (
                  <>
                    <span className={classNames('block truncate', selected && 'font-semibold')}>{value}</span>

                    {selected && (
                      <span
                        className={classNames(
                          'absolute inset-y-0 right-0 flex items-center pr-4',
                          active ? 'text-white' : 'text-indigo-600'
                        )}
                      >
                        <CheckIcon className='h-5 w-5' aria-hidden='true' />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  )
}

export default ComboBox;
