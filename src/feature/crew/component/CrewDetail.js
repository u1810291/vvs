import CrewDriverName from './CrewDriverName';
import CrewIcon from './CrewIcon';
import CrewName from './CrewName';
import Detail from 'components/Disclosure/AsideDisclosure';
import Nullable from 'components/atom/Nullable';
import Tag from 'components/atom/Tag';
import useAsyncSwr from 'hook/useAsyncSwr';
import {KeyIcon} from '@heroicons/react/solid';
import {getCrewCoordinates} from '../utils';
import {getTaskCoordinates} from 'feature/task/util';
import {intervalToDuration, isFuture, parseISO} from 'date-fns';
import {joinString} from '@s-e/frontend/transformer/array';
import {renderWithChildren, renderWithProps} from 'util/react';
import {titleCaseWord} from '@s-e/frontend/transformer/string';
import {useEffect, useMemo, useRef, useState} from 'react';
import {useGoogleApiContext} from 'context/google';
import {
  Async,
  Maybe,
  chain,
  constant,
  find,
  getPath,
  getProp,
  identity,
  ifElse,
  isArray,
  isEmpty,
  isNil,
  isTruthy,
  map,
  maybeToAsync,
  not,
  objOf,
  option,
  pipe,
  propSatisfies,
  safe,
} from 'crocks';

/**
 * @type {(crew: Object, crews: Array<Object>, task: Object: children: ReactNode) => import('react').ReactNode}
 */
const CrewDetail = ({crew, crews, task, children}) => (
  <Detail.Item>
    <div className='flex items-start space-x-4 w-full bg-white'>
      <CrewIcon {...crew} />
      <div className='flex-1'>
        <CrewName {...crew}/>
        <CrewDriverName crew={crew} crews={crews || [crew]} />
      </div>
      <div className='flex-col md:flex-row flex items-end md:items-start md:space-y-0 space-y-2 md:space-x-2'>
        <CrewPermission {...crew} />
        <Nullable on={isTruthy(crew) && isTruthy(task)}>
          <CrewKeyIcon {...crew} />
          <CrewDistanceDetails crew={crew} task={task} />
        </Nullable>
        {children}
      </div>
    </div>
  </Detail.Item>
);

export default CrewDetail;

/**
 * @type {(crew: Object) => import('react').ReactNode}
 */
const CrewKeyIcon = ifElse(
  propSatisfies('object_key_boxes', not(isEmpty)),
  constant(<KeyIcon className='w-5 h-5 text-gray-300' />),
  constant(null),
);

/**
 * @type {(crewPermission: Object) => import('react').ReactNode}
 */
const CrewPermissionTitle = pipe(
  chain(getPath(['request', 'value'])),
  map(titleCaseWord),
  map(renderWithChildren(<p className='text-steel' />)),
  option(null),
);

/**
 * @type {(crew: Object) => import('react').ReactNode}
 */
const CrewPermission = crew => {
  const permission = useMemo(() => getActivePermissionM(crew), [crew]);

  return (
    <>
      <CrewPermissionTitle {...permission} />
      <CrewPermissionTimer {...permission} />
    </>
  );
}

export const DirectionsTag = props => <Tag.Sm className='bg-gray-300 text-black whitespace-nowrap' {...props} />

/**
 * @type {(directionsResponse: google.maps.DirectionsResult) => import('react').ReactNode}
 */
export const CrewToTaskDistance = pipe(
  getPath(['routes', 0, 'legs', 0, 'distance', 'text']),
  map(objOf('children')),
  map(renderWithProps(DirectionsTag)),
  option(null)
);

/**
 * @type {(directionsResponse: google.maps.DirectionsResult) => import('react').ReactNode}
 */
export const CrewToTaskETA = pipe(
  getPath(['routes', 0, 'legs', 0, 'duration', 'text']),
  map(objOf('children')),
  map(renderWithProps(DirectionsTag)),
  option(null)
);

/**
 * @type {(crew: Object, task: object) => import('react').ReactNode}
 */
export const CrewDistanceDetails = ({crew, task}) => {
  const {route, mGoogleMaps} = useGoogleApiContext();
  const toLatLng = mGoogleMaps
  .map(maps => a => new maps.LatLng(a.latitude, a.longitude))
  .option(identity);

  const {data: distanceResponse, ...and} = useAsyncSwr({distanceToObject: 'yup', crew, task}, () => (
    Async.of(origin => destination => route(origin, destination))
    .ap(maybeToAsync('no crew coordinates', getCrewCoordinates(crew).map(toLatLng)))
    .ap(maybeToAsync('no task coordinates', getTaskCoordinates(task).map(toLatLng)))
    .chain(identity)
  ));

  return (
  <>
    <CrewToTaskETA {...distanceResponse} />
    <CrewToTaskDistance {...distanceResponse} />
  </>
  );
};

/**
 * getActivePermissionM :: crew -> Maybe<Permission>
 *
 * @type {(crew: Object) => Maybe}
 */
const getActivePermissionM = pipe(
  getProp('permissions'),
  chain(safe(isArray)),
  chain(find(propSatisfies('expires_at', not(isNil)))),
);

/**
 * getExpirationM :: Permission -> Maybe<Date>
 *
 * @type {(crewPermission: Object) => Maybe}
 */
const getExpirationM = pipe(
  getProp('expires_at'),
  map(parseISO),
  chain(safe(isFuture)),
);

/**
 * formatExpiration :: Date -> string
 *
 * @type {(crewPermission: Object) => Maybe}
 */
const formatExpiration = pipe(
  end => ({start: new Date(), end}),
  intervalToDuration,
  Object.values,
  map(num => String(num).padStart(2, '0')),
  joinString(':'),
  str => str.replace(/00:/g, ''),
);

/**
 * CrewPermissionTimer :: Maybe<Permission> -> ReactNode
 *
 * @type {(crewPermission: Object) => Maybe}
 */
const CrewPermissionTimer = permissionM => {
  const [duration, setDuration] = useState(permissionM.chain(getExpirationM));
  const timer = useRef();

  useEffect(() => {
    clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      permissionM
        .chain(getExpirationM)
        .either(
          () => {
            const n = Maybe.Nothing();
            if(duration.equals(n)) return;
            setDuration(n)
          },
          pipe(
            Maybe.of,
            setDuration,
          )
        )
    }, 1000);

    return () => clearTimeout(timer.current);
  }, [duration, permissionM, setDuration]);

  return pipe(
    map(formatExpiration),
    map(renderWithChildren(<p className='text-steel ml-1' />)),
    option(null),
  )(duration);
};
