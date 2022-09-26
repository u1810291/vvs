import {createUseOne} from 'api/buildApiHook';
import {pipe, maybeToAsync, getProp, pick, Async, ifElse, isTruthy, propSatisfies, assign} from 'crocks';
import raw from 'raw.macro';

export default createUseOne({
  getGraphQl: raw('./graphql/GetTaskById.graphql'),
  createGraphql: raw('./graphql/CreateTask.graphql'),
  asyncMapFromApi: pipe(
    maybeToAsync('expected "events" but not found', getProp('events')),
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
    ifElse(
      propSatisfies('crew_id', isTruthy),
      assign({status: 'WAIT_FOR_APPROVAL'}),
      assign({status: 'NEW'}),
    ),
    Async.Resolved
  ),
  asyncRemoveMapToApi: pipe(
    pick(['id']), 
    Async.Resolved
  )
});
