import React from 'react';
import useLanguage from '../../../hook/useLanguage';
import {NewStatusCard} from '../cards/newStatus';
import {NewCallingCard} from '../cards/newCalling';
import {NewEventCard} from '../cards/newEvent';
import {NewConfirmCard} from '../cards/newConfirm';
const {ActiveCard} = require('../cards/active');
const {RequestCard} = require('../cards/request');
const {TaskCard} = require('../cards/tasks');

const InProcessRightSide = () => {
  const {english, lithuanian, t} = useLanguage();
  return (
    <>
      <div className='flex flex-col'>
        <div className='flex flex-row bg-white justify-between'>
        </div>
        <div className='text-slate-400'>
          <ActiveCard />
          <div className='flex flex-row items-center justify-center ml-6 py-2'>
          <h4 className='mr-6 text-sm text-black'>Priskirti papildomą ekipažą</h4>
          <img
            className='h-2 w-4 mr-2'
            src={require('../../../assets/assets/down.png')}
          ></img>
          </div>
        </div>
        <NewStatusCard/>
        <NewCallingCard/>
        <NewConfirmCard/>
        <NewEventCard/>
      </div>
    </>
  );
};

export default InProcessRightSide;