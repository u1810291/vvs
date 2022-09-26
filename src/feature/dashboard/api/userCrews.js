import {createUseOne} from 'api/buildApiHook';
import {pipe, maybeToAsync, getProp, pick, Async} from 'crocks';
import raw from 'raw.macro';

export default createUseOne({
  getGraphQl: raw('./graphql/GetCrews.graphql'),
  asyncMapFromApi: pipe(
    maybeToAsync('expected "crews" but not found', getProp('crews')),
  ),
  asyncMapToApi: pipe(
    pick([
      'type',
      'name',
      'description',
      'object_id',
      'address',
      'latitude',
      'longitude',
      'crew_id'
    ]),
    Async.Resolved
  ),
  asyncRemoveMapToApi: pipe(
    pick(['id']), 
    Async.Resolved
  )
});
