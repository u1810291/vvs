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
          <div className="flex flex-col bg-slate-600 items-center w-20">
            <button className="focus:outline-none p-6 flex flex-col items-center text-gray-400 hover:text-white transition" onClick={handleOnOpen}>
              <svg className="fill-current" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="2" cy="2" rx="2" ry="2"/>
                <ellipse cx="8" cy="2" rx="2" ry="2"/>
                <ellipse cx="14" cy="2" rx="2" ry="2"/>
                <ellipse cx="2" cy="8" rx="2" ry="2"/>
                <ellipse cx="8" cy="8" rx="2" ry="2"/>
                <ellipse cx="14" cy="8" rx="2" ry="2"/>
                <ellipse cx="2" cy="14" rx="2" ry="2"/>
                <ellipse cx="8" cy="14" rx="2" ry="2"/>
                <ellipse cx="14" cy="14" rx="2" ry="2"/>
              </svg>
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
