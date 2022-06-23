import React from 'react';

export function NewStatusCard() {
  return (
    <div
      className='flex flex-row border w-full h-10 bg-white justify-between hover:shadow items-center text-sm'
    >
      <div className='flex flex-row mx-6 items-center justify-between w-full'>
        <p className='text-gray-400 font-light font-xs'>14:46:00</p>
        <p className='text-black font-normal font-xs'>10 RG</p>
        <div className='flex flex-row'>
          <p className='text-black font-light mr-2 font-xs'>Pakeitė būsena į</p>
          {/* <div className='flex justify-center self-center w-24 h-4 truncate rounded text-white bg-red-800'>
          <p className='font-light text-xs'>apžiūri objekta</p>
        </div> */}
          {/* <div className='flex justify-center self-center w-16 h-4 truncate rounded text-white bg-red-800'>
            <p className='font-light text-xs'>Važiuoja</p>
          </div> */}
          <div className='flex justify-center self-center w-16 h-4 truncate rounded text-white bg-yellow-500'>
            <p className='font-light text-xs'>apžiūrėta</p>
          </div>
        </div>
        <p className='text-gray-400 font-light'>per 0:19</p>
      </div>
    </div>
  );
}
