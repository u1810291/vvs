import {createUseListWithAuth} from 'api/buildApiHook';
import {augmentUser, getPathAsync} from 'api/buildUserQuery';
import {getProp, curry} from 'crocks';
import raw from 'raw.macro';
import {mapByMaybe} from 'util/array';

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
