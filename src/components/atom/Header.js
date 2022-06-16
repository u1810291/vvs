import React, {useCallback} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {withMergedClassName} from '../../util/react';

import useLanguage from '../../hook/useLanguage';

const Header = ({className = 'flex items-center justify-between p-5 border-b border-gray-300', children, ...props}) => {
  const {t} = useLanguage();
  return (
    <header className={`${className}`} {...props}>
      {children}
    </header>
  );
};

export default Header;
