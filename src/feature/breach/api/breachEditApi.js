import {useAuth} from '../../../context/auth';
import useAsyncSwr from '../../../hook/useAsyncSwr';
import raw from 'raw.macro';
import {getProp, maybeToAsync, pipe} from 'crocks';
import {createUseWhereList} from 'api/buildApiHook';

export const useBreach = id => {
  const {api} = useAuth();
  const getSwr = useAsyncSwr([raw('./graphql/CrewBreachById.graphql'), {id}], (query, params) => (
    api(params, query).chain(maybeToAsync('crew_breach_by_pk prop was expected', getProp('crew_breach_by_pk')))
  ));

  return {
    ...getSwr?.data
  }
};


export const useBreaches = createUseWhereList({
  graphQl: raw('./graphql/Breaches.graphql'),
  asyncMapFromApi: pipe(
    maybeToAsync('prop "crew_breach" expected but not found.', getProp('crew_breach')),
  ),
})