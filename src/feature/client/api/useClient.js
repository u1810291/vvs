import raw from 'raw.macro';
import {Async, pipe, branch, merge, bimap, assign, getProp, safe, chain, option, isObject, pick} from 'crocks';
import {createUseOne} from 'api/buildApiHook';
import {getPathAsync} from 'api/buildUserQuery';
import {removeFalsyFields} from 'util/obj';

export default createUseOne({
  getGraphQl: raw('./graphql/GetClientsData.graphql'),
  updateGraphQl: raw('./graphql/UpdateClientInfoData.graphql'),
  createGraphql: raw('./graphql/CreateClientNew.graphql'),
  asyncMapFromApi: pipe(
    branch,
    bimap(
      pipe(
        getProp('user_settings_by_pk'),
        chain(safe(isObject)),
        option({}),
      ),
      getPathAsync(['userById', 'user'])
    ),
    merge((l, r) => r.map(assign(l)))
  ),
  asyncMapToApi: pipe(
    pick([
      'firstName',
      'lastName',
      'username',
      'id',
      'password',
      'mobilePhone',
      'is_company_admin',
      'is_send_report',
      'archived_at',
    ]),
    removeFalsyFields,
    Async.Resolved,
  ),
});
