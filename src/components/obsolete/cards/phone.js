import React from 'react';

export function PhoneCard({name, phone}) {
  return (
    <div
      className='flex flex-row border w-full h-12 bg-white justify-between hover:shadow items-center'
    >
      <div className='flex flex-row mx-6 items-center justify-between w-full'>
        <h6 className='text-black'>{name}</h6>
        <h5 className='text-black'>{phone}</h5>
      </div>
    </div>
  );
}
