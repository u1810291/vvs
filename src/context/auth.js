import jwtDecode from 'jwt-decode';
import refresh from 'feature/login/api/refresh';
import useMergeReducer from 'hook/useMergeReducer';
import {api, apiQuery} from 'api';
import {createContext, useContext} from 'react';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {
  Maybe,
  and,
  chain,
  getProp,
  isEmpty,
  isString,
  isTruthy,
  map,
  not,
  objOf,
  option,
  pipe,
  safe,
  tap,
  tryCatch,
  isFunction,
} from 'crocks';

/**
 * @typedef {object} AuthContextValue
 * @property {bool} isAuthorized: bool,
 * @property {(newState: object) => void} update
 * @property {(variables: object) => (query: string) => Async} api
 * @property {(query: string) => Async} apiQuery
 */

const AuthContext = createContext();
const isValid = and(isString, not(isEmpty));

const AuthContextProvider = ({children}) => {
  const [isAuthorized, setAuthorized] = useState(null);
  const [state, setState] = useMergeReducer({
    token: null,
    refreshToken: null
  });

  const userData = useMemo(() => pipe(
    getProp('token'),
    chain(safe(isTruthy)),
    chain(token => (
      tryCatch(() => jwtDecode(token))()
      .either(Maybe.Nothing, Maybe.Just)
    )),
    chain(getProp('userData')),
    option(null),
  )(state), [state]);

  /**
   * @type {(variables: Object) => (query: string) => Async}
   */
  const authorizedApi = useMemo(() => pipe(
    getProp('token'),
    chain(safe(isValid)),
    map(pipe(
      str => `Bearer ${str}`,
      objOf('Authorization'),
      api
    )),
    option(apiQuery)
  )(state), [state]);

  const fail = useCallback(() => {
    setAuthorized(false);
    setState({token: null, refreshToken: null});
  }, [setAuthorized, setState]);

  const success = useCallback(() => { 
    setAuthorized(true);
  }, [setAuthorized]);

  const logout = useCallback((callback) => {
    setAuthorized(false);
    setState({token: null, refreshToken: null, user: null});
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    isFunction(callback) && callback();
  }, [state, setAuthorized]);


  useEffect(() => {
    getProp('refreshToken', state)
    .chain(safe(isValid))
    .map(tap(value => localStorage.setItem('refreshToken', value)))
    .alt(safe(isValid, localStorage.getItem('refreshToken')))
    .either(fail, refreshToken => {
      if (state.token) return success();

      refresh(refreshToken)
        .map(tap(setState))
        .fork(fail, success)
    });
  }, [state, fail, success]);

  return (
    <AuthContext.Provider value={{
      ...state,
      isAuthorized,
      update: setState,
      api: authorizedApi,
      apiQuery: authorizedApi(null),
      logout,
      userData
    }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * @type {() => AuthContextValue}
 * @throws {Error}
 */
const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error('useAuth must be used within a AuthProvider');
  return context;
}

export {
  AuthContextProvider,
  useAuth,
}
