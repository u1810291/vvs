import React from 'react';
import Timer from 'react-timer-wrapper';
import Timecode from 'react-timecode';

export function RequestCard({
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
  address
}) {
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
                <button className='flex items-end mr-8 px-4 text-xs font-normal text-gray-400 hover:text-gray-500'>
                  atšaukti
                </button>
              </div>
              <div className='flex flex-row justify-between h-full w-full'>
                {dislocationStatus ? (
                  <>
                    <div className='flex flex-row items-end'>
                      <p className='text-xs text-gray-500 truncate'>{dislocationStatus}</p>
                    </div>
                    <div className='flex justify-center mr-8 mt-1 items-end rounded-sm w-16 border border-transparent text-xs font-normal text-gray-600 font-montserrat hover:shadow-none bg-gray-200 focus:outline-none'>
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
                  <>
                    <div className='flex flex-row items-center'>
                      <p className='text-xs text-gray-500'>Prarastas rišys</p>
                    </div>
                    <div className='flex justify-center mr-8 my-1 items-end rounded-sm w-16 border border-transparent text-xs font-normal text-gray-600 font-montserrat hover:shadow-none bg-gray-200 focus:outline-none'>
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
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
