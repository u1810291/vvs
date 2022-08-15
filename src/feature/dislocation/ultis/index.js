import {getPath, safe} from 'crocks';
import {pipe} from 'crocks/helpers';
import {and, not} from 'crocks/logic';
import {chain, map, option, reduce} from 'crocks/pointfree';
import {isEmpty, isArray} from 'crocks/predicates';

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


