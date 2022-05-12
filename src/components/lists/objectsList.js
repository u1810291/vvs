import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Orders } from "../../api/orders";
import useSort from "../../hook/useSort";
import { sortToggle } from "../../util/utils";
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
  const { objectNamesDefault, setObjectNamesDefault } =
    useContext(GlobalContext);
  const { objectCityDefault, setObjectCityDefault } = useContext(GlobalContext);
  const { objectAddressDefault, setObjectAddressDefault } =
    useContext(GlobalContext);
  const { objectObjectsDefault, setObjectObjectsDefault } =
    useContext(GlobalContext);
  const { objectContractDefault, setObjectContractDefault } =
    useContext(GlobalContext);
  const { objectSentCrewDefault, setObjectSentCrewDefault } =
    useContext(GlobalContext);
  const [gridState, setGridState] = useState(12);

  const path = { pathname: `/object/${id}` };

  const {
    sortedObjectsKeys,
    sortedObjectsOrder,
    sortedObjectsNames,
    sortedObjectsCity,
    sortedObjectsAddress,
    sortedObjectsObject,
    sortedObjectsSentCrew,
    sortedObjectsContract,
  } = useSort();

  const sortedObjects = sortToggle(
    Orders,
    sortedObjectsKeys,
    sortedObjectsOrder
  );

  return (
    <>
      <div
        className={`hidden pl-4 w-full border-t py-2 md:grid grid-cols-${gridState} bg-gray-100 grid-rows-1 grid-flow-row table-auto md:grid-cols-12 grid-gap-6 justify-between font-normal text-black z-1`}
      >
        {objectNamesDefault === "true" || objectNamesDefault === "default" ? (
          <div className="flex flex-row items-center col-span-2">
            <button
              onClick={sortedObjectsNames}
              className="flex flex-row items-center"
            >
              <span className="text-gray-300 text-sm">Vardas Pavardė</span>
              <img
                src={require("../../assets/assets/down.png")}
                className="h-2 w-4 ml-2"
              />
            </button>
          </div>
        ) : null}
        {objectCityDefault === "true" || objectCityDefault === "default" ? (
          <button
            onClick={sortedObjectsCity}
            className="flex flex-row items-center"
          >
            <span className="text-gray-300 text-sm">Miestas</span>
          </button>
        ) : null}
        {objectAddressDefault === "true" ||
        objectAddressDefault === "default" ? (
          <button
            onClick={sortedObjectsAddress}
            className="flex flex-row items-center col-span-3"
          >
            <span className="text-gray-300 text-sm">Adresas</span>
          </button>
        ) : null}
        {objectObjectsDefault === "true" ||
        objectObjectsDefault === "default" ? (
          <button
            onClick={sortedObjectsObject}
            className="flex flex-row items-center"
          >
            <span className="text-gray-300 text-sm">Objekto nr.</span>
          </button>
        ) : null}
        {objectContractDefault === "true" ||
        objectContractDefault === "default" ? (
          <button
            onClick={sortedObjectsContract}
            className="flex flex-row items-center"
          >
            <span className="text-gray-300 text-sm">Sutarties nr.</span>
          </button>
        ) : null}
        {objectSentCrewDefault === "true" ||
        objectSentCrewDefault === "default" ? (
          <button
            onClick={sortedObjectsSentCrew}
            className="flex flex-row items-center"
          >
            <span className="text-gray-300 text-sm">Siusti ekipažą</span>
          </button>
        ) : null}
      </div>
      <div className="pl-4 flex-col w-full items-center">
        {sortedObjects.map((data) => (
          <div className="w-full" key={data.id} {...props}>
            {filterListObjects.map((filter, index) => {
              return (
                <div key={filter.id}>
                  {selectedFilterObjects === filter.id ? (
                    <div
                      className={`w-full border-b grid grid-cols-${gridState} bg-white grid-rows-1 grid-flow-row table-auto md:grid-cols-12 grid-gap-6 justify-between font-normal text-black z-1`}
                    >
                      {filter.dashboardList.includes("Vardas Pavardė") ? (
                        <div className="flex flex-row items-center h-12 col-span-2">
                          <Link
                            to={path}
                            className="bg-white text-gray-500 truncate text-sm hover:text-gray-400"
                          >
                            {data.name}
                          </Link>
                        </div>
                      ) : setObjectNamesDefault("false")}
                      {filter.dashboardList.includes("Miestas") ? (
                        <div className="flex flex-row items-center h-12">
                          <Link
                            to={path}
                            className="bg-white text-gray-400 truncate text-sm hover:text-gray-500"
                          >
                            {data.city}
                          </Link>
                        </div>
                      ) : setObjectCityDefault("false")}
                      {filter.dashboardList.includes("Adresas") ? (
                        <div className="flex flex-row items-center h-12 col-span-3">
                          <Link
                            to={path}
                            className="bg-white text-gray-500 truncate text-sm hover:text-gray-400"
                          >
                            {data.address}
                          </Link>
                        </div>
                      ) : setObjectAddressDefault("false")}
                      {filter.dashboardList.includes("Objekto nr.") ? (
                        <div className="flex flex-row items-center h-12">
                          <Link
                            to={path}
                            className="bg-white text-gray-400 truncate text-sm hover:text-gray-500"
                          >
                            {data.object}
                          </Link>
                        </div>
                      ) : setObjectObjectsDefault("false")}
                      {filter.dashboardList.includes("Sutarties nr.") ? (
                        <div className="flex flex-row items-center h-12">
                          <Link
                            to={path}
                            className="bg-white text-gray-400 truncate text-sm hover:text-gray-500"
                          >
                            {data.contract}
                          </Link>
                        </div>
                      ) : setObjectContractDefault("false")}
                      {filter.dashboardList.includes("Siusti ekipaža") ? (
                        <div className="flex flex-row items-center h-12">
                          <Link
                            to={path}
                            className="bg-white text-gray-400 truncate text-sm hover:text-gray-500"
                          >
                            {data.sentCrew}
                          </Link>
                        </div>
                      ) : setObjectSentCrewDefault("false")}
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
