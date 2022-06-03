import React, {useCallback, useState} from "react";

import MainSidebar from "../../components/sidebars/main";
import RegularSidebar from "../../components/sidebars/main";
import SlideOver from "../../components/sidebars/slideOver";
import CalendarTimeline from "../../components/calendar/CalendarTimeline";
import {CrewList} from "../../components/lists/crewList";
import {OverlayProvider, usePreventScroll} from "react-aria";
import {CreateCrewHeader} from "../../components/headers/crew/createCrewHeader";

import useBoolean from '../../hook/useBoolean';
import useLanguage from "../../hook/useLanguage";

import {generate} from "shortid";

function CreateCrew() {
  const {t} = useLanguage();
  const [events, setEvents] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const handleOnOpen = useCallback(() => {setIsOpen(true)},[]);
  const handleOnClose = useCallback(() => {setIsOpen(false)},[]);

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
              <div className="flex flex-col min-h-full w-full">
                <CreateCrewHeader />
                <CalendarTimeline
                  titleText={t("eurocash.dislocationZoneSchedule")}
                  actionButtonTitle={t("eurocash.addZone")}
                  columnsTimeInterval={4}
                  events={events}
                  setEvents={setEvents}
                />
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
