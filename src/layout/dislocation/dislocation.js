import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useRef,
} from "react";
import useLanguage from "../../hook/useLanguage";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import { DislocationsHeader } from "../../components/headers/dislocation/dislocations";
import DislocationMap from "../../components/map/dislocationMap";
import DislocationSide from "../../components/sides/dislocationSide";
import DislocationSideToArchive from "../../components/sides/dislocationSideToArchive";
import GlobalContext from "../../context/globalContext";
import { OverlayProvider, usePreventScroll } from "react-aria";
import SlideOver from "../../components/sidebars/slideOver";
import MainSidebar from "../../components/sidebars/main";

function Dislocation() {
  const { expandFilterDislocations, setExpandFilterDislocations } =
    useContext(GlobalContext);
  const { selectedFilterDislocations, setSelectedFilterDislocations } =
    useContext(GlobalContext);
  const { filterListDislocations, setFilterListDislocations } =
    useContext(GlobalContext);
  const [isOpen, setIsOpen] = useState(false);
  const { english, lithuanian, t } = useLanguage();
  const preventScroll = usePreventScroll({ isDisabled: !isOpen });
  const handleOnOpen = useCallback(() => {
    setIsOpen(true);
  }, []);
  const handleOnClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <OverlayProvider>
      <div className="container max-w-screen-xl">
        <div className="flex w-screen flex-row justify-center h-screen">
          <div className="flex flex-col h-full items-center w-full">
            <div className="flex flex-row w-full justify-between h-full">
              <div className="flex flex-col bg-slate-600 pt-6 items-center w-20">
                <button className="flex flex-col items-center py-2 text-gray-400">
                  <img
                    onClick={handleOnOpen}
                    className="w-4 h-4 mx-16"
                    src={require("../../assets/assets/hamburger.png")}
                  />
                </button>
                <img
                  className="pt-1"
                  src={require("../../assets/assets/Line.png")}
                ></img>
                {filterListDislocations.map((filter) => {
                  if (filter.savedToMenu === true) {
                    return (
                      <button
                        key={filter.id}
                        // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
                        onClick={() => setSelectedFilterDislocations(filter.id)}
                        className={
                          selectedFilterDislocations === filter.id
                            ? "font-light text-md mt-6 text-white"
                            : "font-light text-md mt-6 text-gray-400 hover:text-white"
                        }
                      >
                        {filter.filterShortName}
                      </button>
                    );
                  }
                })}
              </div>
              <div className="flex flex-col min-h-full w-full justify-between">
                <DislocationsHeader />
                <div className="flex flex-row min-h-screen sm:min-h-0 sm:h-full"> {/* overflow-scroll */}
                  <div className="flex flex-col h-full justify-between overflow-y-auto scrollbar-gone w-2/6">
                    {/* <DislocationSide /> */}
                    <DislocationSideToArchive />
                  </div>
                  <DislocationMap />
                </div>
              </div>
            </div>
          </div>
        </div>
        <SlideOver isOpen={isOpen} onClose={handleOnClose}>
          <MainSidebar />
        </SlideOver>
      </div>
    </OverlayProvider>
  );
}

export default Dislocation;
