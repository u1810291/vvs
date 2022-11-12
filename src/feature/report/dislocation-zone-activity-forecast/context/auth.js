import jwtDecode from 'jwt-decode';
import refresh from '../master-api/refresh';
import useMergeReducer from 'hook/useMergeReducer';
import {api, apiQuery} from '../master-api';
import {createContext, useContext, useRef} from 'react';
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
  isFalsy,
} from 'crocks';
import InputGroup from 'components/atom/input/InputGroup';
import Button from 'components/Button';
import {useTranslation} from 'react-i18next';
import login from '../master-api/login';

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

  const fail = useCallback((error) => {
    console.error(error);
    setAuthorized(false);
    setState({token: null, refreshToken: null});
  }, [setAuthorized, setState]);

  const success = useCallback(() => {
    setAuthorized(true);
  }, [setAuthorized]);

  useEffect(() => {
    getProp('refreshToken', state)
    .chain(safe(isValid))
    .map(tap(value => localStorage.setItem('ai2.refreshToken', value)))
    .alt(safe(isValid, localStorage.getItem('ai2.refreshToken')))
    .either(fail, refreshToken => {
      if (state.token) return success();

      refresh(refreshToken)
        .map(tap(setState))
        .fork(fail, success)
    });
  }, [state, fail, success]);

  const {t} = useTranslation('request', {keyPrefix: 'auth.context'});

  const formRef = useRef();

  const onLogin = () => {
    pipe(
      getProp('current'),
      map(a => Array.from(a.querySelectorAll('input'))),
      map(map(a => [a.dataset.form, a.value])),
      map(Object.fromEntries),
      option(null),
      login,
      map(tap(setState)),
      a => a.fork(console.error, console.log),
    )(formRef)
  };

  console.log(state);

  return (
    <AuthContext.Provider value={{
      ...state,
      isAuthorized,
      update: setState,
      api: authorizedApi,
      apiQuery: authorizedApi(null),
      userData
    }}>
      {children}
      {isFalsy(state?.token) ? (
        <div className='fixed bg-black top-0 right-0 bottom-0 left-0 z-50 bg-opacity-30 flex justify-center items-center'>
          <div className='m-8 bg-white p-8 rounded shadow-lg space-y-4' ref={formRef}>
            <h4>{t('heading')}</h4>
            <InputGroup data-form='username' label={t('username')}/>
            <InputGroup data-form='password' type='password' label={t('password')}/>
            <div className='flex justify-end items-end'>
              <Button onClick={onLogin}>{t('submit')}</Button>
            </div>
          </div>
        </div>
      ) : null}
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
