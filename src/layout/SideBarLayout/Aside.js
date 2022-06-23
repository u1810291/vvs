import React, {forwardRef} from 'react';
import MenuIcon from 'components/atom/icon/MenuIcon';

const Aside = forwardRef(({setSidebarOpen}, ref) => (
  <div className='fixed flex h-full w-16' ref={ref}>
    <div className='flex-1 flex flex-col items-center py-6 bg-oxford'>
      {/*<button className='hover:opacity-50'>*/}
      {/*  <ChevronLeftIcon height={20} color={'#D7DEE6'}/>*/}
      {/*</button>*/}
      {/*<span className='w-1/2 h-px bg-[#818BA2] my-6'/>*/}
      <button className='flex justify-center items-center w-full h-8 hover:opacity-50 focus:outline-none' onClick={setSidebarOpen}>
        <MenuIcon/>
      </button>
    </div>
  </div>
));

Aside.displayName = 'StaticAside';

export default Aside;
