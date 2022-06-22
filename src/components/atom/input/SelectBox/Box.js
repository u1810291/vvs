import React, {useState, Fragment, useEffect} from 'react';
import {Listbox, Transition} from '@headlessui/react';
import Nullable from '../../Nullable';
import {putIntoArray} from 'util/array';

const Box = ({
  Label,
  ContentContainer,
  labelText = '',
  Button,
  Options,
  Option,
  optionClassNameFn,
  children,
  value = '',
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
    <Listbox value={selectedChildren} onChange={setSelectedChildren}>
      {({open}) => (
        <>
          <Nullable on={labelText}><Label>{labelText}</Label></Nullable>
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
        </>
      )}
    </Listbox>
  )
}

export default Box;
