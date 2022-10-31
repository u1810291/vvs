import React, {useRef} from 'react';
import {Combobox} from '@headlessui/react';

const Options = ({api, ...props}) => {
  const wrapperRef = useRef(null);
  const onScroll = () => {
    if (wrapperRef.current && api) {
      const {scrollTop, scrollHeight, clientHeight} = wrapperRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        api.setSize(api.size + 1);
      }
    }
  }

  return (
    <Combobox.Options ref={wrapperRef} onScroll={onScroll} className='absolute z-10 mt-1 max-h-60 w-full overflow-auto bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm' {...props}/>
  );
}

export default Options;
