import React, { useContext, useEffect, useState } from "react";
import useLanguage from "../../hook/useLanguage";
import GlobalContext from "../../context/globalContext";
import { Spinner } from "react-activity";
import { Link } from "react-router-dom";
const { RedWatching } = require("../buttons/redWatching");
import useReactQuery from "../../hook/useQuery";
import { sortToggle } from "../../util/utils";
import AuthContext from "../../context/authContext";
import useSort from "../../hook/useSort";
import { objectPage } from "../../api/queryForms/queryString/query";

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
  const { accessToken } = useContext(AuthContext);
  const { english, lithuanian, t } = useLanguage();
  const { filterListCrew, setFilterListCrew } = useContext(GlobalContext);
  const { filterEditingCrew, setFilterEditingCrew } = useContext(GlobalContext);
  const { selectedFilterCrew, setSelectedFilterCrew } =
    useContext(GlobalContext);
  const [crew, setCrew] = useState("");

  const data = useReactQuery(objectPage, {}, accessToken);
  useEffect(() => {
    let hasura;
    // let monas;
    if (data.data) {
      hasura = data?.data?.monas_crew_related;
      // monas = data?.data?.objects;
      // const mergeDB = monas?.map((monas) => ({
      //   ...monas,
      //   ...hasura.find((hasura) => String(hasura.Id) === String(monas.Id)),
      // }));
      setCrew({ result: hasura });
    }
  }, [data.data]);

  const {
    sortedDashboardKeys,
    sortedDashboardOrder,
    sortedDashboardName,
    sortedDashboardAbbreviation,
    sortedDashboardDislocationZone,
    sortedDashboardStatus,
    sortedDashboardIsAssignedAutomatically,
  } = useSort();

  const sortedCrew = sortToggle(
    crew?.result,
    sortedDashboardKeys,
    sortedDashboardOrder
  );
  
  return (
    <>
      {!sortedCrew ? (
        <div className="flex h-screen w-screen bg-gray-100 justify-center items-center">
          <Spinner color="dark-blue" size={40} />
        </div>
      ) : (
        <>
          {filterListCrew?.map((filter, index) => {
            return (
              <div key={filter.id}>
                {selectedFilterCrew === filter.id ? (
                  <div className="flex pl-4 w-full border-t py-2 bg-gray-100 justify-between font-normal text-black z-1">
                    {filter.crewList.includes("Pavadinimas") ? (
                      <div className="flex flex-row items-center w-40">
                        <button
                          onClick={sortedDashboardName}
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
                    {filter.crewList.includes("Trumpinys") ? (
                      <div className="flex flex-row items-center w-40">
                        <button
                          onClick={sortedDashboardAbbreviation}
                          className="flex flex-row items-center"
                        >
                          <span className="text-gray-300 text-sm hover:text-gray-400">
                            Trumpinys
                          </span>
                          <img
                            src={require("../../assets/assets/down.png")}
                            className="h-2 w-4 ml-2"
                          />
                        </button>
                      </div>
                    ) : null}
                    {filter.crewList.includes("Dislokacijos zona") ? (
                      <button
                        onClick={sortedDashboardDislocationZone}
                        className="flex flex-row items-center w-40"
                      >
                        <span className="text-gray-300 text-sm hover:text-gray-400">
                          Sutarties nr.
                        </span>
                      </button>
                    ) : null}
                    {filter.crewList.includes("Būsena") ? (
                      <button
                        onClick={sortedDashboardStatus}
                        className="flex flex-row items-center w-40"
                      >
                        <span className="text-gray-300 text-sm hover:text-gray-400">
                          {t("eurocash.status")}
                        </span>
                      </button>
                    ) : null}
                    {filter.crewList.includes("Automatiškai priskirti") ? (
                      <button
                        onClick={sortedDashboardIsAssignedAutomatically}
                        className="flex flex-row items-center w-40"
                      >
                        <span className="text-gray-300 text-sm hover:text-gray-400">
                          {t("eurocash.assignAutomatically")}
                        </span>
                      </button>
                    ) : null}
                  </div>
                ) : null}
              </div>
            );
          })}

          <div className="pl-4 flex-col w-full items-center">
            {sortedCrew?.map((data) => (
              <div className="w-full" key={data.id}>
                {filterListCrew?.map((filter, index) => {
                  return (
                    <div key={filter.id}>
                      {selectedFilterCrew === filter.id ? (
                        <div className="flex w-full border-t py-2 bg-white justify-between font-normal text-black z-1">
                          {filter.crewList.includes("Pavadinimas") ? (
                            <div className="flex flex-row items-center h-12 w-40">
                              <Link
                                // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
                                to={{ pathname: `/createCrew/${data.id}` }}
                                className="bg-white text-gray-500 hover:text-gray-600 truncate text-sm"
                              >
                                {data.name}
                              </Link>
                            </div>
                          ) : null}
                          {filter.crewList.includes("Trumpinys") ? (
                            <div className="flex flex-row items-center h-12 w-40">
                              <Link
                                // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
                                to={{ pathname: `/createCrew/${data.id}` }}
                                className="bg-white text-gray-500 hover:text-gray-600 truncate text-sm"
                              >
                                {data.abbreviation}
                              </Link>
                            </div>
                          ) : null}
                          {filter.crewList.includes("Dislokacijos zona") ? (
                            <div className="flex flex-row items-center h-12 w-40">
                              <Link
                                // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
                                to={{ pathname: `/createCrew/${data.id}` }}
                                className="bg-white text-gray-400 hover:text-gray-600 truncate text-sm"
                              >
                                {data.dislocationZone}
                              </Link>
                            </div>
                          ) : null}
                          {filter.crewList.includes("Būsena") ? (
                            <div className="flex flex-row items-center h-12 w-40">
                              <Link
                                // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
                                to={{ pathname: `/createCrew/${data.id}` }}
                                className="bg-white text-gray-400 hover:text-gray-600 truncate text-sm"
                              >
                                    {data.status === "online" ? (
                                <GreenStatus/> ) : (
                                <RedWatching />)}
                              </Link>
                            </div>
                          ) : null}
                          {filter.crewList.includes("Automatiškai priskirti") ? (
                            <div className="flex flex-row items-center h-12 w-40">
                              <Link
                                // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
                                to={{ pathname: `/createCrew/${data.id}` }}
                                className="bg-white text-gray-400 hover:text-gray-600 truncate text-sm"
                              >
                                {data.isAssignedAutomatically}
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

export default CrewList;
