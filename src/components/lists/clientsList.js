import React, { useContext } from "react";
import useLanguage from "../../hook/useLanguage";
import GlobalContext from "../../context/globalContext";

export const ClientList = ({
  id,
  name,
  contract,
  phone,
  email,
  ...props
}) => {
  const { english, lithuanian, t } = useLanguage();
  const { filterList, setFilterList } = useContext(GlobalContext);

  return (
    <div className="w-full" {...props}>
      {filterList.map((filter, index) => {
        return (
          <div key={filter.id}>
            <div className="w-full border-b grid grid-cols-12 bg-white grid-rows-1 grid-flow-row table-auto md:grid-cols-12 grid-gap-6 justify-between font-normal text-black z-1">
              <div className="flex flex-row items-center h-12 col-span-5">
                <span className="bg-white text-gray-400 truncate text-sm">{name}</span>
              </div>
              <div className="flex flex-row items-center h-12">
                <span className="bg-white text-gray-400 truncate text-sm">{contract}</span>
              </div>
              <div className="flex flex-row items-center h-12">
                <span className="bg-white text-gray-400 truncate text-sm">{phone}</span>
              </div>
              <div className="flex flex-row items-center h-12 col-span-5">
                <span className="bg-white text-gray-400 truncate col-span-5 text-sm">{email}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
