import React, { useContext, useState, useEffect, useRef } from "react";
import GlobalContext from "../../context/globalContext";
import AuthContext from "../../context/authContext";
import { Spinner } from "react-activity";
import { Link } from "react-router-dom";
import { sortToggle } from "../../util/utils";
import useSort from "../../hook/useSort";
import { useFetch } from "../../hook/useFetch";
import { getUsers } from "../../api/queryForms/queryString/users";
import { getAllUsers } from "../../api/queryForms/variables/users";

export const ClientList = ({ id, name, contract, phone, email, ...props }) => {
  const clientNamesRef = useRef();
  const clientContractsRef = useRef();
  const clientPhonesRef = useRef();
  const clientEmailsRef = useRef();
  const { accessToken } = useContext(AuthContext);
  const [customers, setCustomers] = useState("");
  const { filterListClients, setFilterListClients } = useContext(GlobalContext);
  const { selectedFilterClients, setSelectedFilterClients } =
    useContext(GlobalContext);
  const { clientNamesDefault, setClientNamesDefault } =
    useContext(GlobalContext);
  const { clientContractsDefault, setClientContractsDefault } =
    useContext(GlobalContext);
  const { clientPhonesDefault, setClientPhonesDefault } =
    useContext(GlobalContext);
  const { clientEmailsDefault, setClientEmailsDefault } =
    useContext(GlobalContext);

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
      const allUsers = data.data.users.users;
      const searchRole = (name, arr) =>
        arr.filter(({ registrations }) =>
          registrations.find((role) => role.roles[0] === "customer")
        );
      const searchResult = searchRole("customer", allUsers);
      let obj = { users: searchResult };
      setCustomers(obj);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      backFunc();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

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

  useEffect(() => {
    if (clientNamesRef.current === null) {
      setClientNamesDefault("false");
    }
    if (clientContractsRef.current === null) {
      setClientContractsDefault("false");
    }
    if (clientPhonesRef.current === null) {
      setClientPhonesDefault("false");
    }
    if (clientEmailsRef.current === null) {
      setClientEmailsDefault("false");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    clientNamesRef.current,
    clientContractsRef.current,
    clientPhonesRef.current,
    clientEmailsRef.current,
  ]);

  return (
    <>
      {!sortedClients ? (
        <div className="flex h-screen w-screen bg-gray-100 justify-center items-center">
          <Spinner color="dark-blue" size={40} />
        </div>
      ) : (
        <>
          <div className="flex pl-4 w-full border-t py-2 bg-gray-100 justify-between font-normal text-black z-1">
            {clientNamesDefault === "true" ||
            clientNamesDefault === "default" ? (
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
            {clientContractsDefault === "true" ||
            clientContractsDefault === "default" ? (
              <button
                onClick={sortedClientsContracts}
                className="flex flex-row items-center w-40"
              >
                <span className="text-gray-300 text-sm hover:text-gray-400">
                  Sutarties nr.
                </span>
              </button>
            ) : null}
            {clientPhonesDefault === "true" ||
            clientPhonesDefault === "default" ? (
              <button
                onClick={sortedClientsPhones}
                className="flex flex-row items-center w-40"
              >
                <span className="text-gray-300 text-sm hover:text-gray-400">
                  Telefonas
                </span>
              </button>
            ) : null}
            {clientEmailsDefault === "true" ||
            clientEmailsDefault === "default" ? (
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
          <div className="pl-4 flex-col w-full items-center">
            {sortedClients.map((data) => (
              <div className="w-full" key={data.id} {...props}>
                {filterListClients.map((filter, index) => {
                  return (
                    <div key={filter.id}>
                      {selectedFilterClients === filter.id ? (
                        <div className="flex w-full border-t py-2 bg-white justify-between font-normal text-black z-1">
                          {filter.dashboardList.includes("Vardas Pavardė") ? (
                            <div className="flex flex-row items-center h-12 w-40">
                              <Link
                                // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
                                to={{ pathname: `/client/${data.id}` }}
                                className="bg-white text-gray-500 hover:text-gray-600 truncate text-sm"
                              >
                                {data.fullName}
                              </Link>
                            </div>
                          ) : (
                            (clientNamesRef.current = null)
                          )}
                          {filter.dashboardList.includes("Sutarties nr.") ? (
                            <div className="flex flex-row items-center h-12 w-40">
                              <Link
                                // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
                                to={{ pathname: `/client/${data.id}` }}
                                className="bg-white text-gray-400 hover:text-gray-600 truncate text-sm"
                              >
                                {data.contract}
                              </Link>
                            </div>
                          ) : (
                            (clientContractsRef.current = null)
                          )}
                          {filter.dashboardList.includes("Telefonas") ? (
                            <div className="flex flex-row items-center h-12 w-40">
                              <Link
                                // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
                                to={{ pathname: `/client/${data.id}` }}
                                className="bg-white text-gray-400 hover:text-gray-600 truncate text-sm"
                              >
                                {data.mobilePhone}
                              </Link>
                            </div>
                          ) : (
                            (clientPhonesRef.current = null)
                          )}
                          {filter.dashboardList.includes("El. paštas") ? (
                            <div className="flex flex-row items-center h-12 w-40">
                              <Link
                                // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
                                to={{ pathname: `/client/${data.id}` }}
                                className="bg-white text-gray-400 hover:text-gray-600 truncate text-sm"
                              >
                                {data.email}
                              </Link>
                            </div>
                          ) : (
                            (clientEmailsRef.current = null)
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
      )}
    </>
  );
};
