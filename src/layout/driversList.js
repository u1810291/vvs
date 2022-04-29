import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useRef,
} from "react";
import useLanguage from "../hook/useLanguage";
import RegularSidebar from "../components/sidebars/regular";
import { FilterHeader } from "../components/headers/filter";
import { DriversList } from "../components/lists/driversList";
const { AddFilterList } = require("../components/lists/addFilter");
import GlobalContext from "../context/globalContext";
import { DashboardTestApi } from "../api/dashboardTest";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function TaskList() {
  const { english, lithuanian, t } = useLanguage();
  const { selectedFilter, setSelectedFilter } = useContext(GlobalContext);

  return (
    <>
      <div className="container max-w-screen-xl">
        <div className="flex w-screen flex-row justify-center h-screen relative overflow-hidden">
          <div className="flex flex-col h-screen items-center w-full ">
            <div className="flex flex-row w-full justify-between h-screen ">
              <RegularSidebar />
              <div className="flex flex-col h-screen w-full justify-between">
                <FilterHeader />
                <div className="flex flex-col h-screen">
                  <div className="hidden pl-4 w-full border-t py-2 md:grid grid-cols-2 bg-gray-100 grid-rows-1 grid-flow-row table-auto md:grid-cols-2 grid-gap-6 justify-between font-normal text-black z-1">
                    <div className="flex flex-row items-center">
                      <span className="text-gray-300 grid-span-2 text-sm">Vardas Pavarde</span>
                    </div>
                    <div className="flex flex-row items-center">
                      <span className="text-gray-300 text-sm">Busena</span>
                    </div>
                  </div>


                  <div className="pl-4 flex-col w-full items-center scrollbar-gone overflow-y-auto h-screen">
                        {DashboardTestApi.map((data) => (
                          <DriversList
                            key={data.id}
                            name="Signalizacija laiku neišjungta"
                            status="Status"
                          />
                        ))}
                    <nav className="border-gray-200 flex items-center justify-between mt-4 sm:px-4 w-full bg-white">
                      <div className="flex flex-col items-start">
                        <div>
                          <Menu
                            as="div"
                            className="relative inline-block text-left"
                          >
                            <div className="flex flex-col  w-full">
                              <Menu.Button className="inline-flex justify-between w-full h-8 shadow-sm px-4 py-2 text-sm font-normal text-gray-500 focus:outline-none">
                                <a className="text-gray-400 self-center truncate">
                                  <div className="flex flex-row">
                                    <p className="text-black text-md">Rodyti</p>
                                    <p className="pl-4">20</p>
                                  </div>
                                </a>
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
                              <Menu.Items className="origin-top-right z-10 absolute left-0 mt-2 w-10 sm:w-10 ml-6 shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1">
                                  <Menu.Item>
                                    {({ active }) => (
                                      <button
                                        // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
                                        // onClick={loop}
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
                                </div>
                              </Menu.Items>
                            </Transition>
                          </Menu>
                        </div>
                        <p className="text-gray-400 ml-4">Rezultatų 1866</p>
                      </div>
                      <div className="flex flex-col sm:flex-row mr-32">
                        <a className="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                          <svg
                            className="mr-3 h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Previous
                        </a>

                        <div className="hidden md:-mt-px md:flex">
                          <a className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium">
                            {" "}
                            1{" "}
                          </a>
                          <a
                            className="border-indigo-500 text-indigo-600 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
                            aria-current="page"
                          >
                            {" "}
                            2{" "}
                          </a>
                          <a className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium">
                            {" "}
                            3{" "}
                          </a>
                          <span className="border-transparent text-gray-500 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium">
                            {" "}
                            ...{" "}
                          </span>
                          <a className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium">
                            {" "}
                            8{" "}
                          </a>
                          <a className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium">
                            {" "}
                            9{" "}
                          </a>
                          <a className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium">
                            {" "}
                            10{" "}
                          </a>
                          <span className="border-transparent text-gray-500 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium">
                            {" "}
                            ...{" "}
                          </span>
                          <a className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium">
                            {" "}
                            999{" "}
                          </a>
                        </div>

                        <a className="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                          Next
                          <svg
                            className="ml-3 h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </a>
                      </div>
                    </nav>
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

export default TaskList;
