import {getCoordinates} from 'feature/object/utils';
import {pipe, map} from 'crocks';

export const getCrewCoordinates = getCoordinates;

export const getCrewLatLngLiteral = pipe(
  getCrewCoordinates,
  map(a => ({
    lat: a.latitude,
    lng: a.longitude,
  })),
);
