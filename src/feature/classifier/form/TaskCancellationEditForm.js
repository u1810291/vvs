
import InputGroup from 'components/atom/input/InputGroup';
import useResultForm, {FORM_FIELD} from 'hook/useResultForm';
import {useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
// import {
//   map,
//   pipe,
//   safe,
//   isObject,
// } from 'crocks';
import {useTaskCancellation} from '../api';
import {TaskCancellationListRoute} from '../routes';







const TaskCancellationEditForm = ({saveRef, removeRef}) => {
  const {id} = useParams();
  const {t} = useTranslation('classifier', {keyPrefix: 'edit'});
  
  const {ctrl, result, setForm} = useResultForm({
    value: FORM_FIELD.TEXT({label: t`value`}),
    comment: FORM_FIELD.TEXT({label: t`comment`, validator: () => true}),
  });
  
  useTaskCancellation({
    id,
    formResult: result,
    setForm,
    successRedirectPath: TaskCancellationListRoute.props.path,
    saveRef,
    removeRef,
  });


  return (
    <section className={'flex'}>
      <div className={'p-6 space-y-4 lg:space-y-0 lg:flex lg:space-x-4 flex-grow'}>
        <div className={'lg:inline-block lg:w-1/4 space-y-4'}>
          <InputGroup isRequired={true} {...ctrl('value')} />
        </div>
          
        {/* <TextAreaInputGroup inputClassName='min-h-[12.75rem]' className='w-full lg:w-1/2 h-full' {...ctrl('comment')} rows={9}/> */}
      </div>
    </section>
  );
}

export default TaskCancellationEditForm;
