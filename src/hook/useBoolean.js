import React, {useState, useCallback} from "react";
import {isTruthy} from "crocks/predicates";

const useBoolean = initial => {
  const [state, setState] = useState(isTruthy(initial));
  const toggle = useCallback(() => {
    setState(a => !a);
  }, [setState]);
  return [state, toggle];
};

export default useBoolean;
