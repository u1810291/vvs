import maybeToAsync from 'crocks/Async/maybeToAsync';
import raw from 'raw.macro';
import {hasLength} from '@s-e/frontend/pred';
import {mIsSame} from 'util/pred';
import {
  Async,
  pick,
  omit,
  head,
  branch,
  chain,
  curry,
  find,
  flip,
  getPath,
  getProp,
  isArray,
  map,
  merge,
  objOf,
  pipe,
  propEq,
  reduce,
  safe,
} from 'crocks';

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

/**
 * @type {(auth: import('context/auth').AuthContextValue) => (idList: Maybe) => Async}
 */
const idsToSearchUsersResponse = curry((auth, idList) => pipe(
  maybeToAsync('no users'),
  map(objOf('ids')),
  chain(flip(auth.api)(raw('./graphql/GetUsersById.graphql'))),
  chain(getPathAsync(['usersSearch', 'users'])),
)(idList));

const usersToIds = curry((userIdLens, users) => pipe(
  safe(isArray),
  map(reduce((carry, user) => (
    userIdLens(user)
    .map(value => [...carry, value])
    .option(carry)
  ), [])),
  chain(safe(hasLength)),
)(users));

/**
 * @type {(auth: import('context/auth').AuthContextValue) => (userIdLens: import('crocks/Maybe').default) => (users: Array) => Async}
 */
export const augmentsToUsers = curry((auth, userIdLens, users) => pipe(
  branch,
  map(pipe(
    usersToIds(userIdLens),
    idsToSearchUsersResponse(auth),
  )),
  merge((augments, asyncUsers) => Async.of(augments => users => (
    augments.map(augment => ({
      ...(find(mIsSame(userIdLens(augments), getProp('id')), users).option({})),
      ...augment,
    }))
  ))
    .ap(Async.of(augments))
    .ap(asyncUsers)
    .alt(Async.of(augments))
  ),
)(users));

/**
 * @type {(auth: import('context/auth').AuthContextValue) => (userIdProp: String) => (user: Object) => Async}
 */
export const augmentToUser = curry((auth, userIdProp, user) => (
  augmentsToUsers(auth, getProp(userIdProp), [pick([userIdProp], user)])
  .chain(pipe(
    head,
    maybeToAsync('user not found'),
  ))
  .map(omit([userIdProp]))
))
