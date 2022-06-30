import React from 'react';

import useLanguage from '../../hook/useLanguage';

const Modal = ({
  title,
  setOpen,
  children,
}) => {
  const {t} = useLanguage();
  return (
    <div>
      <div className={'fixed bg-white opacity-80 w-screen h-screen z-20 top-16 left-20'} onClick={setOpen}/>
      <div className={'absolute w-1/2 left-1/2 top-1/4 -translate-x-1/2 z-20 drop-shadow-lg xl:w-1/3'}>
        <div className={'h-100 bg-white text-gray-900 rounded-md p-4'}>
          <h5 className={'m-0 pb-4 mt-4 text-gray-900 text-2xl'}>{title}</h5>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;