import {useCallback} from 'react';
import useMergeReducer from './useMergeReducer';
import {caseMap} from '@s-e/frontend/flow-control';
import {tap, pipe, identity, isFunction} from 'crocks';

/**
 * @param {Async} asyncCrock
 * @param {(error: any) => any} onRejected
 * @param {(value: any) => any} onResolved
 * @returns {[
 *   {forked: boolean, loading: boolean, data: any, error: any},
 *   ((error: any) => any, (value: any) => any) => any
 * ]}
 */
const useAsync = (
  asyncCrock,
  onRejected = identity,
  onResolved = identity,
) => {
  const [state, setState] = useMergeReducer({
    forked: false,
    loading: false,
    data: null,
    error: null,
  });
  const fork = useCallback(
    (newOnRejected, newOnResolved) => {
      setState({forked: true, loading: true});

      const rej = pipe(
        tap(error =>
          setState({error, data: null, loading: false, forked: true}),
        ),
        caseMap(
          identity,
          [
            [isFunction, () => newOnRejected],
            [() => isFunction(onRejected), () => onRejected],
          ],
          newOnRejected,
        ),
      );

      const res = pipe(
        tap(data =>
          setState({data, error: null, loading: false, forked: true}),
        ),
        caseMap(
          identity,
          [
            [isFunction, () => newOnResolved],
            [() => isFunction(onResolved), () => onResolved],
          ],
          newOnResolved,
        ),
      );

      return asyncCrock.fork(rej, res);
    },
    [setState, asyncCrock, onRejected, onResolved],
  );

  return [state, fork];
};

export default useAsync;
