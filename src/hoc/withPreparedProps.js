import {curry} from 'crocks';

/**
 * @type {(Component: import('react').ReactComponentElement) => (prePropsFn: (props: object) => Object) => (props: object) => import('react').ReactNode}
 */
const withPreparedProps = curry((Component, prePropsFn, props) => (
  <Component {...{...prePropsFn(props), ...props}}/>
));

export default withPreparedProps;
