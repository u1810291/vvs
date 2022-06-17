import React from 'react'
import { Menu as HeadlessMenu } from '@headlessui/react'

const Menu = ({Button, Transition, Items, as = 'div', buttonText, ...props}) => {
  return (
    <HeadlessMenu {...props} as={as} className='relative inline-block text-left'>
      <Button>{buttonText}</Button>
      <Transition>
        <Items>{props?.children}</Items>
      </Transition>
    </HeadlessMenu>
  );
};

export default Menu;
