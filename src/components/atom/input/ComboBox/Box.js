import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {putIntoArray} from '../../../../util/array';
// import {asciifyLT} from '@s-e/frontend/transformer/string';
import {Combobox} from '@headlessui/react';
import Nullable from '../../Nullable'
import {componentToString} from '@s-e/frontend/react';
import {
  filter,
  getPath,
  identity,
  ifElse,
  isEmpty,
  isTruthy,
  option,
  pipe,
} from 'crocks';


const asciifyLT2 = string => string
  .replace(/a/gi, '(a|ą)')
  .replace(/c/gi, '(c|č)')
  .replace(/e/gi, '(e|ė|ę)')
  .replace(/i/gi, '(i|į)')
  .replace(/s/gi, '(s|š)')
  .replace(/u/gi, '(u|ų|ū)')
  .replace(/z/gi, '(z|ž)');



const Box = ({
  Label,
  InputContainer,
  labelText = '',
  Input,
  Button,
  Options,
  Option,
  children,
  optionClassNameFn = ({active}) => `relative cursor-default select-none py-2 pl-3 pr-9 ${active ? 'bg-indigo-600 text-white' : 'text-gray-900'}`,
  onChangeValue,
  value, 
  displayValue = identity,
  // multiple,
  placeholder,  
  ...props
}) => {
  const [query, setQuery] = useState('');
  const [selectedChildren, setSelectedChildren] = useState('');

  const filteredChildren = useMemo(() => pipe(
    putIntoArray,
    filter(isTruthy),
    ifElse(
      () => isEmpty(query),
      identity,
      filter(
        (component) => String(componentToString(component))
        // .match(new RegExp(asciifyLT(query.replace(/\W+/gm, '')), 'gi'))
        .match(new RegExp(asciifyLT2(query.replace(/[^\w\d -]/gm, '')), 'gi'))
      )
    )
  )(children), [children, query]);
  
  const onChange = (event) => {
    setQuery(event.target.value)
  };
  
  useEffect(() => {
    console.log(selectedChildren);
    onChangeValue({key: selectedChildren?.key, value: selectedChildren?.props?.value});
  }, [selectedChildren]);

  const displayName = useCallback(event => pipe(
    getPath(['props', 'children']),
    option(''),
  )(event), []);

  return (
    <Combobox as='div' value={selectedChildren} onChange={setSelectedChildren}>
      <Nullable on={labelText}><Label>{labelText}</Label></Nullable>
      <InputContainer>
        <Input
          onChange={onChange}
          displayValue={displayName}
          placeholder={placeholder}
          {...props}
        />
        <Button/>
        <Nullable on={filteredChildren.length}>
          <Options>
            {filteredChildren.map((component) => (
              <Option 
                {...component.props} 
                className={optionClassNameFn} 
                value={component}              
                key={component?.key || component?.props?.key || component.props.children}
                selected={displayValue(value)}
                //   multiple
                //     ? value.includes(component.props.children)
                //       ? displayValue(component.props.children)
                //       : ''
                //     : displayValue(value)
                // }
              />
            ))}
          </Options>
        </Nullable>
      </InputContainer>
    </Combobox>
  );
};

export default Box;
