import React from 'react';
import {identity} from 'crocks';

const Box = ({
  Input,
  Label,
  CheckboxContainer,
  DetailsContainer,
  name,
  label,
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
        <Label htmlFor={name}>
          {label}
        </Label>
        {description}
      </DetailsContainer>
    </CheckboxContainer>
  );
};

export default Box;
