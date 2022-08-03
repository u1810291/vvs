import {useCallback} from 'react';

import {not} from 'crocks/logic';
import {isEmpty} from 'crocks/predicates';
import {chain, map} from 'crocks/pointfree';
import {getProp, pipe, safe} from 'crocks';

export const directionsCallback = useCallback((response) =>
  pipe(
    safe(not(isEmpty)),
    chain(getProp('status')),
    map(status => status === 'OK'
      ? setRoutes(() => (response))
      : console.warn('response: ', response)
    ),
  )(response), []);
