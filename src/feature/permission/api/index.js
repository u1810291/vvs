import {createUseEnum, createUseList, createUseWhereList, createUseOne} from 'api/buildApiHook';
import {pipe, getProp, pick, Async} from 'crocks';
import maybeToAsync from 'crocks/Async/maybeToAsync';
import raw from 'raw.macro';
import ENV from '../../../env';
import {fetchGql} from '@s-e/frontend/fetch';

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

const updatePermissionRequestQueryById = `
  mutation RejectPermissionRequestById($id: uuid!, $status: crew_request_status_enum!) {
    update_crew_permission_by_pk(pk_columns: {id: $id}, _set: {status: $status}) {
      status
    }
  }
`;
// NOTE: Temporary solution on how to allow and reject permission requests
export const asyncUpdatePermissionRequestById = ({token, id, status}) =>
  fetchGql(
    ENV.API_ENDPOINT,
    {
      'x-hasura-admin-secret': ENV.API_SECRET,
      authorization: token,
    },
    updatePermissionRequestQueryById,
    {id, status},
  );
