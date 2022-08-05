import React from 'react';
import {Listbox} from '@headlessui/react';
import {ChevronDownIcon} from '@heroicons/react/solid';
import Nullable from 'components/atom/Nullable';

const Button = ({displayName, placeholder, props}) => {
  return <Listbox.Button
    className='bg-white h-[32px] relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' {...props}>
    <span className='block truncate'>{displayName}</span>

    <Nullable on={placeholder && !displayName}>
      <span className='text-slate-500'>{placeholder}</span>
    </Nullable>

    <span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
      <ChevronDownIcon className='h-5 w-5 text-gray-400' aria-hidden='true'/>
    </span>
  </Listbox.Button>
};
export default Button;
