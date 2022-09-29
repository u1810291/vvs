import React from 'react';
import DynamicIcon from 'feature/crew/component/CrewIcon';

export default function Item({status, name, description, isOnline}) {
  return (
    <div className='flex flex-row justify-between w-full'>
      <div className='flex'>
        <DynamicIcon status={status} name={name} />
        <div className='flex flex-col text-black font-normal text-sm ml-2'>
          <span>{description}</span>
          <span className='text-xs text-stone-600'>{status}</span>
        </div>
      </div>
      <div className='flex flex-col'>
        <div className='flex justify-center mr-1 items-end rounded-sm px-1.5 border border-transparent text-xs font-normal text-gray-600 font-montserrat hover:shadow-none bg-gray-200 focus:outline-none'>
          <a className='flex flex-row text-xs'>
            {isOnline && status ? status : ''}
          </a>
        </div>
        <div className='flex justify-center mr-1 items-end rounded-sm px-1.5 border border-transparent text-xs font-normal text-gray-600 font-montserrat hover:shadow-none bg-gray-200 focus:outline-none'>
          <a className='flex flex-row text-xs'>
            {status}
          </a>
        </div>
      </div>
    </div>
  )
}
