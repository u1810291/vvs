import InputGroup from 'components/atom/input/InputGroup';
import useUser from '../api/useUser';
import useResultForm, {FORM_FIELD} from 'hook/useResultForm';
import {UserEditRoute, UserListRoute} from '../routes';
import {constant, identity, isSame, or, isEmpty, flip} from 'crocks';
import {hasLength, isEmail} from '@s-e/frontend/pred';
import {lengthGt, lengthGte} from 'util/pred';
import {useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {caseMap} from '@s-e/frontend/flow-control';
// import Button from 'components/Button';
import {useAuth} from 'context/auth';
// import raw from 'raw.macro';
import CheckBox from 'components/atom/input/CheckBox';
import SelectBox from 'components/atom/input/SelectBox';
import {useEffect} from 'react';
import raw from 'raw.macro';
// import NotificationSimple, {NOTIFICATION_ICON_CLASS_NAME} from 'feature/ui-notifications/components/NotificationSimple';
// import {CheckCircleIcon, XCircleIcon} from '@heroicons/react/solid';
// import {errorToText} from 'api/buildApiHook';


const UserEditForm = ({saveRef}) => {
  const {id} = useParams();
  const {t} = useTranslation('user');
  
  const setFullName = (firstName, lastName) => {
    const theForm = {...form};
    theForm['firstName'] = firstName;
    theForm['lastName'] = lastName;
    theForm['fullName'] = `${firstName} ${lastName}`;
    
    setForm(theForm);
  }

  const PHONE_MIN_LENGTH = 6;
  const MONASID_MIN_LENGTH = 2;
  const PASSWORD_MIN_SIZE = 8;

  const isValidIpAddresses = (v) => {
    const ips = v.replace(/\s/g, '').split(',');
    const invalids = ips.filter(ip => !(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip)));
    return invalids.length == 0;
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
      message: t`validation.lastName`,
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
    role: FORM_FIELD.TEXT({
      initial: 'operator',
      label: t`field.role`,
      validator: hasLength,
      message: t`validation.role`,
      showValidationBelow: true,
      props: {
        onChange: ({set}) => ({target: {value}}) => set(value)
      }
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
      validator: id ? or(isEmpty, lengthGt(PHONE_MIN_LENGTH - 1)) : constant(true),
      message: t`validation.mobilePhohe`,
      showValidationBelow: true,
    }),
    is_send_report: FORM_FIELD.BOOL({
      label: t`field.is_send_report`,
      validator: constant(true),
    }),
    password: FORM_FIELD.TEXT({
      label: 'password',
      validator: or(isEmpty, lengthGte(PASSWORD_MIN_SIZE)),
      message: t`validation.password`,
      showValidationBelow: true,
      props: {
        type: constant('password')
      }
    }),
    email: FORM_FIELD.TEXT({
      label: t`field.email`,
      validator: or(isEmpty, isEmail),
      message: t`validation.email`,
      showValidationBelow: true,
      props: {
        isRequired: constant(true),
        type: constant('email'),
      }
    }),
    duties: FORM_FIELD.TEXT({
      label: t`field.duties`,
      validator: constant(true),
      message: t`validation.duties`,
      showValidationBelow: true,
    }),
    monas_id: FORM_FIELD.TEXT({
      label: t`field.monas_id`,
      validator: or(isEmpty, lengthGte(MONASID_MIN_LENGTH)),
      message: t`validation.monas_id`,
      showValidationBelow: true,
    }),
    whitelisted_ip: FORM_FIELD.TEXT({
      label: t`field.whitelisted_ip_addresses`,
      validator: or(isEmpty, isValidIpAddresses),
      message: t`validation.whitelisted_ip`,
      showValidationBelow: true,
      props: {
        placeholder: constant('0.0.0.0')
      }
    }),
  });

  const swr = useUser({
    id,
    formResult: result,
    saveRef,
    setForm,
    successRedirectPath: id ? UserListRoute.props.path : null,
    errorMapper: caseMap(identity, [
      [isSame('the key \'message\' was not present'), constant(t('error.server'))]
    ]),
    editRedirectPath: UserEditRoute.props.path,
    newObjectPath: ['register', 'user', 'id'],
  });

  const {api} = useAuth();
  const _getSettings = flip(api)(raw('../api/graphql/GetUserSettings.graphql'));
  const _createSettings = flip(api)(raw('../api/graphql/CreateUserSettings.graphql'));

  useEffect(() => {
    if (!id) return;

    // create user settings if don't exist
    _getSettings({where: {id: {_eq: id}}}).fork(identity, (data) => {
      if (data?.user_settings.length == 0) {
        _createSettings({id}).fork(identity, identity)
      }
    });
  }, [])

  useEffect(() => {
    setForm({role: swr?.data?.registrations?.find(r => r.applicationId === 'efd4e504-4179-42d8-b6b2-97886a5b6c29').roles[0]});
  }, [swr?.data])  

  return (
    <section className={'flex flex-col'}>
      <section className='flex flex-col'>
        <div className='p-6 first-letter:flex-col flex-grow space-y-6'>
          <div className='lg:flex lg:space-x-6 lg:space-y-0 items-start'>
            <InputGroup {...ctrl('firstName')} />
            <InputGroup {...ctrl('lastName')} />
            {/* TODO: hard-coded user roles... */}
            <SelectBox 
              className='w-1/6' 
              {...ctrl('role')}
              onChange={(v) => {
                setForm({role: v});
              }}
            >
              <SelectBox.Option key={'admin'} value={'admin'}>Admin</SelectBox.Option>
              <SelectBox.Option key={'master_operator'} value={'master_operator'}>Main Operator</SelectBox.Option>
              <SelectBox.Option key={'operator'} value={'operator'}>Operator</SelectBox.Option>
              <SelectBox.Option key={'support'} value={'support'}>Support</SelectBox.Option>
            </SelectBox>
            <InputGroup label='duties' {...ctrl('duties')} />
          </div>
          <div className='lg:flex lg:space-x-6 lg:space-y-0 items-start'>
            <InputGroup label='email' {...ctrl('email')} />
            <InputGroup label='mobile phone' {...ctrl('mobilePhone')} />
          </div>
          <div className='lg:flex lg:space-x-6 lg:space-y-0 items-start'>
            <CheckBox {...ctrl('is_send_report')} />
          </div>
        </div>
        <div className='p-6 first-letter:flex-col flex-grow space-y-6'>
          <h2 className='font-medium text-sm'>Prisijungimo duomenys</h2>
          <div className='lg:flex lg:space-x-6 lg:space-y-0 items-start'>
            <InputGroup {...ctrl('username')} />
            <InputGroup {...ctrl('password')} />
            <InputGroup {...ctrl('monas_id')} />
          </div>
          <div className='lg:flex lg:space-x-6 lg:space-y-0 items-start'>
            <InputGroup className='w-1/4' {...ctrl('whitelisted_ip')} />
          </div>
        </div>
      </section>
    </section>
  );
};

export default UserEditForm;
