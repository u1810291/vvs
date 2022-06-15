import React, { useState, useCallback, useContext, useEffect } from "react";
import { generate } from "shortid";
import GlobalContext from "../../context/globalContext";

export const AddFilterListObjects = ({ fetch, data, ...props}) => {
  const { filterListObjects, setFilterListObjects } = useContext(GlobalContext);
  const { filterEditingObjects, setFilterEditingObjects } = useContext(GlobalContext);
  const { selectedFilterObjects, setSelectedFilterObjects } = useContext(GlobalContext);
  const { objectPageFetchData, setObjectPageFetchData } = useContext(GlobalContext);

  const addFilterFunc = () => {
    setFilterListObjects((currentFilter) => [
      ...currentFilter,
      {
        id: generate(),
        filterName: generate(),
        filterShortName: Math.random().toString(36).slice(-4),
        savedToFavorite: true,
        savedToMenu: true,
        objectAddress: "",
        date: "",
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
          "Pavadinimas",
          "Miestas",
          "Adresas",
          "Objekto nr.",
          "Sutarties nr.",
          "Siusti ekipaža",
        ],
      },
    ]);
    filterListObjects.map((value, index, array) => {
      if (filterListObjects.length - 1 === index) {
        const id = value.id;
        setSelectedFilterObjects(id);
      }
    });
  };

  const checkFilters = useCallback(async() => {
    if (filterListObjects.length === 1) {
      setSelectedFilterObjects(null)
    } else {
    const topID = filterListObjects[0].id;
    setSelectedFilterObjects(topID);
    }
  },[filterListObjects, setSelectedFilterObjects])

  // useEffect(() => {
  //   setTimeout(() => {
  //   setTriggerInit(true);
  //   }, 100);
  // },[])

  useEffect(() => {
    if (filterListObjects?.length > 0) {
      const topId = filterListObjects[0].id;
      setSelectedFilterObjects(topId);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [objectPageFetchData]);

  return (
    <>
      <div className="flex flex-col w-full items-center">
        <div className="flex flex-row w-full border-l border-b justify-between">
          <p className="text-gray-500 p-2 border-r-4 border-blue-400 w-full text-sm">
            Visi duomenys
          </p>
        </div>
        {filterListObjects.map((filter, index) => {
          return (
            <div className="w-full" key={filter.id}>
              {filterEditingObjects !== filter.id ? (
                <button
                  onClick={() => setSelectedFilterObjects(filter.id)}
                  className={filterEditingObjects ? "hidden" : "w-full"}
                  key={filter.id}
                >
                  <div
                    className={
                      selectedFilterObjects === filter.id ? "shadow" : "w-full"
                    }
                  >
                    <div className="flex flex-col sm:flex-row w-full border-l mb-4 border-b items-center justify-between">
                      <p className="flex text-gray-400 p-2 text-sm">
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
                      <p className="text-gray-400 p-2 text-sm">{filter.filterName}</p>
                      <a className="flex p-1 rounded-sm text-xs sm:mx-2 px-2 mb-2 font-normal items-center text-gray-400 hover:text-gray-500 bg-gray-200">
                        <p onClick={() => setFilterEditingObjects(filter.id)}>
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
                      <p className="text-gray-500 text-sm">Pavadinimas</p>
                      <input
                        id="name"
                        name="name"
                        onChange={(e) => {
                          const filterName = e.target.value;
                          setFilterListObjects((currentFilter) =>
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
                      <p className="text-gray-500 text-sm">Trumpinys</p>
                      <input
                        id="short-name"
                        name="short-name"
                        maxLength={4}
                        onChange={(e) => {
                          const filterShortName = e.target.value;
                          setFilterListObjects((currentFilter) =>
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
                          setFilterListObjects((currentFilter) =>
                            currentFilter.map((x) =>
                              x.id === filter.id ? { ...x, savedToMenu } : x
                            )
                          );
                        }}
                        checked={filter.savedToMenu}
                        type="checkbox"
                        className="h-4 w-4  text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                      />
                      <p className="ml-4 text-gray-500 truncate text-sm">Išsaugoti į meniu</p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center mt-2">
                      <input
                        id="default-filter"
                        name="default-filter"
                        onChange={(e) => {
                          const savedToFavorite = e.target.checked;
                          setFilterListObjects((currentFilter) =>
                            currentFilter.map((x) =>
                              x.id === filter.id ? { ...x, savedToFavorite } : x
                            )
                          );
                        }}
                        checked={filter.savedToFavorite}
                        type="checkbox"
                        className="h-4 w-4   text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                      />
                      <p className="ml-4 text-gray-500 truncate text-sm">Numatytasis filtras</p>
                    </div>
                  </div>
                  <div className=" flex flex-col sm:flex-row justify-around items-center w-20 sm:w-full mt-8">
                    <button
                      onClick={() => {
                        setFilterListObjects((currentFilter) =>
                          currentFilter.filter((x) => x.id !== filter.id)
                        );
                        setFilterEditingObjects(null);
                        checkFilters();
                      }}
                      className="text-gray-400 text-sm hover:text-gray-500"
                    >
                      Ištrinti
                    </button>
                    <button
                      onClick={() => setFilterEditingObjects(null)}
                      className="text-gray-400 text-sm hover:text-gray-500"
                    >
                      Atšaukti
                    </button>
                    <button className="flex py-2 px-4 mr-4 rounded-sm text-xs mx-2 font-normal items-center text-white hover:bg-slate-500 bg-slate-600">
                      <p onClick={fetch}>Išsaugoti</p>
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
          filterEditingObjects
            ? "hidden"
            : "flex flex-row justify-center items-center pb-2"
        }
      >
        <img
          src={require("../../assets/assets/cross.png")}
          className="h-4 w-4 m-2"
        />
        <p onClick={addFilterFunc} className="text-gray-400 text-sm hover:text-gray-500">
          Pridėti filtrą
        </p>
      </button>
    </>
  );
};
