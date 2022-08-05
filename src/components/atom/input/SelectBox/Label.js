import React from 'react';
import {Listbox} from '@headlessui/react';

const Label = ({...props}) => <Listbox.Label className='block text-sm font-medium text-gray-700' {...props} />;

export default Label;
