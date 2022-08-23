import {reduce} from 'crocks/pointfree';
import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';
import {putIntoArray} from 'util/array';
import {withComponentFactory} from '../../util/react';
import {
  getProp,
  isArray,
  isObject,
  option,
  pipe,
} from 'crocks';

import React from 'react';

const Box = ({Item, ...props}) => (
  <nav className='flex' aria-label='Breadcrumb'>
    <ol role='list' className='flex items-center space-x-4'>
      {
        pipe(
          getProp('children'),
          option(null),
        )(props)
      }
    </ol>
  </nav>
)

const Item = ({hasSlash = true, children, props}) => (
  <li {...props}>
    <div className='flex items-center'>
      <span className='mr-4 text-lg font-normal text-bluewood'>
        {children}
      </span>
      {hasSlash && (
        <svg
          className='flex-shrink-0 h-5 w-5 text-regent'
          xmlns='http://www.w3.org/2000/svg'
          fill='currentColor'
          viewBox='0 0 20 20'
          aria-hidden='true'
        >
          <path d='M5.555 17.776l8-16 .894.448-8 16-.894-.448z' />
        </svg>
      )}
    </div>
  </li>
);

const Breadcrumbs =  withComponentFactory(Box, {Item});

export const RouteAsBreadcrumb = ({route}) => {
  const {t} = useTranslation();

  const routeToBreadCrumbs = (t, component) => pipe(
    putIntoArray,
    reduce((carry, item) => {
      const {translationKey, translationNs, path, element, children, isHidden = false} = item?.props;
      const isRoute = path && element && !isHidden;

      return [
        ...carry,
        ...(isRoute ? [
          <Breadcrumbs.Item key={path}>
            <Link to={path}>
              {t(translationKey, {ns: translationNs, keyPrefix: ''})}
            </Link>
          </Breadcrumbs.Item>
        ] : []),
        ...(isArray(children) ? children.map(a => routeToBreadCrumbs(t, a)) : []),
        ...(isObject(children) ? [routeToBreadCrumbs(t, children)] : []),
      ];
    }, [])
  )(component)

  return routeToBreadCrumbs(t, route);
};

export default Breadcrumbs;
