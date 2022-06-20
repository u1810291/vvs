import React from 'react';
import SelectBox from '../../../components/atom/input/SelectBox';

const ComboBoxLayout = () => {
  return (
    <section className={'ml-auto mr-auto w-1/2 mt-40'}>
      <SelectBox InputClassName={'border'}>
        <SelectBox.Option> 1 </SelectBox.Option>
        <SelectBox.Option> 2 </SelectBox.Option>
        <SelectBox.Option> 3 </SelectBox.Option>
      </SelectBox>
    </section>
  );
};

export default ComboBoxLayout;
