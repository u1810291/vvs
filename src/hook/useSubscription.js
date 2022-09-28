import {useEffect, useState} from 'react';
import {useAuth} from 'context/auth';
import ENV from '../env';
import {createClient} from 'graphql-ws';
import {identity, getPropOr} from 'crocks';

const useSubscription = (query, variables) => {
  const {token} = useAuth();
  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    if (!token) {
      return;
    }
    const gqlClient = createClient({
      url:`${ENV.QUERY_PROTOCOL}${ENV.API_ENDPOINT}`,
      connectionParams: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });
    gqlClient.subscribe(
      {
        query,
        variables,
      },
      {
        next: setData,
        complete: identity,
        error: setError,
      },
    );

    return () => {
      gqlClient.dispose();
    };
  }, [query, token, variables]);

  return {
    data: getPropOr(data, 'data', data),
    error,
  };
};

export default useSubscription;
