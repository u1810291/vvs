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

export const PermissionsList = ({
  id,
  date,
  name,
  status,
  crew,
  drivers,
  token,
  ...props
}) => {
  const {english, lithuanian, t} = useLanguage();
  const {filterListPermissions, setFilterListPermissions} = useContext(GlobalContext);
  const {filterEditingPermissions, setFilterEditingPermissions} = useContext(GlobalContext);
  const {selectedFilterPermissions, setSelectedFilterPermissions} = useContext(GlobalContext);

  return (
    <div className="w-full" {...props}>
      {filterListPermissions.map((filter, index) => {
        return (
          <div key={filter.id}>
            {selectedFilterPermissions === filter.id ? (
              <div className="w-full border-b grid grid-cols-1 bg-white grid-rows-1 grid-flow-row table-auto md:grid-cols-12 grid-gap-6 justify-between font-normal text-black z-1">
                <div className="flex col-span-3 flex-row items-center h-16">
                  {filter.permissionsList.includes("Date") ? (
                    <span className="bg-white text-gray-400 truncate">{date}</span>
                  ) : (
                    <span className="bg-white text-gray-400">-</span>
                  )}
                </div>
                <div className="flex col-span-3 flex-row items-center h-16">
                  {filter.permissionsList.includes("Pavadinimas") ? (
                    <span className="bg-white text-gray-400 truncate">{name}</span>
                  ) : (
                    <span className="bg-white text-gray-400">-</span>
                  )}
                </div>
                <div className="flex col-span-3 items-center h-16">
                  {filter.permissionsList.includes("Būsena") ? (
                    <RedWatching />
                  ) : (
                    <span className="bg-white text-gray-400">-</span>
                  )}
                </div>
                <div className="flex col-span-1 flex-row items-center h-16">
                  {filter.permissionsList.includes("Ekipažai") ? (
                    <span className="bg-white text-gray-400 truncate">{crew}</span>
                  ) : (
                    <span className="bg-white text-gray-400">-</span>
                  )}
                </div>
                <div className="flex col-span-2 flex-row items-center h-16">
                  {filter.permissionsList.includes("Vairuotojai") ? (
                    <span className="bg-white text-gray-400 truncate">{drivers}</span>
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
