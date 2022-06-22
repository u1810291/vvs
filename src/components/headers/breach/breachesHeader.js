import React, {useCallback, useContext} from 'react';
import GlobalContext from '../../../context/globalContext';
import useLanguage from '../../../hook/useLanguage';
import {Link} from 'react-router-dom';

export function BreachesHeader() {
  const {english, lithuanian, t} = useLanguage();
  const {expandFilterBreaches, setExpandFilterBreaches} = useContext(GlobalContext);

  const filterFunc = useCallback(async () => {
    if (expandFilterBreaches) {
      setExpandFilterBreaches(false);
    }
    if (!expandFilterBreaches) {
      setExpandFilterBreaches(true);
    }
  }, [expandFilterBreaches, setExpandFilterBreaches]);

  return (
    <div className='flex flex-row border h-16 bg-white border-b-2 justify-between'>
      <div className='xl:flex hidden xl:flex-row ml-4 items-center'>
        <h4 className='ml-2 text-normal font-normal'>
          <Link to='/breaches'>
            {t('eurocash.violations')}
          </Link>
        </h4>
        <p className='pl-2 text-gray-600'>/</p>
        <h4 className='text-normal ml-2 hidden xxl:inline-block font-normal text-gray-500'>
          {t('eurocash.allData')}
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
      </div>
      <div className='flex flex-row items-center'>
        <button  className='text-lg mx-1 sm:mx-6 h-full font-light text-black hover:border-b-4 mt-2 hover:border-blue-400'>
          {t('eurocash.console')}
        </button>
        <button  className='text-lg mx-1 sm:mx-6 h-full font-light text-black hover:border-b-4 mt-2 hover:border-blue-400'>
          {t('eurocash.tasks')}
        </button>
        <button  className='text-lg mx-1 sm:mx-6 h-full font-light text-black hover:border-b-4 mt-2 hover:border-blue-400'>
          {t('eurocash.permissions')}
        </button>
        <button  className='text-lg mx-1 sm:mx-6 h-full font-light text-black hover:border-b-4 mt-2 hover:border-blue-400'>
          {t('eurocash.violations')}
        </button>
      </div>
    </div>
  );
}
