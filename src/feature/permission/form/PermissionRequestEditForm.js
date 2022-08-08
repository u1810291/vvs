import InputGroup from 'components/atom/input/InputGroup';
import useResultForm, {FORM_FIELD} from 'hook/useResultForm';
import {PermissionRequestListRoute} from '../routes';
import {constant} from 'crocks';
import {useCrewRequestFull} from '../api';
import {useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

const PermissionRequestEditForm = ({saveRef}) => {
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
    })
  });

  useCrewRequestFull({
    id,
    formResult: result,
    setForm,
    successRedirectPath: PermissionRequestListRoute.props.path,
    saveRef,
  });

  return (
    <section className={'flex'}>
      <div className={'p-6 space-y-4 flex-grow'}>
        <InputGroup {...ctrl('value')} />
        <InputGroup {...ctrl('duration')} />
      </div>
    </section>
  );
}

export default PermissionRequestEditForm;
