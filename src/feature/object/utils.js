import {hasLength} from '@s-e/frontend/pred';
import {hasProps, propSatisfies, getProp, safe, isString, isTruthy, isNumber, and, pick} from 'crocks';

/**
 * getObjectName :: object -> Maybe<string>
 *
 * @param {object} item
 * @returns {import('crocks/Maybe').default}
 */
export const getObjectName = item => (
  getProp('name', item)
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
);

/**
 * getAddress :: object -> Maybe<string>
 *
 * Get address or at least longitude & latitude from the object.
 *
 * @param {object} item
 * @returns {import('crocks/Maybe').default}
 */
export const getAddress = item => (
  getProp('address', item)
  .chain(safe(isTruthy))
  .alt(
    safe(
      and(
        propSatisfies('latitude', isNumber),
        propSatisfies('longitude', isNumber)),
      item
    ).map(obj => `${obj.longitude}, ${obj.latitude}`)
  )
)

/**
 * getCoordinates :: object -> Maybe<Object>
 *
 * Get coordinates from the object.
 *
 * @param {object} object
 * @returns {import('crocks/Maybe').default}
 */
export const getCoordinates = object => (
  safe(
    and(
      propSatisfies('latitude', and(isNumber, isFinite)),
      propSatisfies('longitude', and(isNumber, isFinite)),
    ),
    object,
  )
  .map(pick(['latitude', 'longitude']))
);
