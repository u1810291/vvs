import React from 'react';
import DynamicIcon from './CrewIcon';
import {useTranslation} from 'react-i18next';
import Nullable from 'components/atom/Nullable';
import {generatePath, Link, useNavigate} from 'react-router-dom';
import {TaskEditRoute} from 'feature/task/routes';
import {eventStatus} from 'constants/statuses';
import Button from 'components/Button';
import {flip, identity} from 'crocks';
import {useAuth} from 'context/auth';
import raw from 'raw.macro';
import DashboardTaskTimer from './DashboardTaskTimer';
import {CrewDistanceDetails} from 'feature/crew/component/CrewDetail';

export default function DashboardTaskDetail({task, id, title, status, name, description, connectionLost}) {
  const {t} = useTranslation('dashboard', {keyPrefix: 'left'});
  const nav = useNavigate();

  const auth = useAuth();
  const _update = flip(auth.api)(raw('../api/graphql/UpdateEventStatus.graphql'));
  const _updateCrew = flip(auth.api)(raw('../api/graphql/UpdateCrewStatus.graphql'));

  // assign a crew for the task
  const assign = (e) => {
    e.preventDefault();
    nav(generatePath(TaskEditRoute.props.path, {id: id}));
  };

  // approve crew to drive back
  const approveReturn = (e) => {
    e.preventDefault();
    _update({id: task?.id, status: 'FINISHED'}).fork(console.error, identity);
    _updateCrew({id: task?.crew?.id, status: 'DRIVE_BACK'}).fork(console.error, identity);
  }

  // confirm client's cancellation
  const confirm = (e) => {
    e.preventDefault();
    _update({id: task?.id, status: 'CANCELLED_BY_CLIENT_CONFIRMED'}).fork(console.error, identity);
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
        <div className='grid'>
          {/* when status is NEW */}
          <Nullable on={status === eventStatus.EVENT_NEW}>
            <div className='min-w-4'>
              <Button.Sm onClick={assign} className='py-1 px-3 rounded-md'>{t`assign`}</Button.Sm>
            </div>
          </Nullable>

          {/* when status is WAIT_FOR_APPROVAL */}
          <Nullable on={status === eventStatus.EVENT_WAIT_FOR_APPROVAL}>
            <div>
              <DashboardTaskTimer task={task} />
            </div>
          </Nullable>

          {/* when status is ON_THE_ROAD */}
          <Nullable on={status === eventStatus.EVENT_ON_THE_ROAD}>
            <div className='flex flex-col space-y-1'>
              <CrewDistanceDetails crew={task?.crew} task={task} onlyDistance={true} />
              <DashboardTaskTimer task={task} />
            </div>
          </Nullable>

          {/* when status is INSPECTION */}
          <Nullable on={status === eventStatus.EVENT_INSPECTION}>
            <div>
              <DashboardTaskTimer task={task} />
            </div>
          </Nullable>

          {/* when status is INSPECTIN_DONE */}
          <Nullable on={status === eventStatus.EVENT_INSPECTION_DONE}>
            <div className='min-w-4 flex flex-col space-y-1'>
              <Button.Sm onClick={approveReturn} className='py-1 px-3 rounded-md'>{t`return`}</Button.Sm>
              <DashboardTaskTimer task={task} />
            </div>
          </Nullable>

          {/* when status is CANCELLED_BY_CLIENT */}
          <Nullable on={status === eventStatus.EVENT_CANCELLED_BY_CLIENT}>
            <div className='min-w-4'>
              <Button.Sm onClick={confirm} className='py-1 px-3 rounded-md'>{t`confirm`}</Button.Sm>
            </div>
          </Nullable>

          {/* <Nullable on={waiting}>
            <div className='flex justify-center items-end rounded-sm px-1.5 border border-transparent text-xs font-normal text-gray-600 font-montserrat hover:shadow-none bg-gray-200 focus:outline-none'>
              <div className='flex flex-row text-xs'>
                <Timer active duration={null} onTimerUpdate={onTimerUpdate}>
                  <Timecode time={waiting} />
                </Timer>
                <span className='pl-0.5'>s</span>
              </div>
            </div>
          </Nullable> */}
        </div>
      </div>
    </Link>
  )
}
