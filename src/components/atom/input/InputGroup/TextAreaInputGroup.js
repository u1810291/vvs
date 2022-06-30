import {omit} from 'crocks';
import {InputGroup} from '.';
import {withComponentFactory, withMergedClassName} from '../../../../util/react';
import Label from './Base/Label';

export default withComponentFactory(InputGroup, {
  mapSetupInComponent: omit(['input']),
  Label,
  Input: withMergedClassName(
    'block w-full sm:text-sm border border-gray-300 text-gray-800 rounded-sm focus:outline-none',
    props => (<textarea {...props} />),
  )
});
