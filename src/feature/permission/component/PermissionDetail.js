import CrewDriverName from 'feature/crew/component/CrewDriverName';
import CrewIcon from 'feature/crew/component/CrewIcon';
import CrewName from 'feature/crew/component/CrewName';
import Detail from 'components/Disclosure/AsideDisclosure';
import {caseMap} from '@s-e/frontend/flow-control';
import {differenceInSeconds, intervalToDuration, isFuture, parseISO} from 'date-fns';
import {joinString} from '@s-e/frontend/transformer/array';
import {mPgIntervalToStr} from 'util/datetime';
import {permissionStatus} from 'constants/statuses';
import {renderWithChildren} from 'util/react';
import {useEffect, useRef, useState} from 'react';
import {
  Maybe,
  chain,
  getPath,
  getProp,
  map,
  option,
  pipe,
  safe,
  isSame,
  constant,
  isTruthy,
  isInteger,
} from 'crocks';

/**
 * @type {(crew: Object, crews: Array<Object>, task: Object: children: ReactNode) => import('react').ReactNode}
 */
const PermissionDetail = ({permission, crew, children}) => (
  <Detail.ItemNoGutters>
    <div className='flex px-4 items-start space-x-4 w-full border-b pb-4'>
      <CrewIcon {...crew} />
      <div className='flex-1'>
        <CrewName {...crew}/>
        <CrewDriverName crew={crew} crews={[crew]} />
      </div>
      <div className='flex-col md:flex-row flex items-end md:items-start md:space-y-0 space-y-2 md:space-x-2'>
        <CrewPermission {...permission} />
        {children}
      </div>
    </div>
  </Detail.ItemNoGutters>
);

export default PermissionDetail;

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
 * getDurationM :: Permission -> Maybe<Date>
 *
 * @type {(crewPermission: Object) => Maybe}
 */
const getDurationM = pipe(
  getPath(['request', 'duration']),
  // map(mPgIntervalToStr),
  map(pipe(
    mPgIntervalToStr,
    map(({hours, minutes, seconds}) => `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}s`),
    option(''),
  ))
);

/**
 * getDurationFormatedM :: Permission -> Maybe<Date>
 *
 * @type {(crewPermission: Object) => Maybe}
 */
const getDurationFormatedM = pipe(
  getPath(['request', 'duration']),
  // map(mPgIntervalToStr),
  map(pipe(
    mPgIntervalToStr,
    map(({hours, minutes, seconds}) => `${isTruthy(hours) ? `${hours} h` : ''} ${isTruthy(minutes) ? `${minutes} min` : ''} ${isTruthy(seconds) ? `${seconds} s` : ''}`),
    option(''),
  ))
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
 * @type {(crewPermission: Object) => import('react').ReactNode}
 */
const CrewPermissionDuration = pipe(
  chain(getDurationFormatedM),
  map(renderWithChildren(<p className={'text-gray-500'} />)),
  option(null),
);

const CrewPermissionBgDuration = pipe(
  chain(getDurationM),
  map(renderWithChildren(<p className={'flex justify-center items-end rounded-sm px-1.5 border border-transparent text-xs font-normal text-gray-600 font-montserrat hover:shadow-none bg-gray-200 focus:outline-none'} />)),
  option(null),
);

/**
 * @type {(crew: Object) => import('react').ReactNode}
 */
const CrewPermission = permissionM => {
  const permission = Maybe.of(permissionM);

  return (
    <>
      {caseMap(constant(null), [
        [constant(isSame(permissionM?.status, permissionStatus.PERMISSION_ASKED)), constant(
          <div className='flex space-x-4'>
            <CrewPermissionDuration {...permission} />
            <CrewPermissionCountdown {...permission} />
          </div>
        )],
        [constant(isSame(permissionM?.status, permissionStatus.PERMISSION_ALLOWED)), constant(
          <CrewPermissionTimer {...permission} />
        )],
        [constant(isSame(permissionM?.status, permissionStatus.PERMISSION_CANCELLED)), constant(
          <CrewPermissionBgDuration {...permission} />
        )],
        [constant(isSame(permissionM?.status, permissionStatus.PERMISSION_COMPLETE)), constant(
          <CrewPermissionBgDuration {...permission} />
        )],
      ], null)}      
    </>
  );
}

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
            if (duration.equals(n)) return;
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
    map(renderWithChildren(<p className='flex justify-center items-center rounded-sm px-1.5 border border-transparent text-xs font-normal text-gray-600 font-montserrat hover:shadow-none bg-gray-200 focus:outline-none' />)),
    option(<p className='text-red-500'>expired</p>),
  )(duration);
};



const getInitialDurationM = pipe(
  getProp('created_at'),
  map(created_at => differenceInSeconds(new Date(), parseISO(created_at))),
  chain(safe(isInteger)),
);

const secondsToHMS = sec => {
  let date = new Date(null);
  date.setSeconds(sec)
  return date.toISOString().substr(11, 8);
}

const CrewPermissionCountdown = permissionM => {
  const [initialInterval, setInitialInterval] = useState(permissionM.chain(getInitialDurationM));
  const timer = useRef();

  useEffect(() => {
    clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      permissionM
        .chain(getInitialDurationM)
        .either(
          () => {
            const n = Maybe.Nothing();
            // if (duration.equals(n)) return;
            setInitialInterval(n)
          },
          pipe(
            Maybe.of,
            setInitialInterval,
          )
        )
    }, 1000);

    return () => clearTimeout(timer.current);
  }, [initialInterval, permissionM, setInitialInterval]);

  return pipe(
    map(secondsToHMS),
    map(renderWithChildren(<p className='flex justify-center items-center rounded-sm px-1.5 border border-transparent text-xs font-normal text-gray-600 font-montserrat hover:shadow-none bg-gray-200 focus:outline-none' />)),
    option(''),
  )(initialInterval);
};
