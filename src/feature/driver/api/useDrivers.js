import {createUseListWithAuth} from 'api/buildApiHook';
import {augmentUser, getPathAsync} from 'api/buildUserQuery';
import {getPropOr, isTruthy} from 'crocks';
import raw from 'raw.macro';

const LIST_PROPS = ['usersByRole', 'users'];
const LIST_SETTINGS_PROPS = ['user_settings'];

export default createUseListWithAuth({
  graphQl: raw('./graphql/GetDrivers.graphql'),

  /**
   * @param {import('context/auth').useAuth}  auth
   */
  asyncMapFromApi: auth => item => (
    getPathAsync(LIST_PROPS, item)
    .chain(
      augmentUser(
        list => auth.api(
          {where: {id: {_in: list.map(getPropOr(null, 'id')).filter(isTruthy)}}},
          raw('./graphql/GetUserSettings.graphql')
        )
        .chain(getPathAsync(LIST_SETTINGS_PROPS)),
      )
    )
  ),
});
