import React, {useCallback, useState} from "react";

import {OverlayProvider} from "react-aria";
import MainSidebar from "../components/sidebars/main";
import SlideOver from '../components/sidebars/slideOver';

const SidebarLayout = ({children}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOnOpen = useCallback(() => {setIsOpen(true)},[]);
  const handleOnClose = useCallback(() => {setIsOpen(false)},[]);
  return (
    <OverlayProvider>
      <div className="w-full h-screen">
        <div className="flex flex-row w-full justify-between h-full">
          <div className="flex flex-col bg-slate-600 pt-6 items-center w-20">
            <button className="flex flex-col items-center text-gray-400">
              <img
                onClick={handleOnOpen}
                className="w-4 h-4 mx-16"
                src={require("./../assets/assets/hamburger.png")}
              />
            </button>
          </div>
          <div className="w-full">
          {children}
          </div>
        </div>
        <SlideOver isOpen={isOpen} onClose={handleOnClose}>
          <MainSidebar />
        </SlideOver>
      </div>
    </OverlayProvider>
  );
};

export default SidebarLayout;
