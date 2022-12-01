import {constant} from 'crocks/combinators';
import {and, ifElse, not} from 'crocks/logic';
import {chain, map, option, reduce} from 'crocks/pointfree';
import {hasProps, isArray, isEmpty, isObject} from 'crocks/predicates';
import {getPath, getProp, pipe, safe} from 'crocks';

import {getCoordinates} from 'feature/object/utils';

const isNodeArrayValid = and(isArray, a => a.every(hasProps(['latitude', 'longitude'])));

const transformNode = map(({latitude, longitude}) => ({
  lat: latitude,
  lng: longitude
}));

const transformNodes = pipe(
  safe(isArray),
  map(reduce((carry, b) => ifElse(
    isNodeArrayValid,
    item => [...carry, transformNode(item)],
    constant(carry),
    b
  ), [])),
);

export const transformNodeContract = pipe(
  safe(isArray),
  map(reduce((carry, a) => [
    ...carry,
    ...transformNodes(a).option([]),
  ], [])),
  option([]),
);

const getZonePath =
  pipe(
    safe(and(not(isEmpty), isObject)),
    chain(getPath(['zone'])),
    option([])
  );

export const getFlatNodes = pipe(
  getZonePath,
  reduce((carry, item) => [
    ...carry,
    ...pipe(
      getProp('nodes'),
      map(a => a.flat()),
      option([])
    )(item),
  ], [])
);

export const getZoneItems =
  pipe(
    getZonePath,
    map(({nodes}) => nodes)
  );

const getZonePathThroughCalendar =
  pipe(
    safe(and(not(isEmpty), isObject)),
    chain(getPath(['calendars'])),
    option([])
  );

export const getFlatNodesThroughCalendar = pipe(
  getZonePathThroughCalendar,
  reduce((carry, item) => [
    ...carry,
    ...pipe(
      getPath(['crew_zone', 'nodes']),
      map(a => a.flat()),
      option([])
    )(item),
  ], [])
);

export const getZoneItemsThroughCalendar =
  pipe(
    getZonePathThroughCalendar,
    map((nodes) => nodes?.crew_zone?.nodes)
  );



export const getBreachCoordinates = node => (
  getCoordinates(node)
)

export const getBreachLatLngLiteral = pipe(
  getBreachCoordinates,
  map(a => ({
    lat: a.latitude,
    lng: a.longitude,
  })),
);