import {format} from 'date-fns';
import {
  chain,
  getProp,
  pipe,
  mconcat,
  Sum,
  map,
  safe,
  hasProps,
  isTruthy,
  getPath,
} from 'crocks';

export const predictionOutputToSingleDigit = pipe(
  a => a.flat(),
  mconcat(Sum),
  a => a.valueOf(),
);

export const getAnswerTitle = pipe(
  getProp('request'),
  chain(safe(hasProps(['city', 'suburb']))),
  chain(pipe(
    ({city, suburb}) => `${city} ${suburb}`.trim(),
    safe(isTruthy),
  )),
);

export const getAnswerDate = pipe(
  getPath(['request', 'date']),
  map(pipe(
    str => new Date(str),
    date => format(date, 'yyyy-MM-dd'),
  )),
);

export const getAnswerOutput = pipe(
  getPath(['prediction', 'output']),
  map(predictionOutputToSingleDigit),
);

export const selectValueToObject = pipe(
  a => a.split(';'),
  ([city, suburb, latitude, longitude]) => ({
    city,
    suburb,
    latitude: Number(latitude),
    longitude: Number(longitude),
  })
)
