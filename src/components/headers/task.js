import React, { useCallback, useContext } from "react";
import GlobalContext from "../../context/globalContext";
import { Search } from "../../components/input/search";

export function TaskHeader() {
  const { expandFilterTask, setExpandFilterTask } = useContext(GlobalContext);

  const filterFunc = useCallback(async () => {
    if (expandFilterTask) {
      setExpandFilterTask(false);
    }
    if (!expandFilterTask) {
      setExpandFilterTask(true);
    }
  }, [expandFilterTask, setExpandFilterTask]);

  return (
    <div className="flex flex-row h-16 bg-white border-b justify-between">
      <div className="xl:flex hidden xl:flex-row ml-4 items-center">
        <h4 className="ml-2 text-normal font-normal">Užduotys</h4>
        <p className="pl-2 text-gray-600">/</p>
        <h4 className="text-normal ml-2 hidden xxl:inline-block font-normal text-gray-500">
          Visi duomenys
        </h4>
        <button>
          <img
            onClick={filterFunc}
            src={require("../../assets/assets/filter.png")}
            className="h-4 w-4 ml-4 mr-8 hover:h-6 hover:w-6 hover:ml-6"
            alt="filter"
          />
        </button>
        <Search />
      </div>
      <div className="flex flex-row items-center">
        <button
          type="submit"
          className="hidden sm:w-40 sm:h-10 rounded sm:flex mr-2 mt-2 mb-1 justify-center py-2 px-4 border border-transparent drop-shadow shadow text-sm font-light text-white font-montserrat hover:shadow-none bg-slate-600 focus:outline-none"
        >
          Sukurti užduoti
        </button>
        <button className="text-normal mx-1 sm:mx-6 h-full font-light text-black hover:border-b-4 mt-2 hover:border-blue-400">
          Pultas
        </button>
        <button className="text-normal mx-1 sm:mx-6 h-full font-light text-black hover:border-b-4 mt-2 hover:border-blue-400">
          Užduotys
        </button>
        <button className="text-normal mx-1 sm:mx-6 h-full font-light text-black hover:border-b-4 mt-2 hover:border-blue-400">
          Leidimai
        </button>
        <button className="text-normal mx-1 sm:mx-6 h-full font-light text-black hover:border-b-4 mt-2 hover:border-blue-400">
          Pažeidimai
        </button>
      </div>
    </div>
  );
}
