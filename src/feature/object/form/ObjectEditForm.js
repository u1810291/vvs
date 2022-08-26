import CheckBox from 'components/atom/input/CheckBox';
import Detail from 'components/Disclosure/AsideDisclosure';
import Input from 'components/atom/input/InputGroup/Base/Input';
import InputGroup from 'components/atom/input/InputGroup';
import SelectBox from 'components/atom/input/SelectBox';
import TextAreaInputGroup from 'components/atom/input/InputGroup/TextAreaInputGroup';
import useResultForm, {FORM_FIELD} from 'hook/useResultForm';
import {ObjectListRoute} from '../routes';
import {constant, map, getPath, pipe, not, isEmpty, chain, safe, curry, isArray,} from 'crocks';
import {getName} from 'feature/user/utils';
import {hasLength} from '@s-e/frontend/pred';
import {titleCase} from '@s-e/frontend/transformer/string';
import {useCity, useObject} from '../api';
import {useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

const detailsOf = curry((
  detailsProps,
  itemToProps,
  items
) => pipe(
  safe(isArray),
  map(map(itemToProps)),
  chain(safe(not(isEmpty))),
  map(listOfContacts => <Detail {...detailsProps}>{listOfContacts}</Detail>),
)(items));

const ObjectEditForm = ({saveRef}) => {
  const params = useParams();
  const {t} = useTranslation('object', {keyPrefix: 'edit'});
  const {t: tc} = useTranslation('enum', {keyPrefix: 'city'});
  const {ctrl, result, setForm} = useResultForm({
    address: FORM_FIELD.TEXT({label: t`field.address`, validator: () => true}),
    city: FORM_FIELD.TEXT({label: t`field.city`, validator: () => true, props: {
      displayValue: ({value}) => () => titleCase(value),
      onChange: ({set}) => ({value}) => set(value),
    }}),
    contract_no: FORM_FIELD.TEXT({label: t`field.contractNo`, validator: () => true}),
    contract_object_no: FORM_FIELD.TEXT({label: t`field.objectNo`, validator: () => true}),
    description: FORM_FIELD.TEXT({label: t`field.description`, validator: () => true}),
    latitude: FORM_FIELD.TEXT({label: t`field.latitude`, validator: () => true}),
    longitude: FORM_FIELD.TEXT({label: t`field.longitude`, validator: () => true}),
    name: FORM_FIELD.TEXT({
      label: t`field.name`,
      validator: hasLength,
      message: t`validation.name`,
      showValidationBelow: true,
      props: {isRequired: constant(true)},
    }),
    navision_id: FORM_FIELD.TEXT({label: t`field.navisionId`, validator: () => true}),
    provider_id: FORM_FIELD.TEXT({label: t`field.providerId`, validator: () => true}),
    is_atm: FORM_FIELD.BOOL({label: t`field.is_atm`, validator: () => true}),
    is_crew_autoasigned: FORM_FIELD.BOOL({label: t`field.is_crew_autoasigned`, validator: () => true}),
    is_call_after_inspection: FORM_FIELD.BOOL({label: t`field.is_call_after_inspection`, validator: () => true}),
    feedback_from: FORM_FIELD.TEXT({initial: '00:00', label: t`field.feedback_from`, validator: () => true}),
    feedback_until: FORM_FIELD.TEXT({initial: '23:59', label: t`field.feedback_until`, validator: () => true}),
    feedback_sla_time_in_min: FORM_FIELD.TEXT({initial: '15', label: t`field.feedback_sla_time_in_min`, validator: () => true}),
  });


  const api = useObject({
    ...params,
    formResult: result,
    saveRef,
    setForm,
    successRedirectPath: ObjectListRoute.props.path,
  });

  const cities = useCity(true);

  return (
    <section className={'flex flex-col lg:flex-row lg:min-h-full'}>
      <div className='flex flex-col flex-grow'>
        <div className={'p-6 space-y-4 lg:space-y-0 lg:flex lg:space-x-4 '}>
          <div className={'lg:inline-block lg:w-1/2 space-y-4'}>
            <InputGroup {...ctrl('name')} />
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
        {(
          getPath(['data', 'users'], api)
          .chain(detailsOf({title: t`responsiblePeople`}, user => (
            <Detail.Item
              key={user?.id}
              left={<span className='whitespace-nowrap'>{getName(user).option('Name Surname')}</span>}
              right={<span>{user?.mobilePhone || user?.email || '—'}</span>}
            />
          )))
          .option(null)
        )}

        {(
          getPath(['data', 'modems'], api)
          .chain(detailsOf(
            {title: t`modems`}, 
            modem => (
              <Detail className='' title={modem?.contract_modem_no || modem?.id} key={modem?.id}>
                <Detail.Item left={t`modem_central`} right={titleCase(modem?.central)} />
                <Detail.Item left={t`modem_contract_no`} right={modem?.contract_modem_no} />
                <Detail.Item left={t`modem_area_no`} right={modem?.area_no} />
              </Detail>
            ),
          ))
          .map(detail => {
            detail.props.children.push(
              <Detail.Item key='alarmManagement'>
                <CheckBox label={t`field.alarm_management`} />
              </Detail.Item>
            );
            return detail;
          })
          .option(null)
        )}

        <Detail title={t`objectInfo`}>
          <Detail.Item left={<span className='block min-w-[6rem] whitespace-nowrap'>{t`field.objectNo`}</span>} right={<Input {...ctrl('contract_object_no')} />} />
          <Detail.Item left={<span className='block min-w-[6rem] whitespace-nowrap'>{t`field.contractNo`}</span>} right={<Input {...ctrl('contract_no')} />} />
          <Detail.Item left={<span className='block min-w-[6rem] whitespace-nowrap'>{t`field.navisionId`}</span>} right={<Input {...ctrl('navision_id')} />} />
          <Detail.Item left={<span className='block min-w-[6rem] whitespace-nowrap'>{t`field.providerId`}</span>} right={<Input {...ctrl('provider_id')} />} />
        </Detail>
      </aside>
    </section>
  );
}

export default ObjectEditForm;
