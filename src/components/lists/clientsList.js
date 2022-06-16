import React, { useContext, useState, useEffect, useRef } from "react";
import GlobalContext from "../../context/globalContext";
import AuthContext from "../../context/authContext";
import { Spinner } from "react-activity";
import { Link } from "react-router-dom";
import { sortToggle } from "../../util/utils";
import useSort from "../../hook/useSort";
import useReactQuery from "../../hook/useQuery";
import { getUsers } from "../../api/queryForms/queryString/users";
import { getAllUsers } from "../../api/queryForms/variables/users";

export const ClientList = () => {
  const { accessToken } = useContext(AuthContext);
  const [customers, setCustomers] = useState("");
  const { filterListClients, setFilterListClients } = useContext(GlobalContext);
  const { selectedFilterClients, setSelectedFilterClients } = useContext(GlobalContext);

  const data = useReactQuery(getUsers, getAllUsers, accessToken);

  useEffect(() => {
    if (data.status === "success") {
      const allUsers = data?.data?.users?.users;
      const searchRole = (name, arr) =>
        arr?.filter(({ registrations }) => {
          if (registrations) {
          const reg = registrations?.find((role) => role.roles[0] === 'customer')
          return reg
          }
        }
        );
      const searchResult = searchRole("customer", allUsers);
      let obj = { users: searchResult };
      setCustomers(obj);
    }
  }, [data.data]);

  const {
    sortedClientsKeys,
    sortedClientsOrder,
    sortedClientsNames,
    sortedClientsContracts,
    sortedClientsPhones,
    sortedClientsEmails,
  } = useSort();

  const sortedClients = sortToggle(
    customers?.users,
    sortedClientsKeys,
    sortedClientsOrder
  );

  return (
    <>
      {data === undefined ? (
        <div className="flex h-screen w-full bg-gray-100 justify-center items-center">
          <Spinner color="dark-blue" size={40} />
        </div>
      ) : (
        <>
          {filterListClients?.map((filter, index) => {
            return (
              <div key={filter.id}>
                {selectedFilterClients === filter.id ? (
                  <div className="flex pl-4 w-full border-t py-2 bg-gray-100 justify-between font-normal text-black z-1">
                    {filter.dashboardList.includes("Vardas Pavardė") ? (
                      <div className="flex flex-row items-center w-40">
                        <button
                          onClick={sortedClientsNames}
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
                    {filter.dashboardList.includes("Sutarties nr.") ? (
                      <button
                        onClick={sortedClientsContracts}
                        className="flex flex-row items-center w-40"
                      >
                        <span className="text-gray-300 text-sm hover:text-gray-400">
                          Sutarties nr.
                        </span>
                      </button>
                    ) : null}
                    {filter.dashboardList.includes("Telefonas") ? (
                      <button
                        onClick={sortedClientsPhones}
                        className="flex flex-row items-center w-40"
                      >
                        <span className="text-gray-300 text-sm hover:text-gray-400">
                          Telefonas
                        </span>
                      </button>
                    ) : null}
                    {filter.dashboardList.includes("El. paštas") ? (
                      <button
                        onClick={sortedClientsEmails}
                        className="flex flex-row items-center w-40"
                      >
                        <span className="text-gray-300 text-sm hover:text-gray-400">
                          El. paštas
                        </span>
                      </button>
                    ) : null}
                  </div>
                ) : null}
              </div>
            );
          })}

          <div className="pl-4 flex-col w-full items-center">
            {sortedClients?.map((data) => (
              <div className="w-full" key={data.id} >
                {filterListClients?.map((filter, index) => {
                  return (
                    <div key={filter.id}>
                      {selectedFilterClients === filter.id ? (
                        <div className="flex w-full border-t py-2 bg-white justify-between font-normal text-black z-1">
                          {filter.dashboardList.includes("Vardas Pavardė") ? (
                            <div className="flex flex-row items-center h-12 w-40">
                              <Link
                                to={{ pathname: `/client/${data.id}` }}
                                className="bg-white text-gray-500 hover:text-gray-600 truncate text-sm"
                              >
                                {data.fullName}
                              </Link>
                            </div>
                          ) : null}
                          {filter.dashboardList.includes("Sutarties nr.") ? (
                            <div className="flex flex-row items-center h-12 w-40">
                              <Link
                                to={{ pathname: `/client/${data.id}` }}
                                className="bg-white text-gray-400 hover:text-gray-600 truncate text-sm"
                              >
                                {data.contract}
                              </Link>
                            </div>
                          ) : null}
                          {filter.dashboardList.includes("Telefonas") ? (
                            <div className="flex flex-row items-center h-12 w-40">
                              <Link
                                to={{ pathname: `/client/${data.id}` }}
                                className="bg-white text-gray-400 hover:text-gray-600 truncate text-sm"
                              >
                                {data.mobilePhone}
                              </Link>
                            </div>
                          ) : null}
                          {filter.dashboardList.includes("El. paštas") ? (
                            <div className="flex flex-row items-center h-12 w-40">
                              <Link
                                to={{ pathname: `/client/${data.id}` }}
                                className="bg-white text-gray-400 hover:text-gray-600 truncate text-sm"
                              >
                                {data.email}
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
