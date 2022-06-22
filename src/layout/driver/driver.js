import React, {useState, useContext, useCallback, useEffect} from 'react';
import {CreateHeader} from '../../components/headers/create';
import SlideOver from '../../components/sidebars/slideOver';
import {Spinner} from 'react-activity';
import {useParams} from 'react-router-dom';
import {OverlayProvider, usePreventScroll} from 'react-aria';
import MainSidebar from '../../components/sidebars/main';
import useUtils from '../../hook/useUtils';

function Driver() {
  const {id} = useParams();
  const {accessToken} = useContext(AuthContext);
  const [crew, setCrew] = useState('');
  const [driverFullName, setDriverFullName] = useState('');
  const [driverName, setDriverName] = useState('');
  const [driverSurname, setDriverSurname] = useState('');
  const [driverUser, setDriverUser] = useState('');
  const [driverPassword, setDriverPassword] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const handleOnClose = () => setIsOpen(false);
  const {backFunc} = useUtils();
  usePreventScroll({isDisabled: !isOpen});

  const getDriver = {
    userId: id,
  };

  const {
    data: archiveData,
    error: archiveError,
    loading: archiveLoading,
    fetchData: archiveFetch,
  } = {}

  const {data, error, loading, fetchData} = {};

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      const allUsers = data.data.users.users;
      const searchRole = (name, arr) =>
        arr.filter(({registrations}) =>
        // handle find function error if no users
          registrations.find((role) => role.roles[0] === 'crew')
        );
      const searchResult = searchRole('crew', allUsers);
      let obj = {users: searchResult};
      setCrew(obj);
    }
  }, [data]);

  useEffect(() => {
    if (crew) {
      const obj = crew.users;
      const data = obj.find((x) => x.id === id);
      setDriverFullName(data?.fullName);
      setDriverName(data?.firstName);
      setDriverName(data?.firstName);
      setDriverSurname(data?.lastName);
      setDriverUser(data?.uniqueUsername);
    }
  }, [crew]);

  const driverNameFunc = useCallback(
    async (e) => {
      setDriverName(e.target.value);
    },
    [setDriverName]
  );

  const driverSurnameFunc = useCallback(
    async (e) => {
      setDriverSurname(e.target.value);
    },
    [setDriverSurname]
  );

  const driverUserFunc = useCallback(
    async (e) => {
      setDriverUser(e.target.value);
    },
    [setDriverUser]
  );

  const driverPasswordFunc = useCallback(
    async (e) => {
      setDriverPassword(e.target.value);
    },
    [setDriverPassword]
  );

  useEffect(() => {
    if (error) {
      backFunc();
    }
  }, [error]);

  const confirmArchiveFetch = useCallback(() => {
    let text = 'Ar tikrai norite archyvuoti?';
    if (window.confirm(text) === true) {
      archiveFetch();
      backFunc();
    }
  }, [archiveFetch, backFunc]);

  return (
    <>
      {!crew ? (
        <div className='flex h-screen w-screen bg-gray-100 justify-center items-center'>
          <Spinner color='dark-blue' size={40} />
        </div>
      ) : (
        <OverlayProvider>
          <div className='container max-w-screen-xl'>
            <div className='flex w-screen flex-row justify-center h-screen'>
              <div className='flex flex-col h-full items-center w-full'>
                <div className='flex flex-row w-full justify-between h-full'>
                  <div className='flex flex-col bg-slate-600 pt-4 items-center w-20'>
                    <button onClick={backFunc}>
                      <img src={require('../../assets/assets/left.png')}></img>
                    </button>
                    <img
                      className='pt-6'
                      src={require('../../assets/assets/Line.png')}
                    ></img>
                    <button className='flex flex-col items-center py-2 pt-2'>
                      <img
                        onClick={() => setIsOpen(true)}
                        className='w-4 h-4 mx-16'
                        src={require('../../assets/assets/hamburger.png')}
                      />
                    </button>
                  </div>
                  <div className='flex flex-col h-screen w-full justify-between'>
                    <CreateHeader fullName={driverFullName} />
                    <div className='flex flex-row h-screen'>
                      <div className='flex pl-4 flex-row w-full h-full justify-between'>
                        <div className='flex h-full flex-col justify-between w-full pr-4 md:pr-0 md:w-3/5 lg:w-2/6'>
                          <div className='flex flex-col'>
                            <div className='flex flex-row w-full'>
                              <div className='flex mr-2 flex-col w-full mb-4 '>
                                <div className='flex flex-row'>
                                  <p className='self-start text-sm text-gray-500 truncate my-2'>
                                    Vardas
                                  </p>
                                  <p className='self-start ml-1 text-red-600 text-sm truncate my-2'>
                                    *
                                  </p>
                                </div>
                                <input
                                  id='name'
                                  name='name'
                                  placeholder=''
                                  value={driverName}
                                  onChange={driverNameFunc}
                                  className='flex w-full h-8 border placeholder-gray-400 text-black focus:outline-none sm:text-sm'
                                />
                              </div>

                              <div className='flex ml-2 flex-col w-full mb-4 '>
                                <div className='flex flex-row'>
                                  <p className='self-start text-sm text-gray-500 truncate my-2'>
                                    Pavardė
                                  </p>
                                  <p className='self-start ml-1 text-red-600 text-sm truncate my-2'>
                                    *
                                  </p>
                                </div>
                                <input
                                  id='surname'
                                  name='search'
                                  placeholder=''
                                  value={driverSurname}
                                  onChange={driverSurnameFunc}
                                  className='flex w-full h-8 border placeholder-gray-400 text-black focus:outline-none sm:text-sm'
                                />
                              </div>
                            </div>

                            <div className='flex flex-row w-full'>
                              <div className='flex mr-2 flex-col w-full mb-4 '>
                                <div className='flex flex-row'>
                                  <p className='self-start text-sm text-gray-500 truncate my-2'>
                                    Prisijungimas
                                  </p>
                                  <p className='self-start ml-1 text-red-600 text-sm truncate my-2'>
                                    *
                                  </p>
                                </div>
                                <input
                                  id='connect'
                                  name='search'
                                  placeholder='User'
                                  value={driverUser}
                                  onChange={driverUserFunc}
                                  className='flex w-full h-8 border placeholder-gray-400 text-black focus:outline-none sm:text-sm'
                                />
                              </div>

                              <div className='flex ml-2 flex-col w-full mb-4 '>
                                <div className='flex flex-row'>
                                  <p className='self-start text-sm text-gray-500 truncate my-2'>
                                    Slaptažodis
                                  </p>
                                </div>
                                <input
                                  id='search'
                                  name='password'
                                  placeholder=''
                                  value={driverPassword}
                                  onChange={driverPasswordFunc}
                                  type='password'
                                  className='flex w-full h-8 border focus:outline-none sm:text-sm'
                                />
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={confirmArchiveFetch}
                            className='hidden sm:w-40 sm:h-10 rounded sm:flex mr-2 mt-2 mb-1 justify-center py-2 px-4 border border-transparent drop-shadow shadow text-sm font-light text-white font-montserrat hover:shadow-none bg-red-700 hover:bg-red-600 focus:outline-none'
                          >
                            Archyvuoti
                          </button>
                        </div>

                        <div className='flex h-full flex-col justify-between w-full pr-4 md:pr-0 md:w-1/4 lg:w-1/4 border-b border-l'>
                          <div className='flex flex-col'>
                            <div className='flex flex-row w-full'>
                              <div className='flex flex-row w-full border-b h-12 items-center justify-between'>
                                <div className='flex ml-4 flex-row w-full'>
                                  <p className='text-sm text-gray-400 truncate my-2'>
                                    Ekipažas
                                  </p>
                                </div>

                                <div className='flex ml-4 flex-row w-full'>
                                  <p className='text-sm truncate my-2'>9GRE</p>
                                </div>
                              </div>
                            </div>
                          </div>
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

export default Driver;
