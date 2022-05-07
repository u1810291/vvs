import React, { useContext } from "react";
import { Link } from "react-router-dom";
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
  const { filterListObjects, setFilterListObjects } = useContext(GlobalContext);
  const { selectedFilterObjects, setSelectedFilterObjects } =
    useContext(GlobalContext);

    const path = { pathname: `/object/${id}` };

  return (
    <div className="w-full" {...props}>
    {filterListObjects.map((filter, index) => {
      return (
        <div key={filter.id}>
          {selectedFilterObjects === filter.id ? (
            <div className="w-full border-b grid grid-cols-12 bg-white grid-rows-1 grid-flow-row table-auto md:grid-cols-12 grid-gap-6 justify-between font-normal text-black z-1">
              <div className="flex flex-row items-center h-12 col-span-2">
                {filter.dashboardList.includes("Vardas Pavardė") ? (
                  <Link to={path} className="bg-white text-gray-500 truncate text-sm hover:text-gray-400">
                    {name}
                  </Link>
                ) : (
                  <span className="bg-white text-gray-400">-</span>
                )}
              </div>
              <div className="flex flex-row items-center h-12">
                {filter.dashboardList.includes("Miestas") ? (
                  <Link to={path} className="bg-white text-gray-400 truncate text-sm hover:text-gray-500">
                    {city}
                  </Link>
                ) : (
                  <span className="bg-white text-gray-400">-</span>
                )}
              </div>
              <div className="flex flex-row items-center h-12 col-span-3">
                {filter.dashboardList.includes("Adresas") ? (
                  <Link to={path} className="bg-white text-gray-500 truncate text-sm hover:text-gray-400">
                    {address}
                  </Link>
                ) : (
                  <span className="bg-white text-gray-400">-</span>
                )}
              </div>
              <div className="flex flex-row items-center h-12">
                {filter.dashboardList.includes("Objekto nr.") ? (
                  <Link to={path} className="bg-white text-gray-400 truncate text-sm hover:text-gray-500">
                    {object}
                  </Link>
                ) : (
                  <span className="bg-white text-gray-400">-</span>
                )}
              </div>
              <div className="flex flex-row items-center h-12">
                {filter.dashboardList.includes("Sutarties nr.") ? (
                  <Link to={path} className="bg-white text-gray-400 truncate text-sm hover:text-gray-500">
                    {contract}
                  </Link>
                ) : (
                  <span className="bg-white text-gray-400">-</span>
                )}
              </div>
              <div className="flex flex-row items-center h-12">
                {filter.dashboardList.includes("Siusti ekipaža") ? (
                  <Link to={path} className="bg-white text-gray-400 truncate text-sm hover:text-gray-500">
                    {sentCrew}
                  </Link>
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
