import {Maybe, pipe,} from 'crocks';
import {useEffect, useRef, useState} from 'react';

/**
 * useCyclicalTransformation :: number -> Maybe<a> -> (a -> Maybe<b>)
 *
 * @param {number} intervalMs
 * @param {import('crocks/Maybe').default} mInput
 * @param {import('crocks/Maybe').default} mContinue
 * @returns {import('crocks/Maybe').default}
 */
 export const useCyclicalTransformation = (intervalMs, mInput, mContinue, isTimer) => {
  const [output, setOutput] = useState(mInput.chain(mContinue));
  const timer = useRef();

  useEffect(() => {
    clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      mInput.chain(mContinue).either(() => {
        const n = Maybe.Nothing();
        if (isTimer && output.equals(n)) {
          return;
        }
        setOutput(n);
      }, pipe(Maybe.of, setOutput));
    }, intervalMs);

    return () => clearTimeout(timer.current);
  }, [intervalMs, output, setOutput, mContinue, mInput]);

  return output;
};