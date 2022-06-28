import Breadcrumbs from 'components/Breadcrumbs';
import Header from 'components/atom/Header';
import SidebarLayout from 'layout/SideBarLayout';
import maybeToAsync from 'crocks/Async/maybeToAsync';
import {useAsyncEffect} from 'hook/useAsync';
import withPreparedProps from 'hoc/withPreparedProps';
import {Link, useParams} from 'react-router-dom';
import {ObjectListRoute} from '../routes';
import {getProp, getPath, map, pipe, tap, Async, objOf, identity, setProp, isEmpty, not} from 'crocks';
import {useAuth} from 'context/auth';
import {useTranslation} from 'react-i18next';
import {option} from 'crocks/pointfree';
import InputGroup from 'components/atom/input/InputGroup';
import useResultForm from 'hook/useResultForm';
import {always} from 'util/func';
import SelectBox from 'components/atom/input/SelectBox';
import {titleCase} from '@s-e/frontend/transformer/string';
import {renderWithProps, withMergedClassName} from '../../../util/react';
import CheckBox from '../../../components/atom/input/CheckBox';

const QUERY = `
  query ObjectById ($id: uuid!) {
    object_by_pk(id: $id) {
      id
      name
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

const TextArea = () => (
  <div>
    <label htmlFor='comment' className='block text-bluewood text-base'>
      Aprašymas
    </label>
    <div className='mt-1'>
      <textarea
        rows={6}
        name='comment'
        id='comment'
        className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
        defaultValue={''}
      />
    </div>
  </div>
);

const ObjectEditLayout = ({breadcrumbs, children, ...props}) => (
  <SidebarLayout>
    <Header>{breadcrumbs}</Header>
    {children}
  </SidebarLayout>
);

const {Rejected, Resolved} = Async;

export default withPreparedProps(ObjectEditLayout, props => {
  const {api} = useAuth();
  const params = useParams();
  const {t: tb} = useTranslation('object');
  const {t} = useTranslation('object', {keyPrefix: 'edit'});

  const variables = pipe(
    getProp('id'),
    map(objOf('id')),
    maybeToAsync('"id" param is required in URL'),
  )(params);

  const query = Resolved(QUERY);

  const {ctrl, result, setForm} = useResultForm({
    address: {
      initial: '',
      validator: not(isEmpty),
      props: {
        label: always(t`field.address`),
        type: always('text'),
      }
    },
    name: {
      initial: '',
      validator: not(isEmpty),
      props: {
        label: always(t`field.name`),
        type: always('text'),
      }
    },
    latitude: {
      initial: '',
      validator: not(isEmpty),
      props: {
        label: always(t`field.latitude`),
        type: always('text'),
      }
    },
    longitude: {
      initial: '',
      validator: not(isEmpty),
      props: {
        label: always(t`field.longitude`),
        type: always('text'),
      }
    },
  });

  const a = useAsyncEffect(
    Async.of(v => q => api(v, q))
    .ap(variables)
    .ap(query)
    .chain(identity),
    console.error,
    pipe(
      tap(console.log),
      getProp('object_by_pk'),
      map(setForm)
    ),
    [variables, query],
  )

  return {
    ...props
    ,
    breadcrumbs: (
      <Breadcrumbs>
        {
          getProp('props', ObjectListRoute)
          .map(
            ({translationKey: tk, translationNs: ns, path}) => (
              <Breadcrumbs.Item key={path}>
                <Link to={path}>
                  {tb(tk, {ns, keyPrefix: ''})}
                </Link>
              </Breadcrumbs.Item>
            )
          )
          .option(null)
        }
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
    ),
    children: (
      <section  className={'flex'}>
        <section className={'h-full grid grid-cols-2 gap-6 w-9/12 p-6'}>
          <div className={'grid gap-6'}>
            <InputGroup className={'flex flex-col justify-between'} isRequired={true} twLabel={'text-bluewood text-base'} {...ctrl('name')} />
            <div className={'grid grid-cols-12 gap-6'}>
              <InputGroup className={'col-span-9 flex flex-col justify-between'} twLabel={'text-bluewood text-base'} {...ctrl('address')} />
              <SelectBox className={'col-span-3 flex flex-col justify-between'} value='VILNIUS' twLabel={'text-bluewood text-base'} label={t('field.city')}>
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
            <div className={'grid grid-cols-12 gap-6'}>
              <InputGroup className={'col-span-6 flex flex-col justify-between'} twLabel={'text-bluewood text-base'} {...ctrl('longitude')} />
              <InputGroup className={'col-span-6 flex flex-col justify-between'} twLabel={'text-bluewood text-base'} {...ctrl('latitude')} />
            </div>
          </div>
          <TextArea />
        </section>
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
