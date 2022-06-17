const styles = { borderSpacing: 0 };

const Table = props => (
  <div className='overflow-x-auto'>
    <table className='min-w-full border-separate' style={styles} {...props}/>
  </div>
);

export default Table;
