/* eslint-disable react-perf/jsx-no-new-function-as-prop */
import React, {
  useState,
  useContext,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { ModemHeader } from "../components/headers/modem";
import GlobalContext from "../context/globalContext";
import AuthContext from "../context/authContext";
import { Spinner } from "react-activity";
import { generate } from "shortid";
import SlideOver from "../components/sidebars/slideOver";
import { OverlayProvider, usePreventScroll } from "react-aria";
import MainSidebar from "../components/sidebars/main";
import useUtils from "../hook/useUtils";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { useQuery } from "react-query";
import { zones } from "../api/zones";

function Modem() {
  const { accessToken } = useContext(AuthContext);
  const { expandFilterModems, setExpandFilterModems } =
    useContext(GlobalContext);
  const { selectedFilterModems, setSelectedFilterModems } =
    useContext(GlobalContext);
  const { filterListModems, setFilterListModems } = useContext(GlobalContext);
  const [objectAddress, setObjectAddress] = useState("");
  const [objectCity, setObjectCity] = useState("");
  const [modem, setModem] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const modems = "here";

  const handleOnClose = useCallback(() => {
    setIsOpen(false);
  }, []);
  const handleOnOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  usePreventScroll({ isDisabled: !isOpen });
  const { backFunc } = useUtils();

  const objectAddressFunc = useCallback(async (e) => {
    setObjectAddress(e.target.value);
  }, []);

  const objectCityFunc = useCallback(
    async (e) => {
      setObjectCity(e.target.value);
    },
    [setObjectCity]
  );

  const modemFunc = useCallback(async (e) => {
    setModem(e.target.value);
  }, []);

  return (
    <>
      {!modems ? (
        <div className="flex h-screen w-screen bg-gray-100 justify-center items-center">
          <Spinner color="dark-blue" size={40} />
        </div>
      ) : (
        <OverlayProvider>
          <div className="container max-w-screen-xl">
            <div className="flex w-screen flex-row justify-center h-screen">
              <div className="flex flex-col h-full items-center w-full">
                <div className="flex flex-row w-full justify-between h-full">
                  <div className="flex flex-col bg-slate-600 pt-6 items-center w-20">
                    <button onClick={backFunc}>
                      <img src={require("../assets/assets/left.png")}></img>
                    </button>
                    <img
                      className="pt-6"
                      src={require("../assets/assets/Line.png")}
                    ></img>
                    <button className="flex flex-col items-center pt-6">
                      <img
                        onClick={handleOnOpen}
                        className="w-4 h-4 mx-16"
                        src={require("../assets/assets/hamburger.png")}
                      />
                    </button>
                  </div>
                  <div className="flex flex-col min-h-full w-full justify-between">
                    <ModemHeader />
                    <div className="flex flex-col min-h-screen sm:min-h-0 overflow-scroll sm:h-full">
                      <div className="flex pl-4 flex-row h-full justify-between">
                        <div className="flex h-full flex-col w-full pr-4 md:pr-0 md:w-3/6 lg:w-3/6 justify-between">
                          <div className="flex flex-col">
                            <div className="flex flex-row justify-between">
                              <div className="flex flex-col">
                                <div className="flex flex-row w-full">
                                  <div className="flex mr-2 flex-col">
                                    <div className="flex flex-row">
                                      <p className="self-start text-sm text-gray-500 truncate my-2">
                                        Modemas
                                      </p>
                                      <p className="self-start ml-1 text-red-600 text-sm truncate my-2">
                                        *
                                      </p>
                                    </div>
                                    <input
                                      id="modem"
                                      name="modem"
                                      placeholder=""
                                      required
                                      value={objectAddress}
                                      onChange={objectAddressFunc}
                                      className="flex h-8 w-72 border placeholder-gray-400 text-black pl-2 focus:outline-none sm:text-sm"
                                    />
                                  </div>

                                  <div className="flex flex-col">
                                    <div className="flex flex-row">
                                      <p className="self-start text-sm text-gray-500 truncate my-2">
                                        Srities nr.
                                      </p>
                                    </div>
                                    <input
                                      id="city"
                                      name="city"
                                      placeholder=""
                                      value={objectCity}
                                      onChange={objectCityFunc}
                                      className="flex h-8 w-full border focus:outline-none pl-2 sm:text-sm"
                                    />
                                  </div>
                                </div>
                                <div className="flex flex-col justify-between">
                                  <div className="flex flex-row">
                                    <div className="flex flex-col justify-between w-72">
                                      <Menu
                                        as="div"
                                        className="relative inline-block text-left"
                                      >
                                        <div className="flex flex-col  w-full">
                                          <div className="flex flex-row">
                                            <p className="self-start text-sm text-gray-500 truncate my-2">
                                              Objektas
                                            </p>
                                            <p className="self-start ml-1 text-red-600 text-sm truncate my-2">
                                              *
                                            </p>
                                          </div>
                                          <Menu.Button className="inline-flex justify-between border w-full h-8 shadow-sm px-4 py-2 text-sm font-normal focus:outline-none">
                                            <p className="text-gray-600 self-center truncate text-xs">
                                              Namas Greta Grauvelivičiute
                                            </p>
                                            <ChevronDownIcon
                                              className="-mr-1 ml-2 h-5 w-5"
                                              aria-hidden="true"
                                            />
                                          </Menu.Button>
                                        </div>

                                        <Transition
                                          as={Fragment}
                                          enter="transition ease-out duration-100"
                                          enterFrom="transform opacity-0 scale-95"
                                          enterTo="transform opacity-100 scale-100"
                                          leave="transition ease-in duration-75"
                                          leaveFrom="transform opacity-100 scale-100"
                                          leaveTo="transform opacity-0 scale-95"
                                        >
                                          <Menu.Items className="origin-top-right z-10 absolute left-0 mt-2 w-32 sm:w-56 shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <div className="py-1">
                                              <Menu.Item>
                                                {({ active }) => (
                                                  <button
                                                    // onClick={() => {
                                                    //   const operator = "1";
                                                    //   setFilterListModems(
                                                    //     (currentFilter) =>
                                                    //       currentFilter.map(
                                                    //         (x) =>
                                                    //           x.id === filter.id
                                                    //             ? {
                                                    //                 ...x,
                                                    //                 operator,
                                                    //               }
                                                    //             : x
                                                    //       )
                                                    //   );
                                                    // }}
                                                    className={classNames(
                                                      active
                                                        ? "bg-gray-100 text-gray-900 w-full truncate text-center"
                                                        : "text-center truncate w-full text-gray-700",
                                                      "block px-4 py-2 text-sm"
                                                    )}
                                                  >
                                                    1
                                                  </button>
                                                )}
                                              </Menu.Item>

                                              <Menu.Item>
                                                {({ active }) => (
                                                  <button
                                                    // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
                                                    // onClick={() => {
                                                    //   const operator = 2;
                                                    //   setFilterListModems((currentFilter) =>
                                                    //     currentFilter.map((x) =>
                                                    //       x.id === filter.id ? { ...x, operator } : x
                                                    //     )
                                                    //   );
                                                    // }}
                                                    className={classNames(
                                                      active
                                                        ? "bg-gray-100 text-gray-900 w-full truncate text-center"
                                                        : "text-center truncate w-full text-gray-700",
                                                      "block w-full text-left px-4 py-2 text-sm"
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

                                      <Menu
                                        as="div"
                                        className="relative inline-block text-left"
                                      >
                                        <div className="flex flex-col  w-full">
                                          <p className="self-start text-sm mt-4 mb-2 text-gray-500 truncate">
                                            Centralė
                                          </p>
                                          <Menu.Button className="inline-flex justify-between border w-full h-8 shadow-sm px-4 py-2 text-sm font-normal focus:outline-none">
                                            <p className="text-gray-600 self-center truncate text-xs">
                                              {/* {filter.operator === "0"
                          ? "Any [Multiple choices]"
                          : filter.operator === "1"
                          ? "1"
                          : "2"} */}
                                              Sekolink
                                            </p>
                                            <ChevronDownIcon
                                              className="-mr-1 ml-2 h-5 w-5"
                                              aria-hidden="true"
                                            />
                                          </Menu.Button>
                                        </div>

                                        <Transition
                                          as={Fragment}
                                          enter="transition ease-out duration-100"
                                          enterFrom="transform opacity-0 scale-95"
                                          enterTo="transform opacity-100 scale-100"
                                          leave="transition ease-in duration-75"
                                          leaveFrom="transform opacity-100 scale-100"
                                          leaveTo="transform opacity-0 scale-95"
                                        >
                                          <Menu.Items className="origin-top-right z-10 absolute left-0 mt-2 w-32 sm:w-56 shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <div className="py-1">
                                              <Menu.Item>
                                                {({ active }) => (
                                                  <button
                                                    // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
                                                    // onClick={() => {
                                                    //   const operator = "1";
                                                    //   setFilterListModems((currentFilter) =>
                                                    //     currentFilter.map((x) =>
                                                    //       x.id === filter.id ? { ...x, operator } : x
                                                    //     )
                                                    //   );
                                                    // }}
                                                    className={classNames(
                                                      active
                                                        ? "bg-gray-100 text-gray-900 w-full truncate text-center"
                                                        : "text-center truncate w-full text-gray-700",
                                                      "block px-4 py-2 text-sm"
                                                    )}
                                                  >
                                                    1
                                                  </button>
                                                )}
                                              </Menu.Item>

                                              <Menu.Item>
                                                {({ active }) => (
                                                  <button
                                                    // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
                                                    // onClick={() => {
                                                    //   const operator = 2;
                                                    //   setFilterListModems((currentFilter) =>
                                                    //     currentFilter.map((x) =>
                                                    //       x.id === filter.id ? { ...x, operator } : x
                                                    //     )
                                                    //   );
                                                    // }}
                                                    className={classNames(
                                                      active
                                                        ? "bg-gray-100 text-gray-900 w-full truncate text-center"
                                                        : "text-center truncate w-full text-gray-700",
                                                      "block w-full text-left px-4 py-2 text-sm"
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
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <button
                            type="submit"
                            className="hidden sm:w-40 sm:h-10 rounded sm:flex mr-2 mt-2 mb-1 justify-center py-2 px-4 border border-transparent drop-shadow shadow text-sm font-light text-white font-montserrat hover:shadow-none bg-red-700 hover:bg-red-600 focus:outline-none"
                          >
                            Ištrinti
                          </button>
                        </div>

                        <div className="flex h-full flex-col justify-between w-full pr-4 md:pr-0 md:w-1/4">
                          <div className="flex flex-col">
                            <div className="flex flex-col w-full h-full">
                              <div className="flex flex-row w-full border-b h-12 items-center justify-between">
                                <div className="flex ml-4 flex-row justify-between items-center w-full">
                                  <p className="text-sm truncate my-2 font-semibold">
                                    Zonos
                                  </p>
                                  <button className="flex text-gray-400 w-20 h-6 items-center justify-center ml-2 rounded-sm p-1 text-xs hover:text-gray-500 font-normal hover:shadow-none bg-gray-200 focus:outline-none mr-4">
                                    <p className="text-xs">Pridėti zoną</p>
                                  </button>
                                </div>
                              </div>

                              {zones.map((a) => (
                                <>
                                  <div
                                    key={a.id}
                                    className="flex flex-row w-full border-b h-20 items-center justify-around"
                                  >
                                    <p className="text-sm font-normal truncate">
                                      Pavadinimas
                                    </p>
                                    <p className="text-sm font-normal truncate">
                                      1
                                    </p>
                                    <button className="text-xs font-normal truncate text-red-600">
                                      trinti
                                    </button>
                                  </div>
                                </>
                              ))}

                              <div className="flex flex-row items-center mt-6">
                                <input
                                  id="control"
                                  name="control"
                                  type="checkbox"
                                  className="h-6 w-6 ml-4 text-gray-600  focus:ring-gray-500 rounded-sm"
                                />
                                <p className="ml-4 self-start text-sm truncate my-2">
                                  ignoruoti zonas
                                </p>
                              </div>

                              <div className="flex flex-row w-full mt-4 h-12 items-center justify-between">
                                <div className="flex ml-4 flex-row w-full">
                                  <p className="text-sm truncate my-2 font-semibold">
                                    Valdymas
                                  </p>
                                </div>
                              </div>

                              <div className="flex flex-col w-full">
                                <div className="flex flex-row w-full items-end justify-start">
                                  <button className="flex text-gray-400 ml-4 w-20 h-6 items-center justify-center mt-4 rounded-sm p-1 text-xs hover:text-gray-500 font-normal hover:shadow-none bg-gray-200 focus:outline-none mr-4">
                                    <p className="text-xs">Siūsti</p>
                                  </button>
                                </div>

                                <div className="flex flex-row w-full items-end justify-between">
                                  <div className="flex flex-col w-full">
                                    <div className="flex flex-row">
                                      <p className="text-sm ml-4 truncate mt-2 mb-1">
                                        PIN
                                      </p>
                                    </div>
                                    <input
                                      id="modem"
                                      name="modem"
                                      placeholder=""
                                      value={modem}
                                      onChange={modemFunc}
                                      className="flex w-32 ml-4 border h-6 border-gray-300 rounded-sm text-black focus:outline-none pl-1 sm:text-sm"
                                    />
                                  </div>
                                  <button className="flex text-gray-400 w-60 h-6 items-center justify-center ml-2 rounded-sm p-1 text-xs hover:text-gray-500 font-normal hover:shadow-none bg-gray-200 focus:outline-none mr-4">
                                    <p className="text-xs">Aktyvuoti</p>
                                  </button>
                                  <button className="flex text-gray-400 w-60 h-6 items-center justify-center rounded-sm p-1 text-xs hover:text-gray-500 font-normal hover:shadow-none bg-gray-200 focus:outline-none mr-4">
                                    <p className="text-xs">Deaktyvuoti</p>
                                  </button>
                                </div>

                                <div className="flex flex-row w-full items-end justify-between">
                                  <div className="flex flex-col w-full">
                                    <div className="flex flex-row">
                                      <p className="text-sm ml-4 truncate mt-2 mb-1">
                                        Komanda
                                      </p>
                                    </div>
                                    <input
                                      id="modem"
                                      name="modem"
                                      placeholder=""
                                      value={modem}
                                      onChange={modemFunc}
                                      className="flex ml-4 w-52 border h-6 border-gray-300 rounded-sm text-black focus:outline-none pl-1 sm:text-sm"
                                    />
                                  </div>
                                  <button className="flex text-gray-400 w-60 h-6 items-center justify-center ml-2 rounded-sm p-1 text-xs hover:text-gray-500 font-normal hover:shadow-none bg-gray-200 focus:outline-none mr-4">
                                    <p className="text-xs">Siūsti</p>
                                  </button>
                                </div>
                              </div>

                              <div className="flex flex-row w-full mt-4 border-b h-12 items-center justify-between">
                                <div className="flex ml-4 flex-row w-full">
                                  <p className="text-sm truncate my-2 font-semibold">
                                    Objekto informacija
                                  </p>
                                </div>
                              </div>

                              <div className="h-full">
                                <div className="flex flex-row w-full border-b h-12 items-center justify-between">
                                  <div className="flex ml-4 flex-row w-full justify-between">
                                    <p className="text-sm text-gray-400 font-normal truncate my-2">
                                      Objekto nr.
                                    </p>
                                    <p className="text-sm font-normal truncate my-2 mr-36">
                                      smth
                                    </p>
                                  </div>
                                </div>
                                <div className="flex flex-row w-full border-b h-12 items-center justify-between">
                                  <div className="flex ml-4 flex-row w-full justify-between">
                                    <p className="text-sm text-gray-400 font-normal truncate my-2">
                                      Sutarties nr.
                                    </p>
                                    <p className="text-sm font-normal truncate my-2 mr-36">
                                      will
                                    </p>
                                  </div>
                                </div>
                                <div className="flex flex-row w-full border-b h-12 items-center justify-between">
                                  <div className="flex ml-4 flex-row w-full justify-between">
                                    <p className="text-sm text-gray-400 font-normal truncate my-2">
                                      Navision ID.
                                    </p>
                                    <p className="text-sm font-normal truncate my-2 mr-36">
                                      1167
                                    </p>
                                  </div>
                                </div>
                                <div className="flex flex-row w-full border-b h-12 items-center justify-between">
                                  <div className="flex ml-4 flex-row w-full justify-between">
                                    <p className="text-sm text-gray-400 font-normal truncate my-2">
                                      Monas MS ID.
                                    </p>
                                    <p className="text-sm font-normal truncate my-2 mr-36">
                                      81652
                                    </p>
                                  </div>
                                </div>
                                <div className="flex flex-row w-full border-b h-12 items-center justify-between">
                                  <div className="flex ml-4 flex-row w-full justify-between">
                                    <p className="text-sm text-gray-400 font-normal truncate my-2">
                                      Miestas
                                    </p>
                                    <p className="text-sm font-normal truncate my-2 mr-36">
                                      Šiauliai
                                    </p>
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

export default Modem;
