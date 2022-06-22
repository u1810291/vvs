import React from 'react';
import {Menu as HeadlessMenu} from '@headlessui/react';
import {Menu, Item, Items, Transition} from '../Dropdown';
import {withComponentFactory} from '../../util/react';
import {omit} from 'crocks';
import useLanguage from '../../hook/useLanguage';

const Dropdown = withComponentFactory(Menu, {
  mapSetupInComponent: omit(['Item']),
  Button: ({children, ...props}) => {
    const {t} = useLanguage();
    return (
      <HeadlessMenu.Button className='inline-flex justify-center w-full px-4 py-1 text-sm font-medium bg-white focus:outline-none hover:bg-gray-50 rounded-md hover:text-gray-900 text-gray-500' {...props}>
      <svg className='mr-2' width='15' height='16' viewBox='0 0 15 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M7.07057 15.0703V0.928943' stroke='#D7DEE6' strokeWidth='3'/>
      <path d='M-0.000134685 8.00038L14.1412 8.00038' stroke='#D7DEE6' strokeWidth='3'/>
      </svg>
      {t`Filter.Button.addColumn`}
      </HeadlessMenu.Button>
    )
  },
  Items,
  Transition,
  Item,
});

export default Dropdown;
