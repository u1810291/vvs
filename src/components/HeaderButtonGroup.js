import React from 'react';

const HeaderButtonGroup = ({
  saveButtonText,
  cancelButtonText,
  onSaveButton,
  onCancelButton,
  twSaveButton,
  twCancelButton,
}) => {
  return (
    <section className={'flex'}>
      <button
        onClick={onCancelButton}
        className={`w-40 h-10 rounded flex justify-center py-2 px-4 border border-transparent drop-shadow shadow text-sm font-light font-montserrat hover:shadow-none focus:outline-none ${twCancelButton}`}
      >
        {cancelButtonText}
      </button>
      <button
        onClick={onSaveButton}
        className={`w-40 h-10 rounded flex justify-center py-2 px-4 border border-transparent drop-shadow shadow text-sm font-light font-montserrat hover:shadow-none focus:outline-none ${twSaveButton}`}
      >
        {saveButtonText}
      </button>
    </section>
  );
};

export default HeaderButtonGroup;
