import {
  pipe,
  constant,
  once,
} from 'crocks';

export const always = pipe(
  constant,
  once
);
