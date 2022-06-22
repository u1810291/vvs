import React, {forwardRef} from 'react';
import MenuIcon from 'components/atom/icon/MenuIcon';

const Aside = forwardRef(({setSidebarOpen}, ref) => (
  <div className='fixed flex w-16 h-full' ref={ref}>
    <div className='flex-1 flex flex-col items-center bg-[#404B5F] py-6'>
      {/*<button className='hover:opacity-50'>*/}
      {/*  <ChevronLeftIcon height={20} color={'#D7DEE6'}/>*/}
      {/*</button>*/}
      {/*<span className='w-1/2 h-px bg-[#818BA2] my-6'/>*/}
      <button className='flex justify-center items-center hover:opacity-50 h-8 w-full' onClick={setSidebarOpen}>
        <MenuIcon/>
      </button>
    </div>
  </div>
));

Aside.displayName = 'StaticAside';

export default Aside;
