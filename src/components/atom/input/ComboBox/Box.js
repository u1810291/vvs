import Nullable from '../../Nullable'
import React, {useMemo, useState} from 'react';
import Tag from './Tag';
import {Combobox} from '@headlessui/react';
import {caseMap} from '@s-e/frontend/flow-control';
import {componentToString} from '@s-e/frontend/react';
import {putIntoArray} from '../../../../util/array';
import {
  constant,
  filter,
  identity,
  chain,
  isSame,
  ifElse,
  isEmpty,
  isTruthy,
  not,
  pipe,
  getPath,
  option,
  safe,
  find,
} from 'crocks';
import {useDebounce} from 'hook/useDebounce';

const DEFAULTS = {
  displayValue: (value, all) => pipe(
    safe(constant(isTruthy(value))),
    chain(find(pipe(
      getPath(['props', 'value']),
      chain(safe(isSame(value))),
      option(null),
    ))),
    chain(getPath(['props', 'children'])),
    option(value)
  )(all)
}

const asciifyLT2 = string => string
  .replace(/a/gi, '(a|ą)')
  .replace(/c/gi, '(c|č)')
  .replace(/e/gi, '(e|ė|ę)')
  .replace(/i/gi, '(i|į)')
  .replace(/s/gi, '(s|š)')
  .replace(/u/gi, '(u|ų|ū)')
  .replace(/z/gi, '(z|ž)');

const Box = ({
  Button,
  Input,
  InputContainer,
  Label,
  Option,
  isRequired,
  Options,
  below,
  children,
  displayValue = DEFAULTS.displayValue,
  labelText = '',
  multiple,
  onChange,
  optionClassNameFn = ({active}) => `relative cursor-default select-none py-2 pl-3 pr-9 ${active ? 'bg-indigo-600 text-white' : 'text-gray-900'}`,
  placeholder,  
  showAllOptions = false,
  value, 
  api = null,
  ...props
}) => {
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
  
  const onInputChange = (e) => setQuery(e.target.value);
  const onChangeValue = (e) => onChange(e.props.value);
  const onDeselect = (e) => onChange(e.target.dataset.value);

  // filter
  useDebounce(() => {
    if (query) onQuery();
  }, 500, [query]);
  
  const onQuery = () => {
    if (api) api.mutate();
  }

  return (
    <Combobox as='div' value={value} onChange={onChangeValue} {...props}>
      <Nullable on={labelText}>
        <Label>
          {labelText}
          {isRequired && <span className={'text-red-500'}> * </span>}
        </Label>
      </Nullable>
      <InputContainer>
        <div className='flex flex-row relative'>
          <Input
            onChange={onInputChange}
            displayValue={(v) => multiple ? '' : displayValue(v, children)}
            placeholder={placeholder}
            {...props}
            className={'w-full'}
          />
          <Button />
        </div>
        {caseMap(constant(null), [
          [constant(isTruthy(showAllOptions)), constant(
            <Options>
              {children.map((component) => (
                <Option 
                  {...component.props} 
                  className={optionClassNameFn} 
                  value={component}              
                  key={component?.key || component?.props?.key || component.props.children}
                  selected={multiple && value ? value?.toString().includes(component?.key) : value === component?.key}
                  />
              ))}
            </Options>
          )],
          [constant(not(isEmpty, filteredChildren)), constant(
            <Options api={api}>
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
          )],
        ], null)}
        <Nullable on={value?.length > 0 && multiple === true}>
          {value?.toString().split(',').map((v) => (
            <Tag key={v.trim()} value={v.trim()} onDelete={onDeselect}>{displayValue(v.trim(), children)}</Tag>
          ))}
        </Nullable>
        <Nullable on={below}>
          {below}
        </Nullable>
      </InputContainer>
    </Combobox>
  );
};

export default Box;
