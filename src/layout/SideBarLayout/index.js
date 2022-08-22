import React, {useState} from 'react';

import Aside from './Aside';
import Menu from './Menu';

const SidebarLayout = ({children}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <section>
      <Menu sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Aside sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <main className='flex-1 pl-[5.625rem] flex flex-col h-screen'>
        {children}
      </main>
    </section>
  )
};

export default SidebarLayout;
