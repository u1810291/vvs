import React from 'react';
const {BlueStatusTop} = require('../buttons/blueStatusTop');

export function NewHeader() {

  return (
    <div className='flex flex-row border h-16 bg-white border-b-2 justify-between w-full'>
      <div className='md:flex hidden md:flex-row ml-4 items-center'>
        <h4 className='text-lg ml-2 font-normal'>Užduotys</h4>
        <p className='pl-2 text-gray-600'>/</p>
        <h4 className='text-lg ml-2  font-normal text-gray-500'>
          Nauja užduotis
        </h4>
        <BlueStatusTop/>
        <div className='flex flex-col justify-center items-end'></div>
      </div>
      <div className='flex flex-row items-center'>
        <button
          type='submit'
          className='hidden sm:w-40 sm:h-10 rounded sm:flex mr-2 mt-2 mb-1 justify-center py-2 px-4 border border-transparent drop-shadow shadow text-sm font-light text-white font-montserrat hover:shadow-none bg-red-600 focus:outline-none'
        >
          Atšaukti
        </button>
        <button
          type='submit'
          className='hidden sm:w-40 sm:h-10 rounded sm:flex mr-2 mt-2 mb-1 justify-center py-2 px-4 border border-transparent hover:text-black text-sm font-light text-gray-400 font-montserrat hover:shadow-none bg-white-600 focus:outline-none'
        >
          Priskirkite Ekipažą
        </button>
      </div>
    </div>
  );
}
