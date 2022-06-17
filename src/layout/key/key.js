import React, { useState, useContext, useCallback, useEffect } from 'react';
import { Orders } from '../../mocks/orders';
import { KeyInternal } from '../../components/lists/keyInternal';
import { KeyHeader } from '../../components/headers/key';
import { KeyList } from '../../components/lists/key';
import { keyObjectList } from '../../mocks/keyObjectList';
import { generate } from 'shortid';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { useParams } from 'react-router-dom';
import { Search } from '../../components/input/search';
import GlobalContext from '../../context/globalContext';
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
import SlideOver from '../../components/sidebars/slideOver';
import { Spinner } from 'react-activity';
import { OverlayProvider, usePreventScroll } from 'react-aria';
import MainSidebar from '../../components/sidebars/main';
import useUtils from '../../hook/useUtils';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function Key() {
  const { id } = useParams();
  const { pdfExportComponentKey } = useContext(GlobalContext);
  const { toPrintKey, setToPrintKey } = useContext(GlobalContext);
  const [keySet, setKeySet] = useState('');
  const [openModal, setOpenModal] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const handleOnClose = useCallback(() => {
    setIsOpen(false);
  }, []);
  const handleOnOpen = useCallback(() => {
    setIsOpen(true);
  }, []);
  usePreventScroll({ isDisabled: !isOpen });
  const { backFunc } = useUtils();

  const keySetFunc = useCallback(
    async (e) => {
      setKeySet(e.target.value);
    },
    [setKeySet]
  );

  // useEffect(() => {
  //   if(error) {
  //     backFunc()
  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // },[error])

  const confirmArchiveFetch = useCallback(() => {
    let text = 'Ar tikrai norite archyvuoti?';
    if (window.confirm(text) === true) {
      // archiveFetch();
    }
  }, []);

  const openObjectList = useCallback(() => {
    setOpenModal(true);
  }, []);

  const closeObjectList = useCallback(() => {
    setOpenModal(false);
  }, []);

  return (
    <>
      {!keyObjectList ? (
        <div className='flex h-screen w-screen bg-gray-100 justify-center items-center'>
          <Spinner color='dark-blue' size={40} />
        </div>
      ) : (
        <OverlayProvider>
          <div className='container max-w-screen-xl'>
            <div className='flex w-screen flex-row justify-center h-screen'>
              <div className='flex flex-col h-full items-center w-full'>
                <div className='flex flex-row w-full justify-between h-full'>
                  <div className='flex flex-col bg-slate-600 pt-6 items-center w-20'>
                    <button onClick={backFunc}>
                      <img src={require('../../assets/assets/left.png')}></img>
                    </button>
                    <img
                      className='pt-6'
                      src={require('../../assets/assets/Line.png')}
                    ></img>
                    <button className='flex flex-col py-2 items-center pt-2'>
                      <img
                        onClick={handleOnOpen}
                        className='w-4 h-4 mx-16'
                        src={require('../../assets/assets/hamburger.png')}
                      />
                    </button>
                  </div>
                  <div className='flex flex-col h-screen w-full justify-between'>
                    <KeyHeader />
                    <div className='flex flex-row h-screen'>
                      <div className='flex pl-4 flex-row w-full h-full justify-start'>
                        <div className='flex h-full flex-col justify-between w-full pr-4 md:pr-0 md:w-4/6 lg:w-4/6'>
                          <div className='flex flex-col'>
                            <div className='flex flex-row'>
                              <div className='flex mr-2 flex-col  mb-4 '>
                                <div className='flex flex-row'>
                                  <p className='self-start text-sm text-gray-500 truncate my-2'>
                                    Komplektas
                                  </p>
                                  <p className='self-start ml-1 text-red-600 text-sm truncate my-2'>
                                    *
                                  </p>
                                </div>
                                <input
                                  id='set'
                                  name='set'
                                  placeholder=''
                                  required
                                  value={keySet}
                                  onChange={keySetFunc}
                                  className='flex h-8 w-52 border placeholder-gray-400 text-black focus:outline-none sm:text-sm'
                                />
                              </div>

                              <div className='flex ml-2 flex-col mb-4 '>
                                <div className='flex flex-row'>
                                  <p className='self-start text-sm text-gray-500 truncate my-2'>
                                    Ekipažas
                                  </p>
                                  <p className='self-start ml-1 text-red-600 text-sm truncate my-2'>
                                    *
                                  </p>
                                </div>
                                <Menu
                                  as='div'
                                  className='relative inline-block text-left'
                                >
                                  <div className='flex flex-col  w-full'>
                                    <Menu.Button className='inline-flex justify-between border w-52 h-8 shadow-sm px-4 py-2 text-sm font-normal text-gray-500 focus:outline-none'>
                                      <p className='text-gray-400 self-center truncate text-xs'>
                                        9 RG
                                      </p>
                                      <ChevronDownIcon
                                        className='-mr-1 ml-2 h-5 w-5'
                                        aria-hidden='true'
                                      />
                                    </Menu.Button>
                                  </div>

                                  <Transition
                                    as={Fragment}
                                    enter='transition ease-out duration-100'
                                    enterFrom='transform opacity-0 scale-95'
                                    enterTo='transform opacity-100 scale-100'
                                    leave='transition ease-in duration-75'
                                    leaveFrom='transform opacity-100 scale-100'
                                    leaveTo='transform opacity-0 scale-95'
                                  >
                                    <Menu.Items className='origin-top-right z-10 absolute left-0 mt-2 w-32 sm:w-56 shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
                                      <div className='py-1'>
                                        <Menu.Item>
                                          {({ active }) => (
                                            <button
                                              // onClick={loop}
                                              className={classNames(
                                                active
                                                  ? 'bg-gray-100 text-gray-900 w-full truncate text-center'
                                                  : 'text-center truncate w-full text-gray-700',
                                                'block px-4 py-2 text-sm'
                                              )}
                                            >
                                              1
                                            </button>
                                          )}
                                        </Menu.Item>
                                      </div>
                                    </Menu.Items>
                                  </Transition>
                                </Menu>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className='flex w-full justify-between'>
                              <a className='flex rounded-sm text-normal px-2 mb-2 font-normal items-center text-black'>
                                <p>Objektai</p>
                              </a>
                              <button
                                onClick={openObjectList}
                                className='flex rounded-sm text-xs px-4 mb-2 font-normal items-center text-gray-400 hover:text-gray-500 bg-gray-200'
                              >
                                <p>Pridėti objektą</p>
                              </button>
                            </div>

                            {openModal ? (
                              <div
                                className='relative z-10'
                                aria-labelledby='modal-title'
                                role='dialog'
                                aria-modal='true'
                              >
                                <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'></div>
                                <div className='fixed z-10 inset-0 overflow-auto'>
                                  <div className='flex items-center justify-center h-full my-4 px-4 pb-20 text-center'>
                                    <span
                                      className='hidden sm:inline-block sm:align-middle sm:h-full'
                                      aria-hidden='true'
                                    >
                                      &#8203;
                                    </span>
                                    <div className='relative inline-block align-bottom bg-white px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle mx-10 h-full w-screen sm:p-6'>
                                      <div className='flex flex-row border-b h-16 bg-white justify-between'>
                                        <div className='xl:flex hidden xl:flex-row ml-4 items-center'>
                                          <h4 className='ml-2 text-normal font-normal'>
                                            Užduotys
                                          </h4>
                                          <p className='pl-2 text-gray-600'>
                                            /
                                          </p>
                                          <h4 className='text-normal ml-2 font-normal text-gray-500'>
                                            Visi duomenys
                                          </h4>
                                          <div className='px-8'>
                                            <Search />
                                          </div>
                                        </div>
                                        <div className='flex flex-col justify-center'>
                                          <button
                                            onClick={closeObjectList}
                                            className=''
                                          >
                                            <img
                                              className='h-6 w-6'
                                              src={require('../../assets/assets/close.png')}
                                            ></img>
                                          </button>
                                        </div>
                                      </div>

                                      <div className='hidden pl-1 w-full py-2 md:grid grid-cols-12 bg-gray-100 grid-rows-1 grid-flow-row table-auto md:grid-cols-12 grid-gap-6 justify-between font-normal text-black z-1'>
                                        <div className='flex flex-row items-center col-span-2'>
                                          <span className='text-gray-300 text-sm'>
                                            Pavadinimas
                                          </span>
                                        </div>
                                        <div className='flex flex-row items-center'>
                                          <span className='text-gray-300 text-sm'>
                                            Miestas
                                          </span>
                                        </div>
                                        <div className='flex flex-row items-center col-span-2'>
                                          <span className='text-gray-300 text-sm'>
                                            Adresas
                                          </span>
                                        </div>
                                        <div className='flex flex-row items-center'>
                                          <span className='text-gray-300 text-sm'>
                                            Objekto Nr.
                                          </span>
                                        </div>
                                        <div className='flex flex-row items-center'>
                                          <span className='text-gray-300 text-sm'>
                                            Sutarties Nr.
                                          </span>
                                        </div>
                                        <div className='flex flex-row items-center'>
                                          <span className='text-gray-300 text-sm'>
                                            Siųsti Ekipažą
                                          </span>
                                        </div>
                                        <div className='flex flex-row items-center'>
                                          <span className='text-gray-300 text-sm'></span>
                                        </div>
                                        <div className='flex flex-row items-center col-span-3'>
                                          <span className='text-gray-300 text-sm'></span>
                                        </div>
                                      </div>
                                      <div className='overflow-y-auto h-96'>
                                        {Orders.map((data) => (
                                          <KeyInternal
                                            key={generate()}
                                            id={data.id}
                                            name={data.name}
                                            city={data.city}
                                            address={data.address}
                                            objectnr={data.objectnr}
                                            contractnr={data.contractnr}
                                            sendcrew={data.sentCrew}
                                            add={data.add}
                                          />
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ) : null}
                            {toPrintKey ? (
                              <PDFExport
                                ref={pdfExportComponentKey}
                                scale={0.4}
                                paperSize='A4'
                                margin='1cm'
                              >
                                <div className='hidden pl-1 w-full border-t py-2 md:grid grid-cols-12 bg-gray-100 grid-rows-1 grid-flow-row table-auto md:grid-cols-12 grid-gap-6 justify-between font-normal text-black z-1'>
                                  <div className='flex flex-row items-center'>
                                    <span className='text-gray-300 text-sm'>
                                      Nr
                                    </span>
                                  </div>
                                  <div className='flex flex-row items-center col-span-2'>
                                    <span className='text-gray-300 text-sm'>
                                      Objekto Nr
                                    </span>
                                  </div>
                                  <div className='flex flex-row items-center col-span-4'>
                                    <span className='text-gray-300 text-sm'>
                                      Objektas
                                    </span>
                                  </div>
                                  <div className='flex flex-row items-center col-span-4'>
                                    <span className='text-gray-300 col-span-5 text-sm'>
                                      Adresas
                                    </span>
                                  </div>
                                  <div className='flex flex-row items-center'>
                                    <span className='text-gray-300 col-span-5 text-sm'></span>
                                  </div>
                                </div>

                                <div className='overflow-y-auto h-96 scrollbar-gone'>
                                  {keyObjectList.map((data) => (
                                    <KeyList
                                      key={generate()}
                                      id={data.id}
                                      nr={data.nr}
                                      objectnr={data.objectnr}
                                      object={data.object}
                                      address={data.address}
                                      remove={data.remove}
                                    />
                                  ))}
                                </div>
                              </PDFExport>
                            ) : (
                              <>
                                <div className='hidden pl-1 w-full border-t py-2 md:grid grid-cols-12 bg-gray-100 grid-rows-1 grid-flow-row table-auto md:grid-cols-12 grid-gap-6 justify-between font-normal text-black z-1'>
                                  <div className='flex flex-row items-center'>
                                    <span className='text-gray-300 text-sm'>
                                      Nr
                                    </span>
                                  </div>
                                  <div className='flex flex-row items-center col-span-2'>
                                    <span className='text-gray-300 text-sm'>
                                      Objekto Nr
                                    </span>
                                  </div>
                                  <div className='flex flex-row items-center col-span-4'>
                                    <span className='text-gray-300 text-sm'>
                                      Objektas
                                    </span>
                                  </div>
                                  <div className='flex flex-row items-center col-span-4'>
                                    <span className='text-gray-300 col-span-5 text-sm'>
                                      Adresas
                                    </span>
                                  </div>
                                  <div className='flex flex-row items-center'>
                                    <span className='text-gray-300 col-span-5 text-sm'></span>
                                  </div>
                                </div>

                                <div className='overflow-y-auto h-96 scrollbar-gone'>
                                  {keyObjectList.map((data) => (
                                    <KeyList
                                      key={generate()}
                                      id={data.id}
                                      nr={data.nr}
                                      objectnr={data.objectnr}
                                      object={data.object}
                                      address={data.address}
                                      remove={data.remove}
                                    />
                                  ))}
                                </div>
                              </>
                            )}
                          </div>
                          <button
                            onClick={confirmArchiveFetch}
                            className='hidden sm:w-40 sm:h-10 rounded sm:flex mr-2 mt-2 mb-1 justify-center py-2 px-4 border border-transparent drop-shadow shadow text-sm font-light text-white font-montserrat hover:shadow-none bg-red-700 hover:bg-red-600 focus:outline-none'
                          >
                            Archyvuoti
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <SlideOver isOpen={isOpen} onClose={handleOnClose}>
                  <MainSidebar />
                </SlideOver>
              </div>
            </div>
          </div>
        </OverlayProvider>
      )}
    </>
  );
}

export default Key;
