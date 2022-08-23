import {createUseOne} from 'api/buildApiHook';
import {getPathAsync} from 'api/buildUserQuery';
import {Async, pipe, getPropOr, branch, merge, bimap, assign} from 'crocks';
import raw from 'raw.macro';
import {removeFalsyFields} from 'util/obj';

export default createUseOne({
  getGraphQl: raw('./graphql/GetDriver.graphql'),
  updateGraphQl: raw('./graphql/UpdateDriver.graphql'),
  createGraphql: raw('./graphql/CreateDriver.graphql'),
  asyncMapFromApi: pipe(
    branch,
    bimap(
      getPropOr({is_online: false}, 'user_settings_by_pk'),
      getPathAsync(['userById', 'user'])
    ),
    merge((l, r) => r.map(assign(l)))
  ),
  asyncMapToApi: pipe(
    removeFalsyFields,
    Async.Resolved,
  ),
});
