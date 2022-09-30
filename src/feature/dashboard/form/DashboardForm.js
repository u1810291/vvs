import React, {useEffect, useMemo} from 'react';

import Map from '../components/Map';
import {useTasks} from '../api/useTasks';
import {useCrews} from '../api/userCrews';
import {permissionStatus as status} from 'constants/statuses';
import SidebarRight from '../components/SidebarRight';
// import useSubscription from 'hook/useSubscription';

// updated_at + duration - new Date()
const timeLeft = (permission) => {
  const temp = permission?.request?.duration.split(':');
  const date = new Date();
  const a = permission.status === status.PERMISSION_ALLOWED ? (permission?.updated_at): null
  return a
}

const DashboardForm = () => {

  const tasks = useTasks();
  const crews = useCrews();
  const temp = useMemo(() => crews?.data?.map((el) => ({
    timeLeft: el.permissions.length ? timeLeft(el.permissions[0]): null,
    ...el
  })), [crews.data]);
  // const dashboardSubscription = useSubscription()
  // console.log(dashboardSubscription);
  useEffect(() => {
    console.log(tasks.data, crews.data);
  }, [tasks?.data, crews?.data]);
 
  return (
    <>
      <div className='flex flex-col h-screen justify-between scrollbar-gone overflow-y-auto w-1/4 bg-gray-100'>
        <SidebarRight crews={crews} />
      </div>
      <div className='flex flex-col h-screen justify-between w-2/4 bg-gray-100'>
        <Map />
      </div>
      <section className='flex flex-col h-screen justify-between overflow-y-auto w-1/4 bg-gray-100'>
        <aside className='border-l border-gray-border min-w-fit'>
          <SidebarRight crews={crews} />
        </aside>
      </section>
    </>
  );
};

export default DashboardForm;
