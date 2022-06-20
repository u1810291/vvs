import React, {useMemo} from 'react';
import {api, apiQuery} from 'api';
import useMergeReducer from 'hook/useMergeReducer';
import {createContext, useContext} from 'react';
import {
  and,
  chain,
  getProp,
  isEmpty,
  isString,
  map,
  not,
  objOf,
  option,
  pipe,
  propSatisfies,
  safe,
} from 'crocks';

const AuthContext = createContext();

const isValid = and(isString, not(isEmpty));

const AuthContextProvider = ({children}) => {
  const [state, setState] = useMergeReducer({
    token: null,
    refreshToken: null
  });

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

  const isAuthorized = useMemo(() => pipe(
    safe(and(propSatisfies('token', isValid), propSatisfies('refreshToken', isValid))),
    option(false),
  )(state), [state])

  return (
    <AuthContext.Provider value={{
      ...state,
      isAuthorized,
      update: setState,
      api: authorizedApi,
      apiQuery: authorizedApi(null),
    }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * @type {() => {
 * isAuthorized: bool,
 * update: (newState: object) => void
 * api: (variables: object) => (query: string) => Async
 * apiQuery: (query: string) => Async
 * }}
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
