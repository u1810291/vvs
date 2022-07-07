import {useAuth} from '../../../context/auth';
import {useAsyncEffect} from '../../../hook/useAsync';
import {getPath, getPropOr, isArray, isTruthy, map, pipe, safe} from 'crocks';

export const getCrewByIdQuery = `
  query getCrewById ($id: uuid!) {
    crew_by_pk(id: $id) {
      id
      name
    }
  }
`;

export const useCity = (isSimplified = false) => {
  const {apiQuery} = useAuth();
  const effect = useAsyncEffect(apiQuery('query { city { value } }'));

  if (isSimplified) return (
    getPath(['data', 'city'], effect)
      .chain(safe(isArray))
      .map(pipe(
        map(getPropOr(null, 'value')),
        arr => arr.filter(isTruthy)
      ))
      .option([])
  )

  return effect;
};