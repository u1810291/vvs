import {titleCase} from '@s-e/frontend/transformer/string';
import {
  getPath,
  map,
  option,
  pipe,
} from 'crocks';

const CrewPermissionTitle = crew => pipe(
  getPath(['permissions', 0, 'request', 'value']),
  map(titleCase),
  map(str => <span className='text-steel' key={str}>{str}</span>),
  option(null),
)(crew);

export default CrewPermissionTitle;
