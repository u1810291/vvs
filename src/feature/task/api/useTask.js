import {createUseOne} from 'api/buildApiHook';
import {augmentsToUsers} from 'api/buildUserQuery';
import raw from 'raw.macro';
import {
  Async,
  alt,
  assign,
  chain,
  getPathOr,
  getProp,
  ifElse,
  isTruthy,
  maybeToAsync,
  pick,
  pipe,
  propSatisfies,
  setPath,
} from 'crocks';

export default createUseOne({
  getGraphQl: raw('./graphql/GetTaskById.graphql'),
  deleteGraphQl: raw('./graphql/DeleteTaskById.graphql'),
  createGraphql: raw('./graphql/CreateTask.graphql'),
  mapFromApiUsingAuth: true,
  updateGraphQl: raw('./graphql/UpdateTaskById.graphql'),
  asyncMapFromApi: auth => response => pipe(
    getProp('events_by_pk'),
    alt(getProp('events', response)),
    maybeToAsync('expected "events|events_by_pk" but not found'),
    chain(event => (
      augmentsToUsers(
        auth,
        getProp('user_id'),
        getPathOr([], ['object', 'users'], event)
      )
      .map(objectUsers => setPath(['object', 'users'], objectUsers, event))
      .alt(Async.Resolved(event))
    )),
  )(response),
  asyncMapToApi: pipe(
    pick([
      'id',
      'type',
      'name',
      'description',
      'object_id',
      'address',
      'latitude',
      'longitude',
      'crew_id',
      'status',
    ]),
    ifElse(
      propSatisfies('crew_id', isTruthy),
      task => task.status ? task : assign({status: 'WAIT_FOR_APPROVAL'}, task),
      assign({status: 'NEW'}),
    ),
    Async.Resolved
  ),
  asyncRemoveMapToApi: pipe(
    pick(['id']), 
    Async.Resolved
  )
});
