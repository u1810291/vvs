import {caseMap} from '@s-e/frontend/flow-control';
import CrewDetail from 'feature/crew/component/CrewDetail';
import {errorToText} from 'api/buildApiHook';
import Button from 'components/Button';
import Detail from 'components/Disclosure/AsideDisclosure';
import {GQL} from 'feature/crew/api/useCrewsForEvent';
import {getObjectName} from 'feature/object/utils';
import ErrorNotification from 'feature/ui-notifications/components/ErrorNotification';
import SuccessNotification from 'feature/ui-notifications/components/SuccessNotification';
import {useNotification} from 'feature/ui-notifications/context';
import {getEmail, getName, getPhone} from 'feature/user/utils';
import useSubscription from 'hook/useSubscription';
import {useEffect, useMemo, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigate, useParams} from 'react-router-dom';
import {renderWithProps} from 'util/react';
import useTask from '../api/useTask';
import {TaskListRoute} from '../routes';
import {getTaskAddress, getTaskLatLngLiteral} from '../util';
import TaskLogs from '../component/TaskLogDetail';
import {GoogleMap} from '@react-google-maps/api';
import {useGoogleApiContext} from 'context/google';
import {
  Maybe,
  Result,
  alt,
  bimap,
  branch,
  chain,
  getPath,
  getProp,
  identity,
  isArray,
  isTruthy,
  map,
  merge,
  objOf,
  option,
  pathSatisfies,
  pipe,
  reduce,
  safe,
  setProp,
  tap
} from 'crocks';
import {getCrewLatLngLiteral} from 'feature/crew/utils';
import {MapCrewIconMarker} from 'feature/crew/component/MapCrewIconMarker';
import MapTaskMarker from '../component/MapTaskMarker';

const TaskEditForm = ({taskQuery, task}) => {
  const {t: to} = useTranslation('object');
  const {isLoaded, mGoogleMaps} = useGoogleApiContext();
  const mapRef = useRef();

  const mMap = useMemo(() => (
    isLoaded ? safe(isTruthy, mapRef.current) : Maybe.Nothing()
  ), [isLoaded, mapRef.current])

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
      [taskLatLng, ...crewsLatLngs].forEach(latLng => bounds.extend(latLng));
      map.fitBounds(bounds);
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
  }, [task, mGoogleMaps, crews]);

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
                  getPath(['data', 'crew']),
                  chain(safe(isArray)),
                  map(map(crew => <MapCrewIconMarker key={`MapCrewIconMarker-${crew?.id}`} {...crew} />)),
                  option(null),
                )(crews)
              }
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
        tap(() => navigate(TaskListRoute.props.path)),
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
          map(renderWithProps(Detail)),
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
