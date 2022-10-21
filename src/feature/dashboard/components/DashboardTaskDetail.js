import React, {useState} from 'react';
import DynamicIcon from './CrewIcon';
import Timer from 'react-timer-wrapper';
import Timecode from 'react-timecode';
import {useTranslation} from 'react-i18next';
import Nullable from 'components/atom/Nullable';
import {generatePath, Link} from 'react-router-dom';
import {TaskEditRoute} from 'feature/task/routes';

export default function DashboardTaskDetail({id, title, status, name, description, connectionLost, durationTime, component, distance, waiting}) {
  const {t} = useTranslation('dashboard');
  const [duration, setDuration] = useState(durationTime)
  const [time, setTime] = useState(connectionLost)
  const onTimerUpdate = ({time, duration}) => {
    setDuration(duration);
    setTime(time);
  }
  return (
    <Link to={generatePath(TaskEditRoute.props.path, {id: id})}>
      <div className='flex flex-row justify-between w-full'>
        <div className='flex'>
          <DynamicIcon status={status} name={name} />
          <div className='flex flex-col text-black font-normal text-sm ml-2'>
            {title}
            <span className='text-xs text-gray-400'>{connectionLost ? t`left.lost_connection`: description}</span>
          </div>
        </div>
        <div className='grid grid-rows-2	gap-1'>
          <Nullable on={component} nullish={<div/>}>
            <div className='min-w-4'>{component}</div>
          </Nullable>
          <Nullable on={waiting}>
            <div className='flex justify-center items-end rounded-sm px-1.5 border border-transparent text-xs font-normal text-gray-600 font-montserrat hover:shadow-none bg-gray-200 focus:outline-none'>
              <a className='flex flex-row text-xs'>
                <Timer active duration={null} onTimerUpdate={onTimerUpdate}>
                  <Timecode time={waiting} />
                </Timer>
                <span className='pl-0.5'>s</span>
              </a>
            </div>
          </Nullable>
          <Nullable on={distance}>
            <div className='flex justify-center items-end rounded-sm px-1.5 border border-transparent text-xs font-normal text-gray-600 font-montserrat hover:shadow-none bg-gray-200 focus:outline-none'>
              <a className='flex flex-row text-xs'>{distance}</a>
            </div>
          </Nullable>
          <Nullable on={connectionLost}>
            <div className='flex justify-center items-end rounded-sm px-1.5 border border-transparent text-xs font-normal text-gray-600 font-montserrat hover:shadow-none bg-gray-200 focus:outline-none'>
              <a className='flex flex-row text-xs'>
                <Timer active duration={duration * 60 * 1000} onTimerUpdate={onTimerUpdate}>
                  <Timecode time={new Date() - duration} />
                </Timer>
                <span className='pl-0.5'>s</span>
              </a>
            </div>
          </Nullable>
        </div>
      </div>
    </Link>
  )
}
