import {identity} from 'crocks';
import React from 'react';

export const Tag = ({
  value,
  children,
  onDelete = identity,
  ...props
}) => (
  <div data-value={value} value={value} onClick={onDelete} className='min-w-[4rem] cursor-pointer max-w-[12rem] m-1 p-1 rounded-sm text-xs font-normal text-gray-500 bg-gray-200 inline-flex items-center justify-between'>
    <span className='whitespace-nowrap leading-none align-baseline pointer-events-none'>{children}</span>
    <button {...props} className='focus:outline-none pointer-events-none'>
      <svg
        className='ml-2 block w-2 h-2 pointer-events-none'
        viewBox='0 0 8 8'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        {...props}
      >
        <path d='M1 7L7 1' stroke='#818BA2' />
        <path d='M1 1L7 7' stroke='#818BA2' />
      </svg>
    </button>
  </div>
);

export default Tag;