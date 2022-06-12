import {useMemo, useCallback} from "react";
import {ensureOptionalProp, ensureProp} from "../util/result";
import {
  getPathOr,
  Result,
  getProp,
  getPropOr,
  hasProp,
  not,
  objOf,
  pipe,
  propEq,
  reduce,
  setProp,
  identity,
  bimap
} from "crocks";
import useMergeReducer from "./useMergeReducer";

const useResultForm = obj => {
  const [state, setState] = useMergeReducer(
    pipe(
      Object.entries,
      reduce(
        (carry, [key, opts]) =>
          setProp(key, getPropOr("", "initial", opts), carry),
        {},
      ),
    )(obj),
  );

  const result = useMemo(
    () =>
      pipe(
        Result.Ok,
        ...Object.entries(obj).reduce((carry, [key, opts]) => {
          const ensure = propEq("opt", true, opts)
            ? ensureOptionalProp
            : ensureProp;
          return [
            ...carry,
            ensure(
              key,
              getPropOr(() => false, "validator", opts),
              getPropOr(`Validation failed for field ${key}.`, "message", opts),
            ),
          ];
        }, []),
        bimap(identity, () => state),
      )(state),
    [obj, state],
  );
  const isComplete = useMemo(
    () =>
      result.either(
        () => false,
        () => true,
      ),
    [result],
  );
  const isFullyComplete = useMemo(
    () =>
      result.either(
        () => false,
        () =>
          Object.values(state).filter(a => a !== "").length ===
          Object.values(state).length,
      ),
    [result, state],
  );

  const set = useCallback(
    key => value => setState(objOf(key, value)),
    [setState],
  );

  const directSet = useCallback((key, value) => {
    setState(objOf(key, value))
    },[setState]
  );


  const isValid = useCallback(
    key => result.either(not(hasProp(key)), () => true),
    [result],
  );
  const getValid = useCallback(
    key => result.either(getPropOr(undefined, key), () => undefined),
    [result],
  );
  const control = useCallback(
    key => ({
      value: getPropOr(undefined, key, state),
      onChange: set(key),
      ...pipe(
        getPathOr({}, [key, "props"]),
        Object.entries,
        reduce(
          (carry, [prop, value]) =>
            setProp(
              prop,
              value({
                isValid: isValid(key),
                message: getValid(key),
                value: getPropOr(undefined, key, state),
              }),
              carry,
            ),
          {},
        ),
      )(obj),
    }),
    [state, set, obj, isValid, getValid],
  );

  return {
    ctrl: control,
    isValid,
    getValid,
    form: state,
    setForm: setState,
    result,
    isComplete,
    isFullyComplete,
    directSet,
  };
};

export default useResultForm;
