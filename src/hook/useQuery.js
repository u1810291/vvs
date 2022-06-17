import { useContext } from 'react';
import { useQuery } from 'react-query';
import AuthContext from '../context/authContext';

export default function useReactQuery(queryString, variables, authToken) {
  const { Logout, RefreshTokenUpdate } = useContext(AuthContext);

  return useQuery(
    'universal',
    async () => {
      const fetchFunction = fetch('https://ec.swarm.testavimui.eu/v1/graphql', {
        method: 'POST',
        body: JSON.stringify({
          Authorization: 'Bearer' + String(authToken),
          query: queryString,
          variables: variables,
        }),
        headers: {
          'Content-Type': 'application/json',
          'x-hasura-admin-secret': 'secret',
        },
      })
        .then((res) => res.json())
        .then((res) => {
          return res.data;
        });
      return fetchFunction;
    },
    {
      refetchOnWindowFocus: false,
      enabled: true,
      onError: (error) => {
        if (error.statusText === 'Unauthorized') {
          RefreshTokenUpdate();
        } else {
          Logout();
        }
      },
    }
  );
}