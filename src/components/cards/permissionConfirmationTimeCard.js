import React from 'react';
import useLanguage from '../../hook/useLanguage';

const PermissionConfirmationTimeCard = ({receivedAt, Status}) => {
  const {english, lithuanian, t} = useLanguage();
  return (
    <div className='flex flex-col w-full bg-white pl-8 pr-6 pt-4 pb-4 border hover:shadow'>
      <div className='flex flex-row'>
        <p className='flex mr-4'>
          {receivedAt}
        </p>
        <p className='flex mr-auto text-gray-600'>
          {t('eurocash.requestReceived')}
        </p>
        <div className='flex text-gray-600'>
          <Status />
        </div>
      </div>
    </div>
  );
};

export default PermissionConfirmationTimeCard;