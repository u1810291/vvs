import React, {Fragment} from 'react';

import {Listbox, Transition} from '@headlessui/react';

import Nullable from '../../Nullable';

import {identity} from 'crocks';

const Box = ({
  Label,
  ContentContainer,
  label = '',
  twLabel,
  Button,
  Options,
  Option,
  optionClassNameFn,
  children,
  value,
  onChange,
  displayValue = identity,
  ...props
}) => {
  const onChangeValue = (e) => onChange({key: e.key, value: e.props.value});
  return (
    <Listbox value={value} onChange={onChangeValue} {...props}>
      {({open}) => (
        <div>
          <Nullable on={label}><Label className={twLabel}>{label}</Label></Nullable>
          <ContentContainer>
            <Button displayName={displayValue(value)}/>
            {children && (
              <Transition
                show={open}
                as={Fragment}
                leave='transition ease-in duration-100'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                {children && (
                  <Options>
                    {children.map(component => (
                      <Option {...component.props} key={component.props.children} selected={displayValue(value)} className={optionClassNameFn} value={component}/>
                    ))}
                  </Options>
                )}
              </Transition>
            )}
          </ContentContainer>
        </div>
      )}
    </Listbox>
  )
}

export default Box;
