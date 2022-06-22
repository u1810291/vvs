import {identity} from 'crocks';
import React from 'react';

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
}) => {
  return (
    <CheckboxContainer>
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
