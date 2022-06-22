import React, {useContext, useCallback} from 'react';
import GlobalContext from '../../context/globalContext';

export function KeyHeader({fullName}) {
  const {pdfExportComponentKey} = useContext(GlobalContext);
  const {toPrintKey, setToPrintKey} = useContext(GlobalContext);

  const handleExportWithComponent = useCallback(async (event) => {
    setToPrintKey(true);
    setTimeout(() => {
      pdfExportComponentKey.current.save();
    }, 2000);
    setTimeout(() => {
      setToPrintKey(false);
    }, 3000);
  }, [pdfExportComponentKey, setToPrintKey]);

  return (
    <div className='flex flex-row border h-16 bg-white justify-between'>
      <div className='md:flex hidden md:flex-row ml-4 items-center'>
        <h4 className='ml-2 text-normal font-normal'>Klientai</h4>
        <p className='pl-2 text-gray-600'>/</p>
        <h4 className='ml-2 text-normal font-normal'>9RG</h4>
        <h4 className='ml-2  text-normal font-normal'>
          {fullName}
        </h4>
      </div>
      <div className='flex flex-row items-center'>
      <div className='flex flex-row items-center'>
        <img
          className='h-6 w-4 mr-2 hidden lg:inline-block'
          src={require('../../assets/assets/doc.png')}
        ></img>
        <button
          onClick={handleExportWithComponent}
          className='flex justify-center md:mr-6 p-1 text-sm font-normal hover:text-gray-500'
        >
          Ekipažo raktai
        </button>
      </div>
        <button
          type='submit'
          className='hidden sm:w-40 sm:h-10 rounded sm:flex mr-2 mt-2 mb-1 justify-center py-2 px-4 border border-transparent drop-shadow shadow text-sm font-light text-black font-montserrat hover:shadow-none bg-gray-200 focus:outline-none'
        >
          Atšaukti
        </button>
        <button
          type='submit'
          className='hidden sm:w-40 sm:h-10 rounded sm:flex mr-2 mt-2 mb-1 justify-center py-2 px-4 border border-transparent drop-shadow shadow text-sm font-light text-white font-montserrat hover:shadow-none bg-slate-600 hover:bg-slate-500 focus:outline-none'
        >
          Išsaugoti
        </button>
      </div>
    </div>
  );
}
