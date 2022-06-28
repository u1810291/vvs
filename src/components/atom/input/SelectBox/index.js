import Box from './Box';
import Label from './Label';
import Button from './Button';
import Option from './Option';
import Options from './Options';
import ContentContainer from './ContentContainer';

import {withComponentFactory} from '../../../../util/react';

/**
 * @TODO: when <Options> has no <Option> components,
 * it crashes when we want to show the list.
 */
const SelectBox = withComponentFactory(Box, {
  Label,
  Button,
  Options,
  Option,
  ContentContainer,
  optionClassNameFn: ({active}) => `cursor-default select-none relative py-2 pl-8 pr-4 ${active ? 'text-white bg-indigo-600' : 'text-gray-900'}`
});

export default SelectBox;
