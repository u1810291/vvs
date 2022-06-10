import {useReducer} from "react";
import {ifElse, isDefined, hasProp} from "crocks";

const useMergeReducer = defaults => {
  return useReducer(
    (older = {}, newer = {}) =>
      ifElse(
        isDefined,
        () => ({...older, ...newer}),
        () => older,
        Object.entries(newer).find(
          ([key, value]) => !(hasProp(key, older) && value === older?.[key]),
        ),
      ),
    defaults,
  );
};

export default useMergeReducer;
