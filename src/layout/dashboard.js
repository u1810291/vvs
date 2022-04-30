import React from "react";
import useLanguage from "../hook/useLanguage";
import DashboardSidebar from "../components/sidebars/dashboard";
import DashboardSideLeft from "../components/sides/dashboardLeft";
import DashboardSideRight from "../components/sides/dashboardRight";
import DashboardMap from "../components/map/dashboard";

function Dashboard() {
  const { english, lithuanian, t } = useLanguage();

  return (
    <>
      <div className="container max-w-screen-xl">
        <div className="flex w-screen flex-row justify-center h-screen">
          <div className="flex flex-col h-full items-center w-full">
            <div className="flex flex-row w-full justify-between h-full">
              <DashboardSidebar />
              <div className="flex min-h-full overflow-y-auto scrollbar-gone flex-col w-2/4 bg-gray-100">
                <DashboardSideLeft />
              </div>
              <DashboardMap />
              <div className="flex flex-col h-screen justify-between overflow-y-auto scrollbar-gone w-2/4 bg-gray-100">
                <DashboardSideRight />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
