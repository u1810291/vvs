import Button from 'components/Button';
import CrewDetail from 'feature/crew/component/CrewDetail';
import Detail from 'components/Disclosure/AsideDisclosure';
import ErrorNotification from 'feature/ui-notifications/components/ErrorNotification';
import MapTaskMarker from '../component/MapTaskMarker';
import SuccessNotification from 'feature/ui-notifications/components/SuccessNotification';
import TaskLogs from '../component/TaskLogDetail';
import useSubscription from 'hook/useSubscription';
import useTask from '../api/useTask';
import {GQL as ZONE_GQL} from 'feature/dislocation/api/useZonesForDashboard';
import {GQL} from 'feature/crew/api/useCrewsForEvent';
import {GoogleMap} from '@react-google-maps/api';
import {MapBreachNodeMarker} from 'feature/breach/components/MapBreachMarker';
import {MapCrewIconMarker} from 'feature/crew/component/MapCrewIconMarker';
import {caseMap} from '@s-e/frontend/flow-control';
import {errorToText} from 'api/buildApiHook';
import {getCrewLatLngLiteral} from 'feature/crew/utils';
import {getEmail, getName, getPhone} from 'feature/user/utils';
import {getObjectName} from 'feature/object/utils';
import {getTaskAddress, getTaskLatLngLiteral} from '../util';
import {mapByMaybe} from 'util/array';
import {renderWithProps} from 'util/react';
import {useEffect, useMemo, useRef} from 'react';
import {useGoogleApiContext} from 'context/google';
import {useNavigate, useParams} from 'react-router-dom';
import {useNotification} from 'feature/ui-notifications/context';
import {useTranslation} from 'react-i18next';
import {
  Maybe,
  Result,
  alt,
  bimap,
  branch,
  chain,
  filter,
  getPath,
  getProp,
  identity,
  isArray,
  isSame,
  isTruthy,
  map,
  merge,
  objOf,
  option,
  pathSatisfies,
  pipe,
  propSatisfies,
  reduce,
  safe,
  setProp,
  tap,
  isObject,
} from 'crocks';
import MapDislocationZone, {POLYGON_OPTIONS_TASK_MAP} from 'feature/dislocation/component/MapDislocationZone';
import Nullable from 'components/atom/Nullable';

const TaskEditForm = ({taskQuery, task}) => {
  const {t: to} = useTranslation('object');
  const {isLoaded, mGoogleMaps} = useGoogleApiContext();
  const mapRef = useRef();
  const fitBoundsCounter = useRef(0);

  const mMap = useMemo(() => (
    isLoaded ? safe(isTruthy, mapRef.current) : Maybe.Nothing()
  ), [isLoaded, mapRef.current])

  const zones = useSubscription(useMemo(() => ZONE_GQL, []));
  const crews = useSubscription(
    useMemo(() => GQL, []),
    useMemo(() => (
      getPath(['object', 'id'], task)
      .map(objOf('objectId'))
      .option(undefined)
    ), [task])
  );
  

  useEffect(() => {
    Maybe.of(map => m => taskLatLng => crewsLatLngs => {
      const bounds = new m.LatLngBounds();
      const newBounds = [taskLatLng, ...crewsLatLngs];
      newBounds.forEach(latLng => bounds.extend(latLng));

      if (newBounds.length <= fitBoundsCounter.current) {
        return;
      }

      if (task?.crew !== null) {
        newBounds.push({
          lat: task.crew?.latitude,
          lng: task.crew?.longitude
        });
      }
      
      newBounds.forEach(latLng => bounds.extend(latLng));
      map.fitBounds(bounds);
      fitBoundsCounter.current = newBounds.length;
    })
    .ap(mMap)
    .ap(mGoogleMaps)
    .ap(getTaskLatLngLiteral(task))
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
  }, [task, crews]);


  return (
    <section className='flex w-full'>
      <aside className='border-r border-gray-border h-full overflow-auto'>
        <div className='p-5 border-b border-gray-300 space-y-2'>
          <ObjectName {...taskQuery} />
          <Address {...taskQuery} />
        </div>
        <Detail title={to`edit.responsiblePeople`}>
          <RelatedUsers {...taskQuery} />
        </Detail>
      </aside>
      <div className='grow'>
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
                  getProp('logs'),
                  map(pipe(
                    filter(propSatisfies('type', isSame('DB_TRIGGER::crew_location'))),
                    mapByMaybe(pipe(
                      safe(pathSatisfies(['content', 'crew'], isObject)),
                      map(log => <MapBreachNodeMarker {...log.content.crew} key={log.id} />),
                    ))
                  )),
                  option(null),
                )(task)
              }

              <Nullable on={task?.status === 'NEW'}>
                {/* dislocation zones */}
                {
                  pipe(
                    getPath(['data', 'crew_zone']),
                    chain(safe(isArray)),
                    map(map(zone => <MapDislocationZone 
                      key={`MapDislocationZone-${zone?.id}`} zone={zone} 
                      options={POLYGON_OPTIONS_TASK_MAP}
                    />)),
                    option(null),
                  )(zones)
                }
                {/* crews */}
                {
                  pipe(
                    getPath(['data', 'crew']),
                    chain(safe(isArray)),
                    map(map(crew => <MapCrewIconMarker key={`MapCrewIconMarker-${crew?.id}`} {...crew} />),),
                    option(null),
                  )(crews)
                }
              </Nullable>

              <Nullable on={task?.crew !== null}>
                <MapCrewIconMarker key={`MapCrewIconMarker-${task?.crew?.id}`} {...task?.crew} />
              </Nullable>              

              {/* task */}
              <MapTaskMarker {...task} /> 
            </GoogleMap>
          ) : null
      }
      </div>
      <div className='max-w-lg'>
        {caseMap(() => <AsideSelectCrew />, [
          [pathSatisfies(['crew', 'id'], isTruthy), () => <AsideCancelableCrew {...task}/>],
        ], task)}
      </div>
    </section>
  );
};

