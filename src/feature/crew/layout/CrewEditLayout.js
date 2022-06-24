import React, {useCallback, useState, useRef, useEffect, useContext} from 'react';
import {Polygon} from '@react-google-maps/api';
import {ActiveCard} from '../../../components/obsolete/cards/active';
import Map from '../../map/component/Map';
import CheckBox from '../../../components/obsolete/input/CheckBox';
import ControlledInput from '../../../components/obsolete/input/ControlledInput';
import CalendarTimeline from '../../../components/CalendarTimeline/CalendarTimeline';
import CreateCrewHeader from '../../../components/obsolete/headers/crew/createCrewHeader';
import {useParams} from 'react-router-dom';
import {crewsQuery} from '../../../mocks/queryForms/queryString/query';
import SidebarLayout from '../../../layout/SideBarLayout';

import useLanguage from '../../../hook/useLanguage';

import {generate} from 'shortid';

const CrewEditLayout = () => {
  const {id} = useParams();
  const {accessToken} = useContext(AuthContext);
  const {t, english, lithuanian} = useLanguage();
  const [events, setEvents] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const handleOnOpen = useCallback(() => {
    setIsOpen(true);
  }, []);
  const handleOnClose = useCallback(() => {
    setIsOpen(false);
  }, []);
  const [polygon, setPolygon] = useState([
    {lat: 55.95, lng: 23.3},
    {lat: 55.9, lng: 23.35},
    {lat: 55.85, lng: 23.3},
  ]);
  const [polygonSetup, setPolygonSetup] = useState({
    strokeOpacity: 1,
    strokeWeight: 0.8,
    strokeColor: '#C32A2F',
    fillOpacity: 0.4,
    fillColor: '#C32A2F',
    clickable: true,
    draggable: true,
  });
  const [containerStyle, setContainerStyle] = useState({
    width: '100%',
    height: '100%',
  });
  const [center, setCenter] = useState({
    lat: 55.95,
    lng: 23.33,
  });

  const updateVariables = {
    updateCalendar: events,
  };

  const [crew, setCrew] = useState('');
  const [status, setStatus] = useState('');
  const [driver, setDriver] = useState('');

  const data = useReactQuery(crewsQuery, {}, accessToken);

  useEffect(() => {
    let hasura;
    if (data.data) {
      hasura = data?.data?.monas_crew_related;
      // make custom logic to assign dispatch dislocations or/and events or merge and match app driver device number
      setCrew({result: hasura});
      if (crew) {
        const obj = crew?.result;
        const data = obj?.find((x) => x.id === id);
        setCrewName(data.name);
        setCrewPhoneNumber(data.phone);
        setCrewShortHand(data.abbreviation);
        setStatus(data.status);
        setDriver(data.driver);
    }}}, [data.data]);

  useEffect(() => {
    if (crew) {
      const obj = crew.result;
      const data = obj.find((x) => x.id === id);
      setCrewName(data.name);
      setCrewPhoneNumber(data.phone);
      setCrewShortHand(data.abbreviation);
      setStatus(data.status);
      setDriver(data.driver);
    }
  }, [crew]);

  const {
    error: calendarErrors,
    data: calendarResponse,
    loading,
    fetchData: saveCalendarRecords,
  } = {}


  const crewName = useRef('9 GRE');
  const setCrewName = useCallback(event => {
    crewName.current = event
  }, []);

  const crewShortHand = useRef('9');
  const setCrewShortHand = useCallback(event => {
    crewShortHand.current = event
  }, []);

  const crewID = useRef('54:21:9D:08:38:8C');
  const setCrewID = useCallback(event => {
    crewID.current = event
  }, []);

  const crewPhoneNumber = useRef('+37065612345');
  const setCrewPhoneNumber = useCallback(event => {
    crewPhoneNumber.current = event
  }, []);

  const crewAvailableToCallFrom = useRef('');
  const setCrewAvailableToCallFrom = useCallback(event => {
    crewAvailableToCallFrom.current = event
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
    <SidebarLayout>
      <CreateCrewHeader crew={status} />
      <section className={'ml-6 flex-auto flex'}>
        <div className={'w-full flex mt-4'}>
          <div className={'flex flex-col w-4/5'}>
            <div className={'flex w-1/2 items-start mb-12'}>
              <ControlledInput
                title={t('crew.name')}
                value={crewName.current}
                setValue={setCrewName}
                isRequired={true}
                twBody={'w-2/5'}
                placeholder={t('input.placeholder.enterText')}
              />
              <ControlledInput
                title={t('input.label.shortName')}
                value={crewShortHand.current}
                setValue={setCrewShortHand}
                isRequired={true}
                twBody={'w-1/5'}
                placeholder={t('input.placeholder.enterText')}
              />
              <ControlledInput
                title={t('input.lebel.deviceID')}
                value={crewID.current}
                setValue={setCrewID}
                twBody={'w-2/5'}
                placeholder={'įveskite tekstą'}
              />
            </div>
            <div className={'flex flex-col w-1/2'}>
              <h2 className={'font-bold mb-2'}>Automatinis priskyrimas</h2>
              <div className={'flex w-full justify-end'}>
                <CheckBox
                  title={'Automatiškai priskirti'}
                  value={crewAutomaticallyAssign.current}
                  setValue={setCrewAutomaticallyAssign}
                  twBody={'w-2/5 self-end'}
                />
                <ControlledInput
                  title={'Telefonas'}
                  value={crewPhoneNumber.current}
                  setValue={setCrewPhoneNumber}
                  twBody={'w-2/5'}
                  placeholder={'įveskite numerį'}
                />
                <ControlledInput
                  title={'Skambinti po, s.'}
                  value={crewAvailableToCallFrom.current}
                  setValue={setCrewAvailableToCallFrom}
                  twBody={'w-1/5'}
                  placeholder={'10'}
                />
              </div>
              <div className={'mt-4'}>
                <CheckBox
                  title={'Priskirti kol pertraukose'}
                  value={crewAssignUntilBreaks.current}
                  setValue={setCrewAssignUntilBreaks}
                  twBody={'w-2/5 self-end'}
                />
              </div>
            </div>
            <CalendarTimeline
              titleText={t('eurocash.dislocationZoneSchedule')}
              actionButtonTitle={t('eurocash.addZone')}
              columnsTimeInterval={4}
              events={events}
              setEvents={setEvents}
            />

            <button className={'bg-red-700 py-4 px-20 text-white mt-auto mb-6 w-max rounded-sm'}>
              {t('button.delete')}
            </button>
          </div>
          <div className={'flex flex-col w-1/5'}>
            <ActiveCard
              key={generate()}
              id={generate()}
              crew={'G9'}
              name={'9 GRE'}
              status={'online'}
              inBreak={false}
              inTask={true}
              askForBreak={false}
              connection={'Prarastas rišys'}
              driver={driver}
            />
            <Map>
              <Polygon path={polygon} options={polygonSetup} />
            </Map>
          </div>
        </div>
      </section>
    </SidebarLayout>
  );
};

export default CrewEditLayout;
