import React, {useCallback, useState} from "react";
import useLanguage from "../../hook/useLanguage";
import {OverlayProvider, usePreventScroll} from 'react-aria';
import PermissionConfirmationHeader from '../../components/headers/permission/permissionConfirmationHeader';
import BreachMap from '../../components/map/breachMap';
import PermissionConfirmationSideRight from '../../components/sides/permissionConfirmationSideRight';
import SlideOver from '../../components/sidebars/slideOver';
import MainSidebar from '../../components/sidebars/main';

const PermissionConfirmation = () => {
  const { english, lithuanian, t } = useLanguage();
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
                <button className="flex flex-col py-2 items-center text-gray-400">
                  <img
                    onClick={handleOnOpen}
                    className="w-4 h-4 mx-16"
                    src={require("../../assets/assets/hamburger.png")}
                  />
                </button>
              </div>
              <div className="flex flex-col min-h-full w-full justify-between">
                <PermissionConfirmationHeader />
                <div className="flex flex-row min-h-screen sm:min-h-0 overflow-scroll sm:h-full">
                  <div className="flex w-4/5"/>
                  <div className="flex flex-col h-screen justify-between overflow-y-auto scrollbar-gone w-1/5 bg-gray-100">
                    <PermissionConfirmationSideRight />
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
};

export default PermissionConfirmation;
