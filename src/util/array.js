import {identity, ifElse, isArray} from 'crocks';

export const putIntoArray = ifElse(isArray, identity, (value) => [value]);