import React, {cloneElement, Fragment, Suspense} from 'react';
import {Navigate, Route} from 'react-router-dom';
import {caseMap} from '@s-e/frontend/flow-control';
import {equals} from 'crocks/pointfree';
import {isFunction, isTrue} from 'crocks/predicates';
import {mapProps, omit} from 'crocks/helpers';
import {
  Maybe,
  branch,
  constant,
  curry,
  getPath,
  hasProp,
  identity,
  ifElse,
  isArray,
  isString,
  map,
  merge,
  pipe,
  safe,
} from 'crocks';
import {useAuth} from 'context/auth';


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

export const renderWithChildren = curry((element, children) => cloneElement(element, element?.props, children));


// auth by roles
export const ProtectedRoute = ({children, requiredRoles, denied}) => {
  // TODO: remove such dependency in utils file
  const {userData, isAuthorized} = useAuth();
  const roles = userData?.registrations?.find(r => r?.applicationId === 'efd4e504-4179-42d8-b6b2-97886a5b6c29')?.roles;
  const canAccess = roles?.some(role => requiredRoles.includes(role));

  if (canAccess || requiredRoles?.length === 0) return (<Fragment>{children}</Fragment>);
  return (<Navigate replace to={denied} />);
}


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
  roles
) => (
  <Route
    exact={exact}
    isHidden={isHidden}
    translationKey={translationKey}
    translationNs={translationNs}
    path={path}
    element={
    <Suspense>
      <ProtectedRoute requiredRoles={roles} denied={'/denied'}>
        <Component />
      </ProtectedRoute>
    </Suspense>}
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

/**
 * Use this if multiple components will reuse the same props
 *
 * Good for keeping code short and looks good in functional compositions.
 *
 * @type {(Component: Array<ReactNode>|import('react').ReactFragment|import('react').ReactNode|Array<Component>, item: Object) => Array<ReactNode>}
 *
 */
export const renderWithProps = curry((Component, props) => {
  if (isFunction(Component)) return <Component key={pipe(
    omit(['children']),
    JSON.stringify,
  )(props)} {...props} />;

  const mIterable = (
    safe(isArray, Component)
    .alt(Component?.type === Fragment ? getPath(['props', 'children'], Component) : Maybe.Nothing())

    .alt(Maybe.of([Component]))
    .map(ifElse(isArray, identity, a => [a]))
  );

  const cloneWithNewProps = curry((key, props, el) => cloneElement(
    el,
    {...el?.props, key, ...props},
    props?.children || el?.props?.children || undefined
  ));

  return mIterable
    .map(list => list.map((Element, index) => caseMap(constant(Element), [
      [hasProp('props'), cloneWithNewProps(index, props)],
      [isFunction, () => <Element {...{key: index, ...props}} />],
    ], Element)))
    .option(Component)
})

export const RenderWithProps = ({props, children}) => renderWithProps(children, props);

export const interpolateTextToComponent = curry((fullTokenRegex, valueExtractionRegex, map, text) => {
  if (!isString(text)) return text;

  const tokens = text.match(fullTokenRegex)

  if (!isArray(tokens)) return text;

  return tokens.reduce((c, token) => {
    const match = token.match(valueExtractionRegex);
    const last = c[c.length - 1];
    const update = [
      ...c.slice(0, -1),
      [
        last.slice(0, last.indexOf(token)),
        match?.length ? map(match) : '',
        last.slice(last.indexOf(token) + token.length)
      ].flat()
    ].flat();

    return update.every(isString) ? update.join(' ') : update;
  }, [text]);
})
