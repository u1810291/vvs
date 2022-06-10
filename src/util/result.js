import {
  curry,
  Result,
  ifElse,
  unsetProp,
  hasProp,
} from "crocks";

const {Err, Ok} = Result;

export const ensureProp = curry((key, pred, validationMessage, result) => {
  const fn = okResult =>
    ifElse(
      a => pred(a?.[key]),
      a => okResult(unsetProp(key, a)),
      a => Err({...a, [key]: validationMessage}),
    );

  return result.bichain(fn(Err), fn(Ok));
});

export const ensureOptionalProp = curry(
  (key, pred, validationMessage, result) => {
    const fn = okResult =>
      ifElse(
        a => (hasProp(key, a) && pred(a?.[key])) || !hasProp(key, a),
        a => okResult(unsetProp(key, a)),
        a => Err({...a, [key]: validationMessage}),
      );

    return result.bichain(fn(Err), fn(Ok));
  },
);
