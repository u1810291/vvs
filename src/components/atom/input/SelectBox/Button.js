import React from 'react';

import Nullable from 'components/atom/Nullable';

import {Listbox} from '@headlessui/react';
import {ChevronDownIcon} from '@heroicons/react/solid';

import {withMergedClassName} from 'util/react';

import {defaultProps} from 'crocks';

const Button = ({displayName, placeholder, ...props}) => (
  <Listbox.Button
    {...defaultProps(
      {
        type: 'button',
        className: 'focus:ring-1 focus:ring-indigo-500 rounded-md focus:border-indigo-500 bg-white h-8 relative w-full border shadow-sm border-gray-300 pl-3 pr-10 py-1 text-left cursor-default focus:outline-none sm:text-sm'
      }, props
    )}
  >
    <span className='block truncate'>{displayName}</span>
    <Nullable on={placeholder && !displayName}>
      <span className='text-slate-500'>{placeholder}</span>
    </Nullable>
    <span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
      <ChevronDownIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
    </span>
  </Listbox.Button>
)

export default withMergedClassName(
  'focus:ring-0 focus:ring-offset-0 focus:border-gray-border rounded-sm bg-white h-8 relative w-full border border-gray-border pl-3 pr-10 py-1 text-left cursor-default sm:text-sm',
  Button
);
