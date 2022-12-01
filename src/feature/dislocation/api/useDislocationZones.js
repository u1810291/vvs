import {createUseWhereList} from 'api/buildApiHook';
import {pipe, getProp, maybeToAsync} from 'crocks';
import raw from 'raw.macro';

export default createUseWhereList({
  graphQl: raw('./graphql/GetAllDislocationZones.graphql'),
  asyncMapFromApi: pipe(maybeToAsync('prop \'crew_zone\' expected but not found.', getProp('crew_zone'))),
  infinite: true,
});