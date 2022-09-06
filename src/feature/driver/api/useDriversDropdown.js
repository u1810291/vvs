import raw from 'raw.macro';
import {augmentUser, getPathAsync} from 'api/buildUserQuery';
import {createUseListWithAuth} from 'api/buildApiHook';
import {titleCase} from '@s-e/frontend/transformer/string';
import {
  getProp, 
  map, 
  pipe, 
  safe,
  isEmpty, 
  not, 
  hasProps,
} from 'crocks';
import {getUserSettings} from './useDrivers';







const LIST_PROPS = ['usersByRole', 'users'];
const LIST_SETTINGS_PROPS = ['user_settings'];

const toStringValue = pipe(
  a => String(a || '').trim(),
  safe(not(isEmpty)),
);

export default createUseListWithAuth({
  graphQl: raw('./graphql/GetAllDrivers.graphql'),
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