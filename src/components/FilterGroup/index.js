import {omit} from 'crocks';
import Text from './Text';
import _FilterGroup from './FilterGroup';
const {withComponentFactory} = require('util/react');


const FilterGroup = withComponentFactory(_FilterGroup, {
  mapSetupInComponent: omit(['Text']),
  Text
});


export default FilterGroup;

export {
  Text
}
