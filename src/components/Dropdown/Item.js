import {Menu} from "@headlessui/react";
import React from "react";
import {withMergedClassName} from "../../util/react";

const Item = withMergedClassName(
  'block px-4 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none',
  ({Tag = 'a', children, ...props}) => (
    <Menu.Item>
      <Tag {...props}>{children}</Tag>
    </Menu.Item>
  )
);

export default Item;
