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

const CrewList = ({
  id,
  name,
  abbreviation,
  dislocationZone,
  status,
  isAssignedAutomatically,
  ...props
}) => {
  const { english, lithuanian, t } = useLanguage();
  const {filterListCrew, setFilterListCrew} = useContext(GlobalContext);
  const {filterEditingCrew, setFilterEditingCrew} = useContext(GlobalContext);
  const {selectedFilterCrew, setSelectedFilterCrew} = useContext(GlobalContext);

  return (
    <div className="w-full" {...props}>
      {filterListCrew.map((filter, index) => {
        return (
          <div key={filter.id}>
            {selectedFilterCrew === filter.id ? (
              <div className="w-full border-b grid grid-cols-1 bg-white grid-rows-1 grid-flow-row table-auto md:grid-cols-12 grid-gap-6 justify-between font-normal text-black z-1">
                <div className="flex col-span-2 flex-row items-center h-16">
                  {filter.crewList.includes("Pavadinimas") ? (
                    <span className="bg-white text-gray-400 truncate">{name}</span>
                  ) : (
                    <span className="bg-white text-gray-400">-</span>
                  )}
                </div>
                <div className="flex col-span-1 flex-row items-center h-16">
                  {filter.crewList.includes("Trumpinys") ? (
                    <span className="bg-white text-gray-400 truncate">{abbreviation}</span>
                  ) : (
                    <span className="bg-white text-gray-400">-</span>
                  )}
                </div>
                <div className="flex col-span-6 flex-row items-center h-16">
                  {filter.crewList.includes("Dislokacijos zona") ? (
                    <span className="bg-white text-gray-400 truncate">{dislocationZone}</span>
                  ) : (
                    <span className="bg-white text-gray-400">-</span>
                  )}
                </div>
                <div className="flex col-span-1 items-center h-16">
                  {filter.crewList.includes("Būsena") ? (
                    <RedWatching />
                  ) : (
                    <span className="bg-white text-gray-400">-</span>
                  )}
                </div>
                <div className="flex col-span-2 flex-row items-center h-16">
                  {filter.crewList.includes("Automatiškai priskirti") ? (
                    <span className="bg-white text-gray-400 truncate">{isAssignedAutomatically}</span>
                  ) : (
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

export default CrewList;
