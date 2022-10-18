import InputGroup from 'components/atom/input/InputGroup';
import useResultForm, {FORM_FIELD} from 'hook/useResultForm';
import {PermissionRequestListRoute} from '../routes';
import {constant} from 'crocks';
import {useCrewRequestFull} from '../api';
import {useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import CheckBox from 'components/atom/input/CheckBox';
import {onInputEventOrEmpty} from '@s-e/frontend/callbacks/event/input';
// import {mStrToIsoPeriod} from '../../../util/datetime';
// import NotificationSimple, {NOTIFICATION_ICON_CLASS_NAME} from 'feature/ui-notifications/components/NotificationSimple';
// import {XCircleIcon} from '@heroicons/react/outline';
import {useNotification} from 'feature/ui-notifications/context';
import {hasLength} from '@s-e/frontend/pred';



const DEFAULT_DURATION = '00:05';



const PermissionRequestEditForm = ({saveRef, removeRef}) => {
  const {id} = useParams();
  const {t} = useTranslation('permission', {keyPrefix: 'request.edit'});
  const {notify} = useNotification();

  
  const isValidDuration = interval => {
    return interval.match(new RegExp(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/));
  }

  const {ctrl, result, setForm} = useResultForm({
    value: FORM_FIELD.TEXT({
      label: t`value`,
      validator: hasLength,
      message: t`validation.required`,
      showValidationBelow: true,
    }),
    duration: FORM_FIELD.TEXT({
      label: t`duration`,
      validator: constant(true),
      message: t`validation.duration`,
      showValidationBelow: true,
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
    if (!isNaN(v) && parseInt(v) >= 0 && parseInt(v) <= 59) {
      setForm({duration: `00:${v.padStart(2, '0')}`})
      return;
    }

    if (!v || !isValidDuration(v)) {
      // setForm({duration: DEFAULT_DURATION});
    }
  }

  return (
    <section className={'flex p-6 flex-grow space-x-6 items-start'}>
      <div className={'lg:w-1/4 '}>
        <InputGroup {...ctrl('value')} isRequired={true} />
      </div>
      <div className={'lg:w-1/4 '}>
        <InputGroup {...ctrl('duration')} isRequired={true} onBlur={onInputEventOrEmpty(v => setDefaultDuration(v))} />
      </div>
      <div className={'lg:w-1/4 self-center'}>
        <CheckBox className='items-end block' {...ctrl('is_assigned_while_in_breaks')} />
      </div>
    </section>
  );
}

export default PermissionRequestEditForm;
