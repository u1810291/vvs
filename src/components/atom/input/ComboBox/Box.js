import React, {useMemo, useState} from 'react';
import {putIntoArray} from '../../../../util/array';
import {Combobox} from '@headlessui/react';
import Nullable from '../../Nullable'
import {componentToString} from '@s-e/frontend/react';
import {
  filter,
  identity,
  ifElse,
  isEmpty,
  isTruthy,
  pipe,
} from 'crocks';
import Tag from './Tag';


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
  onChange,
  value, 
  displayValue = identity,
  multiple,
  placeholder,  
  ...props
}) => {
  // console.log('initial combobox value', value);

  const [query, setQuery] = useState('');

  const filteredChildren = useMemo(() => pipe(
    putIntoArray,
    filter(isTruthy),
    ifElse(
      () => isEmpty(query),
      identity,
      filter(
        (component) => String(componentToString(component))
        .match(new RegExp(asciifyLT2(query.replace(/[^\w\d -]/gm, '')), 'gi'))
      )
    )
  )(children), [children, query]);
  
  const onInputChange = (e) => {
    setQuery(e.target.value)
  };

  const onChangeValue = (e) => {
    onChange(e.props.value)
  }

  const onDeselect = (e) => {
    onChange(e.target.dataset.value)
  }
  

  return (
    <Combobox as='div' value={value} onChange={onChangeValue} {...props}>
      <Nullable on={labelText}><Label>{labelText}</Label></Nullable>
      <InputContainer>
        <div className='flex flex-row relative'>
          <Input
            onChange={onInputChange}
            displayValue={(v) => multiple ? '' : displayValue(v)}
            placeholder={placeholder}
            {...props}
            className={'w-full'}
          />
          <Button />
        </div>
        <Nullable on={filteredChildren.length}>
          <Options>
            {filteredChildren.map((component) => (
              <Option 
                {...component.props} 
                className={optionClassNameFn} 
                value={component}              
                key={component?.key || component?.props?.key || component.props.children}
                selected={multiple && value ? value?.toString().includes(component?.key) : value === component?.key}
              />
            ))}
          </Options>
        </Nullable>
        
        <Nullable on={value?.length > 0 && multiple === true}>
          {value?.toString().split(',').map((v) => (
            <Tag key={v.trim()} value={v.trim()} onDelete={onDeselect}>{displayValue(v.trim())}</Tag>
          ))}
        </Nullable>
      </InputContainer>
    </Combobox>
  );
};

export default Box;
