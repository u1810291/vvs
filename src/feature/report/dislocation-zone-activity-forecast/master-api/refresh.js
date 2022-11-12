import {apiQuery} from '../master-api';
import {getProp, pipe, chain, safe, hasProps, not, isEmpty} from 'crocks';
import maybeToAsync from 'crocks/Async/maybeToAsync';

const REFRESH_QUERY = `
  query Refresh ($refreshToken: String!) {
    refresh (refreshToken: $refreshToken) {
    token
    refreshToken
    }
  }
`;

const refresh = pipe(
  pipe(
    safe(not(isEmpty)),
    maybeToAsync(new Error('"refreshToken" prop must be present')),
  ),
  chain(refreshToken => apiQuery({refreshToken})(REFRESH_QUERY)),
  chain(pipe(
    getProp('refresh'),
    chain(safe(hasProps(['token', 'refreshToken']))),
    maybeToAsync(new Error('Prop "refresh" expected in response with "token", "refreshToken" props in it')),
  ))
);

export default refresh;
