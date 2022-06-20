import React, {useState, Fragment} from 'react';
import {Listbox, Transition} from '@headlessui/react';
import Nullable from '../../Nullable';

const Box = ({
  Label,
  ContentContainer,
  labelText = '',
  Button,
  Options,
  Option,
  optionClassNameFn,
  children,
}) => {
  const [selectedChildren, setSelectedChildren] = useState();
  return (
    <Listbox value={selectedChildren} onChange={setSelectedChildren}>
      {({ open }) => (
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
