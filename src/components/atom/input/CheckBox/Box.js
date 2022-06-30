import {identity} from 'crocks';
import React from 'react';

const Box = ({
  Input,
  Label,
  CheckboxContainer,
  DetailsContainer,
  name,
  label,
  twLabel,
  description,
  isChecked,
  onChange = identity,
  ...props
}) => {
  return (
    <CheckboxContainer {...props}>
      <Input
        id={name}
        name={name}
        onChange={onChange}
        checked={isChecked}
        aria-describedby={`${name}-description`}
      />
      <DetailsContainer>
        <Label className={twLabel} htmlFor={name}>
          {label}
        </Label>
        {description}
      </DetailsContainer>
    </CheckboxContainer>
  );
};

export default Box;
