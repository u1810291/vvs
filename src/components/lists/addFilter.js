/* eslint-disable react-perf/jsx-no-new-function-as-prop */
import React, { useState, useCallback, useContext, useEffect } from "react";
import { generate } from "shortid";
import GlobalContext from "../../context/globalContext";
import useLanguage from "../../hook/useLanguage";

export const AddFilterList = (props) => {
  const { english, lithuanian, t } = useLanguage();
  const { filterList, setFilterList } = useContext(GlobalContext);
  const { filterEditing, setFilterEditing } = useContext(GlobalContext);
  const { selectedFilter, setSelectedFilter } = useContext(GlobalContext);
  const { currentFilter, setCurrentFilter } = useContext(GlobalContext);
  const { edit, setEdit } = useContext(GlobalContext);
  const { savedToMenu, setSavedToMenu } = useContext(GlobalContext);
  const { savedToFavorite, setSavedToFavorite } = useContext(GlobalContext);
  const { longName, setLongName } = useContext(GlobalContext);
  const { shortName, setShortName } = useContext(GlobalContext);

  const addFilterFunc = () => {
    setFilterList((currentFilter) => [
      ...currentFilter,
      {
        id: generate(),
        filterName: generate(),
        filterShortName: Math.random().toString(36).slice(-4),
        savedToFavorite: true,
        savedToMenu: true,
        objectAddress: "",
        date: new Date().toISOString().split("T")[0],
        operator: "0",
        object: "0",
        type: "0",
        group: "0",
        status: "0",
        reason: "0",
        crew: "0",
        driver: "0",
        inTime: "0",
        dashboardList: [
          "Gauta",
          "Objektas",
          "Pavadinimas",
          "Ekipažas",
          "Spėjo laiku",
          "Reagavimo laikas",
          "Laikas objekte",
          "Būsena",
          "Suveikimo priežastis",
        ],
      },
    ]);
    filterList.map((value, index, array) => {
      if (filterList.length - 1 === index) {
        const id = value.id;
        setSelectedFilter(id);
      }
    });
  };

  const checkFilters = useCallback(async() => {
    if (filterList.length === 1) {
      setSelectedFilter(null)
    } else {
    const topID = filterList[0].id;
    setSelectedFilter(topID);
    }
  },[filterList, setSelectedFilter])

  const saveFilters = useCallback(async () => {
    // handle api call
  }, []);

  // I guess this for on page load
  useEffect(() => {
    if (filterList?.length > 0) {
      const topId = filterList[0].id;
      setSelectedFilter(topId);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }
  }, []);

  return (
    <>
      <div className="flex flex-col w-full items-center">
        <div className="flex flex-row w-full border-l border-b justify-between">
          <p className="text-gray-500 p-2 border-r-4 border-blue-400 w-full">
            Visi duomenys
          </p>
        </div>
        {filterList.map((filter, index) => {
          return (
            <div className="w-full" key={filter.id}>
              {filterEditing !== filter.id ? (
                <button
                  onClick={() => setSelectedFilter(filter.id)}
                  className={filterEditing ? "hidden" : "w-full"}
                  key={filter.id}
                >
                  <div
                    className={
                      selectedFilter === filter.id ? "shadow" : "w-full"
                    }
                  >
                    <div className="flex flex-col sm:flex-row w-full border-l mb-4 border-b items-center justify-between">
                      <p className="flex text-gray-400 p-2">
                        Filtro pavadinimas
                      </p>
                      <div className="flex flex-row mx-2">
                        {filter.savedToFavorite ? (
                          <img
                            className="h-4 w-4 mr-4"
                            src={require("../../assets/assets/star.png")}
                          />
                        ) : null}
                        <p className="flex text-sm text-gray-200">
                          {filter.filterShortName}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row w-full border-l border-b justify-between items-center">
                      <p className="text-gray-400 p-2">{filter.filterName}</p>
                      <a className="flex p-1 rounded-sm text-xs sm:mx-2 px-2 mb-2 font-normal items-center text-gray-400 bg-gray-200">
                        <p onClick={() => setFilterEditing(filter.id)}>
                          redaguoti filtrą
                        </p>
                      </a>
                    </div>
                  </div>
                </button>
              ) : (
                <div className="ml-6 w-full">
                  <div className="flex flex-col sm:flex-row w-full justify-between mt-2">
                    <div className="flex flex-col w-full">
                      <p className="text-gray-500">Pavadinimas</p>
                      <input
                        id="name"
                        name="name"
                        onChange={(e) => {
                          const filterName = e.target.value;
                          setFilterList((currentFilter) =>
                            currentFilter.map((x) =>
                              x.id === filter.id ? { ...x, filterName } : x
                            )
                          );
                        }}
                        value={filter.filterName}
                        placeholder=""
                        className="flex h-8 w-20 sm:w-40 border text-gray-400 placeholder-gray-400 focus:outline-none sm:text-sm"
                      />
                    </div>
                    <div className="flex flex-col mr-4">
                      <p className="text-gray-500">Trumpinys</p>
                      <input
                        id="short-name"
                        name="short-name"
                        onChange={(e) => {
                          const filterShortName = e.target.value;
                          setFilterList((currentFilter) =>
                            currentFilter.map((x) =>
                              x.id === filter.id ? { ...x, filterShortName } : x
                            )
                          );
                        }}
                        value={filter.filterShortName}
                        placeholder=""
                        className="flex h-8 w-20 mr-4 border text-gray-400 placeholder-gray-400 focus:outline-none sm:text-sm"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col sm:justify-between w-20 sm:w-full">
                    <div className="flex flex-col sm:flex-row items-center mt-4">
                      <input
                        id="save"
                        name="save"
                        onChange={(e) => {
                          const savedToMenu = e.target.checked;
                          setFilterList((currentFilter) =>
                            currentFilter.map((x) =>
                              x.id === filter.id ? { ...x, savedToMenu } : x
                            )
                          );
                        }}
                        checked={filter.savedToMenu}
                        type="checkbox"
                        className="h-4 w-4  text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                      />
                      <p className="ml-4 text-gray-500 truncate">Išsaugoti į meniu</p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center mt-2">
                      <input
                        id="default-filter"
                        name="default-filter"
                        onChange={(e) => {
                          const savedToFavorite = e.target.checked;
                          setFilterList((currentFilter) =>
                            currentFilter.map((x) =>
                              x.id === filter.id ? { ...x, savedToFavorite } : x
                            )
                          );
                        }}
                        checked={filter.savedToFavorite}
                        type="checkbox"
                        className="h-4 w-4   text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                      />
                      <p className="ml-4 text-gray-500 truncate">Numatytasis filtras</p>
                    </div>
                  </div>
                  <div className=" flex flex-col sm:flex-row justify-around items-center w-20 sm:w-full mt-8">
                    <button
                      onClick={() => {
                        setFilterList((currentFilter) =>
                          currentFilter.filter((x) => x.id !== filter.id)
                        );
                        setFilterEditing(null);
                        checkFilters();
                      }}
                      className="text-gray-400"
                    >
                      Ištrinti
                    </button>
                    <button
                      onClick={() => setFilterEditing(null)}
                      className="text-gray-400"
                    >
                      Atšaukti
                    </button>
                    <button className="flex py-2 px-4 mr-4 rounded-sm text-xs mx-2 font-normal items-center text-white bg-slate-600">
                      <p onClick={saveFilters}>Išsaugoti</p>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <button
        className={
          filterEditing
            ? "hidden"
            : "flex flex-row justify-center items-center pb-2"
        }
      >
        <img
          src={require("../../assets/assets/cross.png")}
          className="h-6 w-6 m-2"
        />
        <p onClick={addFilterFunc} className="text-gray-400">
          Pridėti filtrą
        </p>
      </button>
    </>
  );
};
