import React, { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Modems } from "../../api/modems";
import useSort from "../../hook/useSort";
import { sortToggle } from "../../util/utils";
import { Disconnected } from "../../components/buttons/disconnected";
import GlobalContext from "../../context/globalContext";

export const ModemsList = () => {
const { filterListModems, setFilterListModems } = useContext(GlobalContext);
  const { selectedFilterModems, setSelectedFilterModems } =
    useContext(GlobalContext);

  const {
    sortedModemsKeys,
    sortedModemsOrder,
    sortedModemsNumber,
    sortedModemsObjectName,
    sortedModemsObjectNo,
    sortedModemsContractNo,
    sortedModemsStatus,
  } = useSort();

  const sortedModems = sortToggle(
    Modems,
    sortedModemsKeys,
    sortedModemsOrder
  );

  return (
    <>
      {filterListModems.map((filter, index) => {
        return (
          <div key={filter.id}>
            {selectedFilterModems === filter.id ? (
              <div className="flex pl-4 w-full border-t py-2 bg-gray-100 justify-between font-normal text-black z-1">
                {filter.dashboardList.includes("Numeris") ? (
                  <div className="flex justify-start flex-row items-center w-40">
                    <button
                      onClick={sortedModemsNumber}
                      className="flex justify-start flex-row items-center"
                    >
                      <span className="text-gray-300 text-sm">
                      Numeris
                      </span>
                      <img
                        src={require("../../assets/assets/down.png")}
                        className="h-2 w-4 ml-2"
                      />
                    </button>
                  </div>
                ) : null}
                {filter.dashboardList.includes("Objekto Pavadinimas") ? (
                  <button
                    onClick={sortedModemsObjectName}
                    className="flex justify-start flex-row items-center w-40"
                  >
                    <span className="text-gray-300 text-sm">Objekto Pavadinimas</span>
                  </button>
                ) : null}
                {filter.dashboardList.includes("Objekto nr.") ? (
                  <button
                    onClick={sortedModemsObjectNo}
                    className="flex justify-start flex-row items-center w-20"
                  >
                    <span className="text-gray-300 text-sm">Objekto nr.</span>
                  </button>
                ) : null}
                {filter.dashboardList.includes("Sutarties nr.") ? (
                  <button
                    onClick={sortedModemsContractNo}
                    className="flex justify-start flex-row items-center w-20"
                  >
                    <span className="text-gray-300 text-sm">Sutarties nr.</span>
                  </button>
                ) : null}
                {filter.dashboardList.includes("Būsena") ? (
                  <button
                    onClick={sortedModemsStatus}
                    className="flex justify-start flex-row items-center w-40"
                  >
                    <span className="text-gray-300 text-sm">Būsena</span>
                  </button>
                ) : null}
              </div>
            ) : null}
          </div>
        );
      })}

      <div className="pl-4 flex-col w-full items-center">
        {sortedModems.map((data) => (
          <div className="w-full" key={data.id} >
            {filterListModems.map((filter, index) => {
              return (
                <div key={filter.id}>
                  {selectedFilterModems === filter.id ? (
                    <div className="flex w-full border-t py-2 bg-white justify-between font-normal text-black z-1">
                      {filter.dashboardList.includes("Numeris") ? (
                        <div className="flex flex-row items-center h-12 w-40">
                          <Link
                            // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
                            to={{ pathname: `/modem/${data.id}` }}
                            className="bg-white text-gray-500 truncate text-sm hover:text-gray-400"
                          >
                            {data.number}
                          </Link>
                        </div>
                      ) : null}
                      {filter.dashboardList.includes("Objekto Pavadinimas") ? (
                        <div className="flex flex-row items-center h-12 w-40">
                          <Link
                            // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
                            to={{ pathname: `/modem/${data.id}` }}
                            className="bg-white text-gray-400 truncate text-sm hover:text-gray-500"
                          >
                            {data.objectName}
                          </Link>
                        </div>
                      ) : null}
                      {filter.dashboardList.includes("Objekto nr.") ? (
                        <div className="flex flex-row items-center h-12 w-20">
                          <Link
                            // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
                            to={{ pathname: `/modem/${data.id}` }}
                            className="bg-white text-gray-500 truncate text-sm hover:text-gray-400"
                          >
                            {data.objectNo}
                          </Link>
                        </div>
                      ) : null}
                      {filter.dashboardList.includes("Sutarties nr.") ? (
                        <div className="flex flex-row items-center h-12 w-20">
                          <Link
                            // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
                            to={{ pathname: `/modem/${data.id}` }}
                            className="bg-white text-gray-400 truncate text-sm hover:text-gray-500"
                          >
                            {data.contractNo}
                          </Link>
                        </div>
                      ) : null}
                      {filter.dashboardList.includes("Būsena") ? (
                        <div className="flex flex-row items-center h-12 w-40">
                          <Link
                            // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
                            to={{ pathname: `/modem/${data.id}` }}
                            className="bg-white text-gray-400 truncate text-sm hover:text-gray-500"
                          >
                            {/* {data.status} */}
                            <Disconnected/>
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
  );
};
