import React, {useCallback, useContext} from 'react';
import useLanguage from '../../../hook/useLanguage';
import GlobalContext from '../../context/globalContext';
const {ActiveCard} = require('../cards/active');

const DislocationSideToArchive = (props) => {
  const {accessToken} = useContext(GlobalContext);
  const {english, lithuanian, t} = useLanguage();
  const {addressCrew, setAddressCrew} = useContext(GlobalContext);
  const {polygonsCoordinates, setPolygonsCoordinates} =
    useContext(GlobalContext);
  const {removeZone, setRemoveZone} = useContext(GlobalContext);
  const {polygonsVisible, setPolygonsVisible} = useContext(GlobalContext);

  const archiveFunc = useCallback(() => {
    setRemoveZone(false);
    setPolygonsVisible(true);
  }, [setRemoveZone]);

  const addressCrewFunc = useCallback(
    async (e) => {
      setAddressCrew(e.target.value);
    },
    [setAddressCrew]
  );

  return (
    <>
      <div className='flex flex-col justify-between h-full'>
        <div className='flex justify-start mt-4'>
          <div className='flex flex-row'>
            <div className='flex ml-4 flex-col w-full mb-4 '>
              <div className='flex flex-row'>
                <p className='self-start text-sm truncate my-2'>Pavadinimas</p>
                <p className='self-start ml-1 text-red-600 text-sm truncate my-2'>
                  *
                </p>
              </div>
              <input
                id='address'
                name='address'
                placeholder=''
                onChange={addressCrewFunc}
                value={addressCrew}
                className='flex w-full h-8 border placeholder-gray-400 focus:outline-none sm:text-sm'
              />
            </div>
          </div>
        </div>
        <button
          onClick={archiveFunc}
          className='hidden sm:w-40 sm:h-10 rounded sm:flex mx-2 mt-2 mb-1 justify-center py-2 px-4 border border-transparent drop-shadow shadow text-sm font-light text-white font-montserrat hover:shadow-none bg-red-700 hover:bg-red-600 focus:outline-none'
        >
          Archyvuoti
        </button>
      </div>
    </>
  );
};

export default DislocationSideToArchive;
