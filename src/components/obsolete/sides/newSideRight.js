import React from 'react';
import useLanguage from '../../../hook/useLanguage';
import {Assign2timesCard} from '../cards/assign2times';
import {AssignNewCard} from '../cards/assignNew';

const NewSideRight = () => {
  const {english, lithuanian, t} = useLanguage();
  return (
    <>
      <div className='flex flex-col'>
        <div className='flex flex-col border bg-white border-b-2 justify-between'>
          <AssignNewCard />
          <Assign2timesCard />
        </div>
        <div className='text-slate-400'></div>
      </div>
    </>
  );
};

export default NewSideRight;
