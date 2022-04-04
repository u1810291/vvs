import React, { useCallback } from "react";
import useLanguage from "../../hook/useLanguage";

export function FilterHeader() {
  const { english, lithuanian, t } = useLanguage();

  const search = useCallback(async () => {
    console.log("search");
  }, []);

  const filter = useCallback(async () => {
    console.log("filter");
  }, []);

  return (
      <div className="flex flex-col sm:flex-row border h-16 bg-white border-b-2 justify-between">
        <div className="flex flex-col sm:flex-row ml-4 items-center">
          <h4 className="text-lg ml-2 font-normal">Užduotys</h4>
          <p className="pl-2 text-gray-600">/</p>
          <h4 className="text-lg ml-2 font-normal text-gray-500">
            {t("loginSystem.allData")}
          </h4>
          <img
            onClick={filter}
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
                className="appearance-none w-40 sm:w-96 px-3 py-2 border-2 rounded-full border-b shadow-sm text-xl text-gray-400 placeholder-gray-400 focus:outline-none sm:text-sm"
              />
            </div>
            <div onClick={search} className="flex h-6 w-6 absolute mr-4">
              <img
                src={require("../../assets/assets/search.png")}
                alt="filter"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center">
          <button
            type="submit"
            className="w-40 h-10 rounded flex mr-2 mt-2 mb-1 justify-center py-2 px-4 border border-transparent drop-shadow shadow text-sm font-light text-white font-montserrat hover:shadow-none bg-slate-600 focus:outline-none"
          >
            {t("loginSystem.createTask")}
          </button>
          <a href="#" className="text-lg mx-6 font-light text-black">
            Pultas
          </a>
          <a href="#" className="text-lg mx-6 font-light text-black">
            Užduotys
          </a>
          <a href="#" className="text-lg mx-6 font-light text-black">
            Leidimai
          </a>
          <a href="#" className="text-lg mx-6 font-light text-black">
            Pažeidimai
          </a>
        </div>
      </div>
  );
}
