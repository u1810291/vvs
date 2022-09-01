import raw from 'raw.macro';
import {augmentUser, getPathAsync} from 'api/buildUserQuery';
import {createUseListWithAuth} from 'api/buildApiHook';
import {mapByMaybe} from 'util/array';
import {titleCase} from '@s-e/frontend/transformer/string';
import {
  getProp, 
  curry, 
  map, 
  pipe, 
  safe,
  isEmpty, 
  not, 
  hasProps,
} from 'crocks';

const LIST_PROPS = ['usersByRole', 'users'];
const LIST_SETTINGS_PROPS = ['user_settings'];

/**
 * @type {(auth: import('context/auth').AuthContextValue) => (usersWithId: Array<{id: string}>) => import('crocks/Async').default}
 */
const getUserSettings = curry((
  /**
   * @type {import ('context/auth').AuthContextValue}
   */
  auth,

  /**
   * @type {Array<{id: string}>} 
   */
  usersWithId
) => (
  auth.api(
    {where: {id: {_in: mapByMaybe(getProp('id'), usersWithId)}}},
    raw('./graphql/GetUserSettings.graphql')
  )
  .chain(getPathAsync(LIST_SETTINGS_PROPS))
));

export default createUseListWithAuth({
  graphQl: raw('./graphql/GetDrivers.graphql'),
  asyncMapFromApi: auth => item => (
    getPathAsync(LIST_PROPS, item)
    .chain(augmentUser(getUserSettings(auth)))
  ),
});


const toStringValue = pipe(
  a => String(a || '').trim(),
  safe(not(isEmpty)),
);

export const useDriverDropdown = createUseListWithAuth({
  graphQl: raw('./graphql/GetDrivers.graphql'),
  asyncMapFromApi: auth => item => (
    getPathAsync(LIST_PROPS, item)
    .chain(augmentUser(getUserSettings(auth)))
    
    .map(map(a => (
      {
        value: a.id, 
        name: getProp('fullName', a).chain(toStringValue)
          .alt((
            safe(hasProps(['firstName', 'middleName', 'lastName']), a)
            .map(({firstName, middleName, lastName}) => `${firstName} ${middleName} ${lastName}`)
            .chain(toStringValue)
          ))
          .alt((
            safe(hasProps(['firstName', 'lastName']), a)
            .map(({firstName, lastName}) => `${firstName} ${lastName}`)
            .chain(toStringValue)
          ))
          .alt(getProp('firstName', a).chain(toStringValue))
          .alt(getProp('lastName', a).chain(toStringValue))
          .alt(getProp('id', a).chain(toStringValue))
          .map(titleCase)
          .option(null)
      }
    )))
  )
});
