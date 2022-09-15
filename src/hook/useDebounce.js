import {useEffect, useRef} from 'react';

export const useDebounce = (fn, timeout, deps) => {
  const timerRef = useRef(null);

  useEffect(() => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(fn, timeout);
  }, deps)
};
