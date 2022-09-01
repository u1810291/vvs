import Nullable from 'components/atom/Nullable';
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

export const AsideDisclosureItem = ({left, right, children, ...props}) => (
  <div className='mx-4 py-4 flex justify-between items-center border-t border-gray-200' {...props}>
    <Nullable on={left}>
      <div className='text-steel mr-8'>{left}</div>
    </Nullable>
    <Nullable on={right}>
      <div>{right}</div>
    </Nullable>
    {children}
  </div>
);

AsideDisclosure.Item = AsideDisclosureItem


export default AsideDisclosure;
