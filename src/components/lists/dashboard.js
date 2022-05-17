import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import GlobalContext from "../../context/globalContext";
import { DashboardTestApi } from "../../api/dashboardTest";
import useSort from "../../hook/useSort";
import { sortToggle } from "../../util/utils";
const { RedWatching } = require("../buttons/redWatching");
const { RedDriving } = require("../buttons/redDriving");
const { BlueStatus } = require("../buttons/blueStatus");
const { CancelStatus } = require("../buttons/darkBlueStatus");
const { GreenStatus } = require("../buttons/greenStatus");
const { GrayStatus } = require("../buttons/grayStatus");
const { YellowWaitingStatus } = require("../buttons/yellowWaiting");
const { InspectedStatus } = require("../buttons/yellowInspected");

export const DashboardList = () => {
  const dateRef = useRef();
  const objectRef = useRef();
  const nameRef = useRef();
  const crewRef = useRef();
  const inTimeRef = useRef();
  const reactionTimeRef = useRef();
  const statusRef = useRef();
  const reasonRef = useRef();
  const timeInObjectRef = useRef();

  const { filterList, setFilterList } = useContext(GlobalContext);
  const { filterEditing, setFilterEditing } = useContext(GlobalContext);
  const { selectedFilter, setSelectedFilter } = useContext(GlobalContext);
  const { objectDefault, setObjectDefault } = useContext(GlobalContext);
  const { nameDefault, setNameDefault } = useContext(GlobalContext);
  const { crewDefault, setCrewDefault } = useContext(GlobalContext);
  const { inTimeDefault, setInTimeDefault } = useContext(GlobalContext);
  const { reactionTimeDefault, setReactionTimeDefault } =
    useContext(GlobalContext);
  const { timeInObjectDefault, setTimeInObjectDefault } =
    useContext(GlobalContext);
  const { statusDefault, setStatusDefault } = useContext(GlobalContext);
  const { reasonDefault, setReasonDefault } = useContext(GlobalContext);
  const { dateDefault, setDateDefault } = useContext(GlobalContext);
  const [gridState, setGridState] = useState(12);

  const {
    sortedDashboardKeys,
    sortedDashboardOrder,
    sortedDashboardDate,
    sortedDashboardObject,
    sortedDashboardName,
    sortedDashboardCrew,
    sortedDashboardInTime,
    sortedDashboardReactionTime,
    sortedDashboardTimeInObject,
    sortedDashboardStatus,
    sortedDashboardReason,
  } = useSort();

  const sortedDashboardTestApi = sortToggle(
    DashboardTestApi,
    sortedDashboardKeys,
    sortedDashboardOrder
  );

  useEffect(() => {
    if (dateDefault === "false") {
      setGridState(gridState - 1);
    }
    if (dateDefault === "true") {
      setGridState(gridState + 1);
      dateRef.current = undefined;
    }
    if (objectDefault === "false") {
      setGridState(gridState - 2);
      objectRef.current = undefined;
    }
    if (objectDefault === "true") {
      setGridState(gridState + 2);
    }
    if (nameDefault === "false") {
      setGridState(gridState - 2);
      nameRef.current = undefined;
    }
    if (nameDefault === "true") {
      setGridState(gridState + 2);
    }
    if (crewDefault === "false") {
      setGridState(gridState - 1);
      crewRef.current = undefined;
    }
    if (crewDefault === "true") {
      setGridState(gridState + 1);
    }
    if (inTimeDefault === "false") {
      setGridState(gridState - 1);
      inTimeRef.current = undefined;
    }
    if (inTimeDefault === "true") {
      setGridState(gridState + 1);
    }
    if (reactionTimeDefault === "false") {
      setGridState(gridState - 1);
      reactionTimeRef.current = undefined;
    }
    if (reactionTimeDefault === "true") {
      setGridState(gridState + 1);
    }
    if (timeInObjectDefault === "false") {
      setGridState(gridState - 1);
      timeInObjectRef.current = undefined;
    }
    if (timeInObjectDefault === "true") {
      setGridState(gridState + 1);
    }
    if (statusDefault === "false") {
      setGridState(gridState - 1);
      statusRef.current = undefined;
    }
    if (statusDefault === "true") {
      setGridState(gridState + 1);
    }
    if (reasonDefault === "false") {
      setGridState(gridState - 2);
      reasonRef.current = undefined;
    }
    if (reasonDefault === "true") {
      setGridState(gridState + 2);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    crewDefault,
    dateDefault,
    inTimeDefault,
    nameDefault,
    objectDefault,
    reactionTimeDefault,
    reasonDefault,
    statusDefault,
    timeInObjectDefault,
  ]);

  useEffect(() => {
    if (dateRef.current === null) {
      setDateDefault("false");
    }
    if (objectRef.current === null) {
      setObjectDefault("false");
    }
    if (nameRef.current === null) {
      setNameDefault("false");
    }
    if (crewRef.current === null) {
      setCrewDefault("false");
    }
    if (inTimeRef.current === null) {
      setInTimeDefault("false");
    }
    if (reactionTimeRef.current === null) {
      setReactionTimeDefault("false");
    }
    if (statusRef.current === null) {
      setStatusDefault("false");
    }
    if (reasonRef.current === null) {
      setReasonDefault("false");
    }
    if (timeInObjectRef.current === null) {
      setTimeInObjectDefault("false");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dateRef.current,
    objectRef.current,
    nameRef.current,
    crewRef.current,
    inTimeRef.current,
    reactionTimeRef.current,
    statusRef.current,
    reasonRef.current,
    timeInObjectRef.current,
  ]);

  return (
    <>
      <div
        className={`hidden pl-4 w-full border-t py-2 md:grid grid-cols-${gridState} bg-gray-100 grid-rows-1 table-auto grid-gap-6 justify-between font-normal text-black z-1`}
      >
        {dateDefault === "true" || dateDefault === "default" ? (
          <button
            onClick={sortedDashboardDate}
            className="flex flex-row items-center"
          >
            <span className="text-gray-300 text-sm hover:text-gray-400">
              Gauta
            </span>
            <img
              src={require("../../assets/assets/down.png")}
              className="h-2 w-4 ml-2"
            />
          </button>
        ) : null}
        {objectDefault === "true" || objectDefault === "default" ? (
          <button
            onClick={sortedDashboardObject}
            className="flex col-span-2 flex-row items-center"
          >
            <span className="text-gray-300 text-sm hover:text-gray-400">
              Objektas
            </span>
          </button>
        ) : null}
        {nameDefault === "true" || nameDefault === "default" ? (
          <button
            onClick={sortedDashboardName}
            className="flex col-span-2 flex-row items-center"
          >
            <span className="text-gray-300 text-sm hover:text-gray-400">
              Pavadinimas
            </span>
          </button>
        ) : null}
        {crewDefault === "true" || crewDefault === "default" ? (
          <button
            onClick={sortedDashboardCrew}
            className="flex flex-row items-center"
          >
            <span className="text-gray-300 text-sm hover:text-gray-400">
              Ekipažas
            </span>
          </button>
        ) : null}
        {inTimeDefault === "true" || inTimeDefault === "default" ? (
          <button
            onClick={sortedDashboardInTime}
            className="flex flex-row items-center"
          >
            <span className="text-gray-300 text-sm hover:text-gray-400">
              Spėjo laiku
            </span>
          </button>
        ) : null}
        {reactionTimeDefault === "true" || reactionTimeDefault === "default" ? (
          <button
            onClick={sortedDashboardReactionTime}
            className="flex flex-row items-center"
          >
            <span className="text-gray-300 text-sm hover:text-gray-400">
              Reagavimo laikas
            </span>
          </button>
        ) : null}
        {timeInObjectDefault === "true" || timeInObjectDefault === "default" ? (
          <button
            onClick={sortedDashboardTimeInObject}
            className="flex flex-row items-center"
          >
            <span className="text-gray-300 text-sm hover:text-gray-400">
              Laikas objekte
            </span>
          </button>
        ) : null}
        {statusDefault === "true" || statusDefault === "default" ? (
          <button
            onClick={sortedDashboardStatus}
            className="flex flex-row items-center"
          >
            <span className="text-gray-300 text-sm hover:text-gray-400">
              Būsena
            </span>
          </button>
        ) : null}
        {reasonDefault === "true" || reasonDefault === "default" ? (
          <button
            onClick={sortedDashboardReason}
            className="flex col-span-2 flex-row items-center"
          >
            <span className="text-gray-300 text-sm hover:text-gray-400">
              Suveikimo priežastis
            </span>
          </button>
        ) : null}
      </div>
      <div className="pl-4 flex-col w-full items-center">
        {sortedDashboardTestApi.map((data) => (
          <div className="w-full" key={data.id}>
            {filterList.map((filter, index) => {
              return (
                <div key={filter.id}>
                  {selectedFilter === filter.id ? (
                    <div
                      className={`w-full border-b grid grid-cols-${gridState} bg-white grid-rows-1 grid-gap-6 justify-between font-normal text-black z-1`}
                    >




                      {filter.dashboardList.includes("Gauta") ? (
                        <div className="flex flex-row items-center h-12">
                          <span className="bg-white text-sm text-gray-400 truncate hover:text-gray-500">
                            {data.date}
                          </span>
                        </div>
                      ) : (
                        (dateRef.current = null)
                      )}
                      {filter.dashboardList.includes("Objektas") ? (
                        <div className="flex flex-row col-span-2 items-center h-12">
                          <span className="bg-white text-sm text-blue-300 truncate hover:text-gray-500">
                            {data.object}
                          </span>
                        </div>
                      ) : (
                        (objectRef.current = null)
                      )}
                      {filter.dashboardList.includes("Pavadinimas") ? (
                        <div className="flex flex-row col-span-2 items-center h-12">
                          <span className="bg-white text-sm text-gray-400 truncate hover:text-gray-500">
                            {data.name}
                          </span>
                        </div>
                      ) : (
                        (nameRef.current = null)
                      )}
                      {filter.dashboardList.includes("Ekipažas") ? (
                        <div className="flex flex-row items-center h-12">
                          <span className="bg-white text-sm text-blue-300 truncate hover:text-gray-500">
                            {data.crew}
                          </span>
                        </div>
                      ) : (
                        (crewRef.current = null)
                      )}
                      {filter.dashboardList.includes("Spėjo laiku") ? (
                        <div className="flex flex-row items-center h-12">
                          <span className="bg-white text-sm text-gray-400 truncate hover:text-gray-500">
                            {data.intime}
                          </span>
                        </div>
                      ) : (
                        (inTimeRef.current = null)
                      )}
                      {filter.dashboardList.includes("Reagavimo laikas") ? (
                        <div className="flex flex-row items-center h-12">
                          <span className="bg-white text-gray-400 hover:text-gray-500">
                            {data.reactiontime}
                          </span>
                        </div>
                      ) : (
                        (reactionTimeRef.current = null)
                      )}
                      {filter.dashboardList.includes("Laikas objekte") ? (
                        <div className="flex flex-row items-center h-12">
                          <span className="bg-white text-gray-400 hover:text-gray-500">
                            {data.timeinobject}
                          </span>
                        </div>
                      ) : (
                        (timeInObjectRef.current = null)
                      )}
                      {filter.dashboardList.includes("Būsena") ? (
                        <div className="flex flex-row items-center h-12">
                          <RedWatching />
                        </div>
                      ) : (
                        (statusRef.current = null)
                      )}
                      {filter.dashboardList.includes("Suveikimo priežastis") ? (
                        <div className="flex flex-row col-span-2 items-center h-12">
                          <span className="bg-white text-sm text-gray-500 truncate hover:text-gray-400">
                            {data.reason}
                          </span>
                        </div>
                      ) : (
                        (reasonRef.current = null)
                      )}




                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
};

                          {/* <InspectedStatus />
                          <YellowWaitingStatus />
                          <RedDriving/>
                          <GrayStatus/>
                          <GreenStatus/>
                          <BlueStatus/>
                          <CancelStatus/> */}