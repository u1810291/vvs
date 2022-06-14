import React from 'react';
import {Combobox} from '@headlessui/react';

const Input = (props) => (
  <Combobox.Input
    className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
    {...props}
  />
);

export default Input;
