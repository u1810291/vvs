import { useState } from "react";

function useSubscription(api, authToken) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [logoutUser, setLogoutUser] = useState(false);

  const subscription = useCallback(async () => {
      try {
        setLoading(true);
        const response = await new WebSocketLink({
          uri: "wss://ec.swarm.testavimui.eu/v1/graphql",
          options: {
            reconnect: true,
            // lazy: true,
            inactivityTimeout: 30000,
            connectionParams: {
              headers: {
                "content-type": "application/json",
                Authorization: "Bearer" + String(authToken?.access),
              },
            },
            body: JSON.stringify({
              query: api,
            }),
          },
        });
        const data = await response.json();
        if (response.status === 200) {
          setData(data);
        } else if (response.statusText === "Unauthorized") {
          setLogoutUser(true);
        }
      } catch (e) {
        setError(e);
      }
      setLoading(false);
  }, [authToken?.access, api]);

  return { data, loading, error, logoutUser, subscription };
}

export default useSubscription;
