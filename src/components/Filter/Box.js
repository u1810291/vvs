import React, {useState, useEffect} from "react";
import {
  and,
  chain,
  defaultProps,
  getPath,
  getPathOr,
  getProp,
  getPropOr,
  hasProps,
  identity,
  ifElse,
  isArray,
  isTrue,
  isTruthy,
  map,
  option,
  pathSatisfies,
  pipe,
  safe,
  tap,
} from 'crocks';

const putIntoArray = ifElse(isArray, identity, (value) => [value]);
const mapToNames = map(getPathOr("", ["props", "children"]));

const Box = ({Dropdown, Item, children, onChange = identity, onValues = identity, ...props}) => {
  children = pipe(
    putIntoArray,
    map(
      pipe(
        getPropOr({}, "props"),
        defaultProps({
          onDelete: (value) => () =>
            setActive((as) => as.filter((a) => a !== value && a)),
        }),
        (props) => <Item key={props?.children} {...props} />
      )
    )
  )(children);

  const [active, setActive] = useState(
    pipe(
      putIntoArray,
      (a) => a.filter(pathSatisfies(["props", "active"], isTrue)),
      mapToNames
    )(children)
  );

  useEffect(() => {onValues({
    things: pipe(
      putIntoArray,
      map(pipe(
        getProp('props'),
        chain(safe(hasProps(['propPath', 'children']))),
        map(({propPath, children}) => [propPath, children]),
        option(null)
      )),
      a => a.filter(and(identity, a => active.includes(a[1]))),
      Object.fromEntries,
    )(children)
    //.filter(children)
    //.map(c => c.props.propPath),
    ,active
  })}, [active]);

  return (
    <div className="flex-wrap flex rounded-md w-full border p-1 bg-white sm:grid-cols-6 font-normal text-black" {...props}>
      {pipe(putIntoArray, (a) => a.filter((b) => active.includes(b.props.children)))(children)}
      <Dropdown>
        {
          pipe(
            putIntoArray,
            (a) => a.filter((b) => !active.includes(b.props.children)),
            mapToNames,
            map(content => (
              <Dropdown.Item
                Tag='button'
                className="w-full text-left"
                key={content}
                onClick={
                  pipe(
                    getPath(['target', 'textContent']),
                    map(tap((value) =>
                      setActive((actives) => [...actives, value].filter(isTruthy))
                    )),
                    map(tap(onChange)),
                  )
                }
              >
                {content}
              </Dropdown.Item>
            )),
          )(children)
        }
      </Dropdown>
    </div>
  );
};

export default Box;
