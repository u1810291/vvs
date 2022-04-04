import React from "react";
import useLanguage from "../hook/useLanguage";
import RegularSidebar from "../components/sidebars/regular";
import { FilterHeader } from "../components/headers/filter";
import { FiltersList } from "../components/lists/filter.js";
import { OptionsList } from "../components/lists/options";
import { ObjectsList } from "../components/lists/objects";

function Dashboard() {
  const { english, lithuanian, t } = useLanguage();

  return (
    <>
      <div className="container max-w-screen-xl">
        <div className="flex w-screen flex-row justify-center h-screen">
          <div className="flex flex-col h-full items-center w-full">
            <div className="flex flex-row w-full justify-between h-full">
              <RegularSidebar />
              <div className="flex flex-col min-h-full w-full justify-between">
                <FilterHeader />
                <div className="flex flex-col h-full border-2 border-red-700">
                  <div className="flex flex-row w-full">
                    <div className="flex flex-col w-1/5"></div>
                    <div className="flex flex-col w-3/5">
                      <OptionsList />
                      <FiltersList />
                      <div className="flex flex-col sm:flex-row justify-between">
                        <div className="flex">
                          <button className="flex justify-center mr-2 rounded-sm px-4 border border-transparent text-xs font-normal text-gray-600 hover:shadow-none bg-gray-200 focus:outline-none">
                            0.07s
                          </button>
                        </div>
                        <div className="flex flex-row">
                          <img
                            className="h-4 w-4"
                            src={require("../assets/assets/doc.png")}
                          ></img>
                          <a className="flex mr-2 mt-2 mb-1 justify-center text-md font-light ">
                            Eksportuoti
                          </a>
                          <button className="flex justify-center mr-2 rounded-sm px-4 border border-transparent text-xs font-normal text-slate-600 hover:shadow-none bg-gray-200 focus:outline-none">
                            0.07s
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col w-1/5"></div>
                  </div>
                  <div className="flex flex-col w-full">
                    <ObjectsList />
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

export default Dashboard;
