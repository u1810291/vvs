import React, {useCallback, useState} from "react";
import useLanguage from "../../hook/useLanguage";
import { CreateCrewHeader } from "../../components/headers/crew/createCrewHeader";
import {OverlayProvider, usePreventScroll} from 'react-aria';
import SlideOver from '../../components/sidebars/slideOver';
import MainSidebar from '../../components/sidebars/main';

function CreateCrew() {
  const {english, lithuanian, t} = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const handleOnOpen = useCallback(() => { setIsOpen(true)},[]);
  const handleOnClose = useCallback(() => { setIsOpen(false)},[]);
  return (
    <OverlayProvider>
      <div className="container max-w-screen-xl">
        <div className="flex w-screen flex-row justify-center min-h-screen sm:h-screen relative overflow-hidden">
          <div className="flex flex-col h-full items-center w-full">
            <div className="flex flex-row w-full justify-between h-full">
              <div className="flex flex-col bg-slate-600 pt-6 items-center w-20">
                <button className="flex flex-col items-center text-gray-400">
                  <img
                    onClick={handleOnOpen}
                    className="w-4 h-4 mx-16"
                    src={require("../../assets/assets/hamburger.png")}
                  />
                </button>
              </div>
              <div className="flex flex-col min-h-full w-full justify-between">
                <CreateCrewHeader />
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

export default CreateCrew;
