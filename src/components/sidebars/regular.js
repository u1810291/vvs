import React, { useCallback, useContext } from "react";
import GlobalContext from "../../context/globalContext";

const DashboardSidebar = () => {
  const { filterList, setFilterList } = useContext(GlobalContext);
  const menuFunc = useCallback(async () => {
    console.log("menuOpen");
  }, []);

  const selectFilter = useCallback(async () => {
    console.log("selectFilter");
  }, []);

  return (
    <div className="flex flex-col bg-slate-600 w-10 pt-6 items-center sm:w-20">
      <button onClick={menuFunc} className="w-4 h-4">
        <img src={require("../../assets/assets/hamburger.png")} />
      </button>
      <img className="pt-6" src={require("../../assets/assets/Line.png")}></img>
      <div className="flex flex-col items-center text-gray-400">
        {filterList.map((filter) => {
          return (
            <button key={filter.id} onClick={selectFilter} className="font-light text-md mt-6 hover:text-white">
              {filter.filterShortName}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardSidebar;
