import React, {
  useCallback,
  useState,
  useRef,
  useEffect,
  useContext,
} from "react";

import { Polygon } from "@react-google-maps/api";
import { GoogleMap } from "@react-google-maps/api";
import { ActiveCard } from "../../components/cards/active";
import { OverlayProvider, usePreventScroll } from "react-aria";
import { useFetch } from "../../hook/useFetch";
import { updateCalendar } from "../../api/queryForms/queryString/mutation";

import CheckBox from "../../components/input/CheckBox";
import CrewList from "../../components/lists/crewList";
import MainSidebar from "../../components/sidebars/main";
import RegularSidebar from "../../components/sidebars/main";
import SlideOver from "../../components/sidebars/slideOver";
import ControlledInput from "../../components/input/ControlledInput";
import CalendarTimeline from "../../components/calendar/CalendarTimeline";
import CreateCrewHeader from "../../components/headers/crew/createCrewHeader";
import AuthContext from "../../context/authContext";
import { useParams } from "react-router-dom";
import { crewsQuery } from "../../api/queryForms/queryString/query";
import useReactQuery from "../../hook/useQuery";

import useBoolean from "../../hook/useBoolean";
import useLanguage from "../../hook/useLanguage";

import { generate } from "shortid";

const CreateCrew = () => {
  const { id } = useParams();
  const { accessToken } = useContext(AuthContext);
  const { t, english, lithuanian } = useLanguage();
  const [events, setEvents] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const handleOnOpen = useCallback(() => {
    setIsOpen(true);
  }, []);
  const handleOnClose = useCallback(() => {
    setIsOpen(false);
  }, []);
  const [polygon, setPolygon] = useState([
    { lat: 55.95, lng: 23.3 },
    { lat: 55.9, lng: 23.35 },
    { lat: 55.85, lng: 23.3 },
  ]);
  const [polygonSetup, setPolygonSetup] = useState({
    strokeOpacity: 1,
    strokeWeight: 0.8,
    strokeColor: "#C32A2F",
    fillOpacity: 0.4,
    fillColor: "#C32A2F",
    clickable: true,
    draggable: true,
  });
  const [containerStyle, setContainerStyle] = useState({
    width: "100%",
    height: "100%",
  });
  const [center, setCenter] = useState({
    lat: 55.95,
    lng: 23.33,
  });

  const updateVariables = {
    updateCalendar: events,
  };

  const [crew, setCrew] = useState("");
  const [status, setStatus] = useState("");
  const [driver, setDriver] = useState("");

  const data = useReactQuery(crewsQuery, {}, accessToken);

  useEffect(() => {
    let hasura;
    // let monas;
    if (data.data) {
      hasura = data?.data?.monas_crew_related;
      // make custom logic to assign dispatch dislocations or/and events or merge and match app driver device number
      setCrew({ result: hasura });
      if (crew) {
        const obj = crew?.result;
        const data = obj?.find((x) => x.id === id);
        setCrewName(data.name);
        setCrewPhoneNumber(data.phone);
        setCrewShortHand(data.abbreviation);
        setStatus(data.status);
        setDriver(data.driver);
    }}}, [data.data]);

  // useEffect(() => {
  //   if (crew) {
  //     const obj = crew.result;
  //     const data = obj?.find((x) => x.id === id);
  //     setCrewName(data.name);
  //     setCrewPhoneNumber(data.phone);
  //     setCrewShortHand(data.abbreviation);
  //     setStatus(data.status);
  //     setDriver(data.driver);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [crew]);

  const {
    error: calendarErrors,
    data: calendarResponse,
    loading,
    fetchData: saveCalendarRecords,
  } = useFetch(updateCalendar, updateVariables, accessToken);

  const crewName = useRef("9 GRE");
  const setCrewName = useCallback((event) => {
    crewName.current = event;
  }, []);

  const crewShortHand = useRef("9");
  const setCrewShortHand = useCallback((event) => {
    crewShortHand.current = event;
  }, []);

  const crewID = useRef("54:21:9D:08:38:8C");
  const setCrewID = useCallback((event) => {
    crewID.current = event;
  }, []);

  const crewPhoneNumber = useRef("+37065612345");
  const setCrewPhoneNumber = useCallback((event) => {
    crewPhoneNumber.current = event;
  }, []);

  const crewAvailableToCallFrom = useRef("");
  const setCrewAvailableToCallFrom = useCallback((event) => {
    crewAvailableToCallFrom.current = event;
    // present value of database event
  }, []);

  const crewAutomaticallyAssign = useRef(false);
  const setCrewAutomaticallyAssign = useCallback((event) => {
    crewAutomaticallyAssign.current = event;
  }, []);

  const crewAssignUntilBreaks = useRef(false);
  const setCrewAssignUntilBreaks = useCallback((event) => {
    crewAssignUntilBreaks.current = event;
  }, []);

  useEffect(() => {
    saveCalendarRecords();
  }, [events]);

  // window.google = window.google ? window.google : {}

  return (
    <OverlayProvider>
      <div className="w-full h-screen">
        <div className="flex flex-row justify-center h-full">
          <div className="flex flex-col h-full items-center w-full">
            <div className="flex flex-row w-full justify-between h-full">
              <div className="flex flex-col bg-slate-600 pt-6 items-center w-20">
                <button
                  onClick={handleOnOpen}
                  className="flex flex-col py-2 items-center text-gray-400"
                >
                  <img
                    alt="menu"
                    className="w-4 h-4 mx-16"
                    src={require("../../assets/assets/hamburger.png")}
                  />
                </button>
              </div>
              <div className="flex flex-col min-h-full w-[calc(100%-80px)]">
                <CreateCrewHeader crew={status} />
                <section className={"ml-6 flex-auto flex"}>
                  <div className={"w-full flex mt-4"}>
                    <div className={"flex flex-col w-4/5"}>
                      <div className={"flex w-1/2 items-start mb-12"}>
                        <ControlledInput
                          title={"Pavadinimas"}
                          value={crewName.current}
                          setValue={setCrewName}
                          isRequired={true}
                          twBody={"w-2/5"}
                          placeholder={"įveskite tekstą"}
                        />
                        <ControlledInput
                          title={"Trumpas pav."}
                          value={crewShortHand.current}
                          setValue={setCrewShortHand}
                          isRequired={true}
                          twBody={"w-1/5"}
                          placeholder={"įveskite tekstą"}
                        />
                        <ControlledInput
                          title={"Įrenginio ID"}
                          value={crewID.current}
                          setValue={setCrewID}
                          twBody={"w-2/5"}
                          placeholder={"įveskite tekstą"}
                        />
                      </div>
                      <div className={"flex flex-col w-1/2"}>
                        <h2 className={"font-bold mb-2"}>
                          Automatinis priskyrimas
                        </h2>
                        <div className={"flex w-full justify-end"}>
                          <CheckBox
                            title={"Automatiškai priskirti"}
                            value={crewAutomaticallyAssign.current}
                            setValue={setCrewAutomaticallyAssign}
                            twBody={"w-2/5 self-end"}
                          />
                          <ControlledInput
                            title={"Telefonas"}
                            value={crewPhoneNumber.current}
                            setValue={setCrewPhoneNumber}
                            twBody={"w-2/5"}
                            placeholder={"įveskite numerį"}
                          />
                          <ControlledInput
                            title={"Skambinti po, s."}
                            value={crewAvailableToCallFrom.current}
                            setValue={setCrewAvailableToCallFrom}
                            twBody={"w-1/5"}
                            placeholder={"10"}
                          />
                        </div>
                        <div className={"mt-4"}>
                          <CheckBox
                            title={"Priskirti kol pertraukose"}
                            value={crewAssignUntilBreaks.current}
                            setValue={setCrewAssignUntilBreaks}
                            twBody={"w-2/5 self-end"}
                          />
                        </div>
                      </div>
                      <CalendarTimeline
                        titleText={t("eurocash.dislocationZoneSchedule")}
                        actionButtonTitle={t("eurocash.addZone")}
                        columnsTimeInterval={4}
                        events={events}
                        setEvents={setEvents}
                      />

                      <button
                        className={
                          "bg-red-700 py-4 px-20 text-white mt-auto mb-6 w-max rounded-sm"
                        }
                      >
                        Archyvuoti
                      </button>
                    </div>
                    <div className={"flex flex-col w-1/5"}>
                      <ActiveCard
                        key={generate()}
                        id={generate()}
                        crew={"G9"}
                        name={"9 GRE"}
                        status={"online"}
                        inBreak={false}
                        inTask={true}
                        askForBreak={false}
                        connection={"Prarastas rišys"}
                        driver={driver}
                      />
                      <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={12}
                      >
                        <Polygon path={polygon} options={polygonSetup} />
                        <>
                          <div className="flex flex-col items-center justify-center">
                            <div className="flex rounded-full border-4 border-green-600 bg-white w-8 h-8 mx-4 text-black text-xs font-normal justify-center items-center">
                              <p className="flex text-xs"> G9 </p>
                            </div>
                          </div>
                        </>
                      </GoogleMap>
                    </div>
                  </div>
                </section>
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

export default CreateCrew;
