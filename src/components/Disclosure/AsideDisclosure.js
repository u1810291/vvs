import Nullable from 'components/atom/Nullable';
import {withMergedClassName} from 'util/react';
import Disclosure from '.';

export const AsideDisclosure = ({title,  ...props}) => (
  <Disclosure
    text={<span title={title} className='block px-4 py-4 font-semibold w-full truncate'>{title}</span>}
    defaultOpen
    className='border-b border-gray-300'
    as='div'
    {...props}
  />
);

export const ITEM_CLASSNAME = 'mx-4 py-4 flex justify-between items-center border-t border-gray-200';

export const AsideDisclosureItem = ({left, right, children, ...props}) => (
  <div className={ITEM_CLASSNAME} {...props}>
    <Nullable on={left}>
      <div className='text-steel mr-8'>{left}</div>
    </Nullable>
    <Nullable on={right}>
      <div>{right}</div>
    </Nullable>
    {children}
  </div>
);

AsideDisclosure.ExtItem = withMergedClassName(ITEM_CLASSNAME, AsideDisclosureItem);
AsideDisclosure.Item = AsideDisclosureItem;


export default AsideDisclosure;
