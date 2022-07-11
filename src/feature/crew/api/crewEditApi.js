import {useAuth} from '../../../context/auth';
import {useAsyncEffect} from '../../../hook/useAsync';
import {getPath, isArray, isTruthy, pipe, safe} from 'crocks';

export const getCrewByIdQuery = `
  query getCrewById ($id: uuid!) {
    crew_by_pk(id: $id) {
      id
      name
    }
  }
`;

export const createCrewQuery = `
  query createCrew($id: ) {
    insert_crew(objects: {abbreviation: "", dislocation_zone: "", is_assigned_automatically: "", name: "", phone_number: ""}) {
      returning {
        abbreviation
        dislocation_zone
        driver_name
        id
        is_assigned_automatically
        name
        phone_number
        status
      }
    }
  }
`;

export const useCrewZones = (isSimplified = false) => {
  const {apiQuery} = useAuth();
  const effect = useAsyncEffect(apiQuery('query { crew_zone { crew_id id name nodes } }'));

  if (isSimplified) return (
    getPath(['data', 'crew_zone'], effect)
      .chain(safe(isArray))
      .map(pipe((e) => e, arr => arr.filter(isTruthy)))
      .option([])
  )

  return effect;
};