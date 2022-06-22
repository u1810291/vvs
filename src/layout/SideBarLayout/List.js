import Routes from '../../Routes';
import {Fragment, useMemo} from 'react'
import {NavLink} from 'react-router-dom';
import {forwardRef} from 'react';
import {isEmpty, isTrue, not} from 'crocks';
import {renderChildren} from '@s-e/frontend/react';
import {useTranslation} from 'react-i18next';

const parseRoutes = (t, component) => renderChildren(c => {
  const isHidden = isTrue(c?.props?.isHidden);
  const hasChildren = not(isEmpty, c?.props?.children);
  const isRoute = c?.props?.path && c?.props?.element;

  if (isHidden && !hasChildren) return null;

  return (
    <Fragment key={c?.props.path}>
      {isRoute && (
        <NavLink
        className={({isActive}) => `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive ? 'bg-gray-900 bg-opacity-10 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
        to={c.props.path}
        >
        {t(c?.props?.translationKey, {ns: c?.props?.translationNs}) || c?.props?.path}
        </NavLink>
      )}
      {hasChildren && parseRoutes(t, c.props.children)}
    </Fragment>
  )
}, component);

const List = forwardRef((props, ref) => {
  const {t} = useTranslation();
  const routes = useMemo(() => parseRoutes(t, Routes), []);
  return (
    <div className='flex w-full py-8' ref={ref} {...props}>
      <div className='w-full overflow-y-auto'>
        <nav className='max-w-md text-[#B6BFC7] text-lg'>
          {routes}
        </nav>
      </div>
    </div>
  );
});

List.displayName = 'List';

export default List;
