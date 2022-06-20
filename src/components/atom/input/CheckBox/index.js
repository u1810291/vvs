import React from 'react';
import {withComponentFactory} from '../../../../util/react';

import Box from './Box';
import Input from './Input';
import Label from './Label';
import CheckboxContainer from './CheckboxContainer';
import InlineDesc from './OneLineDescription';
import MultilineDesc from './MultiLineDescription';
import DetailsContainer from './DetailsContainer';
import {omit} from 'crocks';

const CheckBox = withComponentFactory(Box, {
  mapSetupInComponent: omit(['InlineDesc', 'MultilineDesc']),
  Input,
  Label,
  CheckboxContainer,
  DetailsContainer,
  InlineDesc,
  MultilineDesc,
});

export default CheckBox;
