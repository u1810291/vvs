import React from "react";
import {Combobox} from '@headlessui/react';
import {SelectorIcon} from '@heroicons/react/solid';

const Button = (props) => (
  <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none" {...props}>
    <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
  </Combobox.Button>
);

export default Button;
