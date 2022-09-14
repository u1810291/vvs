import React from 'react';
import {generate} from 'shortid';

const {TaskCard} = require('../cards/tasks');

const TaskSideRight = ({tasks}) => (
  <div className='flex flex-col scrollbar-gone flex-shrink-1 overflow-y-auto'>
    {tasks.map((data) => (
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
        address={data.address}
        dislocation='true'
        distance={data.distance}
      />
    ))}
  </div>
);

export default TaskSideRight;
