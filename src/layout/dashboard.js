import React, { useCallback, useState } from "react";
import DashboardSidebar from "../components/sidebars/dashboard";
import DashboardSideLeft from "../components/sides/dashboardLeft";
import DashboardSideRight from "../components/sides/dashboardRight";
import DashboardMap from "../components/map/dashboard";
import SlideOver from "../components/sidebars/slideOver";
import { OverlayProvider, usePreventScroll } from 'react-aria';

function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const handleOnClose = useCallback(() => {
    setIsOpen(false);
  },[]);

  usePreventScroll({ isDisabled: !isOpen });

  return (
    <>
      <OverlayProvider>
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
              <SlideOver
                isOpen={isOpen}
                onClose={handleOnClose}
                title="Item Details"
              >
                <div className="flex flex-col">
                  <input type="text" className="border-gray-300 rounded-md" />
                </div>
              </SlideOver>
            </div>
          </div>
        </div>
      </OverlayProvider>
    </>
  );
}

export default Dashboard;
