import {omit} from 'crocks';
import {withComponentFactory} from '../../util/react';
import Nullable from '../Nullable';
import Input from './Base/Input';
import Label from './Base/Label';

const InputGroup = ({
  Addon,
  Input,
  Label,
  addonClassName = 'h-5 w-5 text-gray-400',
  addonWrapperClassName = 'absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none',
  className,
  inputClassName,
  inputWrapperWhenLabel = 'mt-1',
  inputwrapperClassName = 'relative rounded-md shadow-sm',
  labelText,
  ...props
}) => (
  <div className={className}>
    <Nullable on={labelText}>
      <Label htmlFor={props?.id}>
        {labelText}
      </Label>
    </Nullable>
    <div className={`${labelText ? inputWrapperWhenLabel : ''} ${inputwrapperClassName}`}>
      <Input {...{...props, className: inputClassName}} />
      {Addon && (
      <div className={addonWrapperClassName}>
        <Addon className={addonClassName} aria-hidden='true' />
      </div>)}
    </div>
  </div>
);

export default withComponentFactory(InputGroup, {
  mapSetupInComponent: omit(['input']),
  Label,
  Input,
});
