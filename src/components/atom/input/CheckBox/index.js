import React from 'react';
import {withComponentFactory} from '../../../../util/react';

import Box from './Box';
import Input from './Input';
import Label from './Label';
import CheckboxContainer from './CheckboxContainer';
import OneLineDescription from './OneLineDescription';
import MultiLineDescription from './MultiLineDescription';
import DescriptionContainer from './DescriptionContainer';

const CheckBox = withComponentFactory(Box, {
  Input,
  Label,
  CheckboxContainer,
  DescriptionContainer,
  OneLineDescription,
  MultiLineDescription,
});

export default CheckBox;
