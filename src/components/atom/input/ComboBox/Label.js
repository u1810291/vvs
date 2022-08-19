import React from 'react';
import {Combobox} from '@headlessui/react';

const Label = ({...props}) => (<Combobox.Label className='mt-1 block text-sm text-gray-700' {...props} />)

export default Label;
