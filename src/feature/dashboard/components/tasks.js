import React from 'react';
import Timer from 'react-timer-wrapper';
import Timecode from 'react-timecode';
import Button from 'components/Button';
import {ReactComponent as KeyIcon} from 'assets/assets/icons/key.svg';

export function TaskCard({
  id,
  crew,
  name,
  status,
  inBreak,
  inTask,
  askForBreak,
  dislocation,
  dislocationStatus,
  connection,
  event,
  address,
  distance,
  key
}) {
  return (
    <>
      <div className='flex flex-row border-t w-full h-16 bg-white'>
        <div className='flex flex-row w-full items-center pr-4'>
          <div className='flex flex-col items-center justify-center'>
            <div className='flex rounded-full border-4 border-red-600 bg-white w-8 h-8 mx-4 text-black text-xs font-normal justify-center items-center'>
              <p className='flex'>{crew}</p>
            </div>
          </div>
          <div className='flex flex-col w-full'>
            <div className='flex flex-row justify-between items-end h-full w-full'>
              <p className='text-xs text-black '>{name}</p>
              <div className='flex'>
                {key ? (
                  <div className='px-2'>
                    <KeyIcon/>
                  </div>
                ): null}
                <div className='flex justify-center mr-1 items-end rounded-sm px-1.5 border border-transparent text-xs font-normal text-gray-600 font-montserrat hover:shadow-none bg-gray-200 focus:outline-none'>
                  <a className='flex flex-row text-xs'>
                    <Timer active duration={null}>
                      <Timecode />
                    </Timer>
                  </a>
                </div>
                <div className='flex justify-center mr-1 items-end rounded-sm px-1.5 border border-transparent text-xs font-normal text-gray-600 font-montserrat hover:shadow-none bg-gray-200 focus:outline-none'>
                  <a className='flex flex-row text-xs'>
                    {distance}
                  </a>
                </div>
              </div>
            </div>
            <div className='flex flex-row justify-between mb-1 h-full w-full'>
              <div className='flex flex-row items-end'>
                <p className='text-xs text-gray-500'>{address}</p>
              </div>
            </div>
          </div>
          <div>
            <Button.Sm>Priskirti</Button.Sm>
          </div>
        </div>
      </div>
    </>
  );
}
