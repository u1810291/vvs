import React from 'react';
import useLanguage from '../../../hook/useLanguage';

const {PhoneCard} = require('../cards/phone');

const NewSideLeft = ({data}) => {
  const {english, lithuanian, t} = useLanguage();
  return (
    <>
      <div className='flex flex-row items-end border bg-white pb-5'>
        <div className='flex flex-col h-28'>
          <h2 className='text-normal ml-2 font-light mt-4 w-3/4'>
            {data?.description}
          </h2>
          <h5 className='text-sm ml-2 text-gray-400 font-normal mt-2'>
            {data?.city && `${data?.city}, `}{data?.address}
          </h5>
        </div>
      </div>
      <div className='text-slate-400'>
        <h4 className='ml-6 py-1'>{data?.name}</h4>
          <PhoneCard name={data?.name} phone={data?.phone}/>
      </div>
    </>
  );
};

export default NewSideLeft;
