import React, {useEffect, useMemo} from 'react';

import {permissionStatus as status} from 'constants/statuses';
import SidebarRight from '../components/SidebarRight';
import SidebarLeft from '../components/SidebarLeft';
import {useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import Button from 'components/Button';
import {GQL as CREW_GQL} from 'feature/crew/api/useCrewsForEvent';
import {GQL as TASK_GQL} from 'feature/task/api/useTasksForEvent';
import useSubscription from 'hook/useSubscription';
import MapV2 from '../components/MapV2';
import {getFlatNodesThroughCalendar, getZoneItemsThroughCalendar} from 'feature/breach/utils';
// import useSubscription from 'hook/useSubscription';

// updated_at + duration - new Date()
const timeLeft = (permission) => {
  const temp = permission?.request?.duration?.split(':');
  const date = new Date(permission.updated_at);
  date.setHours(+temp[0] + date.getHours());
  date.setMinutes(+temp[1] + date.getMinutes());
  date.setSeconds(+temp[2] + date.getSeconds());
  return permission.status === status.PERMISSION_ALLOWED ? date: null;
}
// TODO: calculate lost connection
const lostConnection = (time) => {
  return time
}

const DashboardForm = () => {
  const {t} = useTranslation('dashboard');
  const nav = useNavigate();
  // const tasks = useTasks();
  const tasksQuery = useMemo(() => TASK_GQL, []);
  const crewsQuery = useMemo(() => CREW_GQL, []);
  const crews = useSubscription(crewsQuery);
  const tasks = useSubscription(tasksQuery);
  const crewsZonePaths = useMemo(() => crews.data?.crew?.map((el) => getZoneItemsThroughCalendar(el)), [crews?.data?.crew]);
  const crewsZoneCoordinates = useMemo(() => crews.data?.crew?.map((el) => getFlatNodesThroughCalendar(el)), [crews?.data?.crew[0]]);

  const temp = useMemo(() => ({
    data: crews?.data?.crew?.map((el) => ({
      timeLeft: el.permissions.length ? timeLeft(el.permissions[0]): null,
      connectionLost: el.user_settings.length ? lostConnection(el.user_settings[0]?.last_ping): null,
      ...el
    })
  )}), [crews?.data?.crew]);
  // const dashboardSubscription = useSubscription()
  // console.log(dashboardSubscription);
  useEffect(() => {
    console.log(crewsZonePaths, crewsZoneCoordinates);
  }, [crews.data?.crew]);
 
  
  return (
    <>
      <section className='flex flex-col h-screen scrollbar-gone overflow-y-auto w-1/4 bg-gray-100'>
        <div className='flex flex-row items-center border-b bg-white justify-between'>
          <h4 className='ml-2 self-center py-4 text-md font-normal'>{t`left.console`}</h4>
          <Button.Pxl onClick={() => {nav('/task/new')}}
            className='w-36 h-10 flex mr-2 justify-center items-center rounded-sm px-1 border-transparent drop-shadow shadow text-sm font-light text-white font-montserrat hover:shadow-none bg-slate-600 hover:bg-slate-500 focus:outline-none'>
            {t`left.create_task`}
          </Button.Pxl>
        </div>
        <aside className='border-l border-gray-border min-w-fit'>
          <SidebarLeft tasks={tasks} />
        </aside>
      </section>
      <section className='flex flex-col h-screen justify-between w-2/4 bg-gray-100'>
        <MapV2 crew={crews} zonePaths={crewsZonePaths} zoneCoordinates={crewsZoneCoordinates} />
      </section>
      <section className='flex flex-col h-screen justify-between overflow-y-auto w-1/4 bg-gray-100'>
        <aside className='border-l border-gray-border min-w-fit'>
          <SidebarRight crews={temp} />
        </aside>
      </section>
    </>
  );
};

export default DashboardForm;
