import React from 'react';

const Input = ({...props}) => (
  <div className='flex items-center h-5'>
    <input
      type='checkbox'
      className='focus:ring-0 focus:ring-offset-0 h-6 w-6 text-steel border-gray-border rounded-sm'
      {...props}
    />
  </div>
);

export default Input;
