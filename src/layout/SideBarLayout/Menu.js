import React, {Fragment} from 'react';
import {Dialog, Transition} from '@headlessui/react';

import List from './List';
import Header from './Header';

import {useTranslation} from 'react-i18next';
import Footer from './Footer';

const Menu = ({sidebarOpen, setSidebarOpen, logout}) => {
  const {t} = useTranslation();
  return (
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog as='div' className='relative z-40' onClose={(e) => {}}>
        <div className='fixed inset-0 flex z-40'>
          <Transition.Child
            as={Fragment}
            enter='transition ease-in-out duration-200 transform'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition ease-in-out duration-200 transform'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Panel className='relative flex flex-col ml-auto w-[calc(100%-5.625rem)] bg-oxford'>
              <div className='h-full'>
                <Header title={t('Sidebar.menu')} />
                <List />
                <Footer>
                  <button className='mb-4 text-lilac font-normal hover:text-geyser'>
                    {t('Sidebar.myAccount')}
                  </button>
                  <button onClick={() => logout()} className='mb-4 text-lilac font-normal hover:text-geyser'>
                    {t('Sidebar.signOut')}
                  </button>
                </Footer>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Menu;
