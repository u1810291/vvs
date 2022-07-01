import React from 'react';

import useLanguage from '../../hook/useLanguage';

const Modal = ({
  title,
  setOpen,
  children,
}) => {
  const {t} = useLanguage();
  return (
    <>
      <div className={'absolute bg-white opacity-80 w-[calc(100%-4rem)] h-full z-20 top-20 left-16'} onClick={setOpen}/>
      <div className={'fixed w-1/2 left-1/2 top-1/4 -translate-x-1/2 z-20 drop-shadow-lg xl:w-1/3'}>
        <div className={'h-100 bg-white text-gray-900 rounded-md p-4'}>
          <h5 className={'m-0 pb-4 mt-4 text-gray-900 text-2xl'}>{title}</h5>
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;