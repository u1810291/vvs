import React, {forwardRef} from 'react';

const Footer = forwardRef(({children}, ref) => (
  <div className='flex items-start flex-col w-full mt-auto mb-6' ref={ref}>
    <span className='w-16 h-px bg-[#818BA2] mb-4 opacity-50'/>
    {children}
  </div>
));

Footer.displayName = 'Footer';

export default Footer;
