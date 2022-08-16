import React, {Fragment, useMemo, forwardRef} from 'react'

import {NavLink} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

import Routes from 'Routes';

import {renderChildren} from '@s-e/frontend/react';

import {isEmpty, isTrue, not} from 'crocks';

const parseRoutes = (t, component) => renderChildren((c, index) => {
  const isHidden = isTrue(c?.props?.isHidden);
  const hasChildren = not(isEmpty, c?.props?.children);
  const isRoute = c?.props?.path && c?.props?.element;
  const isHiddenChildren = isTrue(c?.props?.children?.props?.isHidden);

  // TODO: Improve logic to prevent rendering empty items
  if (isHidden && !hasChildren) return null;

  return (
    <Fragment key={String(`${c?.props?.path}-${index}-${c?.props?.children?.length}`)}>
      {isRoute && (
        <div className='flex-1'>
          <NavLink
            className={'inline-block px-2 py-2 text-base text-lilac font-thin bg-oxford hover:text-geyser'}
            to={c.props.path}
          >
            {t(c?.props?.translationKey, {ns: c?.props?.translationNs}) || c?.props?.path}
          </NavLink>
        </div>
      )}
      {hasChildren && !isHiddenChildren && (
        <div className='flex items-start'>
          {parseRoutes(t, c?.props?.children[0])}
          <div className='flex flex-col flex-1 mb-4'>{parseRoutes(t, c?.props?.children)}</div>
        </div>
      )}
    </Fragment>
  )
}, component);

const List = forwardRef((props, ref) => {
  const {t} = useTranslation();
  const routes = useMemo(() => parseRoutes(t, Routes), []);
  return (
    // TODO: Adjust media queries for mobile
    <div className='flex w-full my-8 overflow-auto w-1/4 h-1/4 xl:h-3/4' ref={ref} {...props}>
      <nav className='w-full flex flex-col sm:flex-wrap'>
        {routes}
      </nav>
    </div>
  );
});

List.displayName = 'List';

export default List;
