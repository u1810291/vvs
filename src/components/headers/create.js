import React, { useCallback, useContext } from "react";
import GlobalContext from "../../context/globalContext";
import useLanguage from "../../hook/useLanguage";

export function CreateHeader() {
  const { english, lithuanian, t } = useLanguage();

  return (
    <div className="flex flex-row border h-16 bg-white border-b-2 justify-between">
      <div className="xl:flex hidden xl:flex-row ml-4 items-center">
        <h4 className="text-lg ml-2 font-normal">Užduotys</h4>
        <p className="pl-2 text-gray-600">/</p>
        <h4 className="text-lg ml-2 hidden xxl:inline-block font-normal text-gray-500">
          Nauja užduotis
        </h4>
        <div className="flex flex-col justify-center items-end"></div>
      </div>
      <div className="flex flex-row items-center">
        <button
          type="submit"
          className="hidden sm:w-40 sm:h-10 rounded sm:flex mr-2 mt-2 mb-1 justify-center py-2 px-4 border border-transparent drop-shadow shadow text-sm font-light text-black font-montserrat hover:shadow-none bg-gray-200 focus:outline-none"
        >
          Atšaukti
        </button>
        <button
          type="submit"
          className="hidden sm:w-40 sm:h-10 rounded sm:flex mr-2 mt-2 mb-1 justify-center py-2 px-4 border border-transparent drop-shadow shadow text-sm font-light text-white font-montserrat hover:shadow-none bg-slate-600 focus:outline-none"
        >
          Sukurti užduotį
        </button>
      </div>
    </div>
  );
}