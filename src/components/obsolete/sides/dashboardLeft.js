import React from 'react';
import {Link} from 'react-router-dom';
import {DDAPI} from '../../../mocks/dashboardDispatchApi';
import {generate} from 'shortid';
import useLanguage from 'hook/useLanguage';
const {DrivingToObjectCard} = require('../cards/drivingToObject');
const {InspectObjectCard} = require('../cards/inspectObject');
const {AssignCard} = require('../cards/assign');
const {WaitingToReturnCard} = require('../cards/waitingToReturn');
const {CanceledCard} = require('../cards/canceled');
const {PermissionCard} = require('../cards/permission');
const {WaitingForConfirmationCard} = require('../cards/waitingForConfirmation');

const DashboardSideLeft = () => {
  const {t} = useLanguage();
  return (
    <>
      <div className='flex flex-row items-center border-b bg-white justify-between'>
        <h4 className='ml-2 self-center py-4 text-md font-normal'>Pultas</h4>
        <Link
          to='/create'
          className='w-36 h-10 flex mr-2 justify-center items-center rounded-sm px-4 border-transparent drop-shadow shadow text-sm font-light text-white font-montserrat hover:shadow-none bg-slate-600 hover:bg-slate-500 focus:outline-none'
        >
          {t('dashboard.create_task')}
        </Link>
      </div>
      <div className='text-slate-400'>
        <h4 className='ml-6 py-2 text-slate-400 text-sm'>Nepriskirtos</h4>
        {DDAPI?.map((data) => (
          <AssignCard
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
            address={data.address}
            newEvent={data.newEvent}
            type={data.type}
          />
        ))}
        <h4 className='ml-6 py-2 text-slate-400 text-sm'>Prašymai</h4>
        {DDAPI?.map((data) => (
          <PermissionCard
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
            address={data.address}
          />
        ))}
        <h4 className='ml-6 py-2 text-slate-400 text-sm'>
          Laukiama patvirtinimo
        </h4>
        {DDAPI?.map((data) => (
          <WaitingForConfirmationCard
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
            address={data.address}
            newEvent={data.newEvent}
          />
        ))}
        <h4 className='ml-6 py-2 text-slate-400 text-sm'>Važiuoja į objektą</h4>
        {DDAPI?.map((data) => (
          <DrivingToObjectCard
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
            address={data.address}
          />
        ))}
        <h4 className='ml-6 py-2 text-slate-400 text-sm'>Apžiūri objektą</h4>
        {DDAPI?.map((data) => (
          <InspectObjectCard
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
            address={data.address}
            inspect={data.inspect}
          />
        ))}
        <h4 className='ml-6 py-2 text-slate-400 text-sm'>
          Laukiama leidimo grįžti
        </h4>
        {DDAPI?.map((data) => (
          <WaitingToReturnCard
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
            address={data.address}
          />
        ))}
        <h4 className='ml-6 py-2 text-slate-400 text-sm'>
          Atšauktos atsakingo
        </h4>
        {DDAPI?.map((data) => (
          <CanceledCard
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
            address={data.address}
          />
        ))}
      </div>
    </>
  );
};

export default DashboardSideLeft;
