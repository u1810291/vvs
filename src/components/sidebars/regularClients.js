import React, { useCallback, useContext } from "react";
import GlobalContext from "../../context/globalContext";

const RegularSidebarClients = () => {
  const { filterListClients, setFilterListClients } = useContext(GlobalContext);
  const { selectedFilterClients, setSelectedFilterClients } =
    useContext(GlobalContext);

  const menuFunc = useCallback(async () => {
    console.log("menuOpen");
  }, []);

  return (
    <div className="flex flex-col bg-slate-600 w-10 pt-6 items-center sm:w-20">
      <button onClick={menuFunc} className="w-4 h-4">
        <img src={require("../../assets/assets/hamburger.png")} />
      </button>
      <img className="pt-4" src={require("../../assets/assets/Line.png")}></img>
      <div className="flex flex-col items-center text-gray-400">
        {filterListClients.map((filter) => {
          if (filter.savedToMenu === true) {
            return (
              <button
                key={filter.id}
                // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
                onClick={() => setSelectedFilterClients(filter.id)}
                className={
                  selectedFilterClients === filter.id
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

export default RegularSidebarClients;
