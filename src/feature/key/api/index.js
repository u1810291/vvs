import {createUseList, createUseOne} from 'api/buildApiHook';
import {pipe, getProp, pick, Async} from 'crocks';
import maybeToAsync from 'crocks/Async/maybeToAsync';
import raw from 'raw.macro';

export const useKeys = createUseList({
  graphQl: raw('./graphql/Keys.graphql'),
  asyncMapFromApi: pipe(
    maybeToAsync('prop "object_key" expected but not found.', getProp('object_key')),
  ),
});

export const useKey = createUseOne({
  getGraphQl: raw('./graphql/KeyById.graphql'),
  createGraphql: raw('./graphql/CreateKey.graphql'),
  updateGraphQl: raw('./graphql/UpdateKeyById.graphql'),
  deleteGraphQl: raw('./graphql/DeleteKeyById.graphql'),
  asyncMapFromApi: pipe(
    maybeToAsync('expected "object_key_by_pk" but not found', getProp('object_key_by_pk')),
  ),
  asyncMapToApi: pipe(
    pick([
      'crew_id',
      'set_name',
      'id'
    ]),
    Async.Resolved
  ),
});