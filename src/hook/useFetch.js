import { useState, useContext, useRef } from "react";
import AuthContext from "../context/authContext";

export function useFetch(queryString, variables, authToken) {
  const { Logout, RefreshTokenUpdate } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  // const abortController = useRef(null);
  // const cancelRequest = () => abortController.current && abortController.current.abort(); // on window

  // abortController.current = newAbortController();
  let prevValue = [];
  const fetchData = async (n) => {
    if (prevValue[n] != null) {
      return prevValue[n];
    }
    try {
      setLoading(true);
      const res = await fetch("https://ec.swarm.testavimui.eu/v1/graphql", {
        // signal: abortController.current.signal,
        method: "POST",
        body: JSON.stringify({
          Authorization: "Bearer" + String(authToken),
          query: queryString,
          variables: variables,
        }),
        headers: {
          "content-type": "application/json",
          "x-hasura-admin-secret": "secret",
        },
      });
      const data = await res.json();
      if (res.status === 200) {
        prevValue[n] = data;
        setData(data);
      } else if (res.statusText === "Unauthorized") {
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
