import {constant} from 'crocks/combinators';
import {and, ifElse, not} from 'crocks/logic';
import {chain, map, option, reduce} from 'crocks/pointfree';
import {hasProps, isArray, isEmpty, isObject} from 'crocks/predicates';
import {getPath, getProp, pipe, safe} from 'crocks';

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

export const getFlatNodes = pipe(
  safe(and(not(isEmpty), isObject)),
  chain(getPath(['zone'])),
  option([]),
  reduce((carry, item) => [
    ...carry,
    ...pipe(
      getProp('nodes'),
      map(a => a.flat()),
      option([])
    )(item),
  ], [])
);

export const getZonePath =
  pipe(
    safe(and(not(isEmpty), isObject)),
    chain(getPath(['zone'])),
    option([]),
    map(({nodes}) => nodes),
  );
