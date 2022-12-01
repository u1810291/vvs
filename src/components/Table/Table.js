const styles = {borderSpacing: 0};

const Table = ({...props}) => (
  <table className='min-w-full border-separate table-fixed' style={styles} {...props}/>
);

export default Table;
