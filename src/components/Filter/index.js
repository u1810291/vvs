import React, {useMemo, useState} from 'react';
import {mergeClassName} from '../../util/react';
import ComboBox from '../ComboBox';
import {
  defaultProps,
  getPathOr,
  getPropOr,
  identity,
  ifElse,
  isArray,
  isTrue,
  map,
  pathSatisfies,
  pipe,
  tap,
} from 'crocks';

const putIntoArray = ifElse(isArray, identity, value => [value]);
const mapToNames = map(getPathOr('', ['props', 'children']))

export const FilterItem = ({propPath = [], children, onDelete = identity, ...props}) => (
  <div {...mergeClassName('lg:w-1/6 w-full sm:w-1/2 md:w-3/4 m-1 h-5 flex-grow flew-shrink flex p-1 rounded-sm text-xs font-normal justify-between items-center text-gray-400 bg-gray-200', props)}>
    <span className="whitespace-nowrap">{children}</span>
    <button onClick={onDelete(children)}>
      <svg className="ml-2 block w-3 h-3" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 7L7 1" stroke="#818BA2"/>
        <path d="M1 1L7 7" stroke="#818BA2"/>
      </svg>
    </button>
  </div>
);

const Filter = ({children, onChange = identity, ...props}) => {
  children = pipe(
    putIntoArray,
    map(pipe(
      getPropOr({}, 'props'),
      defaultProps({
        onDelete: value => () => setActive(as => as.filter(a => a !== value))
      }),
      props => <FilterItem {...props} />
    )),
  )(children);

  const [active, setActive] = useState(pipe(
    putIntoArray,
    a => a.filter(pathSatisfies(['props', 'active'], isTrue)),
    mapToNames,
  )(children));

  return (
    <div {...mergeClassName('flex-wrap flex rounded-md w-full border p-1 bg-white sm:grid-cols-6 font-normal text-black', props)}>
      {pipe(
        putIntoArray,
        a => a.filter(b => active.includes(b.props.children))
      )(children)}

      <ComboBox
        values={
          pipe(
            putIntoArray,
            a => a.filter(b => !active.includes(b.props.children)),
            mapToNames,
          )(children)
        }

        onChange={
          pipe(
            tap(value => setActive(actives => [...actives, value])),
            onChange,
          )
        }
      />
    </div>
  );
};
export default Filter;
