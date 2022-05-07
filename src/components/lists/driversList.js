import React, { useContext } from "react";
import useLanguage from "../../hook/useLanguage";
import GlobalContext from "../../context/globalContext";
import { Link } from "react-router-dom";
const { RedWatching } = require("../buttons/redWatching");
const { RedDriving } = require("../buttons/redDriving");
const { BlueStatus } = require("../buttons/blueStatus");
const { CancelStatus } = require("../buttons/darkBlueStatus");
const { GreenStatus } = require("../buttons/greenStatus");
const { GrayStatus } = require("../buttons/grayStatus");
const { YellowWaitingStatus } = require("../buttons/yellowWaiting");
const { InspectedStatus } = require("../buttons/yellowInspected");

export const DriverList = ({ id, name, status, ...props }) => {
  const { english, lithuanian, t } = useLanguage();
  const { filterListDrivers, setFilterListDrivers } = useContext(GlobalContext);
  const { filterEditingDrivers, setFilterEditingDrivers } =
    useContext(GlobalContext);
  const { selectedFilterDrivers, setSelectedFilterDrivers } =
    useContext(GlobalContext);

    const path = { pathname: `/driver/${id}` };

  return (
    <div className="w-full" {...props}>
      {filterListDrivers.map((filter, index) => {
        return (
          <div key={filter.id}>
            {selectedFilterDrivers === filter.id ? (
              <div className="w-full border-b grid grid-cols-3 bg-white grid-rows-1 grid-flow-row table-auto md:grid-cols-3 grid-gap-6 justify-between font-normal text-black z-1">
                <div className="flex flex-row items-center h-12 col-span-2">
                  {filter.dashboardList.includes("Vardas Pavardė") ? (
                    <Link to={path} className="bg-white text-gray-500 hover:text-gray-600 truncate text-sm">
                      {name}
                    </Link>
                  ) : (
                    <span className="bg-white text-gray-400">-</span>
                  )}
                </div>
                <div className="flex whitespace-nowrap flex-row h-12 items-center">
                  {filter.dashboardList.includes("Būsena") ? (
                    <RedWatching />
                  ) : (
                    // <InspectedStatus />
                    // <YellowWaitingStatus />
                    // <RedDriving/>
                    // <GrayStatus/>
                    // <GreenStatus/>
                    // <BlueStatus/>
                    // <CancelStatus/>
                    <span className="bg-white text-gray-400">-</span>
                  )}
                </div>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};
