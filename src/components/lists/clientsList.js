import React, { useContext } from "react";
import useLanguage from "../../hook/useLanguage";
import GlobalContext from "../../context/globalContext";

export const ClientList = ({ id, name, contract, phone, email, ...props }) => {
  const { english, lithuanian, t } = useLanguage();
  const { filterListClients, setFilterListClients } = useContext(GlobalContext);
  const { selectedFilterClients, setSelectedFilterClients } =
    useContext(GlobalContext);

  return (
    <div className="w-full" {...props}>
      {filterListClients.map((filter, index) => {
        return (
          <div key={filter.id}>
            {selectedFilterClients === filter.id ? (
              <div className="w-full border-b grid grid-cols-12 bg-white grid-rows-1 grid-flow-row table-auto md:grid-cols-12 grid-gap-6 justify-between font-normal text-black z-1">
                <div className="flex flex-row items-center h-12 col-span-5">
                  {filter.dashboardList.includes("Vardas Pavardė") ? (
                    <span className="bg-white text-gray-400 truncate text-sm">
                      {name}
                    </span>
                  ) : (
                    <span className="bg-white text-gray-400">-</span>
                  )}
                </div>
                <div className="flex flex-row items-center h-12">
                  {filter.dashboardList.includes("Sutarties nr.") ? (
                    <span className="bg-white text-gray-400 truncate text-sm">
                      {contract}
                    </span>
                  ) : (
                    <span className="bg-white text-gray-400">-</span>
                  )}
                </div>
                <div className="flex flex-row items-center h-12">
                  {filter.dashboardList.includes("Telefonas") ? (
                    <span className="bg-white text-gray-400 truncate text-sm">
                      {phone}
                    </span>
                  ) : (
                    <span className="bg-white text-gray-400">-</span>
                  )}
                </div>
                <div className="flex flex-row items-center h-12 col-span-5">
                  {filter.dashboardList.includes("El. paštas") ? (
                    <span className="bg-white text-gray-400 truncate col-span-5 text-sm">
                      {email}
                    </span>
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
