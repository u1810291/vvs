import React, {useEffect, useMemo} from 'react';

import Map from '../components/Map';
import {useTasks} from '../api/useTasks';
import {useCrews} from '../api/userCrews';
import {permissionStatus as status} from 'constants/statuses';
import SidebarRight from '../components/SidebarRight';
import SidebarLeft from '../components/SidebarLeft';
// import useSubscription from 'hook/useSubscription';

// updated_at + duration - new Date()
const timeLeft = (permission) => {
  const temp = permission?.request?.duration.split(':');
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

  const tasks = useTasks();
  const crews = useCrews();
  const temp = useMemo(() => ({
    data: crews?.data?.map((el) => ({
      timeLeft: el.permissions.length ? timeLeft(el.permissions[0]): null,
      connectionLost: el.user_settings.length ? lostConnection(el.user_settings[0]?.last_ping): null,
      ...el
    })
  )}), [crews.data]);
  // const dashboardSubscription = useSubscription()
  // console.log(dashboardSubscription);
  useEffect(() => {
    console.log(crews.data, tasks.data);
  }, [crews?.data]);
 
  return (
    <>
      <section className='flex flex-col h-screen justify-between scrollbar-gone overflow-y-auto w-1/4 bg-gray-100'>
        <aside className='border-l border-gray-border min-w-fit'>
          <SidebarLeft tasks={tasks} />
        </aside>
      </section>
      <section className='flex flex-col h-screen justify-between w-2/4 bg-gray-100'>
        <Map />
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
