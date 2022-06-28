import React, {useState, Fragment, useEffect} from 'react';
import {Listbox, Transition} from '@headlessui/react';
import Nullable from '../../Nullable';
import {putIntoArray} from 'util/array';

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
  value = '',
  ...props
}) => {
  const [selectedChildren, setSelectedChildren] = useState();

  useEffect(() => {
    setSelectedChildren(
      putIntoArray(children).find(
        c => c?.props?.value === value
      )
    )
  }, [value, children]);

  return (
    <Listbox value={selectedChildren} onChange={setSelectedChildren} {...props}>
      {({open}) => (
        <div>
          <Nullable on={label}><Label className={twLabel}>{label}</Label></Nullable>
          <ContentContainer>
            <Button displayName={selectedChildren?.props?.children}/>
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
                    <Option selected={selectedChildren} {...component.props} key={component.props.children} className={optionClassNameFn} value={component}/>
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
