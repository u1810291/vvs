import raw from 'raw.macro';
import {useAuth} from 'context/auth';
import useAsyncSwr from 'hook/useAsyncSwr';
import {createUseList, createUseOne, createUseWhereList, mapToNullableString} from 'api/buildApiHook';
import maybeToAsync from 'crocks/Async/maybeToAsync';
import {
  pipe,
  map,
  ifElse,
  isEmpty,
  getProp,
  pick,
  mapProps,
  Async, safe,
} from 'crocks'
import {option} from 'crocks/pointfree';
import {not} from 'crocks/logic';

// TODO: Reduce duplicated requests

export const useCrews = createUseWhereList({
  graphQl: raw('./graphql/GetCrews.graphql'),
  asyncMapFromApi: pipe(
    maybeToAsync('expected prop "crew" does not exist', getProp('crew')),
  ),
});

export const useCrew = createUseOne({
  getGraphQl: raw('./graphql/CrewById.graphql'),
  createGraphql: raw('./graphql/CreateCrew.graphql'),
  updateGraphQl: raw('./graphql/UpdateCrewById.graphql'),
  asyncMapFromApi: pipe(
    maybeToAsync('prop "crew_by_pk" was expected', getProp('crew_by_pk')),
  ),
  asyncMapToApi: pipe(
    pick([
      'id',
      'name',
      'status',
      'driver_name',
      'phone_number',
      'to_call_after',
      'is_assigned_automatically',
      'is_assigned_while_in_breaks',
    ]),
    mapProps({
      name: mapToNullableString,
      driver_name: mapToNullableString,
      phone_number: mapToNullableString,
      to_call_after: mapToNullableString,
      status: mapToNullableString,
    }),
    Async.Resolved
  ),
});

export const useCrewCalendar = createUseOne({
  createGraphql: raw('./graphql/CrewCreateCalendar.graphql'),
  asyncMapFromApi: pipe(
    maybeToAsync('prop "crew_calendar_by_pk" was expected', getProp('crew_calendar_by_pk')),
  ),
  asyncMapToApi: pipe(
    pick([
      'id',
      'week_day',
      'end_time',
      'start_time',
      'dislocation_zone_id'
    ]),
    mapProps({
      week_day: mapToNullableString,
      end_time: mapToNullableString,
      start_time: mapToNullableString,
      dislocation_zone_id: mapToNullableString,
    }),
    Async.Resolved
  ),
});

export const createCrewCalendar = (week_day, end_time, start_time, crew_id, dislocation_zone_id) => {
  console.log(week_day, end_time, start_time, crew_id, dislocation_zone_id)
  const {api} = useAuth();
  const getSwr = useAsyncSwr([raw('./graphql/CrewCreateCalendar.graphql'), {week_day, end_time, start_time, crew_id, dislocation_zone_id}], (query, params) => {
    api(params, query).chain(maybeToAsync('crew_by_pk prop was expected', getProp('crew_by_pk')))
  });

  return {
    ...getSwr
  };
}

export const useCrewById = id => {
  const {api} = useAuth();
  const getSwr = useAsyncSwr([raw('./graphql/CrewById.graphql'), {id}], (query, params) => {
    api(params, query).chain(maybeToAsync('crew_by_pk prop was expected', getProp('crew_by_pk')))
  });

  return {
    ...getSwr
  };
};

export const useCrewZones = createUseList({
  graphQl: raw('./graphql/CrewZones.graphql'),
  asyncMapFromApi: pipe(
    maybeToAsync('crew_zone prop was expected', getProp('crew_zone')),
    map(ifElse(isEmpty, () => [], map(a => ({key: a.name, value: a.id})))),
    safe(not(isEmpty)),
    option([])
  ),
});

// const GQL = `
//   mutation CreateCrewCalendar (
//     $week_day: Int!,
//     $end_time: String!,
//     $start_time: String!,
//     $crew_id: String!,
//     $dislocation_zone_id: uuid!
//   ) {
//     insert_crew_calendar(objects: {
//         week_day: $week_day,
//         end_time: $end_time,
//         start_time: $start_time,
//         crew_id: $crew_id,
//         dislocation_zone_id: $dislocation_zone_id,
//     }) {
//       returning {
//         id
//         week_day
//         end_time
//         start_time
//         crew_id
//         dislocation_zone_id
//       }
//     }
//   }
// `;
//
// export const asyncCreateBreachById = ({week_day, end_time, start_time, crew_id, dislocation_zone_id}) =>
//   fetchGql(
//     'https://ec.swarm.testavimui.eu/v1/graphql',
//     {
//       'x-hasura-admin-secret': 'secret',
//       'authorization': ''
//     },
//     GQL,
//     {
//       week_day,
//       end_time,
//       start_time,
//       crew_id,
//       dislocation_zone_id
//     });
