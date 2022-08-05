import React from 'react';
import {defaultProps} from 'crocks';
import {withMergedClassName} from 'util/react';

const Input = ({...props}) => (
  <div className='flex items-center h-5'>
    <input
      {...defaultProps({
        type: 'checkbox',
        className: 'focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded',
      }, props)}
    />
  </div>
);

export default withMergedClassName(
  'focus:ring-0 focus:ring-offset-0 h-6 w-6 text-steel border-gray-border rounded-sm',
  Input
);
