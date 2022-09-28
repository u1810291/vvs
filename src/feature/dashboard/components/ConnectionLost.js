import React from 'react';
import Timer from 'react-timer-wrapper';
import Timecode from 'react-timecode';
import {useTranslation} from 'react-i18next';

export const ConnectionLost = ({duration}) => {
  const {t} = useTranslation('dashboard');
  return (
    <div className='flex flex-row justify-between h-full w-full'>
      <div className='flex flex-row items-center'>
        <p className='text-xs text-gray-500'>{t`left.lost_connection`}</p>
      </div>
      <div className='flex justify-center mr-2 my-2 items-center rounded-sm w-16 border border-transparent text-xs font-normal text-gray-600 font-montserrat hover:shadow-none bg-gray-200 focus:outline-none'>
        <a className='flex flex-row text-xs'>
          <Timer active duration={duration}>
            <Timecode />
          </Timer>
          s
        </a>
      </div>
    </div>
  )
}
