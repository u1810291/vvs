import React, {useEffect, useState, forwardRef} from 'react';
import MenuIcon from 'components/atom/icon/MenuIcon';
import {NavLink} from 'react-router-dom';
import {getStarredFilters} from 'hook/useFilter';


const ASideBar = ({ref, sidebarOpen, setSidebarOpen, closeSidebar, openSidebar}) => {
  const [starred, setStarred] = useState(getStarredFilters());

  const onStorageChange = (e) => {
    setStarred(getStarredFilters());
  };

  useEffect(() => {
    window.addEventListener('storage', onStorageChange);

    return () => {
      window.removeEventListener('storage', onStorageChange);
    };
  }, []);

  return (<div className='fixed flex h-full w-[5.625rem] z-50' ref={ref}>
    <div className='flex-1 flex flex-col items-center py-6 bg-oxford'>
      {/*<button className='hover:opacity-50'>*/}
      {/*  <ChevronLeftIcon height={20} color={'#D7DEE6'}/>*/}
      {/*</button>*/}
      {/*<span className='w-1/2 h-px bg-[#818BA2] my-6'/>*/}
      <button
        className='flex justify-center items-center w-fit h-fit h-[1.688rem] hover:opacity-50 focus:outline-none'
        onClick={() => setSidebarOpen((e) => !e)}>
        <MenuIcon />
      </button>

      {/* Starred filters */}
      <ul className='mt-6'>
        {starred.map((filter, index) => {
          return <li key={filter.id} id={filter.id}>
            <NavLink to={filter.url} className={'text-white hover:opacity-50 cursor-pointer'}>{filter.shortcut}</NavLink>
          </li>
        })}
      </ul>
    </div>
  </div>);
}

const Aside = forwardRef(({setSidebarOpen}, ref) => (
  <ASideBar setSidebarOpen={setSidebarOpen} ref={ref} />
));

Aside.displayName = 'StaticAside';

export default Aside;
