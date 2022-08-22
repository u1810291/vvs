import React from 'react';
import Input from './Base/Input';
import Label from './Base/Label';
import ErrorText from './Base/ErrorText';
import Nullable from 'components/atom/Nullable'
import {putIntoArray} from 'util/array';
import {withComponentFactory} from 'util/react';
import {omit} from 'crocks';

export const InputGroup = ({
  Addon,
  Input,
  Label,
  addonClassName = 'h-5 w-5 text-gray-400',
  addonWrapperClassName = 'absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none',
  className,
  inputClassName,
  inputWrapperWhenLabel = 'mt-1',
  inputwrapperClassName = 'relative rounded-md',
  label,
  twLabel,
  isRequired,
  twRequired,
  below,
  ...props
}) => (
  <div className={className}>
    <Nullable on={label}>
      <Label className={twLabel} htmlFor={props?.id}>
        <>
          {label}
          {isRequired && <span className={`text-red-500 ${twRequired}`}> * </span>}
        </>
      </Label>
    </Nullable>
    <div className={`${label ? inputWrapperWhenLabel : ''} ${inputwrapperClassName}`}>
      <Input {...{...props, className: [...putIntoArray(inputClassName), Addon ? 'pr-10' : ''].join(' ')}} />
      {Addon && (
      <div className={`${addonWrapperClassName}`}>
        <Addon className={addonClassName} aria-hidden='true' />
      </div>)}
    </div>
    <Nullable on={below}>
      {below}
    </Nullable>
  </div>
);

export default withComponentFactory(InputGroup, {
  mapSetupInComponent: omit(['input', 'ErrorText']),
  Label,
  Input,
  ErrorText,
});
