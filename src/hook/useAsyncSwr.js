import {PAGE_SIZE} from 'constants/table';
import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';

/**
 * @param {any} swrKey
 * @param {(...params) => Async} getAsync
 */
const useAsyncSwr = (swrKey, getAsync) => useSWR(
  swrKey,
  (...params) => getAsync(...params).toPromise(),
);


export const useAsyncSwrInfinite = (swrKey, getAsync) => useSWRInfinite(
  (pageIndex, previousData) => {
    if (previousData && !previousData.length) return null;
    
    const params = {
      offset: pageIndex * PAGE_SIZE, 
      limit: PAGE_SIZE
    };

    return [swrKey[0], {...swrKey[1], ...params}];
  }, 
  (...params) => getAsync(params).toPromise(),
);

export default useAsyncSwr;
