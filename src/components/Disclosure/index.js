import {withComponentFactory} from 'util/react'
import {Disclosure as _Disclosure} from '@headlessui/react'

export const Button = props => (
  <_Disclosure.Button className='focus:outline-none w-full text-left' {...props} />
);

export const Panel = props => (
  <_Disclosure.Panel {...props} />
);

export const Disclosure = ({Button, Panel, text, isStatic, children, ...props}) => {
  return (
    <_Disclosure {...props}>
      <Button>{text}</Button>
      <Panel static={isStatic}>{children}</Panel>
    </_Disclosure>
  )
}

export default withComponentFactory(Disclosure, {
  Button,
  Panel,
});
