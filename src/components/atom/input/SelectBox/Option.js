import React from 'react';
import {Listbox} from '@headlessui/react';
import {CheckIcon} from '@heroicons/react/solid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Option = ({selected, ...props}) => (
  <Listbox.Option {...props}>
    {({active}) => (
      <>
        <span className={classNames(selected === props.children ? 'font-semibold' : 'font-normal', 'block truncate')}>
          {props.children}
        </span>
        {selected === props.children ? (
          <span className={classNames(
            active ? 'text-white' : 'text-steel',
            'absolute inset-y-0 left-2 flex items-center pr-4'
          )}>
            <CheckIcon className='h-5 w-5' aria-hidden='true'/>
          </span>
        ) : null}
      </>
    )}
  </Listbox.Option>
);

export default Option;
