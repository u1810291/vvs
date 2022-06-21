import React from 'react';

import DashboardForm from '../form/DashboardForm';
import SidebarLayout from 'layout/SideBarLayout';

const DashboardLayout = () => {
  return (
    <SidebarLayout>
      <div className='flex flex-row w-full justify-between h-full'>
        <DashboardForm/>
      </div>
    </SidebarLayout>
  );
}

export default DashboardLayout;
