import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useRef,
} from "react";
import useLanguage from "../../hook/useLanguage";
import {PDFExport, savePDF} from "@progress/kendo-react-pdf";
import {BreachHeader} from '../../components/headers/breach/breachHeader';
import BreachMap from '../../components/map/breachMap';
import BreachSideRight from '../../components/sides/breachSideRight';
import {OverlayProvider, usePreventScroll} from 'react-aria';
import SlideOver from '../../components/sidebars/slideOver';
import MainSidebar from '../../components/sidebars/main';

function Breach() {
  const [isOpen, setIsOpen] = useState(false);
  const { english, lithuanian, t } = useLanguage();
  const preventScroll = usePreventScroll({ isDisabled: !isOpen });
  const handleOnOpen = useCallback(() => { setIsOpen(true)},[]);
  const handleOnClose = useCallback(() => { setIsOpen(false)},[]);
  return (
    <OverlayProvider>
      <div className="container max-w-screen-xl">
        <div className="flex w-screen flex-row justify-center min-h-screen sm:h-screen relative overflow-hidden">
          <div className="flex flex-col h-full items-center w-full">
            <div className="flex flex-row w-full justify-between h-full">
              {/* TODO: from 30 to 38 line move to separate component "Sidebar" */}
              <div className="flex flex-col bg-slate-600 pt-6 items-center w-20">
                <button className="flex flex-col items-center py-2 text-gray-400">
                  <img
                    onClick={handleOnOpen}
                    className="w-4 h-4 mx-16"
                    src={require("../../assets/assets/hamburger.png")}
                  />
                </button>
              </div>
              <div className="flex flex-col min-h-full w-full justify-between">
                <BreachHeader />
                <div className="flex flex-row min-h-screen sm:min-h-0 overflow-scroll sm:h-full">
                  <BreachMap />
                  <div className="flex flex-col h-full justify-between overflow-y-auto scrollbar-gone w-1/5 bg-gray-100">
                    <BreachSideRight />
                  </div>
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

export default Breach;
