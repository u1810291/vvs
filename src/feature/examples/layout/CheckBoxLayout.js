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
        type={'oneline'}
        isChecked={isCheckedExample1}
        setCheck={setCheckExample1}
        description={'Get notified when someones posts a comment on a posting.'}
      />
      <CheckBox
        label={'Candidates'}
        name={'candidates'}
        type={'multiline'}
        isChecked={isCheckedExample2}
        setCheck={setCheckExample2}
        description={'Get notified when a candidate applies for a job.'}
      />
      <CheckBox
        label={'Offers'}
        name={'offers'}
        type={'multiline'}
        isChecked={isCheckedExample3}
        setCheck={setCheckExample3}
        description={'Get notified when a candidate accepts or rejects an offer.'}
      />
    </section>
  );
};

export default ComboBoxLayout;
