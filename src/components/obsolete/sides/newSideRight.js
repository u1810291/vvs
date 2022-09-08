import React from 'react';
import {ATAPI} from '../../../mocks/alarmDispatchApi';
import {generate} from 'shortid';

const {TaskCard} = require('../cards/tasks');

const DashboardSideRight = ({title}) => {
  return (
    <div className='flex flex-col scrollbar-gone flex-shrink-1 overflow-y-auto'>
      {ATAPI.map((data) => (
        <TaskCard
          key={data.id}
          id={generate()}
          crew={data.crew}
          name={data.name}
          status={data.status}
          inBreak={data.inBreak}
          inTask={data.inTask}
          askForBreak={data.askForBreak}
          connection={data.connection}
          event={data.event}
          dislocation='true'
        />
      ))}
    </div>
  );
};

export default DashboardSideRight;
