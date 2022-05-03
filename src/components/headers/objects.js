import React, { useCallback, useContext } from "react";
import GlobalContext from "../../context/globalContext";
import useLanguage from "../../hook/useLanguage";

export function ObjectsHeader() {
  const { english, lithuanian, t } = useLanguage();
  const { search, setSearch } = useContext(GlobalContext);

  const searchFunc = useCallback(
    async (e) => {
      setSearch(e.target.value);
    },
    [setSearch]
  );

  const filterFunc = useCallback(async () => {
    console.log("filter");
  }, []);

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
        <div className="flex flex-col justify-center items-end">
          <div className="flex relative overflow-hidden">
            <input
              id="search"
              name="search"
              placeholder="Greita paieška"
              className="appearance-none sm:w-96 px-3 py-2 my-2 border-2 rounded-full border-b shadow-sm text-xl text-gray-400 placeholder-gray-400 focus:outline-none sm:text-sm"
            />
          </div>
          <div onClick={searchFunc} className="flex h-6 w-6 absolute mr-4">
            <img src={require("../../assets/assets/search.png")} alt="filter" />
          </div>
        </div>
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
