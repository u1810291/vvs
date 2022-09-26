import React from 'react';
import {ConnectionLost} from './ConnectionLost';

export function InspectObjectCard({
  crew,
  name,
  connection,
  address,
  inspect
}) {
  return (
    <>
      {inspect === 'true' ? (
        <div className='flex flex-row border-t w-full h-16 bg-white'>
          <div className='flex flex-row w-full'>
            <div className='flex flex-col items-center justify-center'>
              <div className='flex rounded-full border-4 border-red-600 bg-white w-8 h-8 mx-4 text-black text-sm font-normal justify-center items-center'>
                <p className='flex text-xs'>{crew}</p>
              </div>
            </div>

            <div className='flex flex-col w-full'>
              <div className='flex flex-row items-center h-full w-full'>
              <div className='flex flex-col'>
                <p className='text-xs text-black'>{name}</p>
                <p className='text-xs'>{address}</p>
                </div>
              </div>
              {connection === 'Prarastas rišys' ? (
                <ConnectionLost duration={1000}/>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
