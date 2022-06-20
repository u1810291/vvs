import React from 'react';
import {Listbox} from '@headlessui/react';
import {CheckIcon} from '@heroicons/react/solid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Option = ({selected, ...props}) => (
  <Listbox.Option {...props}>
    {({ selected, active }) => (
      <>
        <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>{props.children}</span>
        {selected ? (
          <span
            className={classNames(
              active ? 'text-white' : 'text-indigo-600',
              'absolute inset-y-0 left-0 flex items-center pl-1.5'
            )}
          >
            <CheckIcon className='h-5 w-5' aria-hidden='true'/>
          </span>
        ) : null}
      </>
    )}
  </Listbox.Option>
);

export default Option;
