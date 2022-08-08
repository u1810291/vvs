import {createUseEnum, createUseList, createUseOne} from 'api/buildApiHook';
import {pipe, getProp, pick, Async, mapProps, option, map} from 'crocks';
import maybeToAsync from 'crocks/Async/maybeToAsync';
import raw from 'raw.macro';
import {mStrToIsoPeriod, mPgIntervalToStr, DEFAULT_DENOTION_SECOND, DEFAULT_DENOTION_HOUR, DEFAULT_DENOTION_MINUTE} from 'util/datetime';

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
      'request_id',
      'id'
    ]),
    Async.Resolved
  ),
});

export const useCrewRequestFull = createUseOne({
  getGraphQl: raw('./graphql/CrewRequestById.graphql'),
  updateGraphQl: raw('./graphql/UpdateCrewRequest.graphql'),
  createGraphql: raw('./graphql/CreateCrewPermissionRequest.graphql'),

  asyncMapFromApi: pipe(
    maybeToAsync('Expected prop "crew_request_by_pk" to exist', getProp('crew_request_by_pk')),
    map(mapProps({
      duration: pipe(
        mPgIntervalToStr,
        map(({hours, minutes, seconds}) => `${hours}${DEFAULT_DENOTION_HOUR} ${minutes}${DEFAULT_DENOTION_MINUTE} ${seconds}${DEFAULT_DENOTION_SECOND}`),
        option(''),
      ),
    }))
  ),

  asyncMapToApi: pipe(
    pick(['value', 'duration', 'id']),
    mapProps({
      value: a => String(a).toUpperCase(),
      duration: pipe(
        mStrToIsoPeriod,
        option(null),
      ),
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
