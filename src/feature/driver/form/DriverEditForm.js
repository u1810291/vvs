import InputGroup from 'components/atom/input/InputGroup';
import useDriver from '../api/useDriver';
import useResultForm, {FORM_FIELD} from 'hook/useResultForm';
import {DriverListRoute} from '../routes';
import {constant, or, isEmpty, getPathOr} from 'crocks';
import {hasLength} from '@s-e/frontend/pred';
import {lengthGt} from 'util/pred';
import {useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import AsideDisclosure from 'components/Disclosure/AsideDisclosure';

const DriverEditForm = ({saveRef}) => {
  const {id} = useParams();
  const {t} = useTranslation('driver');
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
      validator: id ? or(isEmpty, lengthGt(5)) : lengthGt(5),
      message: t`validation.password`,
      showValidationBelow: true,
    }),
  });

  const api = useDriver({
    id,
    formResult: result,
    saveRef,
    setForm,
    successRedirectPath: DriverListRoute.props.path,
  });

  return (
    <section className='flex-col lg:flex-row flex lg:min-h-full'>
      <div className='p-6 space-y-4 lg:space-y-0 lg:flex lg:space-x-4 flex-grow'>
        <InputGroup {...ctrl('firstName')} />
        <InputGroup {...ctrl('lastName')} />
        <InputGroup {...ctrl('username')} />
        <InputGroup {...ctrl('password')} />
      </div>
      <aside className='border-l border-gray-border min-w-fit'>
        <AsideDisclosure title={t`edit.crewDetails`}>
          <AsideDisclosure.Item
            left={t`field.crewName`}
            right={getPathOr('—', ['data', 'crew', 'name'], api)}
          />
        </AsideDisclosure>
      </aside>
    </section>
  );
};

export default DriverEditForm;
