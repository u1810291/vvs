import React, {useContext} from 'react';
import useLanguage from '../../../../hook/useLanguage';
import GlobalContext from '../../../context/globalContext';
import {Link} from 'react-router-dom';

export function DislocationHeader({name, fetch, ...props}) {
  const {english, lithuanian, t} = useLanguage();
  const {addressCrew, setAddressCrew} = useContext(GlobalContext);

  return (
    <div className='flex flex-row border-b h-16 bg-white justify-between'>
      <div className='xl:flex hidden xl:flex-row ml-4 items-center'>
        <h4 className='ml-2 text-normal font-normal'>Dislocation Zones</h4>
        <p className='pl-2 text-gray-600'>/</p>
        <h4 className='text-lg ml-2 hidden xxl:inline-block font-normal text-gray-500'>
          {addressCrew}
        </h4>
      </div>
      <div className='flex flex-row items-center'>
        <Link
          to='/dislocation'
          className='hidden sm:w-40 sm:h-10 rounded sm:flex mr-2 mt-2 mb-1 justify-center py-2 px-4 border border-transparent drop-shadow shadow text-sm font-light text-black font-montserrat hover:shadow-none bg-gray-200 focus:outline-none'
        >
          Atšaukti
        </Link>
        <button
          onClick={fetch}
          className='hidden sm:w-40 sm:h-10 rounded sm:flex mr-2 mt-2 mb-1 justify-center py-2 px-4 border border-transparent drop-shadow shadow text-sm font-light text-white font-montserrat hover:shadow-none bg-slate-600 hover:bg-slate-500 focus:outline-none'
        >
          Išsaugoti
        </button>
      </div>
    </div>
  );
}
