import {useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import InputGroup from 'components/atom/input/InputGroup';
import SelectBox from 'components/atom/input/SelectBox';
import CheckBox from 'components/obsolete/input/CheckBox';
import useResultForm, {FORM_FIELD} from 'hook/useResultForm';
import {titleCase} from '@s-e/frontend/transformer/string';
import {
  map,
  getProp,
  mapProps,
  pipe,
  tap,
} from 'crocks';
import TextAreaInputGroup from 'components/atom/input/InputGroup/TextAreaInputGroup';
import {useCity, useObject} from '../api';
import {useAuth} from 'context/auth';

const ObjectEditForm = () => {
  const {t} = useTranslation('object', {keyPrefix: 'edit'});
  const {apiQuery} = useAuth();

  const {ctrl, result, setForm} = useResultForm({
    address: FORM_FIELD.TEXT({label: t`field.address`, validator: () => true}),
    name: FORM_FIELD.TEXT({label: t`field.name`, validator: () => true}),
    latitude: FORM_FIELD.TEXT({label: t`field.latitude`, validator: () => true}),
    longitude: FORM_FIELD.TEXT({label: t`field.longitude`, validator: () => true}),
    description: FORM_FIELD.TEXT({label: t`field.description`, validator: () => true}),
  });

  const params = useParams();
  const {query} = useObject(
    params,
    [
      console.error,
      pipe(
        tap(a => console.log(a)),
        getProp('object_by_pk'),
        map(mapProps({
          longitude: String,
          latitude: String,
        })),
        map(setForm)
      ),
    ]);

  const cities = useCity(true);

  return (
    <section className={'flex'}>
      <div className={'p-6 space-y-4 lg:space-y-0 lg:flex lg:space-x-4 w-9/12'}>
        <div className={'lg:inline-block lg:w-1/2 space-y-4'}>
          <InputGroup className={''} isRequired={true} {...ctrl('name')} />
          <div className='lg:flex lg:space-x-4 space-y-4 lg:space-y-0'>
            <InputGroup className={'lg:w-2/3 xl:w-3/4'} {...ctrl('address')} />
            <SelectBox className={'lg:w-1/3 xl:w-1/4'} value='VILNIUS' label={t('field.city')}>
              {map(
                value => <SelectBox.Option key={value} value={value}>{titleCase(value)}</SelectBox.Option>,
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

      <aside className={'w-3/12 border-l border-gray-border'}>
        <ul>
          <li className={'px-6 py-4'}>
            <p>{t('title.responsible_person')}</p>
          </li>
          TODO: the list should be iterable from response
          <li className={'grid grid-cols-2 px-6 py-4'}>
            <p className={'mr-2 text-steel col-span-1'}>{t('field.full_name')}</p>
            <p className={'text-bluewood col-span-1'}>+370656012345</p>
          </li>
          <li className={'grid grid-cols-2 px-6 py-4 border-b border-gray-border'}>
            <p className={'mr-2 text-steel col-span-1'}>{t('field.full_name')}</p>
            <p className={'text-bluewood col-span-1'}>+370656012345</p>
          </li>
          <li className={'px-6 py-4'}>
            <p>{t('title.modems')}</p>
          </li>
          <li className={'grid grid-cols-2 px-6 py-4'}>
            <InputGroup
              label={t('field.modem_number')}
              twLabel={'text-bluewood text-base'}
            />
          </li>
          <li className={'grid grid-cols-1 px-6 py-4 border-b border-gray-border'}>
            <CheckBox
              className={'items-center mb-0'}
              name={t('field.alarm_management')}
              label={t('field.alarm_management')}
              twLabel={'text-bluewood text-base'}
            />
          </li>
          <li className={'px-6 py-4'}>
            <p>{t('title.object_info')}</p>
          </li>
          <li className={'grid grid-cols-2 px-6 py-4'}>
            <p className={'mr-2 text-steel col-span-1'}>{t('field.object_number')}</p>
            <p className={'text-bluewood col-span-1'}>22-1-9346</p>
          </li>
          <li className={'grid grid-cols-2 px-6 py-4'}>
            <p className={'mr-2 text-steel col-span-1'}>{t('field.contract_number')}</p>
            <p className={'text-bluewood col-span-1'}>FAF-5441</p>
          </li>
          <li className={'grid grid-cols-2 px-6 py-4'}>
            <p className={'mr-2 text-steel col-span-1'}>{t('field.navision_id')}</p>
            <p className={'text-bluewood col-span-1'}>1167</p>
          </li>
          <li className={'grid grid-cols-2 px-6 py-4 border-b border-gray-border'}>
            <p className={'mr-2 text-steel col-span-1'}>{t('field.monas_ms_id')}</p>
            <p className={'text-bluewood col-span-1'}>81652</p>
          </li>
        </ul>
      </aside>
    </section>
  );
}

export default ObjectEditForm;
