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

export const TaskListDashboard = ({
  id,
  date,
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
  const { filterEditing, setFilterEditing } = useContext(GlobalContext);
  const { selectedFilter, setSelectedFilter } = useContext(GlobalContext);

  return (
    <div className="w-full" {...props}>
      {filterList.map((filter, index) => {
        return (
          <div key={filter.id}>
            <div className="w-full border-b grid grid-cols-1 bg-white grid-rows-1 grid-flow-row table-auto md:grid-cols-12 grid-gap-6 justify-between font-normal text-black z-1">
              <div className="flex flex-row items-center h-16">
                <span className="bg-white text-gray-400 truncate">{date}</span>
              </div>
              <div className="flex col-span-2 flex-row items-center h-16">
                <span className="bg-white text-gray-400 truncate">
                  {object}
                </span>
              </div>
              <div className="flex col-span-2 flex-row items-center h-16">
                <span className="bg-white text-gray-400 truncate">{name}</span>
              </div>
              <div className="flex row-span-2 items-center h-16">
                <span className="bg-white text-gray-400 truncate">{crew}</span>
              </div>
              <div className="flex flex-row items-center h-16">
                <span className="bg-white text-gray-400 truncate">
                  {intime}
                </span>
              </div>
              <div className="flex flex-row h-16 items-center">
                <span className="bg-white text-gray-400">{reactiontime}</span>
              </div>
              <div className="flex flex-row items-center h-16">
                <span className="bg-white text-gray-400">{timeinobject}</span>
              </div>
              <div className="flex whitespace-nowrap flex-row h-16 items-center">
                <RedWatching />

                {/* <InspectedStatus />
                    <YellowWaitingStatus />
                    <RedDriving/>
                    <GrayStatus/>
                    <GreenStatus/>
                    <BlueStatus/>
                    <CancelStatus/> */}
                <span className="bg-white text-gray-400">-</span>
              </div>
              <div className="flex col-span-2 flex-row h-16 items-center">
                <span className="bg-white text-gray-400 truncate">
                  {reason}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
