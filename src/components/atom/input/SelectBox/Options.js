import React, {forwardRef} from 'react';
import {Listbox} from '@headlessui/react';

const Options = forwardRef((props, ref) => (
  <Listbox.Options ref={ref} className='absolute z-50 mt-1 w-full bg-white max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm' {...props} />
));

Options.displayName = 'Options';

export default Options;
