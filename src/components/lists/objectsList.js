import React, { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Orders } from "../../api/orders";
import useSort from "../../hook/useSort";
import { sortToggle } from "../../util/utils";
import GlobalContext from "../../context/globalContext";

export const ObjectsList = () => {
  const objectsNamesRef = useRef();
  const objectsCityRef = useRef();
  const objectsAddressRef = useRef();
  const objectsObjectRef = useRef();
  const objectsContractRef = useRef();
  const objectsSentCrewRef = useRef();

  const { filterListObjects, setFilterListObjects } = useContext(GlobalContext);
  const { selectedFilterObjects, setSelectedFilterObjects } =
    useContext(GlobalContext);

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
      {filterListObjects.map((filter, index) => {
        return (
          <div key={filter.id}>
            {selectedFilterObjects === filter.id ? (
              <div className="flex pl-4 w-full border-t py-2 bg-gray-100 justify-between font-normal text-black z-1">
                {filter.dashboardList.includes("Vardas Pavardė") ? (
                  <div className="flex flex-row items-center w-40">
                    <button
                      onClick={sortedObjectsNames}
                      className="flex flex-row items-center"
                    >
                      <span className="text-gray-300 text-sm">
                        Vardas Pavardė
                      </span>
                      <img
                        src={require("../../assets/assets/down.png")}
                        className="h-2 w-4 ml-2"
                      />
                    </button>
                  </div>
                ) : null}
                {filter.dashboardList.includes("Miestas") ? (
                  <button
                    onClick={sortedObjectsCity}
                    className="flex flex-row items-center w-40"
                  >
                    <span className="text-gray-300 text-sm">Miestas</span>
                  </button>
                ) : null}
                {filter.dashboardList.includes("Adresas") ? (
                  <button
                    onClick={sortedObjectsAddress}
                    className="flex flex-row items-center w-40"
                  >
                    <span className="text-gray-300 text-sm">Adresas</span>
                  </button>
                ) : null}
                {filter.dashboardList.includes("Objekto nr.") ? (
                  <button
                    onClick={sortedObjectsObject}
                    className="flex flex-row items-center w-40"
                  >
                    <span className="text-gray-300 text-sm">Objekto nr.</span>
                  </button>
                ) : null}
                {filter.dashboardList.includes("Sutarties nr.") ? (
                  <button
                    onClick={sortedObjectsContract}
                    className="flex flex-row items-center w-40"
                  >
                    <span className="text-gray-300 text-sm">Sutarties nr.</span>
                  </button>
                ) : null}
                {filter.dashboardList.includes("Siusti ekipaža") ? (
                  <button
                    onClick={sortedObjectsSentCrew}
                    className="flex flex-row items-center w-40"
                  >
                    <span className="text-gray-300 text-sm">
                      Siusti ekipažą
                    </span>
                  </button>
                ) : null}
              </div>
            ) : null}
          </div>
        );
      })}

      <div className="pl-4 flex-col w-full items-center">
        {sortedObjects.map((data) => (
          <div className="w-full" key={data.id} >
            {filterListObjects.map((filter, index) => {
              return (
                <div key={filter.id}>
                  {selectedFilterObjects === filter.id ? (
                    <div className="flex w-full border-t py-2 bg-white justify-between font-normal text-black z-1">
                      {filter.dashboardList.includes("Vardas Pavardė") ? (
                        <div className="flex flex-row items-center h-12 w-40">
                          <Link
                            // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
                            to={{ pathname: `/object/${data.id}` }}
                            className="bg-white text-gray-500 truncate text-sm hover:text-gray-400"
                          >
                            {data.name}
                          </Link>
                        </div>
                      ) : (
                        objectsNamesRef.current = null
                      )}
                      {filter.dashboardList.includes("Miestas") ? (
                        <div className="flex flex-row items-center h-12 w-40">
                          <Link
                            // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
                            to={{ pathname: `/object/${data.id}` }}
                            className="bg-white text-gray-400 truncate text-sm hover:text-gray-500"
                          >
                            {data.city}
                          </Link>
                        </div>
                      ) : (
                        objectsCityRef.current = null
                      )}
                      {filter.dashboardList.includes("Adresas") ? (
                        <div className="flex flex-row items-center h-12 w-40">
                          <Link
                            // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
                            to={{ pathname: `/object/${data.id}` }}
                            className="bg-white text-gray-500 truncate text-sm hover:text-gray-400"
                          >
                            {data.address}
                          </Link>
                        </div>
                      ) : (
                        objectsAddressRef.current = null
                      )}
                      {filter.dashboardList.includes("Objekto nr.") ? (
                        <div className="flex flex-row items-center h-12 w-40">
                          <Link
                            // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
                            to={{ pathname: `/object/${data.id}` }}
                            className="bg-white text-gray-400 truncate text-sm hover:text-gray-500"
                          >
                            {data.object}
                          </Link>
                        </div>
                      ) : (
                        objectsObjectRef.current = null
                      )}
                      {filter.dashboardList.includes("Sutarties nr.") ? (
                        <div className="flex flex-row items-center h-12 w-40">
                          <Link
                            // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
                            to={{ pathname: `/object/${data.id}` }}
                            className="bg-white text-gray-400 truncate text-sm hover:text-gray-500"
                          >
                            {data.contract}
                          </Link>
                        </div>
                      ) : (
                        objectsContractRef.current = null
                      )}
                      {filter.dashboardList.includes("Siusti ekipaža") ? (
                        <div className="flex flex-row items-center h-12 w-40">
                          <Link
                            // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
                            to={{ pathname: `/object/${data.id}` }}
                            className="bg-white text-gray-400 truncate text-sm hover:text-gray-500"
                          >
                            {data.sentCrew}
                          </Link>
                        </div>
                      ) : (
                        objectsSentCrewRef.current = null
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
