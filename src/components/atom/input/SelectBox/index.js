import Box from './Box';
import Button from './Button';
import ContentContainer from './ContentContainer';
import Label from './Label';
import Option from './Option';
import Options from './Options';
import {withComponentFactory} from 'util/react';

const SelectBox = withComponentFactory(Box, {
  Label,
  Button,
  Options,
  Option,
  ContentContainer,
  optionClassNameFn: ({active}) => `cursor-default select-none relative py-1 pl-8 pr-4 ${active ? 'text-white bg-steel' : 'text-gray-900'}`,
});

export default SelectBox;
