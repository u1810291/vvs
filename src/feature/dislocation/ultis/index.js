import {getPath, safe} from 'crocks';
import {pick, pipe} from 'crocks/helpers';
import {and, not} from 'crocks/logic';
import {chain, map, option, reduce} from 'crocks/pointfree';
import {isEmpty, isArray, propSatisfies, isNumber} from 'crocks/predicates';

export const getZoneItems = pipe(
  safe(and(not(isEmpty), isArray)),
  chain(getPath([0])),
  option([])
);

export const getFlatNodes = pipe(
  safe(and(not(isEmpty), isArray)),
  chain(getPath([0])),
  map(Array),
  option([]),
  reduce((carry, item) => [
    ...carry,
    ...pipe(
      safe(not(isEmpty)),
      map(a => a.flat()),
      option([])
    )(item)
  ], [])
);


export const getCoordinates = node => (
  safe(
    and(
      propSatisfies('lat', and(isNumber, isFinite)),
      propSatisfies('lng', and(isNumber, isFinite)),
    ),
    node,
  )
  .map(pick(['lat', 'lng']))
);



export const getDislocationCoordinates = node => (
  getCoordinates(node)
)

export const getDislocationLatLngLiteral = pipe(
  getDislocationCoordinates,
  map(a => ({
    lat: a.lat,
    lng: a.lng,
  })),
);
