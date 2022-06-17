import { useState } from 'react';

export function useDeleteFetch(authToken, userId) {
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
      const res = await fetch(`http://ecfa.swarm.testavimui.eu/userId=${userId}`, {
        // signal: abortController.current.signal,
        method: 'DELETE', // DELETE
        body: JSON.stringify({
          Authorization: 'Bearer' + String(authToken),
        }),
        headers: {
          'content-type': 'application/json'
        },
      })
      const data = await res.text();
      if (res.status === 200) {
        prevValue[n] = data;
        setData(data, 'success');
      }
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };
  return { fetchData, data, error, loading };
}
