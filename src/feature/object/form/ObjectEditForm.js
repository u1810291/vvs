import CheckBox from 'components/atom/input/CheckBox';
import Detail from 'components/Disclosure/AsideDisclosure';
import Input from 'components/atom/input/InputGroup/Base/Input';
import InputGroup from 'components/atom/input/InputGroup';
import SelectBox from 'components/atom/input/SelectBox';
import TextAreaInputGroup from 'components/atom/input/InputGroup/TextAreaInputGroup';
import useResultForm, {FORM_FIELD} from 'hook/useResultForm';
import {ObjectListRoute} from '../routes';
import {map} from 'crocks';
import {titleCase} from '@s-e/frontend/transformer/string';
import {useCity, useObject} from '../api';
import {useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

const ObjectEditForm = ({saveRef}) => {
  const params = useParams();
  const {t} = useTranslation('object', {keyPrefix: 'edit'});
  const {t: tc} = useTranslation('enum', {keyPrefix: 'city'});
  const {ctrl, result, setForm} = useResultForm({
    address: FORM_FIELD.TEXT({label: t`field.address`, validator: () => true}),
    city: FORM_FIELD.TEXT({label: t`field.city`, validator: () => true, props: {
      displayValue: ({value}) => () => tc(value),
      onChange: ({set}) => ({value}) => set(value),
    }}),
    contract_no: FORM_FIELD.TEXT({label: t`field.contractNo`, validator: () => true}),
    contract_object_no: FORM_FIELD.TEXT({label: t`field.objectNo`, validator: () => true}),
    description: FORM_FIELD.TEXT({label: t`field.description`, validator: () => true}),
    latitude: FORM_FIELD.TEXT({label: t`field.latitude`, validator: () => true}),
    longitude: FORM_FIELD.TEXT({label: t`field.longitude`, validator: () => true}),
    name: FORM_FIELD.TEXT({label: t`field.name`, validator: () => true}),
    navision_id: FORM_FIELD.TEXT({label: t`field.navisionId`, validator: () => true}),
    provider_id: FORM_FIELD.TEXT({label: t`field.providerId`, validator: () => true}),
    is_atm: FORM_FIELD.BOOL({label: t`field.is_atm`, validator: () => true}),
    is_crew_autoasigned: FORM_FIELD.BOOL({label: t`field.is_crew_autoasigned`, validator: () => true}),
    is_call_after_inspection: FORM_FIELD.BOOL({label: t`field.is_call_after_inspection`, validator: () => true}),
    feedback_from: FORM_FIELD.TEXT({initial: '00:00', label: t`field.feedback_from`, validator: () => true}),
    feedback_until: FORM_FIELD.TEXT({initial: '23:59', label: t`field.feedback_until`, validator: () => true}),
    feedback_sla_time_in_min: FORM_FIELD.TEXT({initial: '15', label: t`field.feedback_sla_time_in_min`, validator: () => true}),
  });

  useObject({
    ...params,
    formResult: result,
    saveRef,
    setForm,
    successRedirectPath: ObjectListRoute.props.path,
  });

  const cities = useCity(true);

  return (
    <section className={'flex'}>
      <div className='flex flex-col flex-grow'>
        <div className={'p-6 space-y-4 lg:space-y-0 lg:flex lg:space-x-4 '}>
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

        <div className='p-6 flex flex-col space-y-8'>
          <h2 className='font-bold text-xl'>{t('feedback_settings')}</h2>

          <div className='flex flex-row w-full space-x-10'>
            <CheckBox className='items-end' {...ctrl('is_crew_autoasigned')}/>
            <InputGroup  {...ctrl('feedback_from')}/>
            <InputGroup {...ctrl('feedback_until')}/>
            <InputGroup {...ctrl('feedback_sla_time_in_min')} type='number'/>
          </div>
          <div>
            <CheckBox className='items-end' {...ctrl('is_call_after_inspection')} />
          </div>
          <div>
            <CheckBox className='items-end' {...ctrl('is_atm')}/>
          </div>
        </div>
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
