import React from 'react';
import {Combobox} from '@headlessui/react';

const Options = ({...props}) => (
  <Combobox.Options className='absolute z-10 mt-1 max-h-60 w-full overflow-auto bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm' {...props}/>
);

export default Options;
