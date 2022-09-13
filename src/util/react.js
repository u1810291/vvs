import {
  curry,
  map,
  pipe,
  identity,
  ifElse,
  isString,
  branch,
  merge,
  getPath,
} from 'crocks';
import {mapProps} from 'crocks/helpers';
import {isTrue} from 'crocks/predicates';
import {equals} from 'crocks/pointfree';
import React, {Suspense} from 'react';
import {Route} from 'react-router-dom';

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
 * // The 'block p-2 shadow bg-blue-500 hover:bg-blue-100' are in the className!
 * <ExtendableButton classNames='bg-blue-500 hover:bg-blue-100'/>
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

export const renderWithProps = curry((Component, props) => <Component {...props} />);

/**
 * @type {(exact: bool, isHidden: bool, translationNs: string, translationKey: string, path: string, Component: import('react').ComponentType, children: import('react').ComponentType) => Route}
 */
export const getRoute = curry((
  exact,
  isHidden,
  translationNs,
  translationKey,
  path,
  Component,
  children,
) => (
  <Route
    exact={exact}
    isHidden={isHidden}
    translationKey={translationKey}
    translationNs={translationNs}
    path={path}
    element={<Suspense><Component/></Suspense>}
  >
    {children}
  </Route>
));

export const getExactHiddenRoute = getRoute(true, true);
export const getHiddenRoute = getRoute(false, true);
export const getExactRoute = getRoute(true, false);

export const compareMemo = (...paths) => (prevProps, nextProps) => (
  paths
    .map(path => equals(
      getPath(path, prevProps),
      getPath(path, nextProps)
    ))
    .every(isTrue)
)

export const dynamicSort = (property) => {
  var sortOrder = 1;
  if(property[0] === '-') {
      sortOrder = -1;
      property = property.substr(1);
  }
  return (a,b) => {
    var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
    return result * sortOrder;
  }
}