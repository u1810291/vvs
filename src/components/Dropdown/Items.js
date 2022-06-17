import React, {forwardRef, useEffect, useState} from 'react';
import {Menu} from '@headlessui/react';
import {
  getProp,
  hasProps,
  and,
  propSatisfies,
  chain,
  safe,
  map,
  pipe,
  tap,
} from 'crocks';

const Items = forwardRef((props, ref) => {
  const [onLeft, setOnLeft] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      pipe(
        getProp('current'),
        chain(safe(a => a instanceof HTMLElement)),
        map(a => a.getClientRects()),
        chain(getProp(0)),
        chain(safe(and(
          hasProps(['left', 'width']),
          propSatisfies('left', a => a > 0)
        ))),
        map(a => a.left + a.width),
        chain(safe(isFinite)),
        map(a => a < window.innerWidth),
        map(tap(setOnLeft)),
      )(ref)
    })
  }, [ref]);

  return (
    <Menu.Items ref={ref} className={`z-20 origin-top-right absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none ${onLeft ? 'left-0' : 'right-0'}`} {...props}>
      <div className='py-1'>
        {props?.children}
      </div>
    </Menu.Items>
  );
});

Items.displayName = 'Items';

export default Items;
