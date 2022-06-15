import AuthContext from "../../context/authContext";
import GlobalContext from "../../context/globalContext";
import React, { useContext, useRef, useEffect, useState } from "react";
import useSort from "../../hook/useSort";
import { Link } from "react-router-dom";
import { Spinner } from "react-activity";
import { generate } from "shortid";
import { getAllUsers } from "../../api/queryForms/variables/users";
import { getUsers } from "../../api/queryForms/queryString/users";
import { sortToggle } from "../../util/utils";
import { useFetch } from "../../hook/useFetch";

const { Connected } = require("../buttons/connected");
const { Deactivated } = require("../buttons/deactivated");
const { Disconnected } = require("../buttons/disconnected");
export const DriverList = () => {
  const { accessToken } = useContext(AuthContext);
  const { filterListDrivers, setFilterListDrivers } = useContext(GlobalContext);
  const { selectedFilterDrivers, setSelectedFilterDrivers } =
    useContext(GlobalContext);
  const [crew, setCrew] = useState("");

  const { data, error, loading, fetchData } = useFetch(
    getUsers,
    getAllUsers,
    accessToken
  );

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data) {
      const allUsers = data?.data?.users?.users;
      const searchRole = (name, arr) =>
        arr?.filter(({ registrations }) => {
        if (registrations) {
          const reg = registrations?.find((role) => role.roles[0] === "crew")
          return reg
      }});
      const searchResult = searchRole("crew", allUsers);
      let obj = { users: searchResult };
      setCrew(obj);
    }
  }, [data]);

  const {
    sortedDriversKeys,
    sortedDriversOrder,
    sortedDriversStatus,
    sortedDriversNames,
  } = useSort();

  const sortedDrivers = sortToggle(
    crew?.users,
    sortedDriversKeys,
    sortedDriversOrder
  );

  return (
    <>
      {!sortedDrivers ? (
        <div className="flex h-screen w-full bg-gray-100 justify-center items-center">
          <Spinner color="dark-blue" size={40} />
        </div>
      ) : (
        <>
          {filterListDrivers?.map((filter, index) => {
            return (
              <div key={filter.id}>
                {selectedFilterDrivers === filter.id ? (
                  <div className="flex pl-4 w-full border-t py-2 bg-gray-100 justify-between font-normal text-black z-1">
                    <div className="flex flex-row items-center justify-start w-40">
                      {filter.dashboardList.includes("Vardas Pavardė") ? (
                        <button
                          onClick={sortedDriversNames}
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
                      ) : null}
                    </div>
                    {filter.dashboardList.includes("Būsena") ? (
                      <button
                        onClick={sortedDriversStatus}
                        className="flex flex-row items-center justify-start w-40"
                      >
                        <span className="text-gray-300 text-sm hover:text-gray-400">
                          Būsena
                        </span>
                      </button>
                    ) : null}
                  </div>
                ) : null}
              </div>
            );
          })}
          {sortedDrivers?.map((data) => (
            <div key={generate()} className="pl-4 flex-col w-full items-center">
              <div className="w-full">
                {filterListDrivers?.map((filter, index) => {
                  return (
                    <div key={filter.id}>
                      {selectedFilterDrivers === filter.id ? (
                        <div className="flex w-full border-t py-2 bg-white justify-between font-normal text-black z-1">
                          <div className="flex flex-row items-center justify-start h-12 w-40">
                            {filter.dashboardList.includes("Vardas Pavardė") ? (
                              <Link
                                to={{ pathname: `/driver/${data.id}` }}
                                className="bg-white text-gray-500 hover:text-gray-300 truncate text-sm"
                              >
                                {data.firstName}
                              </Link>
                            ) : null}
                          </div>
                          <div className="flex whitespace-nowrap flex-row justify-start h-12 items-center w-40">
                            {filter.dashboardList.includes("Būsena") ? (
                              data.status === true ? (
                                <Connected data={data.id} />
                              ) : (
                                <Disconnected data={data.id} />
                              )
                            ) : 
                              // deactivated
                              null}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
};
