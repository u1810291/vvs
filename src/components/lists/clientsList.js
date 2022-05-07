import React, { useContext } from "react";
import GlobalContext from "../../context/globalContext";
import { Link } from "react-router-dom";

export const ClientList = ({ id, name, contract, phone, email, ...props }) => {
  const { filterListClients, setFilterListClients } = useContext(GlobalContext);
  const { selectedFilterClients, setSelectedFilterClients } =
    useContext(GlobalContext);

  const path = { pathname: `/client/${id}` };

  return (
    <div className="w-full" {...props}>
      {filterListClients.map((filter, index) => {
        return (
          <div key={filter.id}>
            {selectedFilterClients === filter.id ? (
              <div className="w-full border-b grid grid-cols-12 bg-white grid-rows-1 grid-flow-row table-auto md:grid-cols-12 grid-gap-6 justify-between font-normal text-black z-1">
                <div className="flex flex-row items-center h-12 col-span-5">
                  {filter.dashboardList.includes("Vardas Pavardė") ? (
                    <Link
                      to={path}
                      className="bg-white text-gray-500 hover:text-gray-600 truncate text-sm"
                    >
                      {name}
                    </Link>
                  ) : (
                    <span className="bg-white text-gray-400">-</span>
                  )}
                </div>
                <div className="flex flex-row items-center h-12">
                  {filter.dashboardList.includes("Sutarties nr.") ? (
                    <Link
                      to={path}
                      className="bg-white text-gray-400 hover:text-gray-600 truncate text-sm"
                    >
                      {contract}
                    </Link>
                  ) : (
                    <span to={path} className="bg-white text-gray-400">
                      -
                    </span>
                  )}
                </div>
                <div className="flex flex-row items-center h-12">
                  {filter.dashboardList.includes("Telefonas") ? (
                    <Link
                      to={path}
                      className="bg-white text-gray-400 hover:text-gray-600 truncate text-sm"
                    >
                      {phone}
                    </Link>
                  ) : (
                    <span className="bg-white text-gray-400">-</span>
                  )}
                </div>
                <div className="flex flex-row items-center h-12 col-span-5">
                  {filter.dashboardList.includes("El. paštas") ? (
                    <Link
                      to={path}
                      className="bg-white text-gray-400 hover:text-gray-600 truncate text-sm"
                    >
                      {email}
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
