import React, {useCallback, useMemo, useState} from 'react';
import {putIntoArray} from '../../util/array';
import {asciifyLT} from '@s-e/frontend/transformer/string';
import {Combobox} from '@headlessui/react';
import Nullable from '../Nullable';
import {componentToString} from '@s-e/frontend/react';

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
  const [query, setQuery] = useState('')
  const [selectedPerson, setSelectedPerson] = useState()

  const filteredChildren = useMemo(()=> {
    return query === ''
      ? putIntoArray(children)
      : putIntoArray(children).filter((component) => {
        return String(componentToString(component)).match(new RegExp(asciifyLT(query.replace(/\W+/gm, '')), 'gi'))
      })
  }, [children, query])

  const onChange = useCallback(event => setQuery(event.target.value), []);
  const displayName = useCallback(person => person.name, []);

  return (
    <Combobox as='div' value={selectedPerson} onChange={setSelectedPerson}>
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
            <Option
              {...component.props}
              key={component.props.children}
              className={optionClassNameFn}
            />
          ))}
        </Options>
      </Nullable>
    </Combobox>
  );
};

export default Box;
