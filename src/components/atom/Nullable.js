const Nullable = ({children, on, nullish=null}) => (on ? children : nullish);

export default Nullable;