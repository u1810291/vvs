import React, { useCallback } from "react";
import useLanguage from "../../hook/useLanguage";

export const AddFilterDriversList = (props) => {
  const { english, lithuanian, t } = useLanguage();

  const deleteFunc = useCallback(async() => {
    console.log('delete');
  }, []);

  const cancelFunc = useCallback(async() => {
    console.log('cancel');
  }, []);

  return (
    <>
      <div className="ml-6 w-full">
        <div className="flex flex-row w-full justify-between mt-2">
          <div className="flex flex-col w-full">
            <p className="text-gray-500">Pavadinimas</p>
            <input
              id="name"
              name="name"
              placeholder=""
              className="flex h-8 w-56 border placeholder-gray-400 focus:outline-none sm:text-sm"
            />
          </div>
          <div className="flex flex-col mr-4">
            <p className="text-gray-500">Trumpinys</p>
            <input
              id="short-name"
              name="short-name"
              placeholder=""
              className="flex h-8 w-20 border placeholder-gray-400 focus:outline-none sm:text-sm"
            />
          </div>
        </div>
        <div className="flex flex-col justify-between w-full">
          <div className="flex flex-row items-center mt-4">
            <input
              id="save"
              name="save"
              type="checkbox"
              className="h-4 w-4  text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
            />
            <p className="ml-4 text-gray-500">Išsaugoti į meniu</p>
          </div>
          <div className="flex flex-row items-center mt-2">
            <input
              id="default-filter"
              name="default-filter"
              type="checkbox"
              className="h-4 w-4   text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
            />
            <p className="ml-4 text-gray-500">Numatytasis filtras</p>
          </div>
        </div>
        <div className=" flex flex-row justify-around items-center w-full mt-8">
          <button onClick={deleteFunc} className="text-gray-400">Ištrinti</button>
          <button onClick={cancelFunc} className="text-gray-400">Atšaukti</button>
          <button className="flex py-2 px-4 mr-4 rounded-sm text-xs mx-2 font-normal items-center text-white bg-slate-600">
            <p>Išsaugoti</p>
          </button>
        </div>
      </div>
    </>
  );
};
