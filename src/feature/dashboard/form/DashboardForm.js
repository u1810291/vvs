import React from 'react';

import DashboardSideLeft from '../components/LeftSideBar';
import DashboardSideRight from '../components/RightSideBar';
import useLanguage from '../../../hook/useLanguage';
import Map from '../components/Map';
import {useTasks} from '../api/useTasks';

const DashboardForm = () => {
  const {t} = useLanguage();
  const list = useTasks();
  console.log(list.data);
  return (
    <>
      <DashboardSideLeft />
      <div className='flex flex-col h-screen justify-between w-2/4 bg-gray-100'>
        <Map />
      </div>
      <DashboardSideRight title={t('eurocash.crew')} />
    </>
  );
};

export default DashboardForm;
