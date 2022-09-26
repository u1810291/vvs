import React from 'react';
import {DDAPI} from 'mocks/dashboardDispatchApi';
import {generate} from 'shortid';
import Details from '../../../components/atom/Details';
import {OffCard} from '../../../components/obsolete/cards/off';

import {ActiveCard} from './active';
import {RequestCard} from './request';
import {TaskCard} from './tasks';
import {useTranslation} from 'react-i18next';

const DashboardSideRight = ({title}) => {
  const {t} = useTranslation('dashboard')
  return (
    <div className='flex flex-col h-screen justify-between overflow-y-auto w-1/4 bg-gray-100'>
      <div className='flex flex-col scrollbar-gone flex-shrink-1 overflow-y-auto'>
        <div className='flex flex-row py-4 bg-white items-center justify-between border-b'>
          <h4 className='ml-4 self-center text-md font-normal'>
            {title}
          </h4>
        </div>
        <div className='text-slate-400'>
          <h4 className='ml-6 py-2 text-sm'>{t`right.active`}</h4>
          {DDAPI.map((data) => (
            <ActiveCard
              key={generate()}
              id={data.id}
              crew={data.crew}
              name={data.name}
              status={data.status}
              inBreak={data.inBreak}
              inTask={data.inTask}
              askForBreak={data.askForBreak}
              connection={data.connection}
              event={data.event}
            />
          ))}
          {DDAPI.map((data) => (
            <RequestCard
              id={generate()}
              key={data.id}
              crew={data.crew}
              name={data.name}
              status={data.status}
              inBreak={data.inBreak}
              inTask={data.inTask}
              askForBreak={data.askForBreak}
              dislocation={data.dislocation}
              dislocationStatus={data.dislocationStatus}
              connection={data.connection}
              event={data.event}
            />
          ))}
        </div>
        <h4 className='ml-6 py-2 text-slate-400 text-sm'>Užduotyse</h4>
        {DDAPI.map((data) => (
          <TaskCard
            id={generate()}
            key={data.id}
            crew={data.crew}
            name={data.name}
            status={data.status}
            inBreak={data.inBreak}
            inTask={data.inTask}
            askForBreak={data.askForBreak}
            connection={data.connection}
            event={data.event}
          />
        ))}
      </div>
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
  );
};

export default DashboardSideRight;
