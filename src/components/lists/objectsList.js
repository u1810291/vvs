import React, { useContext } from "react";
import useLanguage from "../../hook/useLanguage";

export const ObjectsList = ({
  id,
  name,
  city,
  address,
  object,
  contract,
  sentCrew,
  ...props
}) => {
  const { english, lithuanian, t } = useLanguage();

  return (
    <div className="w-full" {...props}>
            <div className="w-full border-b grid grid-cols-12 bg-white grid-rows-1 grid-flow-row table-auto md:grid-cols-12 grid-gap-6 justify-between font-normal text-black z-1">
              <div className="flex flex-row items-center h-12 col-span-2">
                <span className="bg-white truncate text-sm">{name}</span>
              </div>
              <div className="flex flex-row items-center h-12">
                <span className="bg-white text-gray-400 truncate text-sm">{city}</span>
              </div>
              <div className="flex flex-row items-center h-12 col-span-3">
                <span className="bg-white truncate text-sm">{address}</span>
              </div>
              <div className="flex flex-row items-center h-12">
                <span className="bg-white text-gray-400 truncate text-sm">{object}</span>
              </div>
              <div className="flex flex-row items-center h-12">
                <span className="bg-white text-gray-400 truncate text-sm">{contract}</span>
              </div>
              <div className="flex flex-row items-center h-12">
                <span className="bg-white text-gray-400 truncate text-sm">{sentCrew}</span>
              </div>
          </div>
    </div>
  );
};
