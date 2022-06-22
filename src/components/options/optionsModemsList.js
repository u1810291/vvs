import React, {useState, useContext, useEffect, useRef} from 'react';
import {Fragment} from 'react';
import {Menu, Transition} from '@headlessui/react';
import {ChevronDownIcon} from '@heroicons/react/solid';
import GlobalContext from '../../context/globalContext';
import useLanguage from '../../hook/useLanguage';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export const OptionsListModems = (props) => {
  const {english, lithuanian, t} = useLanguage();
  const {filterListModems, setFilterListModems} = useContext(GlobalContext);
  const {selectedFilterModems, setSelectedFilterModems} = useContext(GlobalContext);
  const {value, onChange} = useContext(GlobalContext);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [startAndEndDate, setStartAndEndDate] = useState();
  const ref = useRef(null);

  useEffect(() => {
    const startYear = value[0]?.getFullYear();
    const startMonth = value[0]?.getMonth() + 1;
    const startDay = value[0]?.getDate();
    const newStartDate = `${startYear}-${startMonth}-${startDay}`;
    const endYear = value[1]?.getFullYear();
    const endMonth = value[1]?.getMonth() + 1;
    const endDay = value[1]?.getDate();
    const newEndDate = `${endYear}-${endMonth}-${endDay}`;
    const newStartAndEndDate = `${newStartDate} - ${newEndDate}`;
    setStartDate(newStartDate);
    setEndDate(newEndDate);
    setStartAndEndDate(newStartAndEndDate);
  }, [value]);

  useEffect(() => {
    if (startAndEndDate) {
      ref.current.click();
    }
  }, [startAndEndDate]);

  return (
    <div {...props}>
      {filterListModems.map((filter, index) => {
        return (
          <div key={filter.id}>
            {selectedFilterModems === filter.id ? (
              <div className='w-full sm:pb-2 p-2 mt-2 grid grid-cols-1 bg-white sm:grid-cols-4 justify-between font-normal text-black gap-2 z-1'>
                <Menu
                  key={filter.id}
                  as='div'
                  className='relative inline-block text-left'
                >
                  <div className='flex flex-col w-full'>
                    <p className='self-start text-sm text-gray-500 truncate'>
                      Data nuo - iki
                    </p>
                    <button
                      ref={ref}
                      onClick={() => {
                        const date = startAndEndDate;
                        setFilterListModems((currentFilter) =>
                          currentFilter.map((x) =>
                            x.id === filter.id ? {...x, date} : x
                          )
                        );
                      }}
                      className='hidden'
                    >
                    </button>
                    <Menu.Button className='inline-flex justify-between border w-full h-8 shadow-sm px-4 py-2 text-sm font-normal text-gray-500 focus:outline-none'>
                    {startAndEndDate !==
                      'undefined-NaN-undefined - undefined-NaN-undefined' ? (
                        <p className='text-gray-400 self-center truncate text-xs'>
                          {filter.date}
                        </p>
                      ) : (
                        <p className='text-gray-400 self-center truncate text-xs'>
                        </p>
                      )}
                      <div>
                        <img
                          src={require('../../assets/assets/calendar.png')}
                        ></img>
                      </div>
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
                        <div>
                          <Calendar
                            selectRange={true}
                            onChange={onChange}
                            value={value}
                          />
                        </div>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
                <Menu as='div' className='relative inline-block text-left'>
                  <div className='flex flex-col  w-full'>
                    <p className='self-start text-sm text-gray-500 truncate'>
                      Operatorius
                    </p>
                    <Menu.Button className='inline-flex justify-between border w-full h-8 shadow-sm px-4 py-2 text-sm font-normal text-gray-500 focus:outline-none'>
                      <p className='text-gray-400 self-center truncate text-xs'>
                        {filter.operator === '0'
                          ? 'Any [Multiple choices]'
                          : filter.operator === '1'
                          ? '1'
                          : '2'}
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
                          {({active}) => (
                            <button
                              onClick={() => {
                                const operator = '1';
                                setFilterListModems((currentFilter) =>
                                  currentFilter.map((x) =>
                                    x.id === filter.id ? {...x, operator} : x
                                  )
                                );
                              }}
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

                        <Menu.Item>
                          {({active}) => (
                            <button
                              onClick={() => {
                                const operator = 2;
                                setFilterListModems((currentFilter) =>
                                  currentFilter.map((x) =>
                                    x.id === filter.id ? {...x, operator} : x
                                  )
                                );
                              }}
                              className={classNames(
                                active
                                  ? 'bg-gray-100 text-gray-900 w-full truncate text-center'
                                  : 'text-center truncate w-full text-gray-700',
                                'block w-full text-left px-4 py-2 text-sm'
                              )}
                            >
                              2
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
                <Menu as='div' className='relative inline-block text-left'>
                  <div className='flex flex-col  w-full'>
                    <p className='self-start text-sm text-gray-500 truncate'>
                      Objektas
                    </p>
                    <Menu.Button className='inline-flex justify-between border w-full h-8 shadow-sm px-4 py-2 text-sm font-normal text-gray-500 focus:outline-none'>
                      <p className='text-gray-400 self-center truncate text-xs'>
                        {filter.object === '0'
                          ? 'Any [Multiple choices]'
                          : filter.object === '1'
                          ? '1'
                          : '2'}
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
                          {({active}) => (
                            <button
                              onClick={() => {
                                const object = '1';
                                setFilterListModems((currentFilter) =>
                                  currentFilter.map((x) =>
                                    x.id === filter.id ? {...x, object} : x
                                  )
                                );
                              }}
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

                        <Menu.Item>
                          {({active}) => (
                            <button
                            onClick={() => {
                              const object = '2';
                              setFilterListModems((currentFilter) =>
                                currentFilter.map((x) =>
                                  x.id === filter.id ? {...x, object} : x
                                )
                              );
                            }}
                              className={classNames(
                                active
                                  ? 'bg-gray-100 text-gray-900 w-full truncate text-center'
                                  : 'text-center truncate w-full text-gray-700',
                                'block w-full text-left px-4 py-2 text-sm'
                              )}
                            >
                              2
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
                <div>
                  <p className='self-start text-sm text-gray-500 truncate'>
                    Objekto adresas
                  </p>
                  <input
                    id='search'
                    name='search'
                    placeholder=''
                    onChange={(e) => {
                      const objectAddress = e.target.value;
                      setFilterListModems((currentFilter) =>
                        currentFilter.map((x) =>
                          x.id === filter.id ? {...x, objectAddress} : x
                        )
                      );
                    }}
                    value={filter.objectAddress}
                    className='flex w-full h-8 border placeholder-gray-400 text-gray-400 focus:outline-none sm:text-sm'
                  />
                </div>
                <Menu as='div' className='relative inline-block text-left'>
                  <div className='flex flex-col  w-full'>
                    <p className='self-start text-sm text-gray-500 truncate'>
                      Tipas
                    </p>
                    <Menu.Button className='inline-flex justify-between border w-full h-8 shadow-sm px-4 py-2 text-sm font-normal text-gray-500 focus:outline-none'>
                      <p className='text-gray-400 self-center truncate text-xs'>
                        {filter.type === '0'
                          ? 'Any [Multiple choices]'
                          : filter.type === '1'
                          ? '1'
                          : '2'}
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
                          {({active}) => (
                            <button
                            onClick={() => {
                              const type = '1';
                              setFilterListModems((currentFilter) =>
                                currentFilter.map((x) =>
                                  x.id === filter.id ? {...x, type} : x
                                )
                              );
                            }}
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

                        <Menu.Item>
                          {({active}) => (
                            <button
                            onClick={() => {
                              const type = '2';
                              setFilterListModems((currentFilter) =>
                                currentFilter.map((x) =>
                                  x.id === filter.id ? {...x, type} : x
                                )
                              );
                            }}
                              className={classNames(
                                active
                                  ? 'bg-gray-100 text-gray-900 w-full truncate text-center'
                                  : 'text-center truncate w-full text-gray-700',
                                'block w-full text-left px-4 py-2 text-sm'
                              )}
                            >
                              2
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
                <Menu as='div' className='relative inline-block text-left'>
                  <div className='flex flex-col  w-full'>
                    <p className='self-start text-sm text-gray-500 truncate'>
                      Grupė (?)
                    </p>
                    <Menu.Button className='inline-flex justify-between border w-full h-8 shadow-sm px-4 py-2 text-sm font-normal text-gray-500 focus:outline-none'>
                      <p className='text-gray-400 self-center truncate text-xs'>
                        {filter.group === '0'
                          ? 'Any [Multiple choices]'
                          : filter.group === '1'
                          ? '1'
                          : '2'}
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
                          {({active}) => (
                            <button
                            onClick={() => {
                              const group = '1';
                              setFilterListModems((currentFilter) =>
                                currentFilter.map((x) =>
                                  x.id === filter.id ? {...x, group} : x
                                )
                              );
                            }}
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

                        <Menu.Item>
                          {({active}) => (
                            <button
                            onClick={() => {
                              const group = '2';
                              setFilterListModems((currentFilter) =>
                                currentFilter.map((x) =>
                                  x.id === filter.id ? {...x, group} : x
                                )
                              );
                            }}
                              className={classNames(
                                active
                                  ? 'bg-gray-100 text-gray-900 w-full truncate text-center'
                                  : 'text-center truncate w-full text-gray-700',
                                'block w-full text-left px-4 py-2 text-sm'
                              )}
                            >
                              2
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
                <Menu as='div' className='relative inline-block text-left'>
                  <div className='flex flex-col  w-full'>
                    <p className='self-start text-sm text-gray-500 truncate'>
                      Statusas
                    </p>
                    <Menu.Button className='inline-flex justify-between border w-full h-8 shadow-sm px-4 py-2 text-sm font-normal text-gray-500 focus:outline-none'>
                      <p className='text-gray-400 self-center truncate text-xs'>
                        {filter.status === '0'
                          ? 'Any [Multiple choices]'
                          : filter.status === '1'
                          ? '1'
                          : '2'}
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
                          {({active}) => (
                            <button
                            onClick={() => {
                              const status = '1';
                              setFilterListModems((currentFilter) =>
                                currentFilter.map((x) =>
                                  x.id === filter.id ? {...x, status} : x
                                )
                              );
                            }}
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

                        <Menu.Item>
                          {({active}) => (
                            <button
                            onClick={() => {
                              const status = '2';
                              setFilterListModems((currentFilter) =>
                                currentFilter.map((x) =>
                                  x.id === filter.id ? {...x, status} : x
                                )
                              );
                            }}
                              className={classNames(
                                active
                                  ? 'bg-gray-100 text-gray-900 w-full truncate text-center'
                                  : 'text-center truncate w-full text-gray-700',
                                'block w-full text-left px-4 py-2 text-sm'
                              )}
                            >
                              2
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
                <Menu as='div' className='relative inline-block text-left'>
                  <div className='flex flex-col  w-full'>
                    <p className='self-start text-sm text-gray-500 truncate'>
                      Suveikimo priežastis
                    </p>
                    <Menu.Button className='inline-flex justify-between border w-full h-8 shadow-sm px-4 py-2 text-sm font-normal text-gray-500 focus:outline-none'>
                      <p className='text-gray-400 self-center truncate text-xs'>
                        {filter.reason === '0'
                          ? 'Any [Multiple choices]'
                          : filter.reason === '1'
                          ? '1'
                          : '2'}
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
                          {({active}) => (
                            <button
                            onClick={() => {
                              const reason = '1';
                              setFilterListModems((currentFilter) =>
                                currentFilter.map((x) =>
                                  x.id === filter.id ? {...x, reason} : x
                                )
                              );
                            }}
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

                        <Menu.Item>
                          {({active}) => (
                            <button
                            onClick={() => {
                              const reason = '2';
                              setFilterListModems((currentFilter) =>
                                currentFilter.map((x) =>
                                  x.id === filter.id ? {...x, reason} : x
                                )
                              );
                            }}
                              className={classNames(
                                active
                                  ? 'bg-gray-100 text-gray-900 w-full truncate text-center'
                                  : 'text-center truncate w-full text-gray-700',
                                'block w-full text-left px-4 py-2 text-sm'
                              )}
                            >
                              2
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
                <Menu as='div' className='relative inline-block text-left'>
                  <div className='flex flex-col  w-full'>
                    <p className='self-start text-sm text-gray-500 truncate'>
                      Ekipažas
                    </p>
                    <Menu.Button className='inline-flex justify-between border w-full h-8 shadow-sm px-4 py-2 text-sm font-normal text-gray-500 focus:outline-none'>
                      <p className='text-gray-400 self-center truncate text-xs'>
                        {filter.crew === '0'
                          ? 'Any [Multiple choices]'
                          : filter.crew === '1'
                          ? '1'
                          : '2'}
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
                          {({active}) => (
                            <button
                            onClick={() => {
                              const crew = '1';
                              setFilterListModems((currentFilter) =>
                                currentFilter.map((x) =>
                                  x.id === filter.id ? {...x, crew} : x
                                )
                              );
                            }}
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

                        <Menu.Item>
                          {({active}) => (
                            <button
                            onClick={() => {
                              const crew = '2';
                              setFilterListModems((currentFilter) =>
                                currentFilter.map((x) =>
                                  x.id === filter.id ? {...x, crew} : x
                                )
                              );
                            }}
                              className={classNames(
                                active
                                  ? 'bg-gray-100 text-gray-900 w-full truncate text-center'
                                  : 'text-center truncate w-full text-gray-700',
                                'block w-full text-left px-4 py-2 text-sm'
                              )}
                            >
                              2
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
                <Menu as='div' className='relative inline-block text-left'>
                  <div className='flex flex-col  w-full'>
                    <p className='self-start text-sm text-gray-500 truncate'>
                      Vairuotojas
                    </p>
                    <Menu.Button className='inline-flex justify-between border w-full h-8 shadow-sm px-4 py-2 text-sm font-normal text-gray-500 focus:outline-none'>
                      <p className='text-gray-400 self-center truncate text-xs'>
                        {filter.driver === '0'
                          ? 'Any [Multiple choices]'
                          : filter.driver === '1'
                          ? '1'
                          : '2'}
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
                          {({active}) => (
                            <button
                            onClick={() => {
                              const driver = '1';
                              setFilterListModems((currentFilter) =>
                                currentFilter.map((x) =>
                                  x.id === filter.id ? {...x, driver} : x
                                )
                              );
                            }}
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

                        <Menu.Item>
                          {({active}) => (
                            <button
                            onClick={() => {
                              const driver = '2';
                              setFilterListModems((currentFilter) =>
                                currentFilter.map((x) =>
                                  x.id === filter.id ? {...x, driver} : x
                                )
                              );
                            }}
                              className={classNames(
                                active
                                  ? 'bg-gray-100 text-gray-900 w-full truncate text-center'
                                  : 'text-center truncate w-full text-gray-700',
                                'block w-full text-left px-4 py-2 text-sm'
                              )}
                            >
                              2
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
                <Menu as='div' className='relative inline-block text-left'>
                  <div className='flex flex-col  w-full'>
                    <p className='self-start text-sm text-gray-500 truncate'>
                      Spėjo laiku (T/F)?
                    </p>
                    <Menu.Button className='inline-flex justify-between border w-full h-8 shadow-sm px-4 py-2 text-sm font-normal text-gray-500 focus:outline-none'>
                      <p className='text-gray-400 self-center truncate text-xs'>
                        {filter.inTime === '0'
                          ? 'Any [Multiple choices]'
                          : filter.inTime === '1'
                          ? '1'
                          : '2'}
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
                          {({active}) => (
                            <button
                            onClick={() => {
                              const inTime = '1';
                              setFilterListModems((currentFilter) =>
                                currentFilter.map((x) =>
                                  x.id === filter.id ? {...x, inTime} : x
                                )
                              );
                            }}
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

                        <Menu.Item>
                          {({active}) => (
                            <button
                            onClick={() => {
                              const inTime = '2';
                              setFilterListModems((currentFilter) =>
                                currentFilter.map((x) =>
                                  x.id === filter.id ? {...x, inTime} : x
                                )
                              );
                            }}
                              className={classNames(
                                active
                                  ? 'bg-gray-100 text-gray-900 w-full truncate text-center'
                                  : 'text-center truncate w-full text-gray-700',
                                'block w-full text-left px-4 py-2 text-sm'
                              )}
                            >
                              2
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};
