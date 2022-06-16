import React from 'react';

import Map from '../../map/component/Map';
import List from '../../../components/atom/List';
import BreachTimeCard from '../../../components/cards/breachTimeCard';

import {DDAPI} from '../../../api/dashboardDispatchApi';
import {ActiveCard} from '../../../components/cards/active';

import {generate} from 'shortid';

const BreachForm = () => {
  return (
    <div className='flex flex-row h-screen sm:min-h-0 sm:h-full'>
      <Map></Map>
      <div className='flex flex-col h-full justify-between overflow-y-auto scrollbar-gone w-1/5 bg-gray-100'>
        <List>
          <BreachTimeCard
            receivedAt={'14 min. 19 s.'}
            timeOutOfZone={'2021-07-12 14:32:01'}/>
          <ActiveCard />
          {DDAPI.splice(0, 1).map((data) => (
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
        </List>
      </div>
    </div>
  );
};

export default BreachForm;
