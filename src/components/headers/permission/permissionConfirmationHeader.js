import React, {useState, useCallback} from 'react';
import useLanguage from '../../../hook/useLanguage';
import {BlueStatus} from '../../obsolete/buttons/blueStatus';

const PermissionConfirmationHeader = () => {
  const {english, lithuanian, t} = useLanguage();
  const [isSubmited, setSubmit] = useState(false);
  const [isCanceled, setCancel] = useState(false);

  const onSubmit = useCallback(() => {
    setSubmit(!isSubmited);
  }, [isSubmited]);

  const onCancel = useCallback(() => {
    setCancel(!isCanceled);
  }, [isCanceled])

  return (
    <div className='flex flex-row border h-16 bg-white border-b-2 justify-between'>
      <div className='xl:flex hidden xl:flex-row ml-4 items-center'>
        <h4 className='text-lg ml-2 font-normal'>
          {t('eurocash.permissions')}
        </h4>
        <p className='pl-2 text-gray-600'>/</p>
        <h4 className='text-lg ml-2 hidden xxl:inline-block font-normal text-gray-500 mr-4'>
          {t('eurocash.coffee')}
        </h4>
        <BlueStatus />
      </div>
      <div className='flex flex-row items-center'>
        <button
          className={`${isCanceled ? 'hidden' : 'flex sm:flex'} sm:w-40 sm:h-10 rounded mr-2 mt-2 mb-1 justify-center py-2 px-4 border border-transparent drop-shadow shadow text-sm font-light text-white font-montserrat hover:shadow-none bg-red-600 focus:outline-none`}
          onClick={onCancel}
        >
          {t('eurocash.cancel')}
        </button>
        <button
          className={`${isSubmited ? 'bg-none text-gray-600 shadow-none' : 'bg-slate-600 text-white'} sm:w-40 sm:h-10 rounded sm:flex mr-2 mt-2 mb-1 justify-center py-2 px-4 border border-transparent drop-shadow shadow text-sm font-light font-montserrat hover:shadow-none focus:outline-none`}
          onClick={onSubmit}
        >
          {t('eurocash.submit')}
        </button>
      </div>
    </div>
  );
};

export default PermissionConfirmationHeader;
