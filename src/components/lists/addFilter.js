import React, { useState, useCallback, useContext } from "react";
import { generate } from "shortid";
import GlobalContext from "../../context/globalContext";
import useLanguage from "../../hook/useLanguage";

export const AddFilterList = (props) => {
  const { english, lithuanian, t } = useLanguage();
  const { filterList, setFilterList } = useContext(GlobalContext);
  const { edit, setEdit } = useContext(GlobalContext);
  const { savedToMenu, setSavedToMenu } = useContext(GlobalContext);
  const { savedToFavorite, setSavedToFavorite } = useContext(GlobalContext);
  const { longName, setLongName } = useContext(GlobalContext);
  const { shortName, setShortName } = useContext(GlobalContext);

  const deleteFunc = useCallback(async (filter) => {
    setFilterList((currentFilter) =>
      currentFilter.filter((x) => x.id !== filter.id)
    );
  }, [setFilterList]);

  const cancelFunc = useCallback(async () => {
    setEdit(false);
  }, [setEdit]);

  const editFunc = useCallback(async () => {
    setEdit(true);
  }, [setEdit]);

  const addFilterFunc = useCallback(async () => {
    setFilterList((currentFilter) => [
      ...currentFilter,
      {
        id: generate(),
        filterName: generate(),
        filterShortName: Math.random().toString(36).slice(-4),
        savedToFavorite: false,
        savedToMenu: false,
        date: new Date().toISOString(),
        operator: "",
        object: "",
        objectAddress: "",
        type: "",
        group: "",
        status: "",
        reason: "",
        crew: "",
        driver: "",
        inTime: "",
        showDate: false,
        showObject: false,
        showName: false,
        showCrew: false,
        showInTime: false,
        showReactionTime: false,
        showTimeInObject: false,
        showStatus: false,
        showReason: false,
      },
    ]);
  }, []);

  const longNameFunc = useCallback(
    async (e) => {
      const longName = e.target.value;
      setFilterList((currentFilter) =>
        currentFilter.map((x) => (x.id === filter.id ? { ...x, longName } : x))
      );
    },
    [setFilterList]
  );

  const shortNameFunc = useCallback(
    async (e) => {
      const shortName = e.target.value;
      setFilterList((currentFilter) =>
        currentFilter.map((x) => (x.id === filter.id ? { ...x, shortName } : x))
      );
    },
    [setFilterList]
  );

  const savedToMenuFunc = useCallback(
    async (e) => {
      setSavedToMenu(e.target.checked);
    },
    [setSavedToMenu]
  );

  const savedToFavoriteFunc = useCallback(
    async (e) => {
      setSavedToFavorite(e.target.checked);
    },
    [setSavedToFavorite]
  );

  return (
    <>
      {!edit ? (
        <div className="flex flex-col w-full items-center">
          <div className="flex flex-row w-full border-l border-b justify-between">
            <p className="text-gray-500 p-2 border-r-4 border-blue-400 w-full">
              Visi duomenys
            </p>
          </div>
          {filterList.map((filter, index) => {
            return (
              <div className="w-full" key={filter.id}>
                <div className="flex flex-row w-full border-l mb-4 border-b items-center justify-between">
                  <p className="flex text-gray-400 p-2">Filtro pavadinimas</p>
                  <div className="flex flex-row mx-2">
                    <img
                      className="h-4 w-4 mr-4"
                      src={require("../../assets/assets/star.png")}
                    />
                    <p className="flex text-sm text-gray-200">
                      {filter.filterShortName}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row w-full border-l border-b justify-between items-center">
                  <p className="text-gray-400 p-2">{filter.filterName}</p>
                  <button className="flex p-1 rounded-sm text-xs mx-2 px-2 mb-2 font-normal items-center text-gray-400 bg-gray-200">
                    <p onClick={editFunc}>redaguoti filtrą</p>
                  </button>
                </div>
                {/* <p>{JSON.stringify(filterList, null, 2)}</p> */}
              </div>
            );
          })}
          <button className="flex flex-row justify-center items-center pb-2">
            <img
              src={require("../../assets/assets/cross.png")}
              className="h-6 w-6 m-2"
            />
            <p onClick={addFilterFunc} className="text-gray-400">
              Pridėti filtrą
            </p>
          </button>
        </div>
      ) : (
        <div>
          {filterList.map((filter, index) => {
            return (
              <div key={filter.id} className="ml-6 w-full">
                <div className="flex flex-row w-full justify-between mt-2">
                  <div className="flex flex-col w-full">
                    <p className="text-gray-500">Pavadinimas</p>
                    <input
                      id="name"
                      name="name"
                      onChange={longNameFunc}
                      value={filter.longName}
                      placeholder=""
                      className="flex h-8 w-40 border placeholder-gray-400 focus:outline-none sm:text-sm"
                    />
                  </div>
                  <div className="flex flex-col mr-4">
                    <p className="text-gray-500">Trumpinys</p>
                    <input
                      id="short-name"
                      name="short-name"
                      onChange={shortNameFunc}
                      value={filter.shortName}
                      placeholder=""
                      className="flex h-8 w-20 mr-4 border placeholder-gray-400 focus:outline-none sm:text-sm"
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-between w-full">
                  <div className="flex flex-row items-center mt-4">
                    <input
                      id="save"
                      name="save"
                      onChange={savedToMenuFunc}
                      value={savedToMenu}
                      type="checkbox"
                      className="h-4 w-4  text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                    />
                    <p className="ml-4 text-gray-500">Išsaugoti į meniu</p>
                  </div>
                  <div className="flex flex-row items-center mt-2">
                    <input
                      id="default-filter"
                      name="default-filter"
                      onChange={savedToFavoriteFunc}
                      value={savedToFavorite}
                      type="checkbox"
                      className="h-4 w-4   text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                    />
                    <p className="ml-4 text-gray-500">Numatytasis filtras</p>
                  </div>
                </div>
                <div className=" flex flex-row justify-around items-center w-full mt-8">
                  <button onClick={deleteFunc} className="text-gray-400">
                    Ištrinti
                  </button>
                  <button onClick={cancelFunc} className="text-gray-400">
                    Atšaukti
                  </button>
                  <button className="flex py-2 px-4 mr-4 rounded-sm text-xs mx-2 font-normal items-center text-white bg-slate-600">
                    <p>Išsaugoti</p>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
