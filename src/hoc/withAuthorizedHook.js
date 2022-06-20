import {useAuth} from 'context/auth';
import {curry} from 'crocks';

/**
 * @type {(Component: import('react').ComponentType, {propsWithAuth: (auth: useAuth) => object, ...object}) => import('react').ComponentType}
 */
export const withAuthorizedHook = curry((Component, propsWithAuth, props) => (
  <Component {...{...props,...propsWithAuth(useAuth())}} />
));
