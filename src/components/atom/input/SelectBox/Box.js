import React, {Fragment} from 'react';
import {Listbox, Transition} from '@headlessui/react';
import Nullable from '../../Nullable';

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
  setValue,
  displayValue,
  ...props
}) => {
  const onChange = e => setValue({key: e.key, value: e.props.value});

  return (
    <Listbox value={value} onChange={onChange} {...props}>
      {({open}) => (
        <div>
          <Nullable on={label}><Label className={twLabel}>{label}</Label></Nullable>
          <ContentContainer>
            <Button displayName={displayValue}/>
            <Transition
              show={open}
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              {children?.length && (
                <Options>
                  {children.map(component => (
                    <Option selected={value} {...component.props} key={component.props.children} className={optionClassNameFn} value={component}/>
                  ))}
                </Options>
              )}
            </Transition>
          </ContentContainer>
        </div>
      )}
    </Listbox>
  )
}

export default Box;
