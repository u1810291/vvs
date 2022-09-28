import React from 'react';
import {DDAPI} from 'mocks/dashboardDispatchApi';
import Details from '../../../components/atom/Details';
import {ActiveCard} from './active';
import {RequestCard} from './request';
import {TaskCard} from './tasks';
import {useTranslation} from 'react-i18next';

const DashboardSideRight = ({crews, title}) => {
  const {t} = useTranslation('dashboard');
  return (
    <>
      <div className='flex flex-col scrollbar-gone flex-shrink-1 overflow-y-auto'>
        <div className='flex flex-row py-4 bg-white items-center justify-between border-b'>
          <h4 className='ml-4 self-center text-md font-normal'>
            {title}
          </h4>
        </div>
        <div className='text-slate-400'>
          <h4 className='ml-6 py-2 text-sm'>{t`right.active`}</h4>
          {crews?.map((data) => (
            <ActiveCard
              key={data.id}
              crew={data.crew}
              name={data.name}
              status={data.status}
              connection={data.connection}
            />
          ))}
          {DDAPI.map((data) => (
            <RequestCard
              key={data.id}
              crew={data.crew}
              name={data.name}
              dislocation={data.dislocation}
              dislocationStatus={data.dislocationStatus}
              connection={data.connection}
            />
          ))}
        </div>
        <h4 className='ml-6 py-2 text-slate-400 text-sm'>{t`right.in_task`}</h4>
        {DDAPI.map((data) => (
          <TaskCard
            key={data.id}
            crew={data.crew}
            name={data.name}
            distance={data.distance}
            connection={data.connection}
            hasKey={data.inTask}
          />
        ))}
      </div>
      <Details title={t('right.offline')}>
        {DDAPI?.map(({id, name, status, crew}) => status === 'offline' && (
          <div key={id} className='flex flex-row border-b w-full h-14 bg-white justify-between items-center'>
            <div className='flex flex-row items-center'>
              <div className='flex rounded-full border-4 border-gray-200 bg-white w-8 h-8 ml-6 text-black text-xs font-normal justify-center items-center'>
                <p className='flex'>{crew}</p>
              </div>
              <div className='flex flex-col ml-4'>
                <p className='text-xs text-black'>{name} {t`right.offline`}</p>
              </div>
            </div>
          </div>
          )
        )}
      </Details>
    </>
  );
};

export default DashboardSideRight;
