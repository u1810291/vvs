import {useState, useEffect} from "react";

const useDebounce = (dep, fn, ms) => {
  const [debouncedValue, setDebouncedValue] = useState(dep);
  useEffect(() => {
    const id = setTimeout(() => setDebouncedValue(fn(dep)), ms);
    return () => clearTimeout(id);
  }, [dep]);

  return debouncedValue;
};

export default useDebounce;
