import React, {forwardRef} from 'react';

const Header = forwardRef(({title, setSidebarOpen}, ref) => (
  <div className='flex w-full items-center py-6' ref={ref}>
    <h2 className='text-[#B6BFC7] text-lg leading-8'>{title}</h2>
  </div>
));

Header.displayName = 'Header';

export default Header;
