import {withComponentFactory} from 'util/react'
import {Disclosure as _Disclosure} from '@headlessui/react'

export const Button = ({isStatic, ...props}) => (
  <_Disclosure.Button className={`${isStatic ? 'cursor-default' : 'cursor-pointer'} focus:outline-none w-full text-left`} {...props} />
);

export const Panel = props => (
  <_Disclosure.Panel {...props} />
);

export const Disclosure = ({Button, Panel, text, isStatic, children, ...props}) => {
  return (
    <_Disclosure {...props}>
      <Button isStatic={isStatic}>{text}</Button>
      <Panel static={isStatic}>{children}</Panel>
    </_Disclosure>
  )
}

export default withComponentFactory(Disclosure, {
  Button,
  Panel,
});
