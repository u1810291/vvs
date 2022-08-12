import {Async, getPath, propEq, find, curry} from 'crocks';
import maybeToAsync from 'crocks/Async/maybeToAsync';

/**
 * @type {(path: Array<String|Number>) => (obj: Object) => import('crocks/Async').default}
 */
export const getPathAsync = curry((path, obj) => maybeToAsync(
  `expected prop "${path.join('.')}" to exist`,
  getPath(path),
  obj
));

/**
 * @type {(prop: String|Number) => (primaryList: Array<Object>) => (secondaryList: Array<Object>) => Array<Object>}
 */
const mergeListsByProp = curry((prop, primaryList, secondaryList) => (
  primaryList.map(prim => ({
    ...prim,
    ...find(propEq(prop, prim?.[prop]), secondaryList).option({})
  }))
));

/**
  * @type {(augmentationsListAsync: (auth: import('context/auth').AuthContextValue) => (usersWithId: Array<{id: string}>) => import('crocks/Async').default) => (users: Array<{id: string}>) => import('crocks/Async').default}
 */
export const augmentUser = curry((augmentationsListAsync, users) => (
  Async.of(mergeListsByProp('id', users)).ap(augmentationsListAsync(users))
));
