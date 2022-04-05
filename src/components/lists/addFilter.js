import React from "react";
import useLanguage from "../../hook/useLanguage";

export const AddFilterList = (props) => {
  const { english, lithuanian, t } = useLanguage();
  return (
    <>
      <div className="flex flex-row w-full border-l border-b justify-between">
        <p className="text-gray-500 p-2">Visi duomenys</p>
      </div>
      <div className="flex flex-row w-full border-l border-b items-center justify-between">
        <p className="flex text-gray-400 p-2">Filtro pavadinimas</p>
        <div className="flex flex-row mx-2">
          <img
            className="h-4 w-4 mr-4"
            src={require("../../assets/assets/star.png")}
          />
          <p className="flex text-sm text-gray-200">FAV1</p>
        </div>
      </div>
      <div className="flex flex-row w-full border-l border-b justify-between items-center">
        <p className="text-gray-400 p-2">View 2 with filter</p>
        <button className="flex p-1 rounded-sm text-xs mx-2 px-2 font-normal items-center text-gray-400 bg-gray-200">
          <p>redaguoti filtrą</p>
        </button>
      </div>
      <button className="flex flex-row justify-between items-center">
        <img
          src={require("../../assets/assets/cross.png")}
          className="h-6 w-6 m-2"
        />
        <p className="text-gray-400">Pridėti filtrą</p>
      </button>
    </>
  );
};
