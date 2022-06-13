import {withComponentFactory} from '../../util/react';
import Box from './Box';
import Item from './Item';
import Dropdown from './Dropdown';

const Filter = withComponentFactory(Box, {Item, Dropdown});

export default Filter;
