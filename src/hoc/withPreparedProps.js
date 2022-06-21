import {curry} from 'crocks';

const withPreparedProps = curry((Component, prePropsFn, props) => (
  <Component {...{...prePropsFn(props), ...props}}/>
));

export default withPreparedProps;
