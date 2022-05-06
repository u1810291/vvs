/* eslint-disable react-perf/jsx-no-new-function-as-prop */
import React, { useCallback, useContext, useState } from "react";
import GlobalContext from "../../context/globalContext";
import { OverlayProvider, usePreventScroll } from "react-aria";

const SideBar = () => {
  const { filterList, setFilterList } = useContext(GlobalContext);
  const { selectedFilter, setSelectedFilter } = useContext(GlobalContext);
  const [isOpen, setIsOpen] = useState(false);

  usePreventScroll({ isDisabled: !isOpen });

  return (
    <div className="flex flex-col bg-slate-600 pt-6 items-center w-20">
      <button
        onClick={() => setIsOpen(true)}
        className="flex flex-col items-center"
      >
        <img
          className="w-4 h-4 mx-16"
          src={require("../../assets/assets/hamburger.png")}
        />
      </button>
      <img className="pt-4" src={require("../../assets/assets/Line.png")}></img>
      <div className="flex flex-col items-center text-gray-400">
        {filterList.map((filter) => {
          if (filter.savedToMenu === true) {
            return (
              <button
                key={filter.id}
                // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
                onClick={() => setSelectedFilter(filter.id)}
                className={
                  selectedFilter === filter.id
                    ? "font-light text-md mt-6 text-white"
                    : "font-light text-md mt-6 hover:text-white"
                }
              >
                {filter.filterShortName}
              </button>
            );
          }
        })}
      </div>
    </div>
  );
};

export default SideBar;
