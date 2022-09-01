import raw from 'raw.macro';
import {Async, chain, getProp, pick, pipe, setProp} from 'crocks';
import {createUseOne, createUseWhereList} from 'api/buildApiHook';
import {augmentToUser} from '../../../api/buildUserQuery';
import maybeToAsync from 'crocks/Async/maybeToAsync';

export const useBreach = createUseOne({
  getGraphQl: raw('./graphql/CrewBreachById.graphql'),
  mapFromApiUsingAuth: true,
  asyncMapFromApi: auth => pipe(
    maybeToAsync('prop "crew_breach_by_pk" was expected', getProp('crew_breach_by_pk')),
    chain(
      obj => Async.of(obj => user => setProp('driver', user, obj))
        .ap(Async.of(obj))
        .ap(augmentToUser(auth, 'driver_user_id', obj))
    )
  ),
  asyncMapToApi: pipe(
    pick([
      'id'
    ]),
  )
})

export const useBreaches = createUseWhereList({
  graphQl: raw('./graphql/GetBreaches.graphql'),
  asyncMapFromApi: pipe(
    maybeToAsync('prop "crew_breach" expected but not found.', getProp('crew_breach')),
  ),
})
