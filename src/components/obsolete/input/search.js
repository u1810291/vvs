import React, {useCallback, useContext} from 'react';
import GlobalContext from '../../context/globalContext';

export function Search() {
  const {search, setSearch} = useContext(GlobalContext);

  const searchFunc = useCallback(
    async (e) => {
      setSearch(e.target.value);
    },
    [setSearch]
  );

  return (
    <div className='flex flex-col justify-center items-end'>
      <div className='flex relative overflow-hidden'>
        <input
          id='search'
          name='search'
          placeholder='Greita paieška'
          value={search}
          onChange={searchFunc}
          className='appearance-none sm:w-96 px-3 py-2 border rounded-full border-b shadow-sm text-xl text-gray-400 placeholder-gray-400 focus:outline-none sm:text-sm'
        />
      </div>
      <div onClick={searchFunc} className='flex h-6 w-6 absolute mr-4'>
        <img src={require('../../../assets/assets/search.png')} alt='filter' />
      </div>
    </div>
  );
}
