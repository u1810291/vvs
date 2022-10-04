import {KeyIcon} from '@heroicons/react/solid';
import {errorToText} from 'api/buildApiHook';
import {augmentsToUsers} from 'api/buildUserQuery';
import Tag from 'components/atom/Tag';
import Button from 'components/Button';
import Detail from 'components/Disclosure/AsideDisclosure';
import {useAuth} from 'context/auth';
import {useGoogleApiContext} from 'context/google';
import {getPath, getProp, merge, pipe, branch, map, chain, safe, isTruthy, option, isArray, bimap, setProp, reduce, getPathOr, getPropOr, flip, objOf, propSatisfies, not, isEmpty, ifElse, constant, identity, Async, Result, tap} from 'crocks';
import maybeToAsync from 'crocks/Async/maybeToAsync';
import {GQL} from 'feature/crew/api/useCrewsForEvent';
import CrewIcon from 'feature/crew/component/CrewIcon';
import {getCrewCoordinates} from 'feature/crew/utils';
import {getObjectName} from 'feature/object/utils';
import ErrorNotification from 'feature/ui-notifications/components/ErrorNotification';
import SuccessNotification from 'feature/ui-notifications/components/SuccessNotification';
import {useNotification} from 'feature/ui-notifications/context';
import {getEmail, getName, getPhone} from 'feature/user/utils';
import useAsyncSwr from 'hook/useAsyncSwr';
import useSubscription from 'hook/useSubscription';
import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigate, useParams} from 'react-router-dom';
import {renderWithProps} from 'util/react';
import useTask from '../api/useTask';
import {TaskListRoute} from '../routes';
import {getTaskAddress, getTaskCoordinates} from '../util';
import Map from 'feature/dashboard/components/Map';

export const CrewName = ({crew}) => (
  getProp('name', crew)
  .map(value => <p key={value} className='text-black'>{value}</p>)
  .option(null)
)

export const CrewDriverName = ({crew, crews}) => {
  const auth = useAuth();
  const driverUsers = useAsyncSwr(crews, params => 
    augmentsToUsers(auth, getProp('driver_user_id'), getPathOr([], ['data', 'crew'], params))
    .map(reduce((carry, item) => setProp(item.id, item, carry), {}))
  );

  return (
    getProp('driver_user_id', crew)
    .chain(safe(isTruthy))
    .chain(flip(getProp)(getPropOr({}, 'data', driverUsers)))
    .chain(getName)
    .map(value => <p key={value} className='text-steel'>{value}</p>)
    .option(null)
  )
};

const TaskEditForm = () => {
  const {id} = useParams();
  const {t: to} = useTranslation('object');
  const {data: task, update} = useTask({id});
  const {t} = useTranslation();
  const navigate = useNavigate();
  const query = useMemo(() => GQL, []);
  const variables = useMemo(() => (
    getPath(['object', 'id'], task)
    .map(objOf('objectId'))
    .option(undefined)
  ), [task]);

  const {notify} = useNotification();

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

  const crews = useSubscription(query, variables);

  return (
    <section className='min-h-screen h-full flex w-screen'>
      <aside className={'border-r border-gray-border h-full'}>
        <div className='p-5 border-b border-gray-300 space-y-2'>
          <ObjectName {...task} />
          <Address {...task} />
        </div>
        <Detail title={to`edit.responsiblePeople`}>
          <RelatedUsers {...task} />
        </Detail>
      </aside>
      <div className='flex flex-col h-screen justify-between w-full bg-gray-100'>
        <Map {...task} {...crews} />
      </div>
      <aside className='border-r border-gray-border h-full'>
      {
        pipe(
          getPath(['data', 'crew']),
          chain(safe(isArray)),
          map(map(pipe(
            crew => ({
              key: crew.id,
              children: (
                <div className='flex items-start space-x-4 w-full'>
                  <CrewIcon {...crew} />
                  <div className='flex-1'>
                    <CrewName crew={crew}/>
                    <CrewDriverName crew={crew} crews={crews} />
                  </div>
                  <div className='flex-col md:flex-row flex items-end md:items-start md:space-y-0 space-y-2 md:space-x-2'>
                    <CrewKeyIcon {...crew} />
                    <CrewDistanceDetails crew={crew} event={task} />
                    <Button.Sm className='rounded-md py-1' onClick={assign(crew.id)}>{t`assignTask`}</Button.Sm>
                  </div>
                </div>
              ),
              title: JSON.stringify(crew, null, '  '), 
            }),
            renderWithProps(Detail.Item),
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
    </section>
  );
};

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

const CrewKeyIcon = ifElse(
  propSatisfies(
    'object_key_boxes',
    not(isEmpty),
  ),
  constant(<KeyIcon className='w-5 h-5 text-gray-300' />),
  constant(null),
);

const DirectionsTag = props => <Tag.Sm className='bg-gray-300 text-black whitespace-nowrap' {...props} />

const CrewDistanceDetails = ({crew, event}) => {
  const {route, mGoogleMaps} = useGoogleApiContext();
  const toLatLng = mGoogleMaps
  .map(maps => a => new maps.LatLng(a.latitude, a.longitude))
  .option(identity);

  const {data: distanceResponse} = useAsyncSwr({distanceToObject: 'yup', crew, event}, () => (
    Async.of(origin => destination => route(origin, destination))
    .ap(maybeToAsync('no crew coordinates', getCrewCoordinates(crew).map(toLatLng)))
    .ap(maybeToAsync('no task coordinates', getTaskCoordinates(event).map(toLatLng)))
    .chain(identity)
  ));

  return (
  <>
    <CrewToEventETA {...distanceResponse} />
    <CrewToEventDistance {...distanceResponse} />
  </>
  );
};

const CrewToEventDistance = pipe(
  getPath(['routes', 0, 'legs', 0, 'distance', 'text']),
  map(objOf('children')),
  map(renderWithProps(DirectionsTag)),
  option(null)
);
const CrewToEventETA = pipe(
  getPath(['routes', 0, 'legs', 0, 'duration', 'text']),
  map(objOf('children')),
  map(renderWithProps(DirectionsTag)),
  option(null)
);

export default TaskEditForm;
