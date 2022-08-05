import {defaultProps} from 'crocks';
import {withMergedClassName} from '../../util/react';
import React from 'react';

const Button = ({children, ...props}) => (
  <button
    {...defaultProps(
      {
        type: 'button',
        className: 'bg-white h-[32px] relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-1 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-1'
      }, props
    )}>
    {children}
  </button>
);

export default withMergedClassName(
  'focus:ring-0 focus:ring-offset-0 focus:border-gray-border rounded-sm bg-white h-8 relative w-full border border-gray-border pl-3 pr-10 py-1 text-left cursor-default sm:text-sm',
  Button
);
