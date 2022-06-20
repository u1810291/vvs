import React, {useCallback, useMemo, useState} from 'react';
import {putIntoArray} from '../../../../util/array';
import {asciifyLT} from '@s-e/frontend/transformer/string';
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
        .match(new RegExp(asciifyLT(query.replace(/\W+/gm, '')), 'gi'))
      )
    )
  )(children), [children, query]);

  const onChange = useCallback(event => setQuery(event.target.value), []);
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
        />
        <Button/>
      </InputContainer>
      <Nullable on={filteredChildren.length}>
        <Options>
          {filteredChildren.map((component) => (
            <Option {...component.props} key={component.props.children} className={optionClassNameFn} value={component}/>
          ))}
        </Options>
      </Nullable>
    </Combobox>
  );
};

export default Box;
