import raw from 'raw.macro';
import {createUseEnum, createUseOne} from 'api/buildApiHook';
import {Async, pipe, pick, mapProps, maybeToAsync, getProp, map, option} from 'crocks';
import {mPgIntervalToStr} from 'util/datetime';

export const useTaskTypes = createUseEnum({
  graphQl: raw('./graphql/TaskTypes.graphql'),
  itemsProp: 'event_type',
  valueProp: 'value',
});

export const useTaskType = createUseOne({
  getGraphQl: raw('./graphql/TaskTypeById.graphql'),
  updateGraphQl: raw('./graphql/UpdateEventType.graphql'),
  createGraphql: raw('./graphql/CreateEventType.graphql'),
  deleteGraphQl: raw('./graphql/DeleteEventType.graphql'),

  asyncMapFromApi: pipe(
    maybeToAsync('Expected prop "event_type_by_pk" to exist', getProp('event_type_by_pk'))
  ),

  asyncMapToApi: pipe(
    pick(['value', 'comment', 'id']),
    mapProps({
      value: a => String(a).toUpperCase(),
    }),
    Async.Resolved,
  ),

  asyncRemoveMapToApi: pipe(
    pick(['id']),
    Async.Resolved,
  )
})

export const useCrewRequestFull = createUseOne({
  getGraphQl: raw('./graphql/CrewRequestByPk.graphql'),
  updateGraphQl: raw('./graphql/UpdateCrewRequestByPk.graphql'),
  createGraphql: raw('./graphql/CreatePermissionRequest.graphql'),
  deleteGraphQl: raw('./graphql/DeleteCrewPermissionRequest.graphql'),

  asyncMapFromApi: pipe(
    maybeToAsync('Expected prop "crew_request_by_pk" to exist', getProp('crew_request_by_pk')),
    map(mapProps({
      duration: pipe(
        mPgIntervalToStr,
        map(({hours, minutes}) => `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`),
        option(''),
      ),
    }))
  ),

  asyncMapToApi: pipe(
    pick(['value', 'duration', 'is_assigned_while_in_breaks', 'id']),
    mapProps({
      value: a => String(a).toUpperCase(),
      // duration: pipe(
      //   mStrToIsoPeriod,
      //   option(null),
      // ),
    }),
    Async.Resolved,
  ),

  asyncRemoveMapToApi: pipe(
    pick(['id']),
    Async.Resolved,
  )
});


export const useTaskCancellations = createUseEnum({
  graphQl: raw('./graphql/TaskCancellationsWithNoSpecial.graphql'),
  itemsProp: 'event_cancellation',
  valueProp: 'value',
});

export const useTaskCancellation = createUseOne({
  getGraphQl: raw('./graphql/TaskCancellationById.graphql'),
  updateGraphQl: raw('./graphql/UpdateEventCancellation.graphql'),
  createGraphql: raw('./graphql/CreateEventCancellation.graphql'),
  deleteGraphQl: raw('./graphql/DeleteEventCancellationById.graphql'),

  asyncMapFromApi: pipe(
    maybeToAsync('Expected prop "event_cancellation_by_pk" to exist', getProp('event_cancellation_by_pk'))
  ),

  asyncMapToApi: pipe(
    pick(['value', 'comment', 'id']),
    mapProps({
      value: a => String(a).toUpperCase(),
    }),
    Async.Resolved,
  ),

  asyncRemoveMapToApi: pipe(
    pick(['id']),
    Async.Resolved,
  )
})