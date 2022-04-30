import React, { useContext } from "react";
import useLanguage from "../../hook/useLanguage";
import GlobalContext from "../../context/globalContext";
const { RedWatching } = require("../buttons/redWatching");
const { RedDriving } = require("../buttons/redDriving");
const { BlueStatus } = require("../buttons/blueStatus");
const { CancelStatus } = require("../buttons/darkBlueStatus");
const { GreenStatus } = require("../buttons/greenStatus");
const { GrayStatus } = require("../buttons/grayStatus");
const { YellowWaitingStatus } = require("../buttons/yellowWaiting");
const { InspectedStatus } = require("../buttons/yellowInspected");

export const DriversList = ({
  id,
  name,
  status,
  ...props
}) => {
  const { english, lithuanian, t } = useLanguage();
  const { filterList, setFilterList } = useContext(GlobalContext);
  const { filterEditing, setFilterEditing } = useContext(GlobalContext);
  const { selectedFilter, setSelectedFilter } = useContext(GlobalContext);

  return (
    <div className="w-full" {...props}>
      {filterList.map((filter, index) => {
        return (
          <div key={filter.id}>
            <div className="w-full border-b grid grid-cols-3 bg-white grid-rows-1 grid-flow-row table-auto md:grid-cols-3 grid-gap-6 justify-between font-normal text-black z-1">
              <div className="flex flex-row items-center h-12 col-span-2">
                <span className="bg-white text-gray-400 truncate text-sm">{name}</span>
              </div>
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
            </div>
          </div>
        );
      })}
    </div>
  );
};
