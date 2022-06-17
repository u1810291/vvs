import React, { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Disconnected } from '../../buttons/disconnected';
import GlobalContext from '../../../context/globalContext';
import useLanguage from '../../../hook/useLanguage';

const CreateCrewHeader = ({ crew, ...props }) => {
  const { english, lithuanian, t } = useLanguage();
  const { search, setSearch } = useContext(GlobalContext);

  const searchFunc = useCallback(
    async (e) => {
      setSearch(e.target.value);
    },
    [setSearch]
  );

  const filterFunc = useCallback(async () => {
    console.log('filter');
  }, []);

  const navigate = useNavigate();
  const navigateToCrewList = useCallback(() => {
    navigate('/Crews');
  }, [navigate]);

  return (
    <div className='flex flex-row border h-16 bg-white border-b-2 justify-between'>
      <div className='xl:flex hidden xl:flex-row ml-4 items-center'>
        <h4 className='text-lg ml-2 font-normal'>{t('eurocash.crew')}</h4>
        <p className='pl-2 text-gray-600'>/</p>
        <h4 className='text-lg ml-2 hidden xxl:inline-block font-normal text-gray-500'>
          9 GRE
        </h4>
        {crew === 'online' ? (
          <div
            className={
              'ml-4 text-white bg-[#92C46B] px-2 py-1 rounded-md text-sm'
            }
          >
            <p>LAISVAS</p>
          </div>
        ) : crew === 'online' ? (
          <Disconnected />
        ) : (
          <div
            className={
              'ml-4 text-white bg-[#abaaa9] px-2 py-1 rounded-md text-sm'
            }
          >
            <p>Neaktyvus</p>
          </div>
        )}
      </div>
      <div className='flex flex-row items-center'>
        <button
          type='submit'
          onClick={navigateToCrewList}
          className='hidden sm:w-40 sm:h-10 rounded sm:flex mr-2 mt-2 mb-1 justify-center py-2 px-4 border border-transparent drop-shadow shadow text-sm font-light text-gray-500 font-montserrat hover:shadow-none bg-gray-200 focus:outline-none'
        >
          {t('eurocash.cancel')}
        </button>
        <button
          type='submit'
          className='hidden sm:w-40 sm:h-10 rounded sm:flex mr-2 mt-2 mb-1 justify-center py-2 px-4 border border-transparent drop-shadow shadow text-sm font-light text-white font-montserrat hover:shadow-none bg-slate-600 focus:outline-none'
        >
          {t('eurocash.save')}
        </button>
      </div>
    </div>
  );
};

export default CreateCrewHeader;
