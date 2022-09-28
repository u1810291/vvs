import React from 'react';
import {Link} from 'react-router-dom';
import {DDAPI} from 'mocks/dashboardDispatchApi';
import {useTranslation} from 'react-i18next';
import {DrivingToObjectCard} from './drivingToObject';
import {InspectObjectCard} from './inspectObject';
import {AssignCard} from './assign';
import {WaitingToReturnCard} from './waitingToReturn';
import {CanceledCard} from './canceled';
import {PermissionCard} from './permission';
import {WaitingForConfirmationCard} from './waitingForConfirmation';

const DashboardSideLeft = () => {
  const {t} = useTranslation('dashboard');
  return (
    <div className='flex flex-col h-screen justify-between scrollbar-gone overflow-y-auto w-1/4 bg-gray-100'>
      <div className='flex flex-row items-center border-b bg-white justify-between'>
        <h4 className='ml-2 self-center py-4 text-md font-normal'>{t`left.console`}</h4>
        <Link
          to='/create'
          className='w-36 h-10 flex mr-2 justify-center items-center rounded-sm px-4 border-transparent drop-shadow shadow text-sm font-light text-white font-montserrat hover:shadow-none bg-slate-600 hover:bg-slate-500 focus:outline-none'
        >
          {t`left.create_task`}
        </Link>
      </div>
      <div className='text-slate-400'>
        <h4 className='ml-6 py-2 text-slate-400 text-sm'>{t`left.not_assigned`}</h4>
        {DDAPI?.map((data) => (
          <AssignCard
            key={data.id}
            event={data.event}
            newEvent={data.newEvent}
            type={data.type}
          />
        ))}
        <h4 className='ml-6 py-2 text-slate-400 text-sm'>{t`left.requests`}</h4>
        {DDAPI?.map((data) => (
          <PermissionCard
            key={data.id}
            crew={data.crew}
            name={data.name}
            askForBreak={data.askForBreak}
            dislocationStatus={data.dislocationStatus}
            connection={data.connection}
          />
        ))}
        <h4 className='ml-6 py-2 text-slate-400 text-sm'>{t`left.wait_confirmation`}</h4>
        {DDAPI?.map((data) => (
          <WaitingForConfirmationCard
            key={data.id}
            crew={data.crew}
            connection={data.connection}
            event={data.event}
            address={data.address}
            newEvent={data.newEvent}
          />
        ))}
        <h4 className='ml-6 py-2 text-slate-400 text-sm'>{t`left.drives_facility`}</h4>
        {DDAPI?.map((data) => (
          <DrivingToObjectCard
            key={data.id}
            crew={data.crew}
            name={data.name}
            inTask={data.inTask}
            connection={data.connection}
            address={data.address}
          />
        ))}
        <h4 className='ml-6 py-2 text-slate-400 text-sm'>{t`left.object_inspect`}</h4>
        {DDAPI?.map((data) => (
          <InspectObjectCard
            key={data.id}
            crew={data.crew}
            name={data.name}
            connection={data.connection}
            address={data.address}
            inspect={data.inspect}
          />
        ))}
        <h4 className='ml-6 py-2 text-slate-400 text-sm'>{t`left.permission_to_return`}</h4>
        {DDAPI?.map((data) => (
          <WaitingToReturnCard
            key={data.id}
            crew={data.crew}
            name={data.name}
            dislocation={data.dislocation}
            connection={data.connection}
            address={data.address}
          />
        ))}
        <h4 className='ml-6 py-2 text-slate-400 text-sm'>{t`left.canceled_by_responsible`}</h4>
        {DDAPI?.map((data) => (
          <CanceledCard
            key={data.id}
            crew={data.crew}
            name={data.name}
            connection={data.connection}
            address={data.address}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardSideLeft;
