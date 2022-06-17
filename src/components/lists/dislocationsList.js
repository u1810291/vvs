import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { dislocations } from '../../api/dislocations';
import { sortToggle } from '../../util/utils';
import useSort from '../../hook/useSort';

export const DislocationsList = ({ id, set, crew, ...props }) => {
  const path = { pathname: `/dislocation/${id}` };

  const { sortedDislocationsKeys, sortedDislocationsOrder, sortedDislocationsName } =
    useSort();

  const sortedDislocations = sortToggle(dislocations, sortedDislocationsKeys, sortedDislocationsOrder);

  return (
    <>
      <div className='hidden pl-4 w-full  py-2 md:grid grid-cols-8 bg-gray-100 grid-rows-1 grid-flow-row table-auto md:grid-cols-8 grid-gap-6 justify-between font-normal text-black z-1'>
        <div className='flex flex-row items-center col-span-2'>
          <button
            onClick={sortedDislocationsName}
            className='flex flex-row items-center'
          >
            <span className='text-gray-300 hover:text-gray-400 text-sm'>Pavadinimas</span>
            <img
              src={require('../../assets/assets/down.png')}
              className='h-2 w-4 ml-2'
            />
          </button>
        </div>
      </div>
      {sortedDislocations?.map((data) => (
        <div className='pl-4 flex-col w-full items-center' key={data.id}>
          <div className='w-full' {...props}>
            <div className='w-full border-b grid grid-cols-8 bg-white grid-rows-1 grid-flow-row table-auto md:grid-cols-8 grid-gap-6 justify-between font-normal text-black z-1'>
              <div className='flex flex-row items-center h-12 col-span-2'>
                <Link
                  to={path}
                  className='bg-white text-gray-500 truncate text-sm hover:text-gray-400'
                >
                  {data.name}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
