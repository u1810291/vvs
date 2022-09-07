import React from 'react';

import AlarmForm from '../form/AlarmForm';
import Index from '../../../layout/SideBarLayout';

const AlarmLayout = () => {
  return (
    <Index>
      <div className='flex flex-row w-full justify-between h-full'>
        <AlarmForm/>
      </div>
    </Index>
  );
}

export default AlarmLayout;
