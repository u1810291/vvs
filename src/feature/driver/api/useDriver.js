import {createUseOne} from 'api/buildApiHook';
import {getPathAsync} from 'api/buildUserQuery';
import {pipe} from 'crocks';
import raw from 'raw.macro';

export default createUseOne({
  getGraphQl: raw('./graphql/GetDriver.graphql'),
  asyncMapFromApi: pipe(
    getPathAsync(['userById', 'user'])
  ),
});
