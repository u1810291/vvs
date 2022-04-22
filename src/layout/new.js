import React from "react";
import useLanguage from "../hook/useLanguage";
import SidebarBack from "../components/sidebars/back";
import { NewHeader } from "../components/headers/new";
import NewSideLeft from "../components/sides/newSideLeft";
import NewSideRight from "../components/sides/newSideRight";
import DashboardMap from "../components/map/dashboard";

function Dashboard() {
  const { english, lithuanian, t } = useLanguage();

  return (
    <>
      <div className="container max-w-screen-xl">
        <div className="flex w-screen flex-row justify-center h-screen">
          <div className="flex flex-col h-full items-center w-full">
            <div className="flex flex-row w-full justify-between h-full">
              <SidebarBack />  
              <div className="flex flex-col h-full w-full">
              <NewHeader />
              <div className="flex flex-row w-full justify-between h-full">
              <div className="flex min-h-full overflow-y-auto scrollbar-gone flex-col w-3/12 bg-gray-100">
                <NewSideLeft />
              </div>
              <DashboardMap />
              <div className="flex flex-col h-full justify-between overflow-y-auto scrollbar-gone w-3/12 bg-gray-100">
                <NewSideRight/>
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
