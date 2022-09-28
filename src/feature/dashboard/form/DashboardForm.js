import React, {useEffect} from 'react';

import DashboardSideLeft from '../components/LeftSideBar';
import DashboardSideRight from '../components/RightSideBar';
import useLanguage from '../../../hook/useLanguage';
import Map from '../components/Map';
import {useTasks} from '../api/useTasks';
import {useCrews} from '../api/userCrews';
// import useSubscription from 'hook/useSubscription';

const DashboardForm = () => {
  const {t} = useLanguage();

  const tasks = useTasks();
  const crew = useCrews(); 
  // const dashboardSubscription = useSubscription()
  // console.log(dashboardSubscription);
  useEffect(() => {
    console.log(tasks?.data, crew?.data);
  }, [tasks.data, crew.data])

  return (
    <>
      <DashboardSideLeft />
      <div className='flex flex-col h-screen justify-between w-2/4 bg-gray-100'>
        <Map />
      </div>
      <DashboardSideRight crews={crew.data} title={t('eurocash.crew')} />
    </>
  );
};

export default DashboardForm;
