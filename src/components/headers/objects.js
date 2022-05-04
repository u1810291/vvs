import React, { useCallback, useContext } from "react";
import GlobalContext from "../../context/globalContext";
import { Search } from "../../components/input/search";

export function ObjectsHeader() {
  const { expandFilterObjects, setExpandFilterObjects } =
    useContext(GlobalContext);

  const filterFunc = useCallback(async () => {
    if (expandFilterObjects) {
      setExpandFilterObjects(false);
    }
    if (!expandFilterObjects) {
      setExpandFilterObjects(true);
    }
  }, [expandFilterObjects, setExpandFilterObjects]);

  return (
    <div className="flex flex-row bg-white justify-between">
      <div className="xl:flex hidden xl:flex-row ml-4 items-center">
        <h4 className="ml-2 text-normal font-normal">Užduotys</h4>
        <p className="pl-2 text-gray-600">/</p>
        <h4 className="text-normal ml-2 font-normal text-gray-500">
          Visi duomenys
        </h4>
        <img
          onClick={filterFunc}
          src={require("../../assets/assets/filter.png")}
          className="h-4 w-4 ml-4 mr-8"
          alt="filter"
        />
        <Search />
      </div>
      <div className="flex flex-row items-center">
        <button className="text-normal mx-1 sm:mx-6 h-full font-light text-black hover:border-b-4 mt-2 hover:border-blue-400">
          Objektai
        </button>
        <button className="text-normal mx-1 sm:mx-6 h-full font-light text-black hover:border-b-4 mt-2 hover:border-blue-400">
          Modemai
        </button>
        <button className="text-normal mx-1 sm:mx-6 h-full font-light text-black hover:border-b-4 mt-2 hover:border-blue-400">
          Raktai
        </button>
      </div>
    </div>
  );
}
