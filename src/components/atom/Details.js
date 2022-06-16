import React from "react";

import useBoolean from "../../hook/useBoolean";
import {withMergedClassName} from "../../util/react";
import {ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/outline";

const Details = withMergedClassName(
  "flex flex-shrink-1",
  ({Tag =  "div", title, children}) => {
    const [isShown, setShown] = useBoolean(false);
    return (
      <Tag>
        <div className={`w-full overflow-y-auto scrollbar-gone text-slate-400 ${isShown ? "h-64" : "h-auto"}`}>
          <div className="flex w-full sticky top-0 flex-row items-center justify-between border-t py-2 px-6 bg-gray-100">
            <button onClick={setShown} className="text-sm">{title}</button>
            <button onClick={setShown} className="flex items-center h-2 w-4">
              {isShown
                ? <ChevronDownIcon/>
                : <ChevronUpIcon/>
              }
            </button>
          </div>
          {isShown ? (
            <div>
              {children}
            </div>
          ) : <></>}
        </div>
      </Tag>
    )
  }
);

export default Details;
