import {intervalToDuration, isFuture} from 'date-fns';
import {
  chain,
  getProp,
  isTruthy,
  map,
  pipe,
  safe,
  mapProps,
} from 'crocks';

const padToTwo = pipe(String, str => str.padStart(2, '0'));

/**
 * getPermissionExpiration :: Permission -> Maybe<Date>
 *
 * @type {(crew: object) => import('crocks/Maybe').default}
 */
export const getPermissionExpiration = pipe(
  getProp('expires_at'),
  chain(safe(isTruthy)),
  map(a => new Date(a)),
  chain(safe(isFuture)),
);

/**
 * formatCrewPermissionExpiration :: Date -> Maybe<String>
 *
 * @type {(expires_at: Date) => import('crocks/Maybe').default}
 */
export const formatPermissionExpiration = pipe(
  end => ({start: new Date(), end}),
  intervalToDuration,
  mapProps({
    days: padToTwo,
    hours: padToTwo,
    minutes: padToTwo,
    months: padToTwo,
    seconds: padToTwo,
    years: padToTwo,
  }),
  ({
    days,
    hours,
    minutes,
    months,
    seconds,
    years,
  }) => `${years}:${months}:${days}:${hours}:${minutes}:${seconds}`,
  str => str.replace(/00:/gi, ''),
);

