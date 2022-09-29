import {createUseOne} from 'api/buildApiHook';
import {augmentsToUsers} from 'api/buildUserQuery';
import {pipe, maybeToAsync, getProp, pick, Async, ifElse, isTruthy, propSatisfies, assign, alt, chain, getPathOr, setPath} from 'crocks';
import raw from 'raw.macro';

export default createUseOne({
  getGraphQl: raw('./graphql/GetTaskById.graphql'),
  createGraphql: raw('./graphql/CreateTask.graphql'),
  mapFromApiUsingAuth: true,
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
