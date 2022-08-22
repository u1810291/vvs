import {useState, useCallback} from 'react';
import {isTruthy} from 'crocks/predicates';

const useBoolean = initial => {
  const [state, setState] = useState(isTruthy(initial));
  const toggle = useCallback(() => {
    setState(a => !a);
  }, [state]);
  return [state, toggle];
};

export default useBoolean;
