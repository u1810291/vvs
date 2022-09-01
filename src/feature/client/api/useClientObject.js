import {createUseOne} from 'api/buildApiHook';
import {Async, pick, pipe} from 'crocks';
import raw from 'raw.macro';



export default createUseOne({
  createGraphql: raw('./graphql/AssignObject.graphql'),
  deleteGraphQl: raw('./graphql/DeleteObjectRel.graphql'),
  asyncMapToApi: pipe(
    pick([
      'object_id', 
      'user_id',
    ]), 
    Async.Resolved
  ),
  asyncRemoveMapToApi: pipe(
    pick(['user_id', 'object_id']), 
    Async.Resolved
  )
})