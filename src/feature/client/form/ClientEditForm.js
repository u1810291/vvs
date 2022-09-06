import InputGroup from 'components/atom/input/InputGroup';
import useClient from '../api/useClient';
import useResultForm, {FORM_FIELD} from 'hook/useResultForm';
import {ClientListRoute} from '../routes';
import {constant, getPathOr, identity, isSame, flip} from 'crocks';
import {hasLength, isEmail} from '@s-e/frontend/pred';
import {lengthGt} from 'util/pred';
import {useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import AsideDisclosure from 'components/Disclosure/AsideDisclosure';
import {caseMap} from '@s-e/frontend/flow-control';
import CheckBox from 'components/atom/input/CheckBox';
import Button from 'components/Button';
import Nullable from 'components/atom/Nullable';
import ClientObjectList from '../component/ClientObjectList';
import {useAuth} from 'context/auth';
import raw from 'raw.macro';
import {useNotification} from 'feature/ui-notifications/context';
import NotificationSimple, {NOTIFICATION_ICON_CLASS_NAME} from 'feature/ui-notifications/components/NotificationSimple';
import {CheckCircleIcon, XCircleIcon} from '@heroicons/react/solid';
import {errorToText} from 'api/buildApiHook';


const ClientEditForm = ({saveRef, assignRef, removeRelRef}) => {
  const {id} = useParams();
  const {t} = useTranslation('client');

  const setFullName = (firstName, lastName) => {
    const theForm = {...form};
    theForm['firstName'] = firstName;
    theForm['lastName'] = lastName;
    theForm['fullName'] = `${firstName} ${lastName}`;
    
    setForm(theForm);
  }

  const {ctrl, result, form, setForm} = useResultForm({
    firstName: FORM_FIELD.TEXT({
      label: t`field.firstName`,
      validator: hasLength,
      message: t`validation.firstName`,
      showValidationBelow: true,
      props: {
        isRequired: constant(true),
        onChange: ({set}) => ({target: {value}}) => {
          set(value);
          setFullName(value, form['lastName']);
        },
      }
    }),
    lastName: FORM_FIELD.TEXT({
      label: t`field.lastName`, 
      validator: hasLength,
      message: t`validation.firstName`,
      showValidationBelow: true,
      props: {
        isRequired: constant(true),
        onChange: ({set}) => ({target: {value}}) => {
          set(value);
          setFullName(form['firstName'], value);
        },
      }
    }),
    fullName: FORM_FIELD.TEXT({
      validator: constant(true),
    }),
    username: FORM_FIELD.TEXT({
      label: t`field.username`,
      validator: isEmail,
      message: t`validation.username`,
      showValidationBelow: true,
      props: {
        isRequired: constant(true),
      }
    }),
    mobilePhone: FORM_FIELD.TEXT({
      label: t`field.mobilePhohe`,
      validator: lengthGt(5),
      message: t`validation.mobilePhohe`,
      showValidationBelow: true,
      props: {
        isRequired: constant(true),
      }
    }),
    is_company_admin: FORM_FIELD.BOOL({
      label: t`field.is_company_admin`,
      validator: constant(true),
    }),
    is_send_report: FORM_FIELD.BOOL({
      label: t`field.is_send_report`,
      validator: constant(true),
    })
  });

  const api = useClient({
    id,
    formResult: result,
    saveRef,
    setForm,
    successRedirectPath: ClientListRoute.props.path,
    errorMapper: caseMap(identity, [
      [isSame('the key \'message\' was not present'), constant(t('error.usernameAleardyExists'))]
    ]),
  });

  const auth = useAuth();
  const _forgot = flip(auth.api)(raw('../api/graphql/ForgotPassword.graphql'));
  const {notify} = useNotification();

  const forgotPassword = () => {
    if (!form['username']) return;

    _forgot({userId: form['username']}).fork((error) => {
      notify(
        <NotificationSimple
          Icon={XCircleIcon}
          iconClassName={NOTIFICATION_ICON_CLASS_NAME.DANGER}
          heading={t`apiError`}
        >
          {errorToText(identity, error)}
        </NotificationSimple>
      )
    }, () => {
      notify(
        <NotificationSimple
          Icon={CheckCircleIcon}
          iconClassName={NOTIFICATION_ICON_CLASS_NAME.SUCCESS}
          heading={t`success`}
          />
      );
    });
  }


  return (
    <section className={'flex flex-col'}>
      <section className='flex-col lg:flex-row flex '>
        <div className='p-6 first-letter:flex-col flex-grow space-y-6'>
          <div className='lg:flex lg:space-x-6 lg:space-y-0 items-start'>
            <InputGroup {...ctrl('firstName')} />
            <InputGroup {...ctrl('lastName')} />
            <CheckBox className={'mt-4'} {...ctrl('is_company_admin')}  />
          </div>
          <div className='lg:flex lg:space-x-6 lg:space-y-0 items-start'>
            <InputGroup {...ctrl('username')} />
            <InputGroup {...ctrl('mobilePhone')} />
            <CheckBox className='mt-4' {...ctrl('is_send_report')} />
          </div>
          <div >
            <Button.Xs onClick={() => forgotPassword()}>{t`restore_password`}</Button.Xs>
          </div>
        </div>
        <aside className='border-l border-gray-border min-w-fit'>
          <AsideDisclosure title={t`edit.clientDetails`}>
            <AsideDisclosure.Item
              left={t`field.last_ping`}
              right={getPathOr('—', ['data', 'last_ping'], api)}
            />
            <AsideDisclosure.Item
              left={t`field.is_company_admin`}
              right={getPathOr(false, ['data', 'is_company_admin'], api) ? t`field.company_admin` : t`field.customer`}
            />
          </AsideDisclosure>
        </aside>
      </section>

      <Nullable on={id}>
        <ClientObjectList userId={id} assignRef={assignRef} removeRef={removeRelRef} />
      </Nullable>
      
    </section>
  );
};

export default ClientEditForm;
