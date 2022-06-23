import React from 'react';
const {ActiveCard} = require('../obsolete/cards/active');

const List = ({children}) => {
  return (
    <div className='flex flex-col'>
      <div className='text-slate-400'>
        {children}
      </div>
    </div>
  );
};

export default List;
