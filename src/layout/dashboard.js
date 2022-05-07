/* eslint-disable react-perf/jsx-no-new-function-as-prop */
import React, { useState } from "react";
import DashboardSideLeft from "../components/sides/dashboardLeft";
import DashboardSideRight from "../components/sides/dashboardRight";
import DashboardMap from "../components/map/dashboard";
import SlideOver from "../components/sidebars/slideOver";
import { OverlayProvider, usePreventScroll } from "react-aria";
import MainSidebar from "../components/sidebars/main";

function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const handleOnClose = () => setIsOpen(false);

  usePreventScroll({ isDisabled: !isOpen });

  return (
    <OverlayProvider>
      <div className="container max-w-screen-xl">
        <div className="flex w-screen flex-row justify-center h-screen">
          <div className="flex flex-col h-full items-center w-full">
            <div className="flex flex-row w-full justify-between h-full">
              <div className="flex flex-col bg-slate-600 pt-6 items-center w-20">
                <button className="flex flex-col items-center">
                  <img
                    onClick={() => setIsOpen(true)}
                    className="w-4 h-4 mx-16"
                    src={require("../assets/assets/hamburger.png")}
                  />
                </button>
              </div>
              <div className="flex min-h-full overflow-y-auto scrollbar-gone flex-col w-2/4 bg-gray-100">
                <DashboardSideLeft />
              </div>
              <DashboardMap />
              <div className="flex flex-col h-screen justify-between overflow-y-auto scrollbar-gone w-2/4 bg-gray-100">
                <DashboardSideRight />
              </div>
            </div>
            <SlideOver isOpen={isOpen} onClose={handleOnClose}>
              <MainSidebar />
            </SlideOver>
          </div>
        </div>
      </div>
    </OverlayProvider>
  );
}

export default Dashboard;
