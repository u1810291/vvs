import React from 'react';
import {Combobox} from '@headlessui/react';
import {ChevronDownIcon} from '@heroicons/react/solid';

const Button = ({...props}) => (
  <Combobox.Button className='absolute inset-y-0 right-0 flex items-center px-2 focus:outline-none' {...props}>
    <ChevronDownIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
  </Combobox.Button>
);

export default Button;
