import React, { useCallback, useContext } from "react";
import useLanguage from "../../hook/useLanguage";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import GlobalContext from "../../context/globalContext";
import useArray from "../../hook/useArray";
import { generate } from "shortid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const FiltersList = ({
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
  const { array, filter, pop, push } = useArray([]);
  const { filterList, setFilterList } = useContext(GlobalContext);
  const { showDate, setShowData } = useContext(GlobalContext);
  const { showObject, setShowObject } = useContext(GlobalContext);
  const { showName, setShowName } = useContext(GlobalContext);
  const { showCrew, setShowCrew } = useContext(GlobalContext);
  const { showInTime, setShowInTime } = useContext(GlobalContext);
  const { showReactionTime, setShowReactionTime } = useContext(GlobalContext);
  const { showTimeInObject, setShowTimeInObject } = useContext(GlobalContext);
  const { showStatus, setShowStatus } = useContext(GlobalContext);
  const { showReason, setShowReason } = useContext(GlobalContext);
  const { filterEditing, setFilterEditing } = useContext(GlobalContext);
  const { selectedFilter, setSelectedFilter } = useContext(GlobalContext);

  const DateFunc = useCallback(async () => {}, []);

  const ObjectFunc = useCallback(async () => {}, []);

  const NameFunc = useCallback(async () => {}, []);

  const CrewFunc = useCallback(async () => {}, []);

  const InTimeFunc = useCallback(async () => {}, []);

  const ReactionTimeFunc = useCallback(async () => {}, []);

  const TimeInObjectFunc = useCallback(async () => {}, []);

  const StatusFunc = useCallback(async () => {}, []);

  const ReasonFunc = useCallback(async () => {}, []);

  const remove = useCallback(async (filter) => {}, []);
  
  // const dashboardLists = filterList.dashboardList;
  // dashboardLists.forEach((element) => {
  //   console.log(element);
  // });

  // console.log(filterList[1].dashboardList);

  return (
    <div
      {...props}
      className="rounded-md w-full border sm:pb-2 p-2 mt-2 grid grid-cols-1 bg-white sm:grid-cols-6 justify-between font-normal text-black gap-2 z-1"
    >
      {filterList.forEach((filter) => {
        return (
          <>
            {selectedFilter === filter.id ? (
              <div
                className={filter.id ? "visible" : "hidden"}
                key={generate()}
              >
                <div className="flex p-1 rounded-sm text-xs font-normal justify-between  items-center text-gray-400 bg-gray-200">
                  <p></p>
                  <button onClick={remove}>
                    <img
                      className="h-2 w-2"
                      src={require("../../assets/assets/x.png")}
                    />
                  </button>
                </div>
              </div>
            ) : null}
          </>
        );
      })}

      {/* <div className="flex p-1 rounded-sm text-xs font-normal justify-between  items-center text-gray-400 bg-gray-200">
        <p>Gauta</p>
        <button onClick={DateFunc}><img className="h-2 w-2" src={require("../../assets/assets/x.png")} /></button>
      </div>
      <div className="flex p-1 rounded-sm text-xs font-normal justify-between  items-center text-gray-400 bg-gray-200">
        <p>Objektas</p>
        <button onClick={ObjectFunc}><img className="h-2 w-2" src={require("../../assets/assets/x.png")} /></button>
      </div>
      <div className="flex p-1 rounded-sm text-xs font-normal justify-between  items-center text-gray-400 bg-gray-200">
        <p>Pavadinimas</p>
        <button onClick={NameFunc}><img className="h-2 w-2" src={require("../../assets/assets/x.png")} /></button>
      </div>
      <div className="flex p-1 rounded-sm text-xs font-normal justify-between  items-center text-gray-400 bg-gray-200">
        <p>Ekipažas</p>
        <button onClick={CrewFunc}><img className="h-2 w-2" src={require("../../assets/assets/x.png")} /></button>
      </div>
      <div className="flex p-1 rounded-sm text-xs font-normal justify-between  items-center text-gray-400 bg-gray-200">
        <p>Spėjo laiku</p>
        <button onClick={InTimeFunc}><img className="h-2 w-2" src={require("../../assets/assets/x.png")} /></button>
      </div>
      <div className="flex p-1 rounded-sm text-xs font-normal justify-between  items-center text-gray-400 bg-gray-200">
        <p>Reagavimo laikas</p>
        <button onClick={ReactionFunc}><img className="h-2 w-2" src={require("../../assets/assets/x.png")} /></button>
      </div>
      <div className="flex p-1 rounded-sm text-xs font-normal justify-between  items-center text-gray-400 bg-gray-200">
        <p>Laikas objekte</p>
        <button onClick={TimeInObjectFunc}><img className="h-2 w-2" src={require("../../assets/assets/x.png")} /></button>
      </div>
      <div className="flex p-1 rounded-sm text-xs font-normal justify-between  items-center text-gray-400 bg-gray-200">
        <p>Būsena</p>
        <button onClick={StatusFunc}><img className="h-2 w-2" src={require("../../assets/assets/x.png")} /></button>
      </div>
      <div className="flex p-1 rounded-sm w-full text-xs font-normal justify-between items-center text-gray-400 bg-gray-200">
        <p>Suveikimo priežastis</p>
        <button onClick={ReasonFunc}><img className="h-2 w-2" src={require("../../assets/assets/x.png")} /></button>
      </div> */}

      <Menu as="div" className="relative inline-block text-left">
        <div className="flex flex-col  w-full">
          <Menu.Button className="flex p-1 text-xs font-normal justify-center  items-center text-gray-400 bg-white">
            <img
              className="h-4 w-4 mr-4"
              src={require("../../assets/assets/plus.png")}
            />
            <p>Pridėti stulpelį</p>
          </Menu.Button>
        </div>

        {filterList.map((filter, index) => {
          return (
            <div key={filter.id}>
              {filterEditing === filter.id ? (
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
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={DateFunc}
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

                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={ObjectFunc}
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

                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={NameFunc}
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

                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={CrewFunc}
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

                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={InTimeFunc}
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

                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={ReactionTimeFunc}
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

                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={TimeInObjectFunc}
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

                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={StatusFunc}
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

                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={ReasonFunc}
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
