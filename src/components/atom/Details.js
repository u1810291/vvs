import React from "react";

import useBoolean from '../../hook/useBoolean';

import {ChevronDownIcon, ChevronUpIcon} from '@heroicons/react/outline';

const Details = ({title, children}) => {
  const [isShown, setShown] = useBoolean(false);
  return (
    <div className="flex flex-col text-slate-400">
      <div className="flex flex-row items-center justify-between border-t ml-6 py-2">
        <button onClick={setShown} className="text-sm">{title}</button>
        <button onClick={setShown} className="flex items-center h-2 w-4 mr-10">
          {isShown
            ? <ChevronDownIcon/>
            : <ChevronUpIcon/>
          }
        </button>
      </div>
      {isShown ? (
        <div className="flex flex-col max-h-64 overflow-y-auto scrollbar-gone">
          {children}
        </div>
      ) : <></>}
    </div>
  );
};

export default Details;
