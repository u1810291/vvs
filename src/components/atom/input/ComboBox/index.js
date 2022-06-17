import React, {useState, useCallback, useMemo} from 'react';

import {Combobox} from '@headlessui/react';
import {CheckIcon, SelectorIcon} from '@heroicons/react/solid';

import Box from './Box';
import Label from './Label';
import Input from './Input';
import Button from './Button';
import Option from './Option';
import Options from './Options';
import InputContainer from './InputContainer';

import {withMergedClassName} from '../../../../util/react'
import {withComponentFactory} from '../../../../util/react';

import {omit} from 'crocks';

const ComboBox = withComponentFactory(Box, {
  // mapSetupInComponent: omit(['Option']),
  Label,
  InputContainer,
  Input: withMergedClassName('w-full border border-gray-300 bg-white text-sm py-2 pl-3 pr-10 focus:outline-none', Input),
  Button,
  Options,
  Option,
  optionClassNameFn: ({active}) => `relative cursor-default select-none py-2 pl-3 pr-9 ${active ? 'bg-indigo-500 text-white' : 'text-gray-900'}`
});

export default ComboBox;
