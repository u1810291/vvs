import {createUseEnum, createUseList, createUseOne} from 'api/buildApiHook';
import {pipe, getProp, pick, Async, mapProps} from 'crocks';
import maybeToAsync from 'crocks/Async/maybeToAsync';
import raw from 'raw.macro';

export const usePermissions = createUseList({
  graphQl: raw('./graphql/Permissions.graphql'),
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
      'request',
      'id'
    ]),
    Async.Resolved
  ),
});

export const useCrewRequestFull = createUseOne({
  getGraphQl: raw('./graphql/CrewRequestById.graphql'),
  updateGraphQl: raw('./graphql/UpdateCrewRequest.graphql'),
  asyncMapFromApi: pipe(
    maybeToAsync('Expected prop "crew_request_by_pk" to exist', getProp('crew_request_by_pk')),
  ),
  asyncMapToApi: pipe(
    pick(['value', 'comment', 'id']),
    mapProps({
      value: a => String(a).toUpperCase(),
    }),
    Async.Resolved,
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
