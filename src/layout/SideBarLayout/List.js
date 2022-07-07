import Routes from '../../Routes';
import {Fragment, useMemo} from 'react'
import {NavLink} from 'react-router-dom';
import {forwardRef} from 'react';
import {isEmpty, isTrue, not} from 'crocks';
import {renderChildren} from '@s-e/frontend/react';
import {useTranslation} from 'react-i18next';

const parseRoutes = (t, component) => renderChildren((c, index) => {
  const isHidden = isTrue(c?.props?.isHidden);
  const hasChildren = not(isEmpty, c?.props?.children);
  const isRoute = c?.props?.path && c?.props?.element;

  if (isHidden && !hasChildren) return null;

  return (
    <Fragment key={String(`${c?.props?.path}-${index}-${c?.props?.children?.length}`)}>
      {isRoute && (
        <NavLink
          className={({isActive}) => `group flex items-center px-2 py-2 mb-4 mr-6 last-of-type:mb-0 text-base text-lilac font-normal rounded-md hover:bg-bluewood ${isActive ? 'bg-bluewood' : 'bg-oxford'}`}
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
    <div className='flex w-full my-8 overflow-auto h-1/4 xl:h-1/2' ref={ref} {...props}>
      <nav className='w-min flex flex-col sm:flex-wrap'>
        {routes}
      </nav>
    </div>
  );
});

List.displayName = 'List';

export default List;
