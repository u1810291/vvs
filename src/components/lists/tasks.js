/* eslint-disable react-perf/jsx-no-new-function-as-prop */
import React, { useContext } from "react";
import useLanguage from "../../hook/useLanguage";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import GlobalContext from "../../context/globalContext";
import { generate } from "shortid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const TasksList = ({
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
  const { filterList, setFilterList } = useContext(GlobalContext);
  const { selectedFilter, setSelectedFilter } = useContext(GlobalContext);
  const { dateDefault, setDateDefault } = useContext(GlobalContext);
  const { objectDefault, setObjectDefault } = useContext(GlobalContext);
  const { nameDefault, setNameDefault } = useContext(GlobalContext);
  const { crewDefault, setCrewDefault } = useContext(GlobalContext);
  const { inTimeDefault, setInTimeDefault } = useContext(GlobalContext);
  const { reactionTimeDefault, setReactionTimeDefault } = useContext(GlobalContext);
  const { timeInObjectDefault, setTimeInObjectDefault } = useContext(GlobalContext);
  const { statusDefault, setStatusDefault } = useContext(GlobalContext);
  const { reasonDefault, setReasonDefault } = useContext(GlobalContext);

  return (
    <div
      {...props}
      className={selectedFilter ? "rounded-md w-full border sm:pb-2 p-2 mt-2 grid grid-cols-1 bg-white sm:grid-cols-6 justify-between font-normal text-black gap-2 z-1" : "hidden"}
    >
      {filterList.map((filter) => {
        return (
          <>
          {/* gets one additional div around ( visible : hidden div ) and collapse filters if do here key={generate()}*/}
            {selectedFilter === filter.id ? (
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
                            setFilterList((currentFilter) => 
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

        {filterList.map((filter, index) => {
          return (
            <div key={filter.id}>
              {selectedFilter === filter.id ? (
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
                      {filter.dashboardList.includes("Gauta") ? null : (
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => {
                                const showDate = "Gauta";
                                setDateDefault("true");
                                setFilterList((currentFilter) => 
                                currentFilter.map((x) => x.id === filter.id ? {...x, dashboardList: x.dashboardList.concat(showDate)} : x))}}
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900 w-full text-center"
                                  : "text-center w-full text-gray-400",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              Gauta
                            </button>
                          )}
                        </Menu.Item>
                      )}

                      {filter.dashboardList.includes("Objektas") ? null : (
                        <Menu.Item>
                          {({ active }) => (
                            <button
                            onClick={() => {
                              const object = "Objektas";
                              setObjectDefault("true");
                              setFilterList((currentFilter) => 
                              currentFilter.map((x) => x.id === filter.id ? {...x, dashboardList: x.dashboardList.concat(object)} : x))}}
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900 w-full text-center"
                                  : "text-center w-full text-gray-400",
                                "block w-full text-left px-4 py-2 text-sm"
                              )}
                            >
                              Objektas
                            </button>
                          )}
                        </Menu.Item>
                      )}

                      {filter.dashboardList.includes("Pavadinimas") ? null : (
                        <Menu.Item>
                          {({ active }) => (
                            <button
                            onClick={() => {
                              const name = "Pavadinimas";
                              setNameDefault("true");
                              setFilterList((currentFilter) => 
                              currentFilter.map((x) => x.id === filter.id ? {...x, dashboardList: x.dashboardList.concat(name)} : x))}}
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900 w-full text-center"
                                  : "text-center w-full text-gray-400",
                                "block w-full text-left px-4 py-2 text-sm"
                              )}
                            >
                              Pavadinimas
                            </button>
                          )}
                        </Menu.Item>
                      )}

                      {filter.dashboardList.includes("Ekipažas") ? null : (
                        <Menu.Item>
                          {({ active }) => (
                            <button
                            onClick={() => {
                              const crew = "Ekipažas";
                              setCrewDefault("true");
                              setFilterList((currentFilter) => 
                              currentFilter.map((x) => x.id === filter.id ? {...x, dashboardList: x.dashboardList.concat(crew)} : x))}}
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900 w-full text-center"
                                  : "text-center w-full text-gray-400",
                                "block w-full text-left px-4 py-2 text-sm"
                              )}
                            >
                              Ekipažas
                            </button>
                          )}
                        </Menu.Item>
                      )}

                      {filter.dashboardList.includes("Spėjo laiku") ? null : (
                        <Menu.Item>
                          {({ active }) => (
                            <button
                            onClick={() => {
                              const inTime = "Spėjo laiku";
                              setInTimeDefault("true");
                              setFilterList((currentFilter) => 
                              currentFilter.map((x) => x.id === filter.id ? {...x, dashboardList: x.dashboardList.concat(inTime)} : x))}}
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900 w-full text-center"
                                  : "text-center w-full text-gray-400",
                                "block w-full text-left px-4 py-2 text-sm"
                              )}
                            >
                              Spėjo laiku
                            </button>
                          )}
                        </Menu.Item>
                      )}

                      {filter.dashboardList.includes(
                        "Reagavimo laikas"
                      ) ? null : (
                        <Menu.Item>
                          {({ active }) => (
                            <button
                            onClick={() => {
                              const reactionTime = "Reagavimo laikas";
                              setReactionTimeDefault("true");
                              setFilterList((currentFilter) => 
                              currentFilter.map((x) => x.id === filter.id ? {...x, dashboardList: x.dashboardList.concat(reactionTime)} : x))}}
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900 w-full text-center"
                                  : "text-center w-full text-gray-400",
                                "block w-full text-left px-4 py-2 text-sm"
                              )}
                            >
                              Reagavimo laikas
                            </button>
                          )}
                        </Menu.Item>
                      )}

                      {filter.dashboardList.includes(
                        "Laikas objekte"
                      ) ? null : (
                        <Menu.Item>
                          {({ active }) => (
                            <button
                            onClick={() => {
                              const timeInObject = "Laikas objekte";
                              setTimeInObjectDefault("true");
                              setFilterList((currentFilter) => 
                              currentFilter.map((x) => x.id === filter.id ? {...x, dashboardList: x.dashboardList.concat(timeInObject)} : x))}}
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900 w-full text-center"
                                  : "text-center w-full text-gray-400",
                                "block w-full text-left px-4 py-2 text-sm"
                              )}
                            >
                              Laikas objekte
                            </button>
                          )}
                        </Menu.Item>
                      )}

                      {filter.dashboardList.includes("Būsena") ? null : (
                        <Menu.Item>
                          {({ active }) => (
                            <button
                            onClick={() => {
                              const status = "Būsena";
                              setStatusDefault("true");
                              setFilterList((currentFilter) => 
                              currentFilter.map((x) => x.id === filter.id ? {...x, dashboardList: x.dashboardList.concat(status)} : x))}}
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900 w-full text-center"
                                  : "text-center w-full text-gray-400",
                                "block w-full text-left px-4 py-2 text-sm"
                              )}
                            >
                              Būsena
                            </button>
                          )}
                        </Menu.Item>
                      )}

                      {filter.dashboardList.includes(
                        "Suveikimo priežastis"
                      ) ? null : (
                        <Menu.Item>
                          {({ active }) => (
                            <button
                            onClick={() => {
                              const reason = "Suveikimo priežastis";
                              setReasonDefault("true");
                              setFilterList((currentFilter) => 
                              currentFilter.map((x) => x.id === filter.id ? {...x, dashboardList: x.dashboardList.concat(reason)} : x))}}
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900 w-full text-center"
                                  : "text-center w-full text-gray-400",
                                "block w-full text-left px-4 py-2 text-sm"
                              )}
                            >
                              Suveikimo priežastis
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
