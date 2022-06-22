import React, {useState, useEffect} from 'react';
import {
  defaultProps,
  getPath,
  getPathOr,
  getPropOr,
  identity,
  ifElse,
  isArray,
  isTrue,
  isTruthy,
  map,
  pathSatisfies,
  pipe,
  tap,
} from 'crocks';
import {filter} from 'crocks/pointfree';

const putIntoArray = ifElse(isArray, identity, (value) => [value]);
const mapToName = getPathOr('', ['props', 'children'])

const Box = ({Dropdown, Item, children, onChange = identity, onValues = identity, ...props}) => {
  children = pipe(
    putIntoArray,
    map(
      pipe(
        getPropOr({}, 'props'),
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
      (a) => a.filter(pathSatisfies(['props', 'active'], isTrue)),
      map(mapToName)
    )(children)
  );

  useEffect(() => {pipe(
    putIntoArray,
    filter(pipe(
      mapToName,
      name => active.includes(name),
    )),
    map(a => a?.props?.uid),
    onValues,
  )(children)}, [active]);

  return (
    <div className='flex-wrap flex rounded-md w-full border p-1 bg-white sm:grid-cols-6 font-normal text-black' {...props}>
      {pipe(putIntoArray, (a) => a.filter((b) => active.includes(b.props.children)))(children)}
      <Dropdown>
        {
          pipe(
            putIntoArray,
            (a) => a.filter((b) => !active.includes(b.props.children)),
            map(mapToName),
            map(content => (
              <Dropdown.Item
                Tag='button'
                className='w-full text-left'
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
