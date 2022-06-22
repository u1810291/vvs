import React from 'react';
import useLanguage from '../../hook/useLanguage';

export const KeyInternal = ({
  id,
  name,
  city,
  address,
  objectnr,
  contractnr,
  sendcrew,
  add,
  ...props
}) => {
  const {english, lithuanian, t} = useLanguage();

  return (
    <div className='w-full' {...props}>
      <div className='w-full border-b grid grid-cols-12 bg-white grid-rows-1 grid-flow-row table-auto md:grid-cols-12 grid-gap-6 justify-between font-normal text-black z-1'>
        <div className='flex flex-row items-center h-12 col-span-2'>
          <button className='bg-white text-gray-400 truncate hover:text-gray-500 text-xs ml-1'>
            {name}
          </button>
        </div>
        <div className='flex flex-row items-center h-12'>
          <button className='bg-white text-gray-400 hover:text-gray-500 truncate text-xs'>
            {city}
          </button>
        </div>
        <div className='flex flex-row items-center h-12 col-span-2'>
          <button className='bg-white text-gray-400 hover:text-gray-500 truncate text-xs'>
            {address}
          </button>
        </div>
        <div className='flex flex-row items-center h-12'>
          <button className='bg-white text-gray-400 hover:text-gray-500 truncate text-xs'>
            {objectnr}
          </button>
        </div>
        <div className='flex flex-row items-center h-12'>
          <button className='bg-white text-gray-400 hover:text-gray-500 truncate text-xs'>
            {contractnr}
          </button>
        </div>
        <div className='flex flex-row items-center h-12'>
          <button className='bg-white text-gray-400 hover:text-gray-500 truncate text-xs'>
            {sendcrew}
          </button>
        </div>
        <div className='flex flex-row items-center h-12 col-span-3'>
        <button className='flex justify-center mr-2 rounded-sm px-6 border border-transparent text-xs font-normal text-white font-montserrat hover:shadow-none bg-slate-600 hover:bg-slate-500 focus:outline-none'>
          Pridėti
        </button>
        </div>
      </div>
    </div>
  );
};
