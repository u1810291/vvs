import React from 'react';
import {Combobox} from '@headlessui/react';
import {CheckIcon} from '@heroicons/react/solid';
import {withMergedClassName} from '../../util/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Option = (props) => (
  <Combobox.Option
    {...props}
  >
    {({ active, selected }) => (
      <>
        <span className={classNames('block truncate', selected && 'font-semibold')}>{props.children}</span>
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
);

export default Option;
