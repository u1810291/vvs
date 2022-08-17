import InputGroup from 'components/atom/input/InputGroup';
import {constant, isEmpty, or} from 'crocks';
import useResultForm, {FORM_FIELD} from 'hook/useResultForm';
import {useTranslation} from 'react-i18next';
import {useParams} from 'react-router-dom';
import {lengthGt} from 'util/pred';
import useDriver from '../api/useDriver';
import {DriverListRoute} from '../routes';

const DriverEditForm = ({saveRef}) => {
  const {id} = useParams();
  const {t} = useTranslation('object', {keyPrefix: 'edit'});
  const {ctrl, result, setForm} = useResultForm({
    firstName: FORM_FIELD.TEXT({label: t`firstName`, validator: constant(true)}),
    lastName: FORM_FIELD.TEXT({label: t`lastName`, validator: constant(true)}),
    username: FORM_FIELD.TEXT({label: t`username`, validator: constant(true)}),
    password: FORM_FIELD.TEXT({
      label: t`password`,
      validator: or(isEmpty, lengthGt(5)),
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
