import {Async, getPath, propEq, find, curry} from 'crocks';
import maybeToAsync from 'crocks/Async/maybeToAsync';

export const getPathAsync = curry((path, obj) => maybeToAsync(
  `expected prop "${path.join('.')}" to exist`,
  getPath(path),
  obj
));

const mergeListsByProp = curry((prop, primaryList, secondaryList) => (
  primaryList.map(prim => ({
    ...prim,
    ...find(propEq(prop, prim?.[prop]), secondaryList).option({})
  }))
));

export const augmentUser = curry((augmentationsListAsync, us) => (
  Async.of(mergeListsByProp('id', us)).ap(augmentationsListAsync(us))
));
