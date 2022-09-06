import useSWR from 'swr';


/**
 * @param {any} swrKey
 * @param {(...params) => Async} getAsync
 */
const useAsyncSwr = (swrKey, getAsync) => useSWR(
  swrKey,
  (...params) => getAsync(...params).toPromise(),
  // {
  //   refreshInterval: 1000
  // }
);

export default useAsyncSwr;
