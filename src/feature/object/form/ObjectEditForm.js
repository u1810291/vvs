import CheckBox from 'components/atom/input/CheckBox';
import Detail from 'components/Disclosure/AsideDisclosure';
import Input from 'components/atom/input/InputGroup/Base/Input';
import InputGroup from 'components/atom/input/InputGroup';
import SelectBox from 'components/atom/input/SelectBox';
import TextAreaInputGroup from 'components/atom/input/InputGroup/TextAreaInputGroup';
import useResultForm, {FORM_FIELD} from 'hook/useResultForm';
import {titleCase} from '@s-e/frontend/transformer/string';
import {useCity, useObject} from '../api';
import {useNavigate, useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {
  map,
  pipe,
  mapProps,
  safe,
  isObject,
  isNil,
  ifElse,
  constant,
} from 'crocks';
import {useEffect} from 'react';
import {useNotification} from 'feature/ui-notifications/context';
import NotificationSimple, {NOTIFICATION_ICON_CLASS_NAME} from 'feature/ui-notifications/components/NotificationSimple';
import {CheckCircleIcon, XCircleIcon} from '@heroicons/react/outline';
import {ObjectListRoute} from '../routes';

const mapFromNumeric = ifElse(
  isNil,
  constant(''),
  String,
);

const ObjectEditForm = ({saveRef}) => {
  const {id} = useParams();
  const {data, update, create} = useObject(id);
  const {t: tn} = useTranslation('notification');
  const {t} = useTranslation('object', {keyPrefix: 'edit'});
  const {t: tc} = useTranslation('enum', {keyPrefix: 'city'});
  const {notify} = useNotification();
  const nav = useNavigate();

  const {ctrl, result, setForm} = useResultForm({
    address: FORM_FIELD.TEXT({label: t`field.address`, validator: () => true}),
    description: FORM_FIELD.TEXT({label: t`field.description`, validator: () => true}),
    name: FORM_FIELD.TEXT({label: t`field.name`, validator: () => true}),
    latitude: FORM_FIELD.TEXT({label: t`field.latitude`, validator: () => true}),
    longitude: FORM_FIELD.TEXT({label: t`field.longitude`, validator: () => true}),
    city: FORM_FIELD.TEXT({label: t`field.city`, validator: () => true, props: {
      displayValue: ({value}) => () => tc(value),
      onChange: ({set}) => ({value}) => set(value),
    }}),
    contract_no: FORM_FIELD.TEXT({label: t`field.contractNo`, validator: () => true}),
    contract_object_no: FORM_FIELD.TEXT({label: t`field.objectNo`, validator: () => true}),
    navision_id: FORM_FIELD.TEXT({label: t`field.navisionId`, validator: () => true}),
    provider_id: FORM_FIELD.TEXT({label: t`field.providerId`, validator: () => true}),
  });

  useEffect(() => {
    saveRef.current = () => (id ? update(result) : create(result)).fork(
      error => notify(
        <NotificationSimple
          Icon={XCircleIcon}
          iconClassName={NOTIFICATION_ICON_CLASS_NAME.DANGER}
          heading={tn('apiError')}
        >
          {JSON.stringify(error)}
        </NotificationSimple>
      ),
      () => {
        notify(
          <NotificationSimple
            Icon={CheckCircleIcon}
            iconClassName={NOTIFICATION_ICON_CLASS_NAME.SUCCESS}
            heading={tn('success')}
          />
        );
        nav(ObjectListRoute.props.path)
      }
    );
  }, [saveRef.current, result, tn, nav, notify]);

  useEffect(() => {pipe(
    safe(isObject),
    map(pipe(
      mapProps({
        longitude: mapFromNumeric,
        latitude: mapFromNumeric,
        provider_id: mapFromNumeric,
        navision_id: mapFromNumeric,
      }),
      setForm,
    )),
  )(data)}, [data])

  const cities = useCity(true);

  return (
    <section className={'flex'}>
      <div className={'p-6 space-y-4 lg:space-y-0 lg:flex lg:space-x-4 flex-grow'}>
        <div className={'lg:inline-block lg:w-1/2 space-y-4'}>
          <InputGroup className={''} isRequired={true} {...ctrl('name')} />
          <div className='lg:flex lg:space-x-4 space-y-4 lg:space-y-0'>
            <InputGroup className={'lg:w-2/3 xl:w-3/4'} {...ctrl('address')} />
            <SelectBox className={'lg:w-1/3 xl:w-1/4'} {...ctrl('city')}>
              {map(
                value => (
                  <SelectBox.Option key={value} value={value}>
                    {titleCase(value)}
                  </SelectBox.Option>
                ),
                cities
              )}
            </SelectBox>
          </div>

          <div className='lg:flex lg:space-x-4 space-y-4 lg:space-y-0'>
            <InputGroup className={'lg:w-1/2'} {...ctrl('longitude')} />
            <InputGroup className={'lg:w-1/2'} {...ctrl('latitude')} />
          </div>
        </div>
        <TextAreaInputGroup inputClassName='min-h-[12.75rem]' className='w-full lg:w-1/2 h-full' {...ctrl('description')} rows={9}/>
      </div>

      <aside className={'border-l border-gray-border'}>
        <Detail title={t`responsiblePeople`}>
          <Detail.Item left='Vardas Pavardė' right='+370656012345' />
        </Detail>

        <Detail title={t`modems`}>
          <Detail.Item>
            <InputGroup label={t`field.modemNo`} className=''/>
          </Detail.Item>
          <Detail.Item>
            <CheckBox label={t`alarmControl`}/>
          </Detail.Item>
        </Detail>

        <Detail title={t`objectInfo`}>
          <Detail.Item left={t`field.objectNo`} right={<Input {...ctrl('contract_object_no')} />} />
          <Detail.Item left={t`field.contractNo`} right={<Input {...ctrl('contract_no')} />} />
          <Detail.Item left={t`field.navisionId`} right={<Input {...ctrl('navision_id')} />} />
          <Detail.Item left={t`field.providerId`} right={<Input {...ctrl('provider_id')} />} />
        </Detail>

      </aside>
    </section>
  );
}

export default ObjectEditForm;