const Crew = task => pipe(
  getProp('crew'),
  map(crew => ({crew, task})),
  map(renderWithProps(CrewDetail)),
  option(null)
)(task);

const AsideCancelableCrew = task => {
  return (
    <aside className={'border-r border-gray-border h-full overflow-auto'}>
      {renderWithProps([Crew, TaskLogs], task)}
    </aside>
  );
};

const AsideSelectCrew = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const {notify} = useNotification();
  const {t} = useTranslation();
  const {data: task, update} = useTask({id});

  const assign = crewId => () => (
    update(Result.of({id: task.id, crew_id: crewId}))
    .fork(
      error => notify(
        <ErrorNotification heading={t`apiError`}>
          {errorToText(identity, error)}
        </ErrorNotification>
      ),
      pipe(
        () => notify(<SuccessNotification heading={t`success`} />),
        tap(() => navigate(-1)),
      ),
    )
  );

  const crews = useSubscription(
    useMemo(() => GQL, []),
    useMemo(() => (
      getPath(['object', 'id'], task)
      .map(objOf('objectId'))
      .option(undefined)
    ), [task])
  );

  return (
    <aside className={'border-r border-gray-border h-full overflow-auto'}>
      {
        pipe(
          getPath(['data', 'crew']),
          chain(safe(isArray)),
          map(map(pipe(
            crew => ({
              key: crew.id,
              crew,
              crews,
              task,
              children: (
                <Button.Sm className='rounded-md py-1' onClick={assign(crew.id)}>
                  {t`assignTask`}
                </Button.Sm>
              ),
              title: JSON.stringify(crew, null, '  '), 
            }),
            renderWithProps(CrewDetail),
          ))),
          map(list => ({
            title: t`availableCrews`,
            children: list
          })),
          map(renderWithProps(<div />)),
          option(null),
        )(crews)
      }
    </aside>
  );
}

/**
 * RelatedUsers :: useTask() -> Array<Detal.Item>
 */
const RelatedUsers = useTask => (
  getPath(['object', 'users'], useTask)
  .chain(safe(isArray))
  .map(pipe(
    reduce((carry, item) => pipe(
      branch,
      bimap(pipe(getName, option('')), user => getPhone(user).alt(getEmail(user)).option('')),
      merge((name, phone) => ({
        key: `${name}${phone}`,
        left: name,
        right: phone
      })),
      a => setProp(a.key, a, carry),
    )(item), {}),
    Object.values,
    map(renderWithProps(Detail.Item)),
  ))
  .option(null)
);

const Address = pipe(
  getTaskAddress,
  map(str => <p key={str} className='text-steel'>{str}</p>),
  option(null),
);

const ObjectName = pipe(
  getProp('object'),
  chain(getObjectName),
  map(str => <p key={str} className='text-lg text-black'>{str}</p>),
  option(null),
);

export default TaskEditForm;
