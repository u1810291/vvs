import React from 'react';
import DynamicIcon from 'feature/crew/component/CrewIcon';

const BreachCrewStatus = ({crew, driver}) => {
  const {name, status} = crew;
  const {firstName, lastName} = driver;
  return (
    <>
      <DynamicIcon
        className='mr-4'
        status={status}
        name={name}
      />
      <div className='flex flex-col'>
        <p className='text-bluewood'>
          {name}
        </p>
        <div className='flex'>
          <p className='text-regent mr-1'>
            {firstName}
          </p>
          <p className='text-regent'>
            {lastName}
          </p>
        </div>
      </div>
    </>
  )
};

export default BreachCrewStatus;
