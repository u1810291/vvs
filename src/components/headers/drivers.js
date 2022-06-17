import React, { useCallback, useContext } from 'react';
import { Search } from '../../components/input/search';
import GlobalContext from '../../context/globalContext';
import { Link } from 'react-router-dom';

export function DriversHeader() {
  const { expandFilterDrivers, setExpandFilterDrivers } =
    useContext(GlobalContext);

  const filterFunc = useCallback(async () => {
    if (expandFilterDrivers) {
      setExpandFilterDrivers(false);
    }
    if (!expandFilterDrivers) {
      setExpandFilterDrivers(true);
    }
  }, [expandFilterDrivers, setExpandFilterDrivers]);

  return (
    <div className='flex flex-row border-b h-16 bg-white justify-between'>
      <div className='xl:flex hidden xl:flex-row ml-4 items-center'>
        <h4 className='ml-2 text-normal font-normal'>Vairuotojai</h4>
        <p className='pl-2 text-gray-600'>/</p>
        <h4 className='text-normal ml-2 hidden xxl:inline-block font-normal text-gray-500'>
          Visi duomenys
        </h4>
        <button onClick={filterFunc}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6 ml-4 mr-8 fill-gray-300 hover:fill-gray-400'
            viewBox='0 0 20 20'
          >
            <path
              fillRule='evenodd'
              d='M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z'
              clipRule='evenodd'
            />
          </svg>
        </button>
        <Search />
      </div>
      <div className='flex flex-row items-center'>
        <Link to='/driver'>
        <button
          className='hidden sm:w-40 sm:h-10 rounded sm:flex mr-2 mt-2 mb-1 justify-center py-2 px-4 border border-transparent drop-shadow shadow text-sm font-light text-white font-montserrat hover:shadow-none bg-slate-600 hover:bg-slate-500 focus:outline-none'
        >
          Sukurti vairuotoją
        </button>
        </Link>
        <button className='text-normal mx-1 sm:mx-6 h-full font-light hover:text-gray-500 text-black hover:border-b-4 mt-2 hover:border-blue-400'>
          Ekipažai
        </button>
        <button className='text-normal mx-1 sm:mx-6 h-full font-light hover:text-gray-500 text-black border-b-4 mt-2 border-blue-400'>
          Vairuotojai
        </button>
        <button className='text-normal mx-1 sm:mx-6 h-full font-light hover:text-gray-500 text-black hover:border-b-4 mt-2 hover:border-blue-400'>
          Dislokacijos zonos
        </button>
      </div>
    </div>
  );
}
