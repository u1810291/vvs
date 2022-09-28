import React from 'react';
import Timer from 'react-timer-wrapper';
import Timecode from 'react-timecode';
import {useTranslation} from 'react-i18next';
import {ConnectionLost} from './ConnectionLost';

export function RequestCard({
  crew,
  name,
  dislocation,
  dislocationStatus,
  connection,
}) {
  const {t} = useTranslation('dashboard');
  return (
    <>
      {dislocation === 'true' ? (
        <div className='flex flex-row border-t w-full h-16 bg-white'>
          <div className='flex flex-row w-full'>
            <div className='flex flex-col items-center justify-center'>
              <div className='flex rounded-full border-4 border-yellow-600 bg-white w-8 h-8 mx-4 text-black font-normal justify-center items-center'>
                <p className='flex text-xs'>{crew}</p>
              </div>
            </div>
            <div className='flex flex-col w-full'>
              <div className='flex flex-row justify-between items-end h-full w-full'>
                <p className='text-xs text-black'>{name}</p>
                <button className='flex items-end mr-2 px-4 text-xs font-normal text-gray-400 hover:text-gray-500'>
                  {t`right.cancel`}
                </button>
              </div>
              <div className='flex flex-row justify-between h-full w-full'>
                {dislocationStatus ? (
                  <>
                    <div className='flex flex-row items-end'>
                      <p className='text-xs text-gray-500 truncate'>{dislocationStatus}</p>
                    </div>
                    <div className='flex justify-center mr-2 mt-1 items-end rounded-sm w-16 border border-transparent text-xs font-normal text-gray-600 font-montserrat hover:shadow-none bg-gray-200 focus:outline-none'>
                    <a className='flex flex-row text-xs'>
                      <Timer active duration={null}>
                        <Timecode />
                      </Timer>
                      s
                      </a>
                    </div>
                  </>
                ) : null}
              </div>
              <div className='flex flex-row justify-between h-full w-full'>
                {connection === 'Prarastas rišys' ? (
                  <ConnectionLost duration={null}/>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
