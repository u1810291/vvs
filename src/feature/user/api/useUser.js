import raw from 'raw.macro';
import {Async, pipe, branch, bimap, 
  merge, assign, 
  getProp, safe, chain, option, 
  isObject, 
  pick,
} from 'crocks';
import {createUseOne} from 'api/buildApiHook';
import {getPathAsync} from 'api/buildUserQuery';
import {removeFalsyFields} from 'util/obj';

export default createUseOne({
  getGraphQl: raw('./graphql/GetUser.graphql'),
  updateGraphQl: raw('./graphql/UpdateUser.graphql'),
  createGraphql: raw('./graphql/CreateUser.graphql'),
  asyncMapFromApi: pipe(
    branch,
    bimap(
      pipe(
        getProp('user_settings_by_pk'),
        chain(safe(isObject)),
        option({}),
      ),
      getPathAsync(['userById', 'user']),
    ),
    merge((l, r) => r.map(assign(l))),
  ),
  asyncMapToApi: pipe(
    pick([
      'firstName',
      'lastName',
      'username',
      'id',
      'password',
      'mobilePhone',
      'duties',
      'monas_id',
      'whitelisted_ip',
      'is_send_report',
      'archived_at',
      'role',
      'email',
    ]),
    removeFalsyFields,
    Async.Resolved,
  ),
});
