import React, {useState} from 'react';
import DynamicIcon from './CrewIcon';
import Timer from 'react-timer-wrapper';
import Timecode from 'react-timecode';
import {useTranslation} from 'react-i18next';
import Nullable from 'components/atom/Nullable';

export default function Item({title, status, name, description, connectionLost, durationTime, component}) {
  const {t} = useTranslation('dashboard');
  const [duration, setDuration] = useState(durationTime)
  const [time, setTime] = useState(connectionLost)
  const onTimerUpdate = ({time, duration}) => {
    setDuration(duration);
    setTime(time);
  }
  return (
    <div className='flex flex-row justify-between w-full'>
      <div className='flex'>
        <DynamicIcon status={status} name={name} />
        <div className='flex flex-col text-black font-normal text-sm ml-2'>
          <span>{title}</span>
          <span className='text-xs text-stone-600'>{connectionLost ? t`left.lost_connection`: description}</span>
        </div>
      </div>
      <div className='grid grid-rows-2	gap-1'>
        <div className='min-w-4'>
          <Nullable on={component}>
            {component}
          </Nullable>
        </div>
        {connectionLost ?
          <div className='flex justify-center items-end rounded-sm px-1.5 border border-transparent text-xs font-normal text-gray-600 font-montserrat hover:shadow-none bg-gray-200 focus:outline-none'>
            <a className='flex flex-row text-xs'>
              <Timer active duration={duration * 60 * 1000} onTimerUpdate={onTimerUpdate}>
                <Timecode time={new Date() - duration} />
              </Timer>
            </a>
          </div>
        : null}
      </div>
    </div>
  )
}
