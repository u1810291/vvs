import React from 'react';
import CheckBox from '../../../components/atom/input/CheckBox';
import useBoolean from '../../../hook/useBoolean';

const ComboBoxLayout = () => {
  const [isCheckedExample1, setCheckExample1] = useBoolean(false);
  const [isCheckedExample2, setCheckExample2] = useBoolean(false);
  const [isCheckedExample3, setCheckExample3] = useBoolean(false);

  return (
    <section className={'ml-auto mr-auto w-fit mt-40'}>
      <CheckBox
        label={'Comments'}
        name={'comments'}
        onChange={setCheckExample1}
        isChecked={isCheckedExample1}
        description={<CheckBox.InlineDesc>Get notified when someones posts a comment on a posting.</CheckBox.InlineDesc>}
      />
      <CheckBox
        label={'Candidates'}
        name={'candidates'}
        onChange={setCheckExample2}
        isChecked={isCheckedExample2}
        description={<CheckBox.MultilineDesc>Get notified when a candidate applies for a job.</CheckBox.MultilineDesc>}
      />
      <CheckBox
        label={'Offers'}
        name={'offers'}
        onChange={setCheckExample3}
        isChecked={isCheckedExample3}
        description={<CheckBox.MultilineDesc>Get notified when a candidate accepts or rejects an offer.</CheckBox.MultilineDesc>}
      />
    </section>
  );
};

export default ComboBoxLayout;
