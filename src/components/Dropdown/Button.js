import React from 'react';
import { Menu } from '@headlessui/react'
import {ChevronDownIcon} from '@heroicons/react/solid';

const Button = ({children = 'Options', ...props}) => (
  <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100 hover:bg-gray-50 rounded-md shadow-sm text-gray-700" {...props}>
    {children}
    <ChevronDownIcon aria-hidden="true" className="-mr-1 ml-2 h-5 w-5" />
  </Menu.Button>
);

export default Button;
