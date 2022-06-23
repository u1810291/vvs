import React from 'react';
import useLanguage from '../../../hook/useLanguage';

const BreachTimeCard = ({timeOutOfZone, receivedAt}) => {
  const {english, lithuanian, t} = useLanguage();
  return (
    <div className='flex flex-col w-full bg-white pl-8 pr-6 pt-4 pb-4 border hover:shadow'>
      <div className='flex flex-row'>
        <p className='flex w-1/2'>
          {t('eurocash.timeOutOfZone')}
        </p>
        <p className='flex w-1/2 text-black'>
          {timeOutOfZone}
        </p>
      </div>
      <div className='flex flex-row'>
        <p className='flex w-1/2'>
          {t('eurocash.received')}
        </p>
        <p className='flex w-1/2 text-black'>
          {receivedAt}
        </p>
      </div>
    </div>
  );
};

export default BreachTimeCard;