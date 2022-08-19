import InputGroup from 'components/atom/input/InputGroup';
import useResultForm, {FORM_FIELD} from 'hook/useResultForm';
import {PermissionRequestListRoute} from '../routes';
import {constant} from 'crocks';
import {useCrewRequestFull} from '../api';
import {useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import CheckBox from 'components/atom/input/CheckBox';
import {onInputEventOrEmpty} from '@s-e/frontend/callbacks/event/input';





const DEFAULT_DURATION = '00:20';



const PermissionRequestEditForm = ({saveRef, removeRef}) => {
  const {id} = useParams();
  const {t} = useTranslation('permission', {keyPrefix: 'request.edit'});

  const {ctrl, result, setForm} = useResultForm({
    value: FORM_FIELD.TEXT({label: t`value`}),
    duration: FORM_FIELD.TEXT({
      label: t`duration`,
      validator: constant(true),
      props: {
        onChange: ({set}) => ({target: {value}}) => set(value),
      }
    }),
    is_assigned_while_in_breaks: FORM_FIELD.BOOL({label: t`is_assigned_while_in_breaks`, validator: constant(true)}),
  });

  useCrewRequestFull({
    id,
    formResult: result,
    setForm,
    successRedirectPath: PermissionRequestListRoute.props.path,
    saveRef,
    removeRef,
  });

  const setDefaultDuration = (v) => {
    if (!v) {
      setForm({duration: DEFAULT_DURATION});
    }
  }

  return (
    <section className={'flex p-6 flex-grow space-x-6 items-center'}>
      <div className={'lg:w-1/4 '}>
        <InputGroup {...ctrl('value')} isRequired={true} />
      </div>
      <div className={'lg:w-1/4 '}>
        <InputGroup {...ctrl('duration')} isRequired={true} onBlur={onInputEventOrEmpty(v => setDefaultDuration(v))} />
      </div>
      <div className={'lg:w-1/4 '}>
        <CheckBox className='items-end block' {...ctrl('is_assigned_while_in_breaks')} />
      </div>
    </section>
  );
}

export default PermissionRequestEditForm;
