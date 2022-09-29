import maybeToAsync from 'crocks/Async/maybeToAsync';
import raw from 'raw.macro';
import {createUseEnum, createUseList, createUseWhereList, createUseOne} from 'api/buildApiHook';
import {pipe, getProp, pick, Async, map, ifElse, safe, not, isEmpty, option} from 'crocks';
import {titleCase} from '@s-e/frontend/transformer/string';

export const usePermissions = createUseWhereList({
  graphQl: raw('./graphql/PermissionsData.graphql'),
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

export const useCrewRequest = createUseList({
  graphQl: raw('./graphql/CrewRequests.graphql'),
  asyncMapFromApi: pipe(
    maybeToAsync('prop "crew_request" expected but not found.', getProp('crew_request')),
  ),
});

export const useCrewRequestStatus = createUseEnum({
  graphQl: raw('./graphql/CrewPermissionRequest.graphql'),
  itemsProp: 'crew_request_status',
  valueProp: 'value',
});

export const useCrewRequestDropdown = createUseList({
  graphQl: raw('./graphql/CrewRequests.graphql'),
  asyncMapFromApi: pipe(
    maybeToAsync('prop "crew_request" was expected', getProp('crew_request')),
    map(ifElse(isEmpty, () => [], map(a => ({value: a.value, name: titleCase(a.value)})))),
    safe(not(isEmpty)),
    option([])
  ),
});
