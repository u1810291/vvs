import React from 'react';

import DashboardForm from '../form/DashboardForm';
import Index from '../../../layout/SideBarLayout';

const DashboardLayout = () => {
  return (
    <Index>
      <div className='flex flex-row w-full justify-between h-full'>
        <DashboardForm/>
      </div>
    </Index>
  );
}

export default DashboardLayout;
