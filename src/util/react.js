import {
  curry,
  map,
  isEmpty,
  tap,
  pipe,
  setProp,
  getPropOr,
  identity,
  ifElse,
  isString,
  branch,
  merge
} from 'crocks';
import {mapProps} from 'crocks/helpers';
import React from 'react';
import {mergeProps} from 'react-aria';

const strToArray = ifElse(isString, str => str.split(' '), identity)

export const mergeClassName = curry((staticStyle, props) => mapProps({
  classNames: mergeStyles(staticStyle)
}, props));

export const mergeStyles = curry((staticStyle, extendStyle) => pipe(
  strToArray,
  branch,
  map(pipe(
    () => extendStyle,
    strToArray,
  )),
  merge((l, r) => Array.from(new Set([...l, ...r]))),
  a => a.join(' '),
)(staticStyle))

/**
 * @type {(staticClassName: string, Component: Component, props: object) => Component}
 *
 * @example
 * const ExtendableButton = withMergedClassName('block p-2 shadow', SimpleButton);
 *
 * // The "block p-2 shadow bg-blue-500 hover:bg-blue-100" are in the className!
 * <ExtendableButton classNames="bg-blue-500 hover:bg-blue-100"/>
 */
export const withMergedClassName = curry((staticClassName, Component, props) => (
  <Component {...{
    ...props,
    className: mergeStyles(staticClassName, (props?.className || '')),
  }} />
));

/**
 * Setups an abstract component with predefined properties
 * as well as exposing them under components namespace.
 *
 * @example
 *
 * // Abstract component
 * const Menu = ({Button, Items}) => {
 *   return (
 *     <div>
 *       <Button/>
 *       <Items>{props?.children} </Items>
 *     </div>
 *   );
 * };
 *
 * // Predefine components Button, Items, Item.
 * // They now exposed under namspace too.
 * const Dropdown = withComponentFactory(Menu, {
 *   mapSetupInComponent: omit(['Item']),
 *   Button,
 *   Items,
 *   Item,
 * });
 *
 * // usage
 * render(
 *   <Dropdown>
 *     <Dropdown.Item>One</Dropdown.Item>
 *     <Dropdown.Item>Two</Dropdown.Item>
 *     <Dropdown.Item>Three</Dropdown.Item>
 *   </Dropdown>
 * )
 */
export const withComponentFactory = (Component, {mapSetupInComponent = identity, ...setup}) => {
  const A =  props => <Component {...mapSetupInComponent(setup)} {...props} />;

  Object
    .entries(setup)
    .forEach(([k, v]) => Object.assign(A, {[k]: v}));

  return A;
};
