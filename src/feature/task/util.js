import {getAddress, getCoordinates} from 'feature/object/utils'
import {getProp, pipe, map} from 'crocks';

export const getTaskAddress = task => (
  getAddress(task)
  .alt(
    getProp('object', task)
      .chain(getAddress)
  )
)

export const getTaskCoordinates = task => (
  getCoordinates(task)
  .alt(
    getProp('object', task)
      .chain(getCoordinates)
  )
)

export const getTaskLatLngLiteral = pipe(
  getTaskCoordinates,
  map(a => ({
    lat: a.latitude,
    lng: a.longitude,
  })),
);
