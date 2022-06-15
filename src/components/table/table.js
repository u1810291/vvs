/* eslint-disable react/react-in-jsx-scope */
import react from "react";

const styles = { borderSpacing: 0 };

const Table = (props) => (
  <table className="min-w-full border-separate" style={styles} {...props}/>
);

export default Table;
