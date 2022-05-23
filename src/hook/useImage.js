import { useState, useContext, useRef } from "react";
import AuthContext from "../context/authContext";

export function useImage(queryString, variables, authToken) {
  const { Logout, RefreshTokenUpdate } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  // const abortController = useRef(null);
  // const cancelRequest = () => abortController.current && abortController.current.abort(); // on window

  // abortController.current = newAbortController();
  let prevValue = [];
  const fetchImages = async (n) => {
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
          "Content-Type": "multipart/form-data",
          // Accept: 'application/json',
          // 'Content-Type': 'image/jpeg',
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
  return { fetchImages, data, error, loading };
}
