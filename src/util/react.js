import {
  curry,
  map,
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

const strToArray = ifElse(isString, str => str.split(' '), identity)
export const mergeClassName = curry((staticStyle, props) => pipe(
  strToArray,
  branch,
  map(pipe(
    () => props,
    getPropOr([], 'className'),
    strToArray,
  )),
  merge((l, r) => Array.from(new Set([...l, ...r]))),
  a => a.join(' '),
  value => setProp('className', value, props),
)(staticStyle))
