import {createUseOne} from 'api/buildApiHook';
import {getPathAsync} from 'api/buildUserQuery';
import {Async, pipe} from 'crocks';
import raw from 'raw.macro';
import {removeFalsyFields} from 'util/obj';

export default createUseOne({
  getGraphQl: raw('./graphql/GetDriver.graphql'),
  updateGraphQl: raw('./graphql/UpdateDriver.graphql'),
  createGraphql: raw('./graphql/CreateDriver.graphql'),
  asyncMapFromApi: pipe(
    getPathAsync(['userById', 'user'])
  ),
  asyncMapToApi: pipe(
    removeFalsyFields,
    Async.Resolved,
  ),
});
