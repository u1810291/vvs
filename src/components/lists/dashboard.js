import React, { useContext, useState, useEffect } from "react";
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
    // if (dateDefault === "false") {
    //   setGridState((state, props) => ({
    //     gridState: state.counter + props.increment
    //   }));
    // }
    if (dateDefault === "false") {
      setGridState((prevNum) => prevNum - 1);
    }
    if (dateDefault === "true") {
      setGridState((prevNum) => prevNum + 1);
    }
    if (objectDefault === "false") {
      setGridState((prevNum) => prevNum - 2);
    }
    if (objectDefault === "true") {
      setGridState((prevNum) => prevNum + 2);
    }
    if (nameDefault === "false") {
      setGridState((prevNum) => prevNum - 2);
    }
    if (nameDefault === "true") {
      setGridState((prevNum) => prevNum + 2);
    }
    if (crewDefault === "false") {
      setGridState((prevNum) => prevNum - 1);
    }
    if (crewDefault === "true") {
      setGridState((prevNum) => prevNum + 1);
    }
    if (inTimeDefault === "false") {
      setGridState((prevNum) => prevNum - 1);
    }
    if (inTimeDefault === "true") {
      setGridState((prevNum) => prevNum + 1);
    }
    if (reactionTimeDefault === "false") {
      setGridState((prevNum) => prevNum - 1);
    }
    if (reactionTimeDefault === "true") {
      setGridState((prevNum) => prevNum + 1);
    }
    if (timeInObjectDefault === "false") {
      setGridState((prevNum) => prevNum - 1);
    }
    if (timeInObjectDefault === "true") {
      setGridState((prevNum) => prevNum + 1);
    }
    if (statusDefault === "false") {
      setGridState((prevNum) => prevNum - 1);
    }
    if (statusDefault === "true") {
      setGridState((prevNum) => prevNum + 1);
    }
    if (reasonDefault === "false") {
      setGridState((prevNum) => prevNum - 2);
    }
    if (reasonDefault === "true") {
      setGridState((prevNum) => prevNum + 2);
    }
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

  console.log(gridState);

  return (
    <>
      <div
        className={`hidden pl-4 w-full border-t py-2 md:grid grid-cols-${gridState} bg-gray-100 grid-rows-1 grid-flow-row table-auto grid-gap-6 justify-between font-normal text-black z-1`}
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
        {reactionTimeDefault === "true" || dateDefault === "default" ? (
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
                      className={`w-full border-b grid grid-cols-${gridState} bg-white grid-rows-1 grid-flow-row table-auto grid-gap-6 justify-between font-normal text-black z-1`}
                    >
                      {filter.dashboardList.includes("Gauta") ? (
                        <div className="flex flex-row items-center h-12">
                          <span className="bg-white text-sm text-gray-400 truncate hover:text-gray-500">
                            {data.date}
                          </span>
                        </div>
                      ) : (
                        setDateDefault("false")
                      )}
                      {filter.dashboardList.includes("Objektas") ? (
                        <div className="flex col-span-2 flex-row items-center h-12">
                          <span className="bg-white text-sm text-blue-300 truncate hover:text-gray-500">
                            {data.object}
                          </span>
                        </div>
                      ) : (
                        setObjectDefault("false")
                      )}
                      {filter.dashboardList.includes("Pavadinimas") ? (
                        <div className="flex col-span-2 flex-row items-center h-12">
                          <span className="bg-white text-sm text-gray-400 truncate hover:text-gray-500">
                            {data.name}
                          </span>
                        </div>
                      ) : (
                        setNameDefault("false")
                      )}
                      {filter.dashboardList.includes("Ekipažas") ? (
                        <div className="flex row-span-2 items-center h-12">
                          <span className="bg-white text-sm text-blue-300 truncate hover:text-gray-500">
                            {data.crew}
                          </span>
                        </div>
                      ) : (
                        setCrewDefault("false")
                      )}
                      {filter.dashboardList.includes("Spėjo laiku") ? (
                        <div className="flex flex-row items-center h-12">
                          <span className="bg-white text-sm text-gray-400 truncate hover:text-gray-500">
                            {data.intime}
                          </span>
                        </div>
                      ) : (
                        setInTimeDefault("false")
                      )}
                      {filter.dashboardList.includes("Reagavimo laikas") ? (
                        <div className="flex flex-row h-12 items-center hover:text-gray-500">
                          <span className="bg-white text-gray-400 hover:text-gray-500">
                            {data.reactiontime}
                          </span>
                        </div>
                      ) : (
                        setReactionTimeDefault("false")
                      )}
                      {filter.dashboardList.includes("Laikas objekte") ? (
                        <div className="flex flex-row items-center h-12">
                          <span className="bg-white text-gray-400 hover:text-gray-500">
                            {data.timeinobject}
                          </span>
                        </div>
                      ) : (
                        setTimeInObjectDefault("false")
                      )}
                      {filter.dashboardList.includes("Būsena") ? (
                        <div className="flex whitespace-nowrap flex-row h-12 items-center">
                          <RedWatching />
                          {/* <InspectedStatus />
                                    <YellowWaitingStatus />
                                    <RedDriving/>
                                    <GrayStatus/>
                                    <GreenStatus/>
                                    <BlueStatus/>
                                    <CancelStatus/> */}
                        </div>
                      ) : (
                        setStatusDefault("false")
                      )}
                      {filter.dashboardList.includes("Suveikimo priežastis") ? (
                        <div className="flex col-span-2 flex-row h-12 items-center">
                          <span className="bg-white text-sm text-gray-500 truncate hover:text-gray-400">
                            {data.reason}
                          </span>
                        </div>
                      ) : (
                        setReasonDefault("false")
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
