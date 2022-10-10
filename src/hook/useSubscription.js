import {useEffect, useRef, useState} from 'react';
import {useAuth} from 'context/auth';
import ENV from 'env';
import {createClient} from 'graphql-ws';
import {identity, pipe, tap} from 'crocks';

const useSubscription = (query, variables) => {
  const {token} = useAuth();
  const [data, setData] = useState();
  const [error, setError] = useState();
  const clientRef = useRef();

  useEffect(() => {
    if(clientRef.current) {
      clientRef.current.dispose();
    }

    clientRef.current = createClient({
      url: `${ENV.SUBSCRIPTION_PROTOCOL}${ENV.API_ENDPOINT}`,
      lazy: false,
      connectionParams: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    clientRef.current?.subscribe({query, variables}, {
      next: a => setData(a?.data || a),
      complete: identity,
      error: pipe(tap(console.error), setError),
    });

    return () => {
      clientRef.current?.dispose();
    };
  }, [query, token, variables]);

  return {
    data,
    error,
  };
};

export default useSubscription;
