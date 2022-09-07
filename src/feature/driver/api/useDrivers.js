import raw from 'raw.macro';
import {augmentUser, getPathAsync} from 'api/buildUserQuery';
import {createUseListWithAuthQuery} from 'api/buildApiHook';
import {mapByMaybe} from 'util/array';
import {
  getProp, 
  curry, 
} from 'crocks';

const LIST_PROPS = ['usersByQuery', 'users'];
const LIST_SETTINGS_PROPS = ['user_settings'];

/**
 * @type {(auth: import('context/auth').AuthContextValue) => (usersWithId: Array<{id: string}>) => import('crocks/Async').default}
 */
export const getUserSettings = curry((
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



export default createUseListWithAuthQuery({
  graphQl: raw('./graphql/GetDriversByQuery.graphql'),
  asyncMapFromApi: auth => item => (
    getPathAsync(LIST_PROPS, item)
    .chain(augmentUser(getUserSettings(auth)))
  ),
});




