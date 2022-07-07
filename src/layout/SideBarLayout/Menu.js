import React, {Fragment} from 'react';
import {Dialog, Transition} from '@headlessui/react';

import List from './List';
import Aside from './Aside';
import Header from './Header';

import {useTranslation} from 'react-i18next';
import Footer from './Footer';

const Menu = ({sidebarOpen, setSidebarOpen}) => {
  const {t} = useTranslation();
  return (
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog as='div' className='relative z-40' onClose={setSidebarOpen}>
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
            <Dialog.Panel className='relative flex flex-col w-full bg-oxford'>
              <Aside setSidebarOpen={setSidebarOpen}/>
              <div className='pl-16 h-full'>
                <Header setSidebarOpen={setSidebarOpen} title={t('Sidebar.menu')} />
                <List />
                <Footer>
                  <button className='mb-4 text-lilac font-normal hover:opacity-50'>
                    {t('Sidebar.myAccount')}
                  </button>
                  <button className='mb-4 text-lilac font-normal hover:opacity-50'>
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
