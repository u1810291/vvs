import React from 'react';
import {Combobox} from '@headlessui/react';
import {CheckIcon} from '@heroicons/react/solid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Option = ({selected, ...props}) => (
  <Combobox.Option{...props}>
    {({active}) => (
      <>
        <span className={classNames('block truncate', selected && 'font-semibold')}>{props.children}</span>
        {selected && (
          <span
            className={classNames(
              'absolute inset-y-0 left-0 flex items-center pl-1.5',
              active ? 'text-white' : 'text-indigo-600'
            )}
          >
            <CheckIcon className='h-5 w-5' aria-hidden='true' />
          </span>
        )}
      </>
    )}
  </Combobox.Option>
);

export default Option;
