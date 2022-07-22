import React from 'react';

import useLanguage from '../../hook/useLanguage';

const Header = ({className = 'flex items-center justify-between p-5 border-b border-gray-300', children, ...props}) => {
  const {t} = useLanguage();
  return (
    <header className={`${className} h-20`} {...props}>
      {children}
    </header>
  );
};

export default Header;
