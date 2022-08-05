import React from 'react';

import {InputGroup} from '.';
import Label from './Base/Label';

import {withComponentFactory, withMergedClassName} from 'util/react';

import {omit} from 'crocks';

export default withComponentFactory(InputGroup, {
  mapSetupInComponent: omit(['input']),
  Label,
  Input: withMergedClassName(
    'block w-full sm:text-sm border border-gray-300 text-gray-800 rounded-sm focus:outline-none',
    props => (<textarea {...props} />),
  )
});
