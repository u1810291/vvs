import React from 'react';
import useLanguage from '../../../hook/useLanguage';

export const Object = ({
  id,
  object,
  name,
  address,
  contract,
  remove,
  ...props
}) => {
  const {english, lithuanian, t} = useLanguage();

  return (
    <div className='w-full' {...props}>
      <div className='w-full border-b grid grid-cols-7 bg-white grid-rows-1 grid-flow-row table-auto md:grid-cols-7 grid-gap-6 justify-between font-normal text-black z-1'>
        <div className='flex flex-row items-center h-12'>
          <span className='bg-white text-gray-400 truncate text-xs'>
            {object}
          </span>
        </div>
          <div className='flex flex-row items-center h-12 '>
          <span className='bg-white text-gray-400 truncate text-xs'>
            {name}
          </span>
        </div>
        <div className='flex flex-row items-center h-12 '>
          <span className='bg-white text-black truncate text-xs'>
            {address}
          </span>
        </div>
        <div className='flex flex-row items-center h-12 col-span-3'>
          <span className='bg-white text-black truncate text-xs'>
            {contract}
          </span>
        </div>
        <div className='flex flex-row items-center h-12 '>
          <button className='bg-white text-red-600 truncate text-xs'>
            {remove}
          </button>
        </div>
      </div>
    </div>
  );
};
