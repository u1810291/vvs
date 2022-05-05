import { useState, useContext, useCallback } from "react";
import AuthContext from "../context/authContext";
import { WebSocketLink } from "apollo-link-ws";
import { SubscriptionClient } from "subscriptions-transport-ws";

export function useSubscription(queryString, variables, authToken) {
  const { Logout, RefreshTokenUpdate } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const subscription = useCallback(async () => {
      try {
        setLoading(true);
        const res = await new WebSocketLink(
          new SubscriptionClient("wss://ec.swarm.testavimui.eu/v1/graphql", {
          options: {
            reconnect: true,
            lazy: true,
            inactivityTimeout: 30000,
            connectionParams: {
              headers: {
                "content-type": "application/json",
                "x-hasura-admin-secret": "secret",
                Authorization: "Bearer" + String(authToken),
              },
            },
            body: JSON.stringify({
              query: queryString,
              variables: variables,
            }),
          },
        }));
        const data = await res.json();
        if (res.status === 200) {
          setData(data);
        } else if (res.statusText === "Unauthorized") {
          Logout();
        }
      } catch (e) {
        setError(e);
      }
      setLoading(false);
  }, [Logout, authToken, queryString, variables]);

  return { data, loading, error, subscription };
}

export default useSubscription;
