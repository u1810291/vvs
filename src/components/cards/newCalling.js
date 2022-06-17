import React from 'react';

export function NewCallingCard() {
  return (
    <div
      className='flex flex-row border w-full h-10 bg-white justify-between hover:shadow items-center text-sm'
    >
      <div className='flex flex-row mx-6 items-center justify-between w-full'>
        <p className='text-gray-400 font-light font-xs'>14:46:00</p>
        <div className='flex flex-row items-center'>
            <img
              className='h-4 w-4 mr-2'
              src={require('../../assets/assets/call.png')}
            ></img>
            <img
              className='mr-2'
              src={require('../../assets/assets/redArrow.png')}
            ></img>
          </div>
        <div className='flex flex-row'>
          <p className='text-black font-light font-xs'>Pakeitė būsena į</p>
          <p className='text-black font-normal font-xs'>10 RG</p>
        </div>
        <p className='text-gray-400 font-light'>per 0:19</p>
      </div>
    </div>
  );
}
