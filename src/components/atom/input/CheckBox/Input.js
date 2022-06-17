import React from 'react';
import {Combobox} from '@headlessui/react';

const Input = ({...props}) => (
  <div className='flex items-center h-5'>
    <input
      type='checkbox'
      className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded'
      {...props}
    />
  </div>
);

export default Input;
