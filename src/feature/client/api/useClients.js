import {createUseListWithAuth, createUseListWithAuthQuery} from 'api/buildApiHook';
import {augmentUser, getPathAsync} from 'api/buildUserQuery';
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
import raw from 'raw.macro';
import {mapByMaybe} from 'util/array';
import {titleCase} from '@s-e/frontend/transformer/string';

const LIST_PROPS = ['usersByQuery', 'users'];
const LIST_ROLE_PROPS = ['usersByRole', 'users'];
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
    raw('./graphql/GetUserSettingsWithPing.graphql')
  )
  .chain(getPathAsync(LIST_SETTINGS_PROPS))
));

export default createUseListWithAuthQuery({
  graphQl: raw('./graphql/GetClientsByQuery.graphql'),
  asyncMapFromApi: auth => item => (
    getPathAsync(LIST_PROPS, item)
    .chain(augmentUser(getUserSettings(auth)))
  ),
});


const toStringValue = pipe(
  a => String(a || '').trim(),
  safe(not(isEmpty)),
);

export const useClientDropdown = createUseListWithAuth({
  graphQl: raw('./graphql/GetClientInfo.graphql'),
  asyncMapFromApi: auth => item => (
    getPathAsync(LIST_ROLE_PROPS, item)
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