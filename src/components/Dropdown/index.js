import Button from './Button';
import Item from './Item';
import Items from './Items';
import Transition from './Transition';
import {withComponentFactory} from '../../util/react';
import {omit} from 'crocks';
import Menu from './Menu';

const Dropdown = withComponentFactory(Menu, {
  mapSetupInComponent: omit(['Item']),
  Button,
  Items,
  Transition,
  Item,
});

export default Dropdown;

export {
  Button,
  Item,
  Items,
  Transition,
  Menu,
};
