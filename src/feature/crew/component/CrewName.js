import {getProp} from 'crocks';
import {Link, generatePath} from 'react-router-dom';
import {CrewEditRoute} from '../routes';

const CrewName = crew => (
  getProp('name', crew)
  .map(value => <Link to={generatePath(CrewEditRoute.props.path, {id: crew.id})} key={value} className='text-black'>{value}</Link>)
  .option(null)
);

export default CrewName;
