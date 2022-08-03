import {useMemo, useCallback} from 'react';
import {ensureOptionalProp, ensureProp} from '../util/result';
import {
  Result,
  bimap,
  isString,
  getPathOr,
  getPropOr,
  hasProp,
  identity,
  not,
  objOf,
  pipe,
  propEq,
  reduce,
  setProp,
  isEmpty,
  defaultProps,
} from 'crocks';
import useMergeReducer from './useMergeReducer';
import {always} from 'util/func';
import {isBoolean} from 'crocks/predicates';
import {onCheckboxEvent} from '@s-e/frontend/callbacks/event/input';

/**
 * @type FormInputProps
 * @param {(value: string) => void} onChange
 * @param {string} value
 */

/**
 * @type FormInput
 * @param {(value: string) => boolean} validator
 * @param {string} initial
 * @param {boolean} opt
 * @param {string} message
 * @param {FormInputProps[]} props
 */

/**
 * @param {Object.<string, FormInput>} obj
 */
export const useResultForm = (obj) => {
  const [state, setState] = useMergeReducer(pipe(
    Object.entries,
    reduce((carry, [key, opts]) => setProp(
      key,
      getPropOr('', 'initial', opts),
      carry
    ), {}),
  )(obj));

  const result = useMemo(() => pipe(
    Result.Ok,
    ...Object.entries(obj).reduce((carry, [key, opts]) => {
      const ensure = propEq('opt', true, opts) ? ensureOptionalProp : ensureProp;
      return [
        ...carry,
        ensure(
          key,
          getPropOr(() => false, 'validator', opts),
          getPropOr(`Validation failed for field ${key}.`, 'message', opts),
        )
      ]
    }, []),
    bimap(identity, () => state)
  )(state), [state]);
  const isComplete = useMemo(() => result.either(() => false, () => true), [result]);
  const isFullyComplete = useMemo(() => result.either(
    () => false,
    () => Object.values(state).filter(a => a !== '').length === Object.values(state).length
  ), [result]);

  const set = useCallback(key => value => setState(objOf(key, value)), [setState]);
  const isValid = useCallback(key => result.either(not(hasProp(key)), () => true), [result]);
  const getValid = useCallback(key => result.either(getPropOr(undefined, key), () => undefined), [result]);
  const filledIn = useCallback(key => result.either(getPropOr(undefined, key), () => undefined), [result]);
  const control = useCallback(key => ({
    ...pipe(
      getPathOr({}, [key, 'props']),
      Object.entries,
      reduce((carry, [prop, value]) => setProp(
        prop,
        value({
          isValid: isValid(key),
          message: getValid(key),
          value: getPropOr(undefined, key, state),
          set: set(key),
        }),
        carry
      ), {})
    )(obj)
  }), [state, set, isValid, getValid, result]);

  return {
    ctrl: control,
    isValid,
    getValid,
    form: state,
    setForm: setState,
    result,
    isComplete,
    isFullyComplete,
  };
};

export default useResultForm;

const FORM_FIELD = {
  TEXT: ({
    label,
    fallbackValue = '',
    props = {},
    ...obj
  }) => defaultProps({
    validator: not(isEmpty),
    initial: '',
    props: {
      onChange: ({set}) => ({target: {value}}) => set(value),
      value: ({value}) => isString(value) ? value : fallbackValue,
      ...(label ? {label: always(label)} : {}),
      ...props
    }
  }, obj),
  BOOL: ({
    label,
    fallbackValue = false,
    props = {},
    ...obj
  }) => defaultProps({
    validator: not(isEmpty),
    initial: false,
    props: {
      onChange: ({set}) => onCheckboxEvent(fallbackValue, set),
      isChecked: ({value}) => isBoolean(value) ? value : fallbackValue,
      ...(label ? {label: always(label)} : {}),
      ...props
    }
  }, obj),
  EVENTS: ({
     label,
     fallbackValue = [],
     ...obj
   }) => defaultProps({
    validator: not(isEmpty),
    initial: [],
    props: {
      setValue: ({set}) => set,
      value: ({value}) => value,
    }
  }, obj),
  OBJECT: ({
    label,
    fallbackValue = {},
    ...obj
  }) => defaultProps({
    validator: not(isEmpty),
    initial: {},
    props: {
      setValue: ({set}) => set,
      value: ({value}) => value,
    }
  }, obj),
  ARRAY: ({
    label,
    fallbackValue = [],
    ...obj
  }) => defaultProps({
    validator: not(isEmpty),
    initial: [],
    props: {
      setValue: ({set}) => set,
      value: ({value}) => [value],
    }
  }, obj)
};

export {FORM_FIELD};
