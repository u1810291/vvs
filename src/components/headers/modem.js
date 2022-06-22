import React from 'react';
import {ConnectedTop} from '../buttons/connectedModem';

export function ModemHeader({modemnr, ...props}) {

  return (
    <div className='flex flex-row h-16 border-b bg-white justify-between w-full'>
      <div className='md:flex hidden md:flex-row ml-4 items-center'>
        <h4 className='ml-2 text-normal font-normal'>Modemas</h4>
        <p className='pl-2 text-gray-600'>:</p>
        <h4 className='text-lg ml-2  font-normal'>
          {modemnr}
        </h4>
        <ConnectedTop />
        <div className='flex flex-col justify-center items-end'></div>
      </div>
      <div className='flex flex-row items-center'>
        <button
          type='submit'
          className='hidden sm:w-40 sm:h-10 rounded sm:flex mr-2 mt-2 mb-1 justify-center py-2 px-4 border border-transparent drop-shadow shadow text-sm font-light text-black font-montserrat hover:shadow-none bg-gray-200 focus:outline-none'
        >
          Atšaukti
        </button>
        <button
          type='submit'
          className='hidden sm:w-40 sm:h-10 rounded sm:flex mr-2 mt-2 mb-1 justify-center py-2 px-4 border border-transparent drop-shadow shadow text-sm font-light text-white font-montserrat hover:shadow-none bg-slate-600 hover:bg-slate-500 focus:outline-none'
        >
          Išsaugoti
        </button>
      </div>
    </div>
  );
}
