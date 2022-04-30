import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useRef,
} from "react";
import useLanguage from "../hook/useLanguage";
import SidebarBack from "../components/sidebars/back";
import { NewHeader } from "../components/headers/new";
import { InProcessHeader } from "../components/headers/inProcess";
import { FinishedHeader } from "../components/headers/finished";
import NewSideLeft from "../components/sides/newSideLeft";
import NewSideRight from "../components/sides/newSideRight";
import InProcessRightSide from "../components/sides/inProcessRight";
import DashboardMap from "../components/map/dashboard";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import GlobalContext from "../context/globalContext";

function New() {
  const { english, lithuanian, t } = useLanguage();
  const { pdfExportComponentNew } = useContext(GlobalContext);
  const { toPrintNew, setToPrintNew } = useContext(GlobalContext);

  return (
    <>
      <div className="container max-w-screen-xl">
        <div className="flex w-screen flex-row justify-center h-screen">
          <div className="flex flex-col h-full items-center w-full">
            <div className="flex flex-row w-full justify-between h-full">
              <SidebarBack />
              <div className="flex flex-col h-full w-full">
                {/* <NewHeader /> */}
                {/* <InProcessHeader /> */}
                <FinishedHeader />
                <div className="flex flex-row w-full justify-between h-full">
                  {toPrintNew ? (
                    <PDFExport
                      ref={pdfExportComponentNew}
                      scale={0.4}
                      paperSize="A4"
                      margin="1cm"
                    >
                      <div className="container max-w-screen-xl">
                        <div className="flex w-screen flex-row justify-center h-screen">
                          <div className="flex flex-col h-full items-center w-full">
                            <div className="flex flex-row w-full justify-between h-full">
                              <div className="flex flex-col h-full w-full">
                                <div className="flex flex-row w-full justify-between h-full">
                                  <DashboardMap />
                                  <div className="flex flex-col h-full justify-between overflow-y-auto scrollbar-gone w-2/4 bg-gray-100">
                                    <InProcessRightSide />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </PDFExport>
                  ) : (
                    <>
                      <div className="flex min-h-full overflow-y-auto scrollbar-gone flex-col w-2/4 bg-gray-100">
                        <NewSideLeft />
                      </div>
                      <DashboardMap />
                      <div className="flex flex-col h-full justify-between overflow-y-auto scrollbar-gone w-2/4 bg-gray-100">
                        <InProcessRightSide />
                        {/* <NewSideRight/> */}
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

export default New;
