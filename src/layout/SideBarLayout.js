import Routes from 'Routes';
import {Dialog, Transition} from '@headlessui/react'
import {Fragment, useMemo, useState} from 'react'
import {MenuIcon, XIcon} from '@heroicons/react/outline'
import {NavLink} from 'react-router-dom';
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
        className={({isActive}) => `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
        to={c.props.path}
        >
        {t(c?.props?.translationKey, {ns: c?.props?.translationNs}) || c?.props?.path}
        </NavLink>
      )}
      {hasChildren && parseRoutes(t, c.props.children)}
    </Fragment>
  )
}, component);

export default function SidebarLayout({showLogo = false ,showBottom = false, children, ...props}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const {t} = useTranslation();
  const routes = useMemo(() => parseRoutes(t, Routes), []);

  return (
    <div {...props}>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as='div' className='relative z-40 md:hidden' onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter='transition-opacity ease-linear duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity ease-linear duration-300'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-gray-600 bg-opacity-75' />
          </Transition.Child>

          <div className='fixed inset-0 flex z-40'>
            <Transition.Child
              as={Fragment}
              enter='transition ease-in-out duration-300 transform'
              enterFrom='-translate-x-full'
              enterTo='translate-x-0'
              leave='transition ease-in-out duration-300 transform'
              leaveFrom='translate-x-0'
              leaveTo='-translate-x-full'
            >
              <Dialog.Panel className='relative flex-1 flex flex-col max-w-xs w-full bg-gray-800'>
                <Transition.Child
                  as={Fragment}
                  enter='ease-in-out duration-300'
                  enterFrom='opacity-0'
                  enterTo='opacity-100'
                  leave='ease-in-out duration-300'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'
                >
                  <div className='absolute top-0 right-0 -mr-12 pt-2'>
                    <button
                      type='button'
                      className='ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className='sr-only'>Close sidebar</span>
                      <XIcon className='h-6 w-6 text-white' aria-hidden='true' />
                    </button>
                  </div>
                </Transition.Child>
                <div className='flex-1 h-0 pt-5 pb-4 overflow-y-auto'>
                  {showLogo && (
                  <div className='flex-shrink-0 flex items-center px-4 mb-5'>
                    <img
                      className='h-8 w-auto'
                      src='https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg'
                      alt='Workflow'
                    />
                  </div>
                  )}
                  <nav className='px-2 space-y-1'>
                    {routes}
                  </nav>
                </div>
                {showBottom && (
                  <div className='flex-shrink-0 flex bg-gray-700 p-4'>
                    <a href='#' className='flex-shrink-0 group block'>
                      <div className='flex items-center'>
                        <div>
                          <img
                            className='inline-block h-10 w-10 rounded-full'
                            src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                            alt=''
                          />
                        </div>
                        <div className='ml-3'>
                          <p className='text-base font-medium text-white'>Tom Cook</p>
                          <p className='text-sm font-medium text-gray-400 group-hover:text-gray-300'>View profile</p>
                        </div>
                      </div>
                    </a>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
            <div className='flex-shrink-0 w-14'></div>
          </div>
        </Dialog>
      </Transition.Root>

      <div className='hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0'>
        <div className='flex-1 flex flex-col min-h-0 bg-gray-800'>
          <div className='flex-1 flex flex-col pt-5 pb-4 overflow-y-auto'>
            {showLogo && (
              <div className='flex items-center flex-shrink-0 px-4 mb-5'>
                <img
                  className='h-8 w-auto'
                  src='https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg'
                  alt='Workflow'
                />
              </div>
            )}
            <nav className='flex-1 px-2 space-y-1'>
              {routes}
            </nav>
          </div>
          {showBottom && (
            <div className='flex-shrink-0 flex bg-gray-700 p-4'>
              <a href='#' className='flex-shrink-0 w-full group block'>
                <div className='flex items-center'>
                  <div>
                    <img
                      className='inline-block h-9 w-9 rounded-full'
                      src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                      alt=''
                    />
                  </div>
                    <div className='ml-3'>
                      <p className='text-sm font-medium text-white'>Tom Cook</p>
                      <p className='text-xs font-medium text-gray-300 group-hover:text-gray-200'>View profile</p>
                    </div>
                </div>
              </a>
            </div>
          )}
        </div>
      </div>
      <div className='md:pl-64 flex flex-col flex-1'>
        <div className='sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-100'>
          <button
            type='button'
            className='-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'
            onClick={() => setSidebarOpen(true)}
          >
            <span className='sr-only'>Open sidebar</span>
            <MenuIcon className='h-6 w-6' aria-hidden='true' />
          </button>
        </div>
        <main className='flex-1'>
          {children}
        </main>
      </div>
    </div>
  )
}
