import React, { useContext, useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { Orders } from "../../api/orders";
import { Spinner } from "react-activity";
import useSort from "../../hook/useSort";
import { objectPage } from "../../api/queryForms/queryString/query";
import useReactQuery from "../../hook/useQuery";
import { sortToggle } from "../../util/utils";
import GlobalContext from "../../context/globalContext";

export const ObjectsList = ({ searchResponse, token, ...props}) => {
const { filterListObjects, setFilterListObjects } = useContext(GlobalContext);
  const { selectedFilterObjects, setSelectedFilterObjects } =
    useContext(GlobalContext);
    const [orders, setOrders] = useState("");
    const { objectPageFetchData, setObjectPageFetchData } = useContext(GlobalContext);
    const [searchData, setSearchData] = useState(null);

    const data = useReactQuery(objectPage, {}, token);

    useEffect(() => {
      let hasura;
      let monas;
      if (data.status === "success"){
        setObjectPageFetchData(true);
        if(data.data.filters) {
      let filters = data?.data?.filters;
      const result = filters?.map(a => {
        return a;
      })
      if (filters) {
      setFilterListObjects(result);
      }
     }
      hasura = data?.data?.monas_related;
      monas = data?.data?.objects;
      const mergeDB = monas?.map((monas) => ({
        ...monas, ...hasura?.find(hasura => String(hasura.Id) === String(monas.Id))
      }))
      setOrders({result:mergeDB});
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.data]);

    useEffect(() => {
      if (searchResponse) {
      let hasura = data?.data?.monas_related;
      let monas = searchResponse?.data?.objects;
      const mergeDB = monas?.map((monas) => ({
        ...monas, ...hasura?.find(hasura => String(hasura.Id) === String(monas.Id))
      }))
      setOrders({result:mergeDB});
      }
    }, [searchResponse]);

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
    orders?.result,
    sortedObjectsKeys,
    sortedObjectsOrder
  );

  return (
    <>
          {data.status !== "success" ? (
        <div className="flex h-screen w-screen bg-gray-100 justify-center items-center">
          <Spinner color="dark-blue" size={40} />
        </div>
      ) : (
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
                      <span className="text-gray-300 text-sm hover:text-gray-400">
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
                    <span className="text-gray-300 hover:text-gray-400 text-sm">Miestas</span>
                  </button>
                ) : null}
                {filter.dashboardList.includes("Adresas") ? (
                  <button
                    onClick={sortedObjectsAddress}
                    className="flex flex-row items-center w-40"
                  >
                    <span className="text-gray-300 hover:text-gray-400 text-sm">Adresas</span>
                  </button>
                ) : null}
                {filter.dashboardList.includes("Objekto nr.") ? (
                  <button
                    onClick={sortedObjectsObject}
                    className="flex flex-row items-center w-40"
                  >
                    <span className="text-gray-300 hover:text-gray-400 text-sm">Objekto nr.</span>
                  </button>
                ) : null}
                {filter.dashboardList.includes("Sutarties nr.") ? (
                  <button
                    onClick={sortedObjectsContract}
                    className="flex flex-row items-center w-40"
                  >
                    <span className="text-gray-300 hover:text-gray-400 text-sm">Sutarties nr.</span>
                  </button>
                ) : null}
                {filter.dashboardList.includes("Siusti ekipaža") ? (
                  <button
                    onClick={sortedObjectsSentCrew}
                    className="flex flex-row items-center w-40"
                  >
                    <span className="text-gray-300 hover:text-gray-400 text-sm">
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
        {sortedObjects?.map((data) => (
          <div className="w-full" key={data.Id} >
            {filterListObjects?.map((filter, index) => {
              return (
                <div key={filter.id}>
                  {selectedFilterObjects === filter.id ? (
                    <div className="flex w-full border-t py-2 bg-white justify-between font-normal text-black z-1">
                      {filter.dashboardList.includes("Vardas Pavardė") ? (
                        <div className="flex flex-row items-center h-12 w-40">
                          <Link
                            // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
                            to={{ pathname: `/object/${data.Id}` }}
                            className="bg-white text-gray-500 truncate text-sm hover:text-gray-400"
                          >
                            {data.name}
                          </Link>
                        </div>
                      ) : null}
                      {filter.dashboardList.includes("Miestas") ? (
                        <div className="flex flex-row items-center h-12 w-40">
                          <Link
                            // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
                            to={{ pathname: `/object/${data.Id}` }}
                            className="bg-white text-gray-400 truncate text-sm hover:text-gray-500"
                          >
                            {data.city}
                          </Link>
                        </div>
                      ) : null}
                      {filter.dashboardList.includes("Adresas") ? (
                        <div className="flex flex-row items-center h-12 w-40">
                          <Link
                            // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
                            to={{ pathname: `/object/${data.Id}` }}
                            className="bg-white text-gray-500 truncate text-sm hover:text-gray-400"
                          >
                            {data.address}
                          </Link>
                        </div>
                      ) : null}
                      {filter.dashboardList.includes("Objekto nr.") ? (
                        <div className="flex flex-row items-center h-12 w-40">
                          <Link
                            // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
                            to={{ pathname: `/object/${data.Id}` }}
                            className="bg-white text-gray-400 truncate text-sm hover:text-gray-500"
                          >
                            {data.objectid}
                          </Link>
                        </div>
                      ) : null}
                      {filter.dashboardList.includes("Sutarties nr.") ? (
                        <div className="flex flex-row items-center h-12 w-40">
                          <Link
                            // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
                            to={{ pathname: `/object/${data.Id}` }}
                            className="bg-white text-gray-400 truncate text-sm hover:text-gray-500"
                          >
                            {data.contract}
                          </Link>
                        </div>
                      ) : null}
                      {filter.dashboardList.includes("Siusti ekipaža") ? (
                        <div className="flex flex-row items-center h-12 w-40">
                          <Link
                            // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
                            to={{ pathname: `/object/${data.Id}` }}
                            className="bg-white text-gray-400 truncate text-sm hover:text-gray-500"
                          >
                            {data.sentCrew}
                          </Link>
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </>
          )}
          </>
  );
};
