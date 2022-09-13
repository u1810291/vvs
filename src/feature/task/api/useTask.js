import {createUseOne} from 'api/buildApiHook';
import {pipe, maybeToAsync, getProp, pick, Async} from 'crocks';
import raw from 'raw.macro';

export default createUseOne({
  getGraphQl: raw('./graphql/GetTaskById.graphql'),
  createGraphql: raw('./graphql/CreateTask.graphql'),
  asyncMapFromApi: pipe(
    maybeToAsync('expected "events" but not found', getProp('events')),
  ),
  asyncMapToApi: pipe(
    pick([
      'event_type',
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