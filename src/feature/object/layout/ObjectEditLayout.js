import Breadcrumbs, {RouteAsBreadcrumb} from 'components/Breadcrumbs';
import Header from 'components/atom/Header';
import SidebarLayout from 'layout/SideBarLayout';
import maybeToAsync from 'crocks/Async/maybeToAsync';
import {useAsyncEffect} from 'hook/useAsync';
import withPreparedProps from 'hoc/withPreparedProps';
import {useParams} from 'react-router-dom';
import ObjectRoute from '../routes';
import {useAuth} from 'context/auth';
import {useTranslation} from 'react-i18next';
import {renderWithProps, withMergedClassName} from '../../../util/react';
import Button from 'components/Button';
import InputGroup from 'components/atom/input/InputGroup';
import SelectBox from 'components/atom/input/SelectBox';
import CheckBox from 'components/obsolete/input/CheckBox';
import useResultForm, {FORM_FIELD} from 'hook/useResultForm';
import {titleCase} from '@s-e/frontend/transformer/string';
import {
  Async,
  chain,
  getPath,
  getProp,
  identity,
  isEmpty,
  isString,
  map,
  mapProps,
  not,
  objOf,
  option,
  pipe,
  safe,
  setProp,
  tap,
} from 'crocks';
import resultToAsync from 'crocks/Async/resultToAsync';
import TextAreaInputGroup from 'components/atom/input/InputGroup/TextAreaInputGroup';

const QUERY = `
  query ObjectById ($id: uuid!) {
    object_by_pk(id: $id) {
      address
      city
      contract_no
      contract_object_no
      description
      id
      is_atm
      latitude
      longitude
      name
      navision_id
      phone
    }
    city {
      value
    }
  }
`;

const ObjectEditAside = withMergedClassName(
  'flex flex-col h-full',
  ({Tag = 'ul', children, ...props}) => (
    <aside {...props}>
      <Tag>
        {children}
      </Tag>
    </aside>
  )
);

const ObjectEditLayout = ({headerContent, children, buttonchildren, ...props}) => (
  <SidebarLayout>
    <Header>{headerContent}</Header>
    {children}
  </SidebarLayout>
);

const {Rejected, Resolved} = Async;

export default withPreparedProps(ObjectEditLayout, props => {
  const {api} = useAuth();
  const params = useParams();
  const {t: tb} = useTranslation('object');
  const {t} = useTranslation('object', {keyPrefix: 'edit'});

  const getFieldAsString = pipe(
    getProp('value'),
    chain(safe(isString)),
    option(''),
  );

  const {ctrl, result, setForm} = useResultForm({
    address: FORM_FIELD.TEXT({label: t`field.address`, validator: () => true}),
    name: FORM_FIELD.TEXT({label: t`field.name`, validator: () => true}),
    latitude: FORM_FIELD.TEXT({label: t`field.latitude`, validator: () => true}),
    longitude: FORM_FIELD.TEXT({label: t`field.longitude`, validator: () => true}),
    description: FORM_FIELD.TEXT({label: t`field.description`, validator: () => true}),
  });

  const a = useAsyncEffect(
    Async.of(v => q => api(v, q))
    .ap(maybeToAsync(
      '"id" param is required in URL',
      getProp('id', params).map(objOf('id'))
    ))
    .ap(Resolved(QUERY))
    .chain(identity),
    console.error,
    pipe(
      tap(console.log),
      getProp('object_by_pk'),
      map(mapProps({
        longitude: String,
        latitude: String,
      })),
      map(setForm)
    ),
    [params],
  )

  const send = (event) => {
    return resultToAsync(result)
      .map(mapProps({
        latitude: pipe(
          safe(not(isEmpty)),
          map(Number),
          option(null),
        ),
        longitude: pipe(
          safe(not(isEmpty)),
          map(Number),
          option(null),
        ),
      }))
      .chain(a => api(
        a,
        `
        mutation UpdateObject(
          $id: uuid!,
          $address: String = null,
          $city: city_enum = VILNIUS,
          $contract_no: String = null
          $description: String = null
          $contract_object_no: String = null,
          $is_atm: Boolean = false,
          $latitude: numeric = null,
          $longitude: numeric = null,
          $name: String = null,
          $navision_id: Int = null,
          $phone: String = null,
        ) {
          update_object_by_pk(_set: {address: $address, city: $city, contract_no: $contract_no, contract_object_no: $contract_object_no, description: $description, is_atm: $is_atm, latitude: $latitude, longitude: $longitude, name: $name, navision_id: $navision_id, phone: $phone}, pk_columns: {id: $id}) {
            address
            city
            contract_no
            contract_object_no
            description
            is_atm
            latitude
            longitude
            name
            navision_id
            phone
          }
        }
        `
    ))
    .fork(console.error, console.log)
  };

  return {
    ...props,
    headerContent: (
      <>
        <Breadcrumbs>
          <RouteAsBreadcrumb route={ObjectRoute}/>
          {
            getPath(['data', 'object_by_pk', 'name'], a)
              .alt(getPath(['data', 'object_by_pk', 'id'], a))
              .map(objOf('children'))
              .map(setProp('className', 'font-semibold'))
              .map(props => (
                <Breadcrumbs.Item  key={props.children}>
                  <span {...props} />
                </Breadcrumbs.Item>
              ))
              .option(null)
          }
        </Breadcrumbs>
        <div className='space-x-4'>
          <Button.Nd>{t`cancel`}</Button.Nd>
          <Button onClick={send}>{t`save`}</Button>
        </div>
      </>
    ),
    children: (
      <section className={'flex'}>
        <div className={'p-6 space-y-4 lg:space-y-0 lg:flex lg:space-x-4 w-9/12'}>
          <div className={'lg:inline-block lg:w-1/2 space-y-4'}>
            <InputGroup className={''} isRequired={true} {...ctrl('name')} />
            <div className='lg:flex lg:space-x-4 space-y-4 lg:space-y-0'>
              <InputGroup className={'lg:w-2/3 xl:w-3/4'} {...ctrl('address')} />
              <SelectBox className={'lg:w-1/3 xl:w-1/4'} value='VILNIUS' label={t('field.city')}>
                {
                  pipe(
                    getPath(['data', 'city']),
                    map(map(pipe(
                      a => ({children: titleCase(a.value), value: a.value, key: a.value}),
                      renderWithProps(SelectBox.Option))
                    )),
                    option(null),
                  )(a)
                }
              </SelectBox>
            </div>

            <div className='lg:flex lg:space-x-4 space-y-4 lg:space-y-0'>
              <InputGroup className={'lg:w-1/2'} {...ctrl('longitude')} />
              <InputGroup className={'lg:w-1/2'} {...ctrl('latitude')} />
            </div>
          </div>
          <TextAreaInputGroup inputClassName='min-h-[12.75rem]' className='w-full lg:w-1/2 h-full' {...ctrl('description')} rows={9}/>
        </div>

        <section className={'w-3/12'}>
          <ObjectEditAside className={'border-l border-gray-border'}>
          <li className={'px-6 py-4'}>
            <p>{t('title.responsible_person')}</p>
          </li>
          {/* TODO: the list should be iterable from response */}
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
          </ObjectEditAside>
        </section>
      </section>
    )
  };
});
