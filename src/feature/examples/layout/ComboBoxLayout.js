import React from 'react';
import ComboBox from '../../../components/atom/input/ComboBox';

const ComboBoxLayout = () => {
  return (
    <section className={'ml-auto mr-auto w-1/2 mt-40'}>
      <ComboBox InputClassName={'border'}>
        <ComboBox.Option> 1 </ComboBox.Option>
        <ComboBox.Option> 2 </ComboBox.Option>
        <ComboBox.Option> 3 </ComboBox.Option>
      </ComboBox>
    </section>
  );
};

export default ComboBoxLayout;
