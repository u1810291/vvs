import CheckBox from 'components/atom/input/CheckBox';
import Detail from 'components/Disclosure/AsideDisclosure';
import Input from 'components/atom/input/InputGroup/Base/Input';
import InputGroup from 'components/atom/input/InputGroup';
import SelectBox from 'components/atom/input/SelectBox';
import TextAreaInputGroup from 'components/atom/input/InputGroup/TextAreaInputGroup';
import useResultForm, {FORM_FIELD} from 'hook/useResultForm';
import {ObjectListRoute} from '../routes';
import {constant, map, getPath, pipe, not, isEmpty, chain, safe, curry, isArray, flip, identity,} from 'crocks';
import {getName} from 'feature/user/utils';
import {hasLength} from '@s-e/frontend/pred';
import {titleCase} from '@s-e/frontend/transformer/string';
import {useCity, useObject} from '../api';
import {useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import Button from 'components/Button';
import {useAuth} from 'context/auth';
import {useNotification} from 'feature/ui-notifications/context';
import raw from 'raw.macro';
import NotificationSimple, {NOTIFICATION_ICON_CLASS_NAME} from 'feature/ui-notifications/components/NotificationSimple';
import {CheckCircleIcon, XCircleIcon} from '@heroicons/react/solid';
import {errorToText} from 'api/buildApiHook';




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

  const {ctrl, result, form, setForm} = useResultForm({
    address: FORM_FIELD.TEXT({label: t`field.address`, validator: () => true}),
    city: FORM_FIELD.TEXT({label: t`field.city`, validator: () => true, props: {
      displayValue: ({value}) => () => titleCase(value),
      // onChange: ({set}) => ({value}) => set(value),
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
    form,
    setForm,
    successRedirectPath: ObjectListRoute.props.path,
  });
  
  const cities = useCity(true);


  const auth = useAuth();
  const _uploadImage = flip(auth.api)(raw('../api/graphql/UploadImage.graphql'));
  const _removeImage = flip(auth.api)(raw('../api/graphql/RemoveImage.graphql'));
  const {notify} = useNotification();

  const getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        cb(reader.result)
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
  }

  const uploadImage = () => {
    document.getElementById('chooseImage').click();
  }

  const onFileChoose = (event) => {
    const file = event.target.files[0];

    getBase64(file, (result) => {
      _uploadImage({object_id: params.id, src: result}).fork((error) => {
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
    })
  }

  const removeImage = (e) => {
    if (!confirm('Are you sure you want to delete?')) return;
  
    _removeImage({id: e.target.id}).fork((error) => {
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
    })
  }



  return (
    <section className={'flex flex-col lg:flex-row lg:min-h-full'}>
      <div className='flex flex-col flex-grow'>
        <div className={'p-6 space-y-4 lg:space-y-0 lg:flex lg:space-x-4 '}>
          <div className={'lg:inline-block lg:w-1/2 space-y-4'}>
            <InputGroup {...ctrl('name')} />
            <div className='lg:flex lg:space-x-4 space-y-4 lg:space-y-0'>
              <InputGroup className={'lg:w-2/3 xl:w-3/4'} {...ctrl('address')} />
              <SelectBox 
                className={'lg:w-1/3 xl:w-1/4'} 
                {...ctrl('city')}
                onChange={(v) => {
                  const theForm = {...form};
                  theForm['city'] = v;
                  setForm(theForm);
                }}>
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

        {/* Object photos */}
        <div className='p-6 flex flex-col space-y-8 w-1/2'>
          <h2 className='font-bold text-xl'>{t('object_photos')}</h2>

          <div className='grid grid-cols-4 gap-4'>
            {form['images']?.map(img => (
              <div key={img.id} className={'flex flex-col items-end'}>
                <Button.NoBg id={img.id} onClick={removeImage} className={'w-fit text-red-500 '}>{t('delete')}</Button.NoBg>
                <img src={img.src} />
              </div>
            ))}
          </div>

          <div className='flex justify-end w-full'>
            <input
              id='chooseImage'
              type='file'
              name='image'
              onChange={onFileChoose}
              hidden={true}
            />
            <Button.Nd onClick={uploadImage}>{t('upload_photo')}</Button.Nd>
          </div>
        </div>            
        
        {/* Object settings */}
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
