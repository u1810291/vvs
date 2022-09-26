import React from 'react';
import {useTranslation} from 'react-i18next';
import {ConnectionLost} from './ConnectionLost';

export function CanceledCard({
  crew,
  name,
  connection,
  address,
}) {
  const {t} = useTranslation('dashboard')
  return (
    <div className='flex flex-row border-t w-full h-16 bg-white'>
      <div className='flex flex-row w-full'>
        <div className='flex flex-col items-center justify-center'>
          <div className='flex rounded-full border-4 border-red-600 bg-white w-8 h-8 mx-4 text-black text-sm font-normal justify-center items-center'>
            <p className='flex text-xs'>{crew}</p>
          </div>
        </div>
        <div className='flex flex-col w-full'>
          <div className='flex flex-row items-center justify-between h-full w-full'>
          <div className='flex flex-col'>
            <p className='text-xs text-black'>{name}</p>
            <p className='text-xs'>{address}</p>
            </div>
            <button className='flex justify-center py-1 mr-2 rounded-sm px-4 border border-transparent text-xs font-normal text-white font-montserrat hover:shadow-none hover:bg-slate-500  bg-slate-600 focus:outline-none'>
              {t`left.close`}
            </button>
          </div>
          {connection === 'Prarastas rišys' ? (
            <ConnectionLost duration={1000}/>
          ) : null}
        </div>
      </div>
    </div>
  );
}
