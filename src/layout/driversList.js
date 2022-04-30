import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useRef,
} from "react";
import useLanguage from "../hook/useLanguage";
import RegularSidebar from "../components/sidebars/regular";
import { DriversListHeader } from "../components/headers/driversList";
import { DriversList } from "../components/lists/driversList";
const { AddFilterList } = require("../components/lists/addFilter");
import GlobalContext from "../context/globalContext";
import { Drivers } from "../api/drivers";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function TaskList() {
  const { english, lithuanian, t } = useLanguage();
  const { selectedFilter, setSelectedFilter } = useContext(GlobalContext);
  const [sortedDriversOrder, setSortedDriversOrder] = useState("");
  const [sortedDriversKeys, setSortedDriversKeys] = useState("");

  function sortToggle(arr, key, order) {
    const collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: 'base'
    });
    return arr.sort(function (a, b) {
      let x = a[key];
      let y = b[key];
      if (order === "asc") {
        return collator.compare(x, y);
      }
      if (order === "desc") {
        return collator.compare(x, y) * -1;
      }
      if (order === "") {
        return Math.random() - 0.5;
      }
    });
  }

  function sortedDriversNames() {
    if (sortedDriversOrder === "") {
      setSortedDriversKeys("name");
      setSortedDriversOrder("asc");
    }
    if (sortedDriversOrder === "asc") {
      setSortedDriversKeys("name");
      setSortedDriversOrder("desc");
    }
    if (sortedDriversOrder === "desc") {
      setSortedDriversKeys("name");
      setSortedDriversOrder("");
    }
  }

  function sortedDriversStatus() {
    if (sortedDriversOrder === "") {
      setSortedDriversKeys("status");
      setSortedDriversOrder("asc");
    }
    if (sortedDriversOrder === "asc") {
      setSortedDriversKeys("status");
      setSortedDriversOrder("desc");
    }
    if (sortedDriversOrder === "desc") {
      setSortedDriversKeys("status");
      setSortedDriversOrder("");
    }
  }

  const sortedDrivers = sortToggle(
    Drivers,
    sortedDriversKeys,
    sortedDriversOrder
  );

  return (
    <>
      <div className="container max-w-screen-xl">
        <div className="flex w-screen flex-row justify-center h-screen relative overflow-hidden">
          <div className="flex flex-col h-screen items-center w-full ">
            <div className="flex flex-row w-full justify-between h-screen ">
              <RegularSidebar />
              <div className="flex flex-col h-screen w-full justify-between">
                <DriversListHeader />
                <div className="flex flex-col h-screen">
                  <div className="hidden pl-4 w-full border-t py-2 md:grid grid-cols-3 bg-gray-100 grid-rows-1 grid-flow-row table-auto md:grid-cols-3 grid-gap-6 justify-between font-normal text-black z-1">
                    <div className="flex flex-row items-center col-span-2">
                      <button
                        onClick={sortedDriversNames}
                        className="flex flex-row items-center"
                      >
                        <span className="text-gray-300 text-sm">
                          Vardas Pavardė
                        </span>
                        <img
                          src={require("../assets/assets/down.png")}
                          className="h-2 w-4 ml-2"
                        />
                      </button>
                    </div>
                    <button
                      onClick={sortedDriversStatus}
                      className="flex flex-row items-center"
                    >
                      <span className="text-gray-300 text-sm">Būsena</span>
                    </button>
                  </div>
                  <div className="pl-4 flex-col w-full items-center scrollbar-gone overflow-y-auto h-screen">
                    {sortedDrivers.map((data) => (
                      <DriversList
                        key={data.id}
                        name={data.name}
                        status={data.status}
                      />
                    ))}
                    <nav className="border-gray-200 flex items-center justify-between mt-4 sm:px-4 w-full bg-white"></nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TaskList;
