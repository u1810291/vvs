/* eslint-disable react-perf/jsx-no-new-function-as-prop */
import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useRef,
} from "react";
// import RegularSidebar from "../components/sidebars/regular";
import { FilterHeader } from "../components/headers/filter";
import { FiltersList } from "../components/lists/filter";
import { OptionsList } from "../components/lists/options";
import { DashboardList } from "../components/lists/dashboard";
const { AddFilterList } = require("../components/lists/addFilter");
import GlobalContext from "../context/globalContext";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { DashboardTestApi } from "../api/dashboardTest";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import SlideOver from "../components/sidebars/slideOver";
import { OverlayProvider, usePreventScroll } from "react-aria";
import MainSidebar from "../components/sidebars/main";

function Filter() {
  const [isOpen, setIsOpen] = useState(false);
  const handleOnClose = useCallback(() => {
    setIsOpen(false);
  }, []);
  usePreventScroll({ isDisabled: !isOpen });
  const { selectedFilter, setSelectedFilter } = useContext(GlobalContext);
  const { expandFilter, setExpandFilter } = useContext(GlobalContext);
  const [toPrint, setToPrint] = useState(false);
  const [sortedDashboardTestApiKeys, setSortedDashboardTestApiKeys] =
    useState("");
  const [sortedDashboardTestApiOrder, setSortedDashboardTestApiOrder] =
    useState("");
  const pdfExportComponent = useRef(null);
  const handleExportWithComponent = useCallback(async (event) => {
    setToPrint(true);
    setTimeout(() => {
      pdfExportComponent.current.save();
    }, 1000);
    setTimeout(() => {
      setToPrint(false);
    }, 1000);
  }, []);

  function sortToggle(arr, key, order) {
    const collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: "base",
    });
    return arr.sort(function (a, b) {
      let x = a[key];
      let y = b[key];
      if (order === "asc") {
        return collator.compare(x, y);
      }
      if (order === "desc") {
        return collator.compare(x, y) * -1;
      }
      if (order === "") {
        return Math.random() - 0.5;
      }
    });
  }

  function sortedDashboardTestDate() {
    if (sortedDashboardTestApiOrder === "") {
      setSortedDashboardTestApiKeys("date");
      setSortedDashboardTestApiOrder("asc");
    }
    if (sortedDashboardTestApiOrder === "asc") {
      setSortedDashboardTestApiKeys("date");
      setSortedDashboardTestApiOrder("desc");
    }
    if (sortedDashboardTestApiOrder === "desc") {
      setSortedDashboardTestApiKeys("date");
      setSortedDashboardTestApiOrder("");
    }
  }

  function sortedDashboardTestObject() {
    if (sortedDashboardTestApiOrder === "") {
      setSortedDashboardTestApiKeys("object");
      setSortedDashboardTestApiOrder("asc");
    }
    if (sortedDashboardTestApiOrder === "asc") {
      setSortedDashboardTestApiKeys("object");
      setSortedDashboardTestApiOrder("desc");
    }
    if (sortedDashboardTestApiOrder === "desc") {
      setSortedDashboardTestApiKeys("object");
      setSortedDashboardTestApiOrder("");
    }
  }

  function sortedDashboardTestName() {
    if (sortedDashboardTestApiOrder === "") {
      setSortedDashboardTestApiKeys("name");
      setSortedDashboardTestApiOrder("asc");
    }
    if (sortedDashboardTestApiOrder === "asc") {
      setSortedDashboardTestApiKeys("name");
      setSortedDashboardTestApiOrder("desc");
    }
    if (sortedDashboardTestApiOrder === "desc") {
      setSortedDashboardTestApiKeys("name");
      setSortedDashboardTestApiOrder("");
    }
  }

  function sortedDashboardTestCrew() {
    if (sortedDashboardTestApiOrder === "") {
      setSortedDashboardTestApiKeys("crew");
      setSortedDashboardTestApiOrder("asc");
    }
    if (sortedDashboardTestApiOrder === "asc") {
      setSortedDashboardTestApiKeys("crew");
      setSortedDashboardTestApiOrder("desc");
    }
    if (sortedDashboardTestApiOrder === "desc") {
      setSortedDashboardTestApiKeys("crew");
      setSortedDashboardTestApiOrder("");
    }
  }

  function sortedDashboardTestInTime() {
    if (sortedDashboardTestApiOrder === "") {
      setSortedDashboardTestApiKeys("intime");
      setSortedDashboardTestApiOrder("asc");
    }
    if (sortedDashboardTestApiOrder === "asc") {
      setSortedDashboardTestApiKeys("intime");
      setSortedDashboardTestApiOrder("desc");
    }
    if (sortedDashboardTestApiOrder === "desc") {
      setSortedDashboardTestApiKeys("intime");
      setSortedDashboardTestApiOrder("");
    }
  }

  function sortedDashboardTestReactionTime() {
    if (sortedDashboardTestApiOrder === "") {
      setSortedDashboardTestApiKeys("reactiontime");
      setSortedDashboardTestApiOrder("asc");
    }
    if (sortedDashboardTestApiOrder === "asc") {
      setSortedDashboardTestApiKeys("reactiontime");
      setSortedDashboardTestApiOrder("desc");
    }
    if (sortedDashboardTestApiOrder === "desc") {
      setSortedDashboardTestApiKeys("reactiontime");
      setSortedDashboardTestApiOrder("");
    }
  }

  function sortedDashboardTestTimeInObject() {
    if (sortedDashboardTestApiOrder === "") {
      setSortedDashboardTestApiKeys("timeinobject");
      setSortedDashboardTestApiOrder("asc");
    }
    if (sortedDashboardTestApiOrder === "asc") {
      setSortedDashboardTestApiKeys("timeinobject");
      setSortedDashboardTestApiOrder("desc");
    }
    if (sortedDashboardTestApiOrder === "desc") {
      setSortedDashboardTestApiKeys("timeinobject");
      setSortedDashboardTestApiOrder("");
    }
  }

  function sortedDashboardTestStatus() {
    if (sortedDashboardTestApiOrder === "") {
      setSortedDashboardTestApiKeys("status");
      setSortedDashboardTestApiOrder("asc");
    }
    if (sortedDashboardTestApiOrder === "asc") {
      setSortedDashboardTestApiKeys("status");
      setSortedDashboardTestApiOrder("desc");
    }
    if (sortedDashboardTestApiOrder === "desc") {
      setSortedDashboardTestApiKeys("status");
      setSortedDashboardTestApiOrder("");
    }
  }

  function sortedDashboardTestReason() {
    if (sortedDashboardTestApiOrder === "") {
      setSortedDashboardTestApiKeys("reason");
      setSortedDashboardTestApiOrder("asc");
    }
    if (sortedDashboardTestApiOrder === "asc") {
      setSortedDashboardTestApiKeys("reason");
      setSortedDashboardTestApiOrder("desc");
    }
    if (sortedDashboardTestApiOrder === "desc") {
      setSortedDashboardTestApiKeys("reason");
      setSortedDashboardTestApiOrder("");
    }
  }

  const sortedDashboardTestApi = sortToggle(
    DashboardTestApi,
    sortedDashboardTestApiKeys,
    sortedDashboardTestApiOrder
  );

  return (
    <OverlayProvider>
    <div className="container max-w-screen-xl">
      <div className="flex w-screen flex-row justify-center h-screen">
        <div className="flex flex-col h-full items-center w-full">
          <div className="flex flex-row w-full justify-between h-full">

            <div className="flex flex-col bg-slate-600 pt-6 items-center w-20">
              <button className="flex flex-col items-center">
                <img
                  onClick={() => setIsOpen(true)}
                  className="w-4 h-4 mx-16"
                  src={require("../assets/assets/hamburger.png")}
                />
              </button>
            </div>
                <div className="flex flex-col min-h-full w-full justify-between">
                  <FilterHeader />
                  <SlideOver
                    isOpen={isOpen}
                    onClose={handleOnClose}
                    title="Item Details"
                  >
                    <div className="flex flex-col">
                      <input
                        type="text"
                        className="border-gray-300 rounded-md"
                      />
                    </div>
                  </SlideOver>
                  <div className="flex flex-col min-h-screen sm:min-h-0 overflow-scroll sm:h-full">
                    <div className="flex flex-row w-full">
                      {expandFilter ? (
                        <>
                          <div className="flex flex-col h-full sm:h-96 overflow-y-auto items-center scrollbar-gone border-r w-3/6 xl:w-1/5">
                            <AddFilterList />
                          </div>
                          <div className="flex flex-col ml-2 w-3/6 lg:w-3/5">
                            <OptionsList />
                            <FiltersList />
                            <div
                              className={
                                selectedFilter
                                  ? "flex flex-col md:flex-row justify-between"
                                  : "hidden"
                              }
                            >
                              <div className="flex flex-col md:flex-row mt-8 md:mt-0 items-center">
                                <button className="flex text-gray-400 w-32 justify-center ml-2 rounded-sm p-1 text-xs hover:text-gray-500 font-normal hover:shadow-none bg-gray-200 focus:outline-none">
                                  Išsaugoti filtrą
                                </button>
                              </div>
                              <div className="flex flex-col md:flex-row items-center my-6">
                                <img
                                  className="h-8 w-6 mr-2 hidden lg:inline-block"
                                  src={require("../assets/assets/doc.png")}
                                ></img>
                                <button
                                  onClick={handleExportWithComponent}
                                  className="flex justify-center md:mr-6 p-1 text-sm font-normal hover:text-gray-500"
                                >
                                  Eksportuoti
                                </button>
                                <button className="flex justify-center w-24 mr-2 rounded-sm p-1 border border-transparent text-xs font-normal text-white hover:shadow-none bg-slate-600 focus:outline-none">
                                  Ieškoti
                                </button>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : null}
                      <div className="flex flex-col w-0 xl:w-1/5">
                        {/* <p>{JSON.stringify(filterList, null, 2)}</p> */}
                      </div>
                    </div>
                    {toPrint ? (
                      <PDFExport
                        ref={pdfExportComponent}
                        scale={0.2}
                        paperSize="A4"
                        margin="1cm"
                      >
                        <div className="hidden pl-4 w-full border-t py-2 md:grid grid-cols-1 bg-gray-100 grid-rows-1 grid-flow-row table-auto sm:grid-cols-12 grid-gap-6 justify-between font-normal text-black z-1">
                          <div className="flex flex-row items-center">
                            <span className="text-gray-300">Gauta</span>
                          </div>
                          <div className="flex col-span-2 flex-row items-center">
                            <span className="text-gray-300">Objektas</span>
                          </div>
                          <div className="flex col-span-2 flex-row items-center">
                            <span className="text-gray-300">Pavadinimas</span>
                          </div>
                          <div className="flex flex-row items-center">
                            <span className="text-gray-300">Ekipažas</span>
                          </div>
                          <div className="flex flex-row items-center">
                            <span className="text-gray-300">Spėjo laiku</span>
                          </div>
                          <div className="flex flex-row items-center">
                            <span className="text-gray-300">
                              Reagavimo laikas
                            </span>
                          </div>
                          <div className="flex flex-row items-center">
                            <span className="text-gray-300">
                              Laikas objekte
                            </span>
                          </div>
                          <div className="flex flex-row items-center">
                            <span className="text-gray-300">Būsena</span>
                          </div>
                          <div className="flex col-span-2 flex-row items-center">
                            <span className="text-gray-300">
                              Suveikimo priežastis
                            </span>
                          </div>
                        </div>
                        <div className="pl-4 flex-col w-full items-center">
                          {sortedDashboardTestApi.map((data) => (
                            <DashboardList
                              key={data.id}
                              id={data.id}
                              date={data.date}
                              object={data.object}
                              name={data.name}
                              crew={data.crew}
                              intime={data.intime}
                              reactiontime={data.reactiontime}
                              timeinobject={data.timeinobject}
                              status={data.status}
                              reason={data.reason}
                            />
                          ))}
                        </div>
                      </PDFExport>
                    ) : (
                      <>
                        <div className="hidden pl-4 w-full border-t py-2 md:grid grid-cols-1 bg-gray-100 grid-rows-1 grid-flow-row table-auto sm:grid-cols-12 grid-gap-6 justify-between font-normal text-black z-1">
                          <button
                            onClick={sortedDashboardTestDate}
                            className="flex flex-row items-center"
                          >
                            <span className="text-gray-300 text-sm">Gauta</span>
                            <img
                              src={require("../assets/assets/down.png")}
                              className="h-2 w-4 ml-2"
                            />
                          </button>
                          <button
                            onClick={sortedDashboardTestObject}
                            className="flex col-span-2 flex-row items-center"
                          >
                            <span className="text-gray-300 text-sm">
                              Objektas
                            </span>
                          </button>
                          <button
                            onClick={sortedDashboardTestName}
                            className="flex col-span-2 flex-row items-center"
                          >
                            <span className="text-gray-300 text-sm">
                              Pavadinimas
                            </span>
                          </button>
                          <button
                            onClick={sortedDashboardTestCrew}
                            className="flex flex-row items-center"
                          >
                            <span className="text-gray-300 text-sm">
                              Ekipažas
                            </span>
                          </button>
                          <button
                            onClick={sortedDashboardTestInTime}
                            className="flex flex-row items-center"
                          >
                            <span className="text-gray-300 text-sm">
                              Spėjo laiku
                            </span>
                          </button>
                          <button
                            onClick={sortedDashboardTestReactionTime}
                            className="flex flex-row items-center"
                          >
                            <span className="text-gray-300 text-sm">
                              Reagavimo laikas
                            </span>
                          </button>
                          <button
                            onClick={sortedDashboardTestTimeInObject}
                            className="flex flex-row items-center"
                          >
                            <span className="text-gray-300 text-sm">
                              Laikas objekte
                            </span>
                          </button>
                          <button
                            onClick={sortedDashboardTestStatus}
                            className="flex flex-row items-center"
                          >
                            <span className="text-gray-300 text-sm">
                              Būsena
                            </span>
                          </button>
                          <button
                            onClick={sortedDashboardTestReason}
                            className="flex col-span-2 flex-row items-center"
                          >
                            <span className="text-gray-300 text-sm">
                              Suveikimo priežastis
                            </span>
                          </button>
                        </div>

                        <div className="pl-4 flex-col w-full items-center">
                          {sortedDashboardTestApi.map((data) => (
                            <DashboardList
                              key={data.id}
                              id={data.id}
                              date={data.date}
                              object={data.object}
                              name={data.name}
                              crew={data.crew}
                              intime={data.intime}
                              reactiontime={data.reactiontime}
                              timeinobject={data.timeinobject}
                              status={data.status}
                              reason={data.reason}
                            />
                          ))}
                        </div>
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
                                        <p className="text-black text-md">
                                          Rodyti
                                        </p>
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
                      </>
                    )}
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
  );
}

export default Filter;
