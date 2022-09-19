import Autocomplete from './Autocomplete';
import Box from './Box';
import Button from './Button';
import Input from './Input';
import InputContainer from './InputContainer';
import Label from './Label';
import Option from './Option';
import Options from './Options';
import {isFoldable, omit, chain, map, option, safe, curry, pipe, branch, merge, bimap} from 'crocks';
import {renderWithProps, withComponentFactory} from 'util/react';
import {withMergedClassName} from 'util/react'

const ComboBox = withComponentFactory(Box, {
  mapSetupInComponent: omit(['Autocomplete']),
  Autocomplete,
  Button,
  Input: withMergedClassName('max-h-8 w-full border border-gray-300 bg-white text-sm py-2 pl-3 pr-10 focus:outline-none', Input),
  InputContainer,
  Label,
  Option,
  Options,
  optionClassNameFn: ({active}) => `relative cursor-default select-none py-2 pl-8 pr-4 ${active ? 'bg-indigo-500 text-white' : 'text-gray-900'}`,
});

ComboBox.asOptions = curry(([getValue, getText], mFoldable) => pipe(
  chain(safe(isFoldable)),
  map(map(pipe(
    branch,
    bimap(getValue, getText),
    merge((value, children) => ({key: value, value, children})),
    renderWithProps(ComboBox.Option),
  ))),
  option([]),
)(mFoldable))

export default ComboBox;
