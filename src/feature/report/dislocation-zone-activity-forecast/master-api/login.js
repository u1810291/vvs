import {apiQuery} from '../master-api';
import {getProp, pipe, chain, safe, hasProps} from 'crocks';
import maybeToAsync from 'crocks/Async/maybeToAsync';

const LOGIN_QUERY = `
  query Login($password: String!, $username: String!) {
    login(password: $password, username: $username) {
      token
      refreshToken
      user {
        id
      }
    }
  }
`;

const login = pipe(
  pipe(
    safe(hasProps(['username', 'password'])),
    maybeToAsync(new Error('"username" and "password" props must be present')),
  ),
  chain(({username, password}) => apiQuery({username, password})(LOGIN_QUERY)),
  chain(pipe(
    getProp('login'),
    chain(safe(hasProps(['token', 'refreshToken']))),
    maybeToAsync(new Error('Prop "login" expected in response with "token", "refreshToken" props in it')),
  ))
);

export default login;
