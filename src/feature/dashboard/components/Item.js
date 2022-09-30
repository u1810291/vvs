import React, {useState} from 'react';
import DynamicIcon from './CrewIcon';
import Timer from 'react-timer-wrapper';
import Timecode from 'react-timecode';

export default function Item({abbreviation, status, name, description, isOnline, connectionLost, durationTime}) {
  const [duration, setDuration] = useState(durationTime)
  const [time, setTime] = useState(connectionLost)
  const onTimerUpdate = ({time, duration}) => {
    setDuration(duration);
    setTime(time);
  }
  return (
    <div className='flex flex-row justify-between w-full'>
      <div className='flex'>
        <DynamicIcon status={status} name={abbreviation} />
        <div className='flex flex-col text-black font-normal text-sm ml-2'>
          <span>{name}</span>
          <span className='text-xs text-stone-600'>{description}</span>
        </div>
      </div>
      <div className='flex flex-col gap-1'>
        <div className='flex justify-center mr-1 items-end rounded-sm px-1.5 border border-transparent text-xs font-normal text-gray-600 font-montserrat hover:shadow-none bg-gray-200 focus:outline-none'>
          <a className='flex flex-row text-xs'>
            {status}
          </a>
        </div>
        {isOnline ? 
          <div className='flex justify-center mr-1 items-end rounded-sm px-1.5 border border-transparent text-xs font-normal text-gray-600 font-montserrat hover:shadow-none bg-gray-200 focus:outline-none'>
            <a className='flex flex-row text-xs'>
              <Timer active duration={connectionLost * 60 * 1000} onTimerUpdate={onTimerUpdate}>
                <Timecode time={duration - time} />
              </Timer>
            </a>
          </div>
        : <div/>}
      </div>
    </div>
  )
}
