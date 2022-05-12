/* eslint-disable react-perf/jsx-no-new-function-as-prop */
import React, { useCallback, useContext } from "react";
import useLanguage from "../../hook/useLanguage";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import GlobalContext from "../../context/globalContext";
import { generate } from "shortid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const FiltersListObjects = ({
  get,
  object,
  name,
  crew,
  intime,
  reactiontime,
  timeinobject,
  status,
  reason,
  ...props
}) => {
  const { english, lithuanian, t } = useLanguage();
  const { filterListObjects, setFilterListObjects } = useContext(GlobalContext);
  const { selectedFilterObjects, setSelectedFilterObjects } = useContext(GlobalContext);
  const { objectNamesDefault, setObjectNamesDefault } =
  useContext(GlobalContext);
const { objectCityDefault, setObjectCityDefault } = useContext(GlobalContext);
const { objectAddressDefault, setObjectAddressDefault } =
  useContext(GlobalContext);
const { objectObjectsDefault, setObjectObjectsDefault } =
  useContext(GlobalContext);
const { objectContractDefault, setObjectContractDefault } =
  useContext(GlobalContext);
const { objectSentCrewDefault, setObjectSentCrewDefault } =
  useContext(GlobalContext);

  return (
    <div
      {...props}
      className={selectedFilterObjects ? "rounded-md w-full border sm:pb-2 p-2 mt-2 grid grid-cols-1 bg-white sm:grid-cols-6 justify-between font-normal text-black gap-2 z-1" : "hidden"}
    >
      {filterListObjects.map((filter) => {
        return (
          <>
          {/* gets one additional div around ( visible : hidden div ) and collapse filters if do here key={generate()}*/}
            {selectedFilterObjects === filter.id ? (
              <>
                {filter.dashboardList.map((element) => {
                  return (
                    <div
                      className={filter.id ? "visible" : "hidden"}
                      key={generate()}
                    >
                      <div className="flex p-1 rounded-sm text-xs font-normal justify-between items-center text-gray-400 bg-gray-200">
                        <p className="truncate">{element}</p>
                        <button
                          onClick={() => {
                            setFilterListObjects((currentFilter) => 
                              currentFilter.map((x) => x.id === filter.id ? {...x, dashboardList: x.dashboardList.filter((y) => y !== element)} : x))}
                            }
                        >
                          <img
                            className="h-2 w-2"
                            src={require("../../assets/assets/x.png")}
                          />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </>
            ) : null}
            {/* </> */}
          </>
        );
      })}

      <Menu as="div" className="relative inline-block text-left">
        <div className="flex flex-col  w-full">
          <Menu.Button className="flex p-1 text-xs font-normal justify-center  items-center text-gray-400 bg-white hover:text-gray-500">
            <img
              className="h-4 w-4 mr-4"
              src={require("../../assets/assets/plus.png")}
            />
            <p className="truncate">Pridėti stulpelį</p>
          </Menu.Button>
        </div>

        {filterListObjects.map((filter, index) => {
          return (
            <div key={filter.id}>
              {selectedFilterObjects === filter.id ? (
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-right z-10 absolute left-0 mt-2 w-56 shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {filter.dashboardList.includes("Vardas Pavardė") ? null : ( // when no menu items left you can see parent div 
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => {
                                const showDate = "Vardas Pavardė";
                                setObjectNamesDefault("true");
                                setFilterListObjects((currentFilter) => 
                                currentFilter.map((x) => x.id === filter.id ? {...x, dashboardList: x.dashboardList.concat(showDate)} : x))}}
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900 w-full text-center"
                                  : "text-center w-full text-gray-400",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              Vardas Pavardė
                            </button>
                          )}
                        </Menu.Item>
                      )}

                      {filter.dashboardList.includes("Miestas") ? null : (
                        <Menu.Item>
                          {({ active }) => (
                            <button
                            onClick={() => {
                              const object = "Miestas";
                              setObjectCityDefault("true");
                              setFilterListObjects((currentFilter) => 
                              currentFilter.map((x) => x.id === filter.id ? {...x, dashboardList: x.dashboardList.concat(object)} : x))}}
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900 w-full text-center"
                                  : "text-center w-full text-gray-400",
                                "block w-full text-left px-4 py-2 text-sm"
                              )}
                            >
                              Miestas
                            </button>
                          )}
                        </Menu.Item>
                      )}

                      {filter.dashboardList.includes("Adresas") ? null : (
                        <Menu.Item>
                          {({ active }) => (
                            <button
                            onClick={() => {
                              const name = "Adresas";
                              setObjectAddressDefault("true");
                              setFilterListObjects((currentFilter) => 
                              currentFilter.map((x) => x.id === filter.id ? {...x, dashboardList: x.dashboardList.concat(name)} : x))}}
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900 w-full text-center"
                                  : "text-center w-full text-gray-400",
                                "block w-full text-left px-4 py-2 text-sm"
                              )}
                            >
                              Adresas
                            </button>
                          )}
                        </Menu.Item>
                      )}

                      {filter.dashboardList.includes("Objekto nr.") ? null : (
                        <Menu.Item>
                          {({ active }) => (
                            <button
                            onClick={() => {
                              const crew = "Objekto nr.";
                              setObjectObjectsDefault("true");
                              setFilterListObjects((currentFilter) => 
                              currentFilter.map((x) => x.id === filter.id ? {...x, dashboardList: x.dashboardList.concat(crew)} : x))}}
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900 w-full text-center"
                                  : "text-center w-full text-gray-400",
                                "block w-full text-left px-4 py-2 text-sm"
                              )}
                            >
                              Objekto nr.
                            </button>
                          )}
                        </Menu.Item>
                      )}

                      {filter.dashboardList.includes("Sutarties nr.") ? null : (
                        <Menu.Item>
                          {({ active }) => (
                            <button
                            onClick={() => {
                              const inTime = "Sutarties nr.";
                              setObjectContractDefault("true");
                              setFilterListObjects((currentFilter) => 
                              currentFilter.map((x) => x.id === filter.id ? {...x, dashboardList: x.dashboardList.concat(inTime)} : x))}}
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900 w-full text-center"
                                  : "text-center w-full text-gray-400",
                                "block w-full text-left px-4 py-2 text-sm"
                              )}
                            >
                              Sutarties nr.
                            </button>
                          )}
                        </Menu.Item>
                      )}

                      {filter.dashboardList.includes(
                        "Siusti ekipaža"
                      ) ? null : (
                        <Menu.Item>
                          {({ active }) => (
                            <button
                            onClick={() => {
                              const reactionTime = "Siusti ekipaža";
                              setObjectSentCrewDefault("true");
                              setFilterListObjects((currentFilter) => 
                              currentFilter.map((x) => x.id === filter.id ? {...x, dashboardList: x.dashboardList.concat(reactionTime)} : x))}}
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900 w-full text-center"
                                  : "text-center w-full text-gray-400",
                                "block w-full text-left px-4 py-2 text-sm"
                              )}
                            >
                              Siusti ekipaža
                            </button>
                          )}
                        </Menu.Item>
                      )}

                    </div>
                  </Menu.Items>
                </Transition>
              ) : null}
            </div>
          );
        })}
      </Menu>
    </div>
  );
};

{
  /* replace to drag and drop if needed*/
}
