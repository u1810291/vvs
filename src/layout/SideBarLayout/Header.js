import React, {forwardRef} from 'react';

const Header = forwardRef(({title}, ref) => (
  <div className='flex w-full items-center py-4' ref={ref}>
    <h2 className='text-[#B6BFC7] text-lg leading-8 p-2'>{title}</h2>
  </div>
));

Header.displayName = 'Header';

export default Header;
