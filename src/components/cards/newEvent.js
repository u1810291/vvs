import React from 'react';

export function NewEventCard() {
  return (
    <div
      className='flex flex-row border w-full h-10 bg-white justify-start hover:shadow items-center text-sm'
    >
      <div className='flex flex-row mx-6 items-center justify-start w-full'>
      <p className='text-gray-400 font-light font-xs mx-1'>2021-07-14</p>
        <p className='text-gray-400 font-light font-xs mx-1'>14:46:00</p>
        <div className='flex flex-row'>
          <p className='text-black font-light font-xs mx-1'>Gautas įvykis</p>
          <p className='text-black font-normal font-xs mx-1'>Aliarmas 026 Zona</p>
        </div>
        <div className='flex justify-center font-xs self-center w-14 h-4 truncate rounded text-white bg-blue-400'>
            <p className='font-light font-xs text-xs'>Nauja</p>
          </div>
      </div>
    </div>
  );
}
