import React from 'react';

const SvgMarker = ({className, children}) => {
  return (
    <svg className={className} width='28' height='32' viewBox='0 0 28 32' fill='none' stroke='none' xmlns='http://www.w3.org/2000/svg'>
      <circle className='stroke-current' cx='14' cy='14' r='12.5' fill='white' stroke='#337F2D' strokeWidth='3'/>
      <path className='fill-current fill-current' d='M17.7929 27.5L14.0001 31.2929L10.2071 27.5L17.7929 27.5Z' fill='#337F2D' stroke='#337F2D'/>
      {children}
    </svg>
  );
};

export default SvgMarker;
