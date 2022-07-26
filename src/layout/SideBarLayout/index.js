import React from 'react';

import Aside from './Aside';
import Menu from './Menu';

import useBoolean from '../../hook/useBoolean';

const SidebarLayout = ({children}) => {
  const [sidebarOpen, setSidebarOpen] = useBoolean(false);
  return (
    <section>
      <Menu sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
      <Aside setSidebarOpen={setSidebarOpen}/>
      <main className='flex-1 pl-16 flex flex-col h-screen'>
        {children}
      </main>
    </section>
  )
};

export default SidebarLayout;
