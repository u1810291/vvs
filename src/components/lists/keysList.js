import React, { useContext } from "react";
import { Link } from "react-router-dom";

export const KeysList = ({
  id,
  set,
  crew,
  ...props
}) => {

  // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
  const path = { pathname: `/key/${id}` };

  return (
    <div className="w-full" {...props}>
            <div className="w-full border-b grid grid-cols-8 bg-white grid-rows-1 grid-flow-row table-auto md:grid-cols-8 grid-gap-6 justify-between font-normal text-black z-1">
              <div className="flex flex-row items-center h-12 col-span-2">
                  <Link to={path} className="bg-white text-gray-500 truncate text-sm hover:text-gray-400">
                    {set}
                  </Link>
              </div>
              <div className="flex flex-row items-center h-12 col-span-2">
                  <Link to={path} className="bg-white text-gray-400 truncate text-sm hover:text-gray-500">
                    {crew}
                  </Link>
              </div>
              <div className="flex flex-row items-center h-12 col-span-2">
              </div>
              <div className="flex flex-row items-center h-12 ol-span-2">
              </div>
            </div>
        </div>
  );
};
