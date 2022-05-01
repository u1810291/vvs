import { useState, useContext, useRef } from "react";
import AuthContext from "../context/authContext";

export function useFetch(api, authToken, variables) {
  const { Logout, RefreshTokenUpdate } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  // const abortController = useRef(null);
  // const cancelRequest = () => abortController.current && abortController.current.abort(); // on window

    // abortController.current = newAbortController();
    const fetchData = async() => {
      try {
        setLoading(true);
        const response = await fetch("http://ec.swarm.testavimui.eu/v1/graphql", {
          // signal: abortController.current.signal,
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "x-hasura-admin-secret": "secret",
          },
          body: JSON.stringify({
            Authorization: "Bearer" + String(authToken),
            query: api,
            variables: variables,
          }),
        })
        const data = await response.json();
        if (response.status === 200) {
          setData(data);
        } else if (response.statusText === "Unauthorized") {
          RefreshTokenUpdate();
        } else {
          Logout();
        }
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
      return { fetchData, data, error, loading };
}
