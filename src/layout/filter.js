import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useRef,
} from "react";
import useLanguage from "../hook/useLanguage";
import RegularSidebar from "../components/sidebars/regular";
import { FilterHeader } from "../components/headers/filter";
import { FiltersList } from "../components/lists/filter.js";
import { OptionsList } from "../components/lists/options";
import { DashboardList } from "../components/lists/dashboard";
const { AddFilterList } = require("../components/lists/addFilter");
import GlobalContext from "../context/globalContext";
import { DashboardTestApi } from "../api/dashboardTest";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";

function Dashboard() {
  const { english, lithuanian, t } = useLanguage();
  const { filterList, setFilterList } = useContext(GlobalContext);
  const { selectedFilter, setSelectedFilter } = useContext(GlobalContext);
  const [toPrint, setToPrint] = useState(false);
  const [sortedDashboardTestApiKeys, setSortedDashboardTestApiKeys] =
    useState("");
  const [sortedDashboardTestApiOrder, setSortedDashboardTestApiOrder] =
    useState("");
  const pdfExportComponent = useRef(null);
  const handleExportWithComponent = useCallback(async (event) => {
    setToPrint(true);
    setTimeout(() => {
      pdfExportComponent.current.save();
    }, 1000);
    setTimeout(() => {
      setToPrint(false);
    }, 1000);
  }, []);

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

  function sortedDashboardTestDate() {
    if (sortedDashboardTestApiOrder === "") {
      setSortedDashboardTestApiKeys("date");
      setSortedDashboardTestApiOrder("asc");
    }
    if (sortedDashboardTestApiOrder === "asc") {
      setSortedDashboardTestApiKeys("date");
      setSortedDashboardTestApiOrder("desc");
    }
    if (sortedDashboardTestApiOrder === "desc") {
      setSortedDashboardTestApiKeys("date");
      setSortedDashboardTestApiOrder("");
    }
  }

  function sortedDashboardTestObject() {
    if (sortedDashboardTestApiOrder === "") {
      setSortedDashboardTestApiKeys("object");
      setSortedDashboardTestApiOrder("asc");
    }
    if (sortedDashboardTestApiOrder === "asc") {
      setSortedDashboardTestApiKeys("object");
      setSortedDashboardTestApiOrder("desc");
    }
    if (sortedDashboardTestApiOrder === "desc") {
      setSortedDashboardTestApiKeys("object");
      setSortedDashboardTestApiOrder("");
    }
  }

  function sortedDashboardTestName() {
    if (sortedDashboardTestApiOrder === "") {
      setSortedDashboardTestApiKeys("name");
      setSortedDashboardTestApiOrder("asc");
    }
    if (sortedDashboardTestApiOrder === "asc") {
      setSortedDashboardTestApiKeys("name");
      setSortedDashboardTestApiOrder("desc");
    }
    if (sortedDashboardTestApiOrder === "desc") {
      setSortedDashboardTestApiKeys("name");
      setSortedDashboardTestApiOrder("");
    }
  }

  function sortedDashboardTestCrew() {
    if (sortedDashboardTestApiOrder === "") {
      setSortedDashboardTestApiKeys("crew");
      setSortedDashboardTestApiOrder("asc");
    }
    if (sortedDashboardTestApiOrder === "asc") {
      setSortedDashboardTestApiKeys("crew");
      setSortedDashboardTestApiOrder("desc");
    }
    if (sortedDashboardTestApiOrder === "desc") {
      setSortedDashboardTestApiKeys("crew");
      setSortedDashboardTestApiOrder("");
    }
  }

  function sortedDashboardTestInTime() {
    if (sortedDashboardTestApiOrder === "") {
      setSortedDashboardTestApiKeys("intime");
      setSortedDashboardTestApiOrder("asc");
    }
    if (sortedDashboardTestApiOrder === "asc") {
      setSortedDashboardTestApiKeys("intime");
      setSortedDashboardTestApiOrder("desc");
    }
    if (sortedDashboardTestApiOrder === "desc") {
      setSortedDashboardTestApiKeys("intime");
      setSortedDashboardTestApiOrder("");
    }
  }

  function sortedDashboardTestReactionTime() {
    if (sortedDashboardTestApiOrder === "") {
      setSortedDashboardTestApiKeys("reactiontime");
      setSortedDashboardTestApiOrder("asc");
    }
    if (sortedDashboardTestApiOrder === "asc") {
      setSortedDashboardTestApiKeys("reactiontime");
      setSortedDashboardTestApiOrder("desc");
    }
    if (sortedDashboardTestApiOrder === "desc") {
      setSortedDashboardTestApiKeys("reactiontime");
      setSortedDashboardTestApiOrder("");
    }
  }

  function sortedDashboardTestTimeInObject() {
    if (sortedDashboardTestApiOrder === "") {
      setSortedDashboardTestApiKeys("timeinobject");
      setSortedDashboardTestApiOrder("asc");
    }
    if (sortedDashboardTestApiOrder === "asc") {
      setSortedDashboardTestApiKeys("timeinobject");
      setSortedDashboardTestApiOrder("desc");
    }
    if (sortedDashboardTestApiOrder === "desc") {
      setSortedDashboardTestApiKeys("timeinobject");
      setSortedDashboardTestApiOrder("");
    }
  }

  function sortedDashboardTestStatus() {
    if (sortedDashboardTestApiOrder === "") {
      setSortedDashboardTestApiKeys("status");
      setSortedDashboardTestApiOrder("asc");
    }
    if (sortedDashboardTestApiOrder === "asc") {
      setSortedDashboardTestApiKeys("status");
      setSortedDashboardTestApiOrder("desc");
    }
    if (sortedDashboardTestApiOrder === "desc") {
      setSortedDashboardTestApiKeys("status");
      setSortedDashboardTestApiOrder("");
    }
  }

  function sortedDashboardTestReason() {
    if (sortedDashboardTestApiOrder === "") {
      setSortedDashboardTestApiKeys("reason");
      setSortedDashboardTestApiOrder("asc");
    }
    if (sortedDashboardTestApiOrder === "asc") {
      setSortedDashboardTestApiKeys("reason");
      setSortedDashboardTestApiOrder("desc");
    }
    if (sortedDashboardTestApiOrder === "desc") {
      setSortedDashboardTestApiKeys("reason");
      setSortedDashboardTestApiOrder("");
    }
  }
  // ekipažo stulpelyje reikia pakoreguoti sort funkcija
  const sortedDashboardTestApi = sortToggle(
    DashboardTestApi,
    sortedDashboardTestApiKeys,
    sortedDashboardTestApiOrder
  );

  return (
    <>
      <div className="container max-w-screen-xl">
        <div className="flex w-screen flex-row justify-center min-h-screen sm:h-screen relative overflow-hidden">
          <div className="flex flex-col h-full items-center w-full">
            <div className="flex flex-row w-full justify-between h-full">
              <RegularSidebar />
              <div className="flex flex-col min-h-full w-full justify-between">
                <FilterHeader />
                <div className="flex flex-col min-h-screen sm:min-h-0 overflow-scroll sm:h-full">
                  <div className="flex flex-row w-full">
                    <div className="flex flex-col h-full sm:h-96 overflow-y-auto items-center scrollbar-gone border-r w-3/6 xl:w-1/5">
                      <AddFilterList />
                    </div>
                    <div className="flex flex-col ml-2 w-3/6 lg:w-3/5">
                      <OptionsList />
                      <FiltersList />
                      <div
                        className={
                          selectedFilter
                            ? "flex flex-col md:flex-row justify-between"
                            : "hidden"
                        }
                      >
                        <div className="flex flex-col md:flex-row mt-8 md:mt-0 items-center">
                          <button className="flex text-gray-400 w-32 justify-center ml-2 rounded-sm p-1 text-xs font-normal hover:shadow-none bg-gray-200 focus:outline-none">
                            Išsaugoti filtrą
                          </button>
                        </div>
                        <div className="flex flex-col md:flex-row items-center my-6">
                          <img
                            className="h-8 w-6 mr-2 hidden lg:inline-block"
                            src={require("../assets/assets/doc.png")}
                          ></img>
                          <button
                            onClick={handleExportWithComponent}
                            className="flex justify-center md:mr-6 p-1 text-sm font-normal"
                          >
                            Eksportuoti
                          </button>
                          <button className="flex justify-center w-24 mr-2 rounded-sm p-1 border border-transparent text-xs font-normal text-white hover:shadow-none bg-slate-600 focus:outline-none">
                            Ieškoti
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col w-0 xl:w-1/5">
                      {/* <p>{JSON.stringify(filterList, null, 2)}</p> */}
                    </div>
                  </div>
                  {toPrint ? (
                    <PDFExport
                      ref={pdfExportComponent}
                      scale={0.2}
                      paperSize="A4"
                      margin="1cm"
                    >
                      <div className="hidden pl-4 w-full border-t py-2 md:grid grid-cols-1 bg-gray-100 grid-rows-1 grid-flow-row table-auto sm:grid-cols-12 grid-gap-6 justify-between font-normal text-black z-1">
                        <div className="flex flex-row items-center">
                          <span className="text-gray-300">Gauta</span>
                        </div>
                        <div className="flex col-span-2 flex-row items-center">
                          <span className="text-gray-300">Objektas</span>
                        </div>
                        <div className="flex col-span-2 flex-row items-center">
                          <span className="text-gray-300">Pavadinimas</span>
                        </div>
                        <div className="flex flex-row items-center">
                          <span className="text-gray-300">Ekipažas</span>
                        </div>
                        <div className="flex flex-row items-center">
                          <span className="text-gray-300">Spėjo laiku</span>
                        </div>
                        <div className="flex flex-row items-center">
                          <span className="text-gray-300">
                            Reagavimo laikas
                          </span>
                        </div>
                        <div className="flex flex-row items-center">
                          <span className="text-gray-300">Laikas objekte</span>
                        </div>
                        <div className="flex flex-row items-center">
                          <span className="text-gray-300">Būsena</span>
                        </div>
                        <div className="flex col-span-2 flex-row items-center">
                          <span className="text-gray-300">
                            Suveikimo priežastis
                          </span>
                        </div>
                      </div>
                      <div className="pl-4 flex-col w-full items-center scrollbar-gone overflow-y-auto">
                        {sortedDashboardTestApi.map((data) => (
                          <DashboardList
                            key={data.id}
                            id={data.id}
                            date={data.date}
                            object={data.object}
                            name={data.name}
                            crew={data.crew}
                            intime={data.intime}
                            reactiontime={data.reactiontime}
                            timeinobject={data.timeinobject}
                            status={data.status}
                            reason={data.reason}
                          />
                        ))}
                      </div>
                    </PDFExport>
                  ) : (
                    <>
                      <div className="hidden pl-4 w-full border-t py-2 md:grid grid-cols-1 bg-gray-100 grid-rows-1 grid-flow-row table-auto sm:grid-cols-12 grid-gap-6 justify-between font-normal text-black z-1">
                        <button
                          onClick={sortedDashboardTestDate}
                          className="flex flex-row items-center"
                        >
                          <span className="text-gray-300 text-sm">Gauta</span>
                        </button>
                        <button
                          onClick={sortedDashboardTestObject}
                          className="flex col-span-2 flex-row items-center"
                        >
                          <span className="text-gray-300 text-sm">
                            Objektas
                          </span>
                        </button>
                        <button
                          onClick={sortedDashboardTestName}
                          className="flex col-span-2 flex-row items-center"
                        >
                          <span className="text-gray-300 text-sm">
                            Pavadinimas
                          </span>
                        </button>
                        <button
                          onClick={sortedDashboardTestCrew}
                          className="flex flex-row items-center"
                        >
                          <span className="text-gray-300 text-sm">
                            Ekipažas
                          </span>
                        </button>
                        <button
                          onClick={sortedDashboardTestInTime}
                          className="flex flex-row items-center"
                        >
                          <span className="text-gray-300 text-sm">
                            Spėjo laiku
                          </span>
                        </button>
                        <button
                          onClick={sortedDashboardTestReactionTime}
                          className="flex flex-row items-center"
                        >
                          <span className="text-gray-300 text-sm">
                            Reagavimo laikas
                          </span>
                        </button>
                        <button
                          onClick={sortedDashboardTestTimeInObject}
                          className="flex flex-row items-center"
                        >
                          <span className="text-gray-300 text-sm">
                            Laikas objekte
                          </span>
                        </button>
                        <button
                          onClick={sortedDashboardTestStatus}
                          className="flex flex-row items-center"
                        >
                          <span className="text-gray-300 text-sm">Būsena</span>
                        </button>
                        <button
                          onClick={sortedDashboardTestReason}
                          className="flex col-span-2 flex-row items-center"
                        >
                          <span className="text-gray-300 text-sm">
                            Suveikimo priežastis
                          </span>
                        </button>
                      </div>

                      <div className="pl-4 flex-col w-full items-center scrollbar-gone overflow-y-auto">
                        {sortedDashboardTestApi.map((data) => (
                          <DashboardList
                            key={data.id}
                            id={data.id}
                            date={data.date}
                            object={data.object}
                            name={data.name}
                            crew={data.crew}
                            intime={data.intime}
                            reactiontime={data.reactiontime}
                            timeinobject={data.timeinobject}
                            status={data.status}
                            reason={data.reason}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
