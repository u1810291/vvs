import {hasLength} from '@s-e/frontend/pred';
import {hasProps, propSatisfies, curry, getProp, safe, isString, isTruthy, isNumber, and} from 'crocks';

export const getObjectName = curry((fallback, item) => (
  safe(hasProps(['name', 'address']), item)
  .chain(safe(propSatisfies('name', isTruthy)))
  .chain(safe(propSatisfies('address', isTruthy)))
  .map(({name, address}) => `${name} - ${address}`)
  .alt(getProp('name', item).chain(safe(isString)).map(a => a.trim()).chain(safe(hasLength)))
  .alt(getProp('address', item).chain(safe(isString)).map(a => a.trim()).chain(safe(hasLength)))
  .alt(getProp('name', item).chain(safe(isString)).map(a => a.trim()).chain(safe(hasLength)))
  .alt(getProp('address', item).chain(safe(isString)).map(a => a.trim()).chain(safe(hasLength)))
  .alt(
    safe(hasProps(['latitude', 'longitude']), item)
    .chain(safe(propSatisfies('latitude', and(isNumber, isFinite))))
    .chain(safe(propSatisfies('longitude', and(isNumber, isFinite))))
    .map(({latitude, longitude}) => `${latitude} ${longitude}`.trim())
    .chain(safe(hasLength))
  )
  .alt(getProp('id', item).map(a => a.trim()).chain(safe(hasLength)))
  .option(fallback)
));
