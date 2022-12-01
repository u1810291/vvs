import {createUseOne, createUseWhereList} from 'api/buildApiHook';
import {pipe, getProp, pick, Async} from 'crocks';
import maybeToAsync from 'crocks/Async/maybeToAsync';
import raw from 'raw.macro';

export const useKeyBoxes = createUseWhereList({
  graphQl: raw('./graphql/GetKeyBoxes.graphql'),
  asyncMapFromApi: pipe(
    maybeToAsync('prop "object_key_box" expected but not found.', getProp('object_key_box')),
  ),
  infinite: true,
});

export const useKeyBox = createUseOne({
  getGraphQl: raw('./graphql/KeyBoxById.graphql'),
  createGraphql: raw('./graphql/CreateKeyBox.graphql'),
  updateGraphQl: raw('./graphql/UpdateKeyBoxById.graphql'),
  deleteGraphQl: raw('./graphql/DeleteKeyBoxById.graphql'),
  asyncMapFromApi: pipe(
    maybeToAsync('expected "object_key_box_by_pk" but not found', getProp('object_key_box_by_pk')),
  ),
  asyncMapToApi: pipe(
    pick([
      'crew_id',
      'set_name',
      'id'
    ]),
    Async.Resolved
  ),
  asyncRemoveMapToApi: pipe(
    pick(['id']), 
    Async.Resolved
  )
});

export const useKeyObjectBox = createUseOne({
  createGraphql: raw('./graphql/AssignKeyObjectBox.graphql'),
  deleteGraphQl: raw('./graphql/DeleteKeyObjectBoxRel.graphql'),
  asyncMapToApi: pipe(
    pick([
      'object_id', 
      'box_id', 
      'set_name',
      'id'
    ]), 
    Async.Resolved
  ),
  asyncRemoveMapToApi: pipe(
    pick(['box_id', 'key_id']), 
    Async.Resolved
  )
})

export const useKeyObjects = createUseWhereList({
  graphQl: raw('./graphql/ObjectsByKeyBoxPk.graphql'),
  asyncMapFromApi: pipe(
    maybeToAsync('prop "object_key_rels" expected but not found.', getProp('object_key_rels')),
  ),
});