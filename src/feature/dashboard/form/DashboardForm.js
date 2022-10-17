import React, {useEffect, useMemo, useRef} from 'react';

import SidebarRight from '../components/SidebarRight';
import SidebarLeft from '../components/SidebarLeft';
import {useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import Button from 'components/Button';
import {GQL as CREW_GQL} from 'feature/crew/api/useCrewsForEvent';
import {GQL as TASK_GQL} from 'feature/task/api/useTasksForEvent';
import useSubscription from 'hook/useSubscription';
import {GoogleMap} from '@react-google-maps/api';
import {MapCrewIconMarker} from 'feature/crew/component/MapCrewIconMarker';
import {useGoogleApiContext} from 'context/google';
import {pipe, getPath, chain, isArray, safe, map, option, Maybe, reduce, alt, isTruthy, objOf} from 'crocks';
import {getTaskLatLngLiteral} from 'feature/task/util';
import {getCrewLatLngLiteral} from 'feature/crew/utils';
import MapTaskMarker from 'feature/task/component/MapTaskMarker';

// updated_at + duration - new Date()
const lostConnection = (time) => {
  return new Date() - new Date(time) > 60000
}

const DashboardForm = () => {
  const {t} = useTranslation('dashboard');
  const mapRef = useRef();

  const nav = useNavigate();
  const tasksQuery = useMemo(() => TASK_GQL, []);
  const tasks = useSubscription(tasksQuery);
  const crews = useSubscription(
    useMemo(() => CREW_GQL, []),
    useMemo(() => (
      getPath(['object', 'id'], tasks.data?.events[1])
      .map(objOf('objectId'))
      .option(undefined)
    ), [tasks?.data?.events])
  );
  const {isLoaded, mGoogleMaps} = useGoogleApiContext();
  const temp = useMemo(() => ({
    data: crews?.data?.crew?.map((el) => ({
      connectionLost: el.user_settings.length ? lostConnection(el.user_settings[0]?.last_ping): false,
      ...el
    })
  )}), [crews?.data?.crew]);
  const mMap = useMemo(() => (
    isLoaded ? safe(isTruthy, mapRef.current) : Maybe.Nothing()
  ), [isLoaded, mapRef.current])
  
  useEffect(() => {
    Maybe.of(map => m => taskLatLng => crewsLatLngs => {
      const bounds = new m.LatLngBounds();
      [taskLatLng, ...crewsLatLngs].forEach(latLng => bounds.extend(latLng));
      map.fitBounds(bounds);
    })
    .ap(mMap)
    .ap(mGoogleMaps)
    .ap(getTaskLatLngLiteral(tasks?.data?.events[1]))
    .ap(
      pipe(
        getPath(['data', 'crew']),
        chain(safe(isArray)),
        map(reduce((carry, item) => (
          getCrewLatLngLiteral(item)
          .map(latLng => [...carry, latLng])
          .option(carry)
        ), [])),
        alt(Maybe.Just([]))
      )(crews)
    )
  }, [tasks, mGoogleMaps, crews]);

  return (
    <>
      <section className='flex flex-col h-screen scrollbar-gone overflow-y-auto w-1/4 bg-gray-100'>
        <div className='flex flex-row items-center border-b bg-white justify-between'>
          <h4 className='ml-2 self-center py-4 text-md font-normal'>{t`left.console`}</h4>
          <Button.Pxl onClick={() => {nav('/task/new')}}
            className='w-36 h-10 flex mr-2 justify-center items-center rounded-sm px-1 border-transparent drop-shadow shadow text-sm font-light text-white font-montserrat hover:shadow-none bg-slate-600 hover:bg-slate-500 focus:outline-none'>
            {t`left.create_task`}
          </Button.Pxl>
        </div>
        <aside className='border-l border-gray-border min-w-fit'>
          <SidebarLeft tasks={tasks} />
        </aside>
      </section>
      <section className='flex flex-col h-screen justify-between w-2/4 bg-gray-100'>
      {isLoaded
        ? (
          <GoogleMap
            {...useMemo(() => ({
              mapContainerStyle: {width: '100%', height: '100%'},
              onLoad: map => {mapRef.current = map}
            }), [])}
          >
            {
              pipe(
                getPath(['data', 'crew']),
                chain(safe(isArray)),
                map(map(crew => <MapCrewIconMarker key={`MapCrewIconMarker-${crew?.id}`} {...crew} />)),
                option(null),
              )(crews)
            }
            {
              pipe(
                getPath(['data', 'events']),
                chain(safe(isArray)),
                map(map(task => <MapTaskMarker key={`MapTaskIconMarker-${task.id}`} {...task} />)),
                option(null),
              )(tasks)
            }
          </GoogleMap>
        ) : null
      }
      </section>
      <section className='flex flex-col h-screen justify-between overflow-y-auto w-1/4 bg-gray-100'>
        <aside className='border-l border-gray-border min-w-fit'>
          <SidebarRight crews={temp} tasks={tasks} />
        </aside>
      </section>
    </>
  );
};

export default DashboardForm;
