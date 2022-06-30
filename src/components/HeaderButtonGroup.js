import React from 'react';

import useLanguage from '../hook/useLanguage';

const HeaderButtonGroup = ({
  saveButtonText,
  cancelButtonText,
  onSaveButton,
  onCancelButton,
  twSaveButton,
  twCancelButton,
}) => {
  const {t} = useLanguage();
  return (
    <section className={'flex'}>
      <button
        onClick={onCancelButton}
        className={`w-40 h-10 rounded flex justify-center py-2 px-4 border border-transparent drop-shadow shadow text-sm font-light font-montserrat hover:shadow-none focus:outline-none ${twCancelButton}`}
      >
        {t(cancelButtonText)}
      </button>
      <button
        onClick={onSaveButton}
        className={`w-40 h-10 rounded flex justify-center py-2 px-4 border border-transparent drop-shadow shadow text-sm font-light font-montserrat hover:shadow-none focus:outline-none ${twSaveButton}`}
      >
        {t(saveButtonText)}
      </button>
    </section>
  );
};

export default HeaderButtonGroup;
