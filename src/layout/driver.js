import React, { useContext, useCallback } from "react";
import useLanguage from "../hook/useLanguage";
import SidebarBack from "../components/sidebars/back";
import { CreateHeader } from "../components/headers/create";
import GlobalContext from "../context/globalContext";

function Driver() {
  const { english, lithuanian, t } = useLanguage();
  const { driverName, setDriverName } = useContext(GlobalContext);
  const { driverSurname, setDriverSurname } = useContext(GlobalContext);
  const { driverUser, setDriverUser } = useContext(GlobalContext);
  const { driverPassword, setDriverPassword } = useContext(GlobalContext);

  const driverNameFunc = useCallback(async (e) => {
    setDriverName(e.target.value);
  }, [setDriverName]);

  const driverSurnameFunc = useCallback(async (e) => {
    setDriverSurname(e.target.value);
  }, [setDriverSurname]);
  
  const driverUserFunc = useCallback(async (e) => {
    setDriverUser(e.target.value);
  }, [setDriverUser]);

  const driverPasswordFunc = useCallback(async (e) => {
    setDriverPassword(e.target.value);
  }, [setDriverPassword]);

  return (
    <>
      <div className="container max-w-screen-xl">
        <div className="flex w-screen flex-row justify-center h-screen relative overflow-hidden">
          <div className="flex flex-col h-screen items-center w-full ">
            <div className="flex flex-row w-full justify-between h-screen ">
              <SidebarBack />
              <div className="flex flex-col h-screen w-full justify-between">
                <CreateHeader />
                <div className="flex flex-row h-screen">
                  <div className="flex pl-4 flex-row w-full h-full justify-between">
                    <div className="flex h-full flex-col justify-between w-full pr-4 md:pr-0 md:w-3/5 lg:w-2/6">
                      <div className="flex flex-col">
                        <div className="flex flex-row w-full">
                          <div className="flex mr-2 flex-col w-full mb-4 ">
                            <div className="flex flex-row">
                              <p className="self-start text-sm text-gray-500 truncate my-2">
                                Vardas
                              </p>
                              <p className="self-start ml-1 text-red-600 text-sm truncate my-2">
                                *
                              </p>
                            </div>
                            <input
                              id="name"
                              name="name"
                              placeholder=""
                              value={driverName}
                              onChange={driverNameFunc}
                              className="flex w-full h-8 border-2 placeholder-gray-400 text-gray-400 focus:outline-none sm:text-sm"
                            />
                          </div>

                          <div className="flex ml-2 flex-col w-full mb-4 ">
                            <div className="flex flex-row">
                              <p className="self-start text-sm text-gray-500 truncate my-2">
                                Pavardė
                              </p>
                              <p className="self-start ml-1 text-red-600 text-sm truncate my-2">
                                *
                              </p>
                            </div>
                            <input
                              id="surname"
                              name="search"
                              placeholder=""
                              value={driverSurname}
                              onChange={driverSurnameFunc}
                              className="flex w-full h-8 border-2 placeholder-gray-400 text-gray-400 focus:outline-none sm:text-sm"
                            />
                          </div>
                        </div>

                        <div className="flex flex-row w-full">
                          <div className="flex mr-2 flex-col w-full mb-4 ">
                            <div className="flex flex-row">
                              <p className="self-start text-sm text-gray-500 truncate my-2">
                                Prisijungimas
                              </p>
                              <p className="self-start ml-1 text-red-600 text-sm truncate my-2">
                                *
                              </p>
                            </div>
                            <input
                              id="connect"
                              name="search"
                              placeholder="User"
                              value={driverUser}
                              onChange={driverUserFunc}
                              className="flex w-full h-8 border-2 placeholder-gray-400 text-gray-400 focus:outline-none sm:text-sm"
                            />
                          </div>

                          <div className="flex ml-2 flex-col w-full mb-4 ">
                            <div className="flex flex-row">
                              <p className="self-start text-sm text-gray-500 truncate my-2">
                                Slaptažodis
                              </p>
                            </div>
                            <input
                              id="search"
                              name="password"
                              placeholder=""
                              value={driverPassword}
                              onChange={driverPasswordFunc}
                              type="password"
                              className="flex w-full h-8 border-2 focus:outline-none sm:text-sm"
                            />
                          </div>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="hidden sm:w-40 sm:h-10 rounded sm:flex mr-2 mt-2 mb-1 justify-center py-2 px-4 border border-transparent drop-shadow shadow text-sm font-light text-white font-montserrat hover:shadow-none bg-red-700 focus:outline-none"
                      >
                        Archyvuoti
                      </button>
                    </div>

                    <div className="flex h-full flex-col justify-between w-full pr-4 md:pr-0 md:w-3/5 lg:w-2/6 border-b border-l">
                      <div className="flex flex-col">
                        <div className="flex flex-row w-full">
                          <div className="flex flex-row w-full border-b h-12 items-center justify-between">
                            <div className="flex ml-4 flex-row w-full">
                              <p className="text-sm text-gray-400 truncate my-2">
                                Ekipažas
                              </p>
                            </div>

                            <div className="flex ml-4 flex-row w-full">
                              <p className="text-sm truncate my-2">9GRE</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Driver;
