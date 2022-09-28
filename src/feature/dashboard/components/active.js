import React from 'react';
import {ConnectionLost} from './ConnectionLost';

export function ActiveCard({
  crew,
  name,
  status,
  connection
}) {
  return (
    <>
      {status && connection ? (
        <div className='flex flex-row border-b w-full h-16 bg-white'>
          <div className='flex flex-row w-full'>
            <div className='flex flex-col items-center justify-center'>
              <div className='flex rounded-full border-4 border-green-600 bg-white w-8 h-8 mx-4 text-black text-xs font-normal justify-center items-center'>
                <p className='flex text-xs'>{crew}</p>
              </div>
            </div>
            <div className='flex flex-col w-full'>
              <div className='flex flex-row items-end h-full w-full'>
                <p className='text-xs text-black'>{name}</p>
              </div>
              <div className='flex flex-row justify-between h-full w-full'>
                {connection ? (
                  <ConnectionLost duration={1000}/>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
