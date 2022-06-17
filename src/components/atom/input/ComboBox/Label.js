import React from 'react';
import {Combobox} from '@headlessui/react';

const Label = ({...props}) => (<Combobox.Label className='block text-sm font-medium text-gray-700' {...props} />)

export default Label;
