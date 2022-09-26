import React from 'react';

import Details from '../../../components/atom/Details';
import DashboardSideLeft from '../components/dashboardLeft';
import DashboardSideRight from '../components/dashboardRight';
import {OffCard} from '../../../components/obsolete/cards/off';
import {DDAPI} from '../../../mocks/dashboardDispatchApi';
import useLanguage from '../../../hook/useLanguage';
import {generate} from 'shortid';
import Map from '../components/Map';
import {useTasks} from '../api/useTasks';

const DashboardForm = () => {
  const {t} = useLanguage();
  const list = useTasks({filters: null});
  console.log(list.data);
  return (
    <>
      <div className='flex flex-col h-screen justify-between scrollbar-gone overflow-y-auto w-1/4 bg-gray-100'>
        <DashboardSideLeft />
      </div>
      <div className='flex flex-col h-screen justify-between w-2/4 bg-gray-100'>
      <Map />
      </div>
      <div className='flex flex-col h-screen justify-between overflow-y-auto w-1/4 bg-gray-100'>
        <DashboardSideRight title={t('eurocash.crew')} />
        <Details title={t('crew.status.offline')}>
          {DDAPI?.map((data) => (
            <OffCard
              id={data.id}
              key={generate()}
              crew={data.crew}
              name={data.name}
              event={data.event}
              status={data.status}
              inTask={data.inTask}
              inBreak={data.inBreak}
              askForBreak={data.askForBreak}
              connection={data.connection}
            />
          ))}
        </Details>
      </div>
    </>
  );
};

export default DashboardForm;
