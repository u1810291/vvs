import {hasLength} from '@s-e/frontend/pred';
import InputGroup from 'components/atom/input/InputGroup';
import {constant} from 'crocks';
import useResultForm, {FORM_FIELD} from 'hook/useResultForm';
import {useTranslation} from 'react-i18next';
import {useParams} from 'react-router-dom';
import {lengthGt} from 'util/pred';
import useDriver from '../api/useDriver';
import {DriverListRoute} from '../routes';

const DriverEditForm = ({saveRef}) => {
  const {id} = useParams();
  const {t} = useTranslation('driver', {keyPrefix: 'edit'});
  const {ctrl, result, setForm} = useResultForm({
    firstName: FORM_FIELD.TEXT({
      label: t`field.firstName`,
      validator: hasLength,
      message: t`validation.firstName`,
      showValidationBelow: true,
    }),
    lastName: FORM_FIELD.TEXT({label: t`field.lastName`, validator: constant(true)}),
    username: FORM_FIELD.TEXT({label: t`field.username`, validator: constant(true)}),
    password: FORM_FIELD.TEXT({
      label: t`field.password`,
      validator: lengthGt(5),
      message: t`validation.password`,
      showValidationBelow: true,
    }),
  });

  useDriver({
    id,
    formResult: result,
    saveRef,
    setForm,
    successRedirectPath: DriverListRoute.props.path,
  });

  return (
    <section className='p-6 space-y-4 lg:space-y-0 lg:flex lg:space-x-4 flex-grow'>
      <InputGroup {...ctrl('firstName')} />
      <InputGroup {...ctrl('lastName')} />
      <InputGroup {...ctrl('username')} />
      <InputGroup {...ctrl('password')} />
    </section>
  );
};

export default DriverEditForm;
