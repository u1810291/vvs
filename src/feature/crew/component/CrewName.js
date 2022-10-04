import {getProp} from 'crocks';

const CrewName = crew => (
  getProp('name', crew)
  .map(value => <p key={value} className='text-black'>{value}</p>)
  .option(null)
);

export default CrewName;
