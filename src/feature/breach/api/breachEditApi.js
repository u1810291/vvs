import {useAuth} from '../../../context/auth';
import useAsyncSwr from '../../../hook/useAsyncSwr';
import raw from 'raw.macro';
import {getProp, maybeToAsync} from 'crocks';

export const useBreach = id => {
  const {api} = useAuth();
  const getSwr = useAsyncSwr([raw('./graphql/CrewBreachById.graphql'), {id}], (query, params) => (
    api(params, query).chain(maybeToAsync('crew_breach_by_pk prop was expected', getProp('crew_breach_by_pk')))
  ));

  return {
    ...getSwr
  }
};