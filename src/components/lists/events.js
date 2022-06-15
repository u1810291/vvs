import React, { useContext } from "react";
import useLanguage from "../../hook/useLanguage";

export const Events = ({ id, date, test, signal, ...props }) => {
  const { english, lithuanian, t } = useLanguage();

  return (
    <div className="w-full" {...props}>
      <div className="w-full border-t grid grid-cols-3 bg-white grid-rows-1 grid-flow-row table-auto md:grid-cols-3 grid-gap-6 justify-between font-normal text-black z-1">
        <div className="flex flex-row items-center h-10">
          <span className="bg-white text-gray-400 truncate text-sm">
            {date}
          </span>
        </div>
        <div className="flex flex-row items-center h-10">
          <span className="bg-white text-black truncate text-sm">{test}</span>
        </div>
        <div className="flex flex-row items-center h-10">
          <span className="bg-white text-black truncate text-sm">{signal}</span>
        </div>
      </div>
    </div>
  );
};
