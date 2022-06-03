import React, {forwardRef, useEffect} from "react";

const Cell = forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
      style={{width: 3.25}}
      id={`${props.slot}`}
      className={`${props.index % 12 === 0 ? "shadow-[-1px_0_0_0_rgba(64,75,95,0.1)]" : ""}`}
    />
  );
});

Cell.displayName = "Cell";

export default Cell;
