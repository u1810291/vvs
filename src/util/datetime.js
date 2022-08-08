import {map, curry, isString, pipe, safe, chain, Sum, mreduce, Maybe, and, isNumber} from 'crocks';
import {formatISODuration} from 'date-fns';

export const DENOTION_HOUR = ['h', 'hr', 'hours', 'v', 'val'];
export const DENOTION_MINUTE = ['m', 'min.?'];
export const DENOTION_SECOND = ['s', 'sek', 'sec.?', ];

export const DEFAULT_DENOTION_HOUR = DENOTION_HOUR[0];
export const DEFAULT_DENOTION_MINUTE = DENOTION_MINUTE[0];
export const DEFAULT_DENOTION_SECOND = DENOTION_SECOND[0];

const regexDurationPart = curry((names, value) => pipe(
  safe(isString),
  map(a => a.match(new RegExp(`((?<want>\\d+) {0,}(${names.join('|')}))`, 'i'))?.groups?.want),
  map(parseInt),
  chain(safe(isFinite)),
)(value));

const extractHours = regexDurationPart(DENOTION_HOUR);
const extractMinutes = regexDurationPart(DENOTION_MINUTE);
const extractSeconds = regexDurationPart(DENOTION_SECOND);

/**
 * mIsoPerdiodToDuration :: string -> import('date-fns/docs/Duration').Duration
 *
 * @type {(a: string) => import('crocks/Maybe').default}
 */
export const mIsoPerdiodToDuration = pipe(
  safe(isString),
  map(str => ({
    days: parseInt(str.match(/P.*(\d+)D/i)?.[1]),
    hours: parseInt(str.match(/P.*\D+(\d+)H/i)?.[1]),
    minutes: parseInt(str.match(/P.*\D+(\d+)M/i)?.[1]),
    seconds: parseInt(str.match(/P.*\D+(\d+)S/i)?.[1]),
  })),
)



export const mPgIntervalToStr = pipe(
  safe(and(isString, a => a.match(/\d{2}:\d{2}:\d{2}/))),
  map(str => ({
    hours: parseInt(str.match(/^(\d{2}):\d{2}:\d{2}$/)?.[1]),
    minutes: parseInt(str.match(/^\d{2}:(\d{2}):\d{2}$/)?.[1]),
    seconds: parseInt(str.match(/^\d{2}:\d{2}:(\d{2})$/)?.[1]),
  }))
);

/**
 * mStrToIsoPeriod :: string -> Maybe<String>
 *
 * @type {(a: string) => import('crocks/Maybe').default}
 */
export const mStrToIsoPeriod = value => {
  return (
    Maybe.of(
      allSeconds => {
        const days = Math.floor(allSeconds / 60 / 60 / 24);
        const hours = Math.floor((allSeconds / 60 / 60) - (days * 24));
        const minutes = Math.floor((allSeconds / 60) - (hours * 60) - (days * 24 * 60));
        const seconds = allSeconds - (minutes * 60) - (hours * 60 * 60) - (days * 24 * 60 * 60);

        return formatISODuration({
          days,
          hours,
          minutes,
          seconds,
        });
      }
    )
    .ap(safe(
      and(isNumber, isFinite), 
      mreduce(Sum, [
        extractSeconds(value).option(0),
        extractMinutes(value).map(num => num * 60).option(0),
        extractHours(value).map(num => num * 60 * 60).option(0),
      ])
    ))
  );
};
