// import {reduce} from 'crocks/pointfree';
// import {useTranslation} from 'react-i18next';
import {NavLink} from 'react-router-dom';
// import {putIntoArray} from 'util/array';
import {withComponentFactory} from '../../util/react';
import {
  getProp,
  // isArray,
  // isObject,
  option,
  pipe,
} from 'crocks';

import React from 'react';

const Box = ({Item, ...props}) => (
  <nav className='flex' aria-label='Innerlinks'>
    <ol role='list' className='flex items-center'>
      {
        pipe(
          getProp('children'),
          option(null),
        )(props)
      }
    </ol>
  </nav>
)

const Item = ({isCurrent = false, to = '#', children, props}) => (
  <li {...props}>
    <NavLink to={to} className={`${isCurrent ? 'border-blue-600' : 'border-transparent hover:border-blue-400'} px-6 py-6 border-b-4 `}>
      {children}
    </NavLink>
  </li>
);

const Innerlinks = withComponentFactory(Box, {Item});

export default Innerlinks;
