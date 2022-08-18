import {createUseEnum, createUseWhereList, createUseOne} from 'api/buildApiHook';
import {pipe, getProp, pick, Async} from 'crocks';
import maybeToAsync from 'crocks/Async/maybeToAsync';
import raw from 'raw.macro';


export const usePermissions = createUseWhereList({
  graphQl: raw('./graphql/PermissionsWhere.graphql'),
  asyncMapFromApi: pipe(
    maybeToAsync('prop "crew_permission" expected but not found.', getProp('crew_permission')),
  ),
});

export const usePermission = createUseOne({
  getGraphQl: raw('./graphql/PermissionById.graphql'),
  createGraphql: raw('./graphql/CreatePermission.graphql'),
  updateGraphQl: raw('./graphql/UpdatePermissionById.graphql'),
  asyncMapFromApi: pipe(
    maybeToAsync('expected "crew_permission_by_pk" but not found', getProp('crew_permission_by_pk')),
  ),
  asyncMapToApi: pipe(
    pick([
      'crew_id',
      'status',
      'request_id',
      'id'
    ]),
    Async.Resolved
  ),
});



export const useCrewRequest = createUseEnum({
  graphQl: raw('./graphql/CrewRequest.graphql'),
  itemsProp: 'crew_request',
  valueProp: 'value',
});

export const useCrewRequestStatus = createUseEnum({
  graphQl: raw('./graphql/CrewPermissionRequest.graphql'),
  itemsProp: 'crew_request_status',
  valueProp: 'value',
});
