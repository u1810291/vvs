import React, {useEffect, useMemo, useState} from 'react';
import {apiQuery} from 'api';
import {API_ENDPOINT} from 'env';
import {hasLength} from '@s-e/frontend/pred';
import useMergeReducer from 'hook/useMergeReducer';
import {
  createContext,
  useContext,
  useRef,
} from 'react';
import {
  curry,
  Async,
  pipe,
  safe,
  option,
  bimap,
  bichain,
  and,
  not,
  isString,
  map,
  isEmpty,
  maybeToEither,
  tap,
  Maybe,
  hasProps,
  propSatisfies,
} from 'crocks';

const {Rejected, Resolved} = Async;
const {Just, Nothing} = Maybe;
const AuthContext = createContext();

const isValid = and(isString, not(isEmpty));

const AuthContextProvider = ({children}) => {
  const [headers, setHeaders] = useMergeReducer({})
  const [state, setState] = useMergeReducer({
    token: null,
    refreshToken: null
  });

  useEffect(() => {
    //pipe(
      //safe(),
      //maybeToEither('lol'),
      //bimap(tap(console.error), tap(console.warn)),

      // 1. get refresh token
      // 2. try getting token
      // 3. set return value into state
      // 4. set return value into storage
      // 5. isAuthorized => true

    //)(localStorage.getItem('refreshToken'))
  }, []);

  const isAuthorized = useMemo(() => pipe(
    safe(and(propSatisfies('token', isValid), propSatisfies('refreshToken', isValid))),
    option(false),
  )(state), [state])

  return (
    <AuthContext.Provider value={{isAuthorized}}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * @type {() => {
 * isAuthorized: bool,
 * update: (newState: object) => void
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
