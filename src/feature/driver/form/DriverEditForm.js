import InputGroup from 'components/atom/input/InputGroup';
import useDriver from '../api/useDriver';
import useResultForm, {FORM_FIELD} from 'hook/useResultForm';
import {DriverListRoute} from '../routes';
import {constant, or, isEmpty, getPathOr, identity, isSame} from 'crocks';
import {hasLength, isEmail} from '@s-e/frontend/pred';
import {lengthGt} from 'util/pred';
import {useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import AsideDisclosure from 'components/Disclosure/AsideDisclosure';
import {caseMap} from '@s-e/frontend/flow-control';


const PASSWORD_MIN_LENGTH = 8;

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
    lastName: FORM_FIELD.TEXT({
      label: t`field.lastName`, 
      validator: hasLength,
      message: t`validation.lastName`,
      showValidationBelow: true,
    }),
    username: FORM_FIELD.TEXT({
      label: t`field.username`,
      validator: hasLength && isEmail,
      message: t`validation.username`,
      showValidationBelow: true,
    }),
    password: FORM_FIELD.TEXT({
      label: t`field.password`,
      validator: id ? or(isEmpty, lengthGt(PASSWORD_MIN_LENGTH - 1)) : lengthGt(PASSWORD_MIN_LENGTH - 1),
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
    errorMapper: caseMap(identity, [
      [isSame('the key \'message\' was not present'), constant(t('error.server'))]
    ]),
  });

  return (
    <section className='flex-col lg:flex-row flex '>
      <div className='w-full p-6 flex flex-col justify-between'>
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 lg:w-1/2'>
          <InputGroup {...ctrl('firstName')} isRequired placeholder={t`field.firstName`}/>
          <InputGroup {...ctrl('lastName')} isRequired placeholder={t`field.lastName`}/>
          <InputGroup {...ctrl('username')} isRequired placeholder={t`field.username`}/>
          <InputGroup {...ctrl('password')} placeholder={t`field.password`}/>
        </div>
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
