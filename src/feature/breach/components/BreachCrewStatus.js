import React from 'react';
import DynamicIcon from 'feature/crew/component/CrewIcon';

const BreachCrewStatus = ({crew}) => {
  const {name, status, driver_name} = crew;
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
        <p className='text-regent'>
          {driver_name}
        </p>
      </div>
    </>
  )
};

export default BreachCrewStatus;
