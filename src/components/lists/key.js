import React from 'react';
import useLanguage from '../../hook/useLanguage';

export const KeyList = ({
  id,
  nr,
  objectnr,
  object,
  address,
  remove,
  ...props
}) => {
  const { english, lithuanian, t } = useLanguage();

  return (
    <div className='w-full' {...props}>
            <div className='w-full border-b grid grid-cols-12 bg-white grid-rows-1 grid-flow-row table-auto md:grid-cols-12 grid-gap-6 justify-between font-normal text-black z-1'>
              <div className='flex flex-row items-center h-12'>
                <button className='bg-white text-gray-400 truncate hover:text-gray-500 text-sm ml-1'>
                  {nr}
                </button>
              </div>
                <div className='flex flex-row items-center h-12 col-span-2'>
                <button className='bg-white text-gray-400 hover:text-gray-500 truncate text-sm'>
                  {objectnr}
                </button>
              </div>
              <div className='flex flex-row items-center h-12 col-span-4'>
                <button className='bg-white text-gray-400 hover:text-gray-500 truncate text-sm'>
                  {object}
                </button>
              </div>
              <div className='flex flex-row items-center h-12 col-span-4'>
                <button className='bg-white text-black hover:text-gray-500 truncate text-sm'>
                  {address}
                </button>
              </div>
              <div className='flex flex-row items-center h-12'>
                <button className='bg-white text-red-600 hover:text-red-200 truncate text-sm'>
                  {remove}
                </button>
              </div>
            </div>
          </div>
  );
};
