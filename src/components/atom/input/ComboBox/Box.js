import React, {useEffect, useMemo, useState, useCallback} from 'react';
import {putIntoArray} from '../../../../util/array';
// import {asciifyLT} from '@s-e/frontend/transformer/string';
import {Combobox} from '@headlessui/react';
import Nullable from '../../Nullable'
import {componentToString} from '@s-e/frontend/react';
import {
  filter,
  // getPath,
  identity,
  ifElse,
  // isArray,
  isEmpty,
  isTruthy,
  // option,
  pipe,
} from 'crocks';
import Tag from './Tag';
// import {equals} from 'crocks/pointfree';


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
  const [selected, setSelected] = useState({});
  const [state, setState] = useState(value);

  // useEffect(() => {
  //   if (isArray(value) && value.length > 0 && !equals(state, value)) setState(value);
  // }, [value]);

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
  
  const onInputChange = (event) => {
    setQuery(event.target.value)
  };

  const onSelect = (event) => {
    // console.log('onselect', event);
    const current = {value: event.props.value, name: event.props.children};
    setSelected(current);

    let prevState = [...state];
    const exists = prevState.find(s => s.value === current.value);
    
    if (exists) {
      prevState = prevState.filter(s => s.value !== exists.value);
    } else {
      prevState.push(current);
    }

    // if it is not multiple autocomplete
    if (!multiple && prevState.length > 1) {
      prevState = [prevState[prevState.length - 1]];
    }

    setState(prevState);
  }

  const onDeselect = (event) => {
    // console.log('deselect',  event.target.dataset.value);
    
    let prevState = [...state];
    const exists = prevState.find(s => s.value === event.target.dataset.value);
    
    if (exists) {
      prevState = prevState.filter(s => s.value !== exists.value);
    }

    setState(prevState);
  }
  
  useEffect(() => {
    // console.log('combobox state changed', state, selected);
    onChange(selected);
  }, [state, selected]);

  const displayName = useCallback(() => {
    // console.log('dn', state);
    return !multiple && state.length > 0 ? state[state.length - 1].name : '';
  }, [state])

  return (
    <Combobox as='div' value={value} onChange={onSelect} {...props}>
      <Nullable on={labelText}><Label>{labelText}</Label></Nullable>
      <InputContainer>
        <div className='flex flex-row relative'>
          <Input
            onChange={onInputChange}
            displayValue={displayName}
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
                selected={state.find(s => s.value === component?.key)}
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
        
        <Nullable on={state.length && multiple}>
          {state.map(({value, name}) => (
            <Tag key={value} value={value} onDelete={onDeselect}>{name}</Tag>
          ))}
        </Nullable>
      </InputContainer>
      
      
    </Combobox>
  );
};

export default Box;
