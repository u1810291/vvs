import React, { useContext } from "react";
import useLanguage from "../../hook/useLanguage";
import GlobalContext from "../../context/globalContext";

export const ObjectsList = ({
  id,
  name,
  city,
  address,
  object,
  contract,
  sentCrew,
  ...props
}) => {
  const { english, lithuanian, t } = useLanguage();
  const { filterListObjects, setFilterListObjects } = useContext(GlobalContext);
  const { selectedFilterObjects, setSelectedFilterObjects } =
    useContext(GlobalContext);

  return (
    <div className="w-full" {...props}>
    {filterListObjects.map((filter, index) => {
      return (
        <div key={filter.id}>
          {selectedFilterObjects === filter.id ? (
            <div className="w-full border-b grid grid-cols-12 bg-white grid-rows-1 grid-flow-row table-auto md:grid-cols-12 grid-gap-6 justify-between font-normal text-black z-1">
              <div className="flex flex-row items-center h-12 col-span-2">
                {filter.dashboardList.includes("Vardas Pavardė") ? (
                  <span className="bg-white text-gray-500 truncate text-sm">
                    {name}
                  </span>
                ) : (
                  <span className="bg-white text-gray-400">-</span>
                )}
              </div>
              <div className="flex flex-row items-center h-12">
                {filter.dashboardList.includes("Miestas") ? (
                  <span className="bg-white text-gray-400 truncate text-sm">
                    {city}
                  </span>
                ) : (
                  <span className="bg-white text-gray-400">-</span>
                )}
              </div>
              <div className="flex flex-row items-center h-12 col-span-3">
                {filter.dashboardList.includes("Adresas") ? (
                  <span className="bg-white text-gray-500 truncate text-sm">
                    {address}
                  </span>
                ) : (
                  <span className="bg-white text-gray-400">-</span>
                )}
              </div>
              <div className="flex flex-row items-center h-12">
                {filter.dashboardList.includes("Objekto nr.") ? (
                  <span className="bg-white text-gray-400 truncate text-sm">
                    {object}
                  </span>
                ) : (
                  <span className="bg-white text-gray-400">-</span>
                )}
              </div>
              <div className="flex flex-row items-center h-12">
                {filter.dashboardList.includes("Sutarties nr.") ? (
                  <span className="bg-white text-gray-400 truncate text-sm">
                    {contract}
                  </span>
                ) : (
                  <span className="bg-white text-gray-400">-</span>
                )}
              </div>
              <div className="flex flex-row items-center h-12">
                {filter.dashboardList.includes("Siusti ekipaža") ? (
                  <span className="bg-white text-gray-400 truncate text-sm">
                    {sentCrew}
                  </span>
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
