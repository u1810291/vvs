import {Transition} from "@headlessui/react";
import React, {Fragment} from "react";

const T = ({as = Fragment, children = null, ...props}) => (
  <Transition
    as={as}
    enter="transition ease-out duration-100"
    enterFrom="transform opacity-0 scale-95"
    enterTo="transform opacity-100 scale-100"
    leave="transition ease-in duration-75"
    leaveFrom="transform opacity-100 scale-100"
    leaveTo="transform opacity-0 scale-95"
    {...props}
  >
    {children}
  </Transition>
);

export default T;
