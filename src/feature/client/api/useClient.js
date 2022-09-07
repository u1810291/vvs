import raw from 'raw.macro';
import {Async, pipe, branch, merge, bimap, assign, getProp, safe, chain, option, isObject} from 'crocks';
import {createUseOne} from 'api/buildApiHook';
import {getPathAsync} from 'api/buildUserQuery';
import {removeFalsyFields} from 'util/obj';

export default createUseOne({
  getGraphQl: raw('./graphql/GetClientInfo.graphql'),
  updateGraphQl: raw('./graphql/UpdateClientInfo.graphql'),
  createGraphql: raw('./graphql/CreateNewClient.graphql'),
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
    removeFalsyFields,
    Async.Resolved,
  ),
});
