import React, {useContext, useCallback} from 'react';
import {GreenStatusTop} from '../buttons/greenStatusTop';
import GlobalContext from '../../context/globalContext';

export function FinishedHeader() {
  const {pdfExportComponentNew} = useContext(GlobalContext);
  const {toPrintNew, setToPrintNew} = useContext(GlobalContext);

  const handleExportWithComponent = useCallback(async (event) => {
    setToPrintNew(true);
    setTimeout(() => {
      pdfExportComponentNew.current.save();
    }, 2000);
    setTimeout(() => {
      setToPrintNew(false);
    }, 3000);
  }, [pdfExportComponentNew, setToPrintNew]);

  return (
    <div className='flex flex-row h-16 bg-white justify-between w-full'>
      <div className='md:flex hidden md:flex-row ml-4 items-center'>
        <h4 className='text-lg ml-2 font-normal'>Užduotys</h4>
        <p className='pl-2 text-gray-600'>/</p>
        <h4 className='text-lg ml-2  font-normal text-gray-500'>
          Nauja užduotis
        </h4>
        <GreenStatusTop />
        <div className='flex flex-col justify-center items-end'></div>
      </div>
      <div className='flex flex-row items-center'>
        <img
          className='h-6 w-4 mr-2 hidden lg:inline-block'
          src={require('../../../assets/assets/doc.png')}
        ></img>
        <button
          onClick={handleExportWithComponent}
          className='flex justify-center md:mr-6 p-1 text-sm font-normal hover:text-gray-500'
        >
          Eksportuoti
        </button>
      </div>
    </div>
  );
}
