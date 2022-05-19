import React from "react";
import { Link } from "react-router-dom";

export function Disconnected({ data, ...props}) {
  return (
          // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
    <Link to={{ pathname: `/driver/${data}` }} className="flex justify-center self-center w-20 truncate rounded text-xs text-white hover:shadow-none bg-red-800 focus:outline-none">
    Neprisijungęs
  </Link>
  );
}