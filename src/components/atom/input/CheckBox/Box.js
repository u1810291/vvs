import React, {useCallback, useState} from 'react';

const Box = ({
  Input,
  Label,
  CheckboxContainer,
  DescriptionContainer,
  OneLineDescription,
  MultiLineDescription,
  type,
  name,
  label,
  description,
  setCheck,
  isChecked,
}) => {
  const onChange = useCallback(() => setCheck(), []);
  return (
    <CheckboxContainer>
      <Input
        id={name}
        name={name}
        onChange={onChange}
        checked={isChecked}
        aria-describedby={`${name}-description`}
      />
      <DescriptionContainer>
        <Label htmlFor={name}>
          {label}
        </Label>
        <MultiLineDescription id={`${name}-description`}>
          {description}
        </MultiLineDescription>
      </DescriptionContainer>
    </CheckboxContainer>
  );
};

export default Box;
