import Breadcrumbs, {RouteAsBreadcrumb} from 'components/Breadcrumbs';
import Button from 'components/Button';
import Header from 'components/atom/Header';
import Nullable from 'components/atom/Nullable';
import {ClientListRoute} from '../routes';
import SidebarLayout from 'layout/SideBarLayout';
import {useNavigate, useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {useRef} from 'react';
import ClientEditForm from '../form/ClientEditForm';
import useClient from 'feature/client/api/useClient';
import {getProp, hasProps, identity, isFunction, safe, not, isEmpty, Maybe, pipe} from 'crocks';
import {titleCase} from '@s-e/frontend/transformer/string';

const toBreadcrumbValue = pipe(
  a => String(a || '').trim(),
  safe(not(isEmpty)),
);

const ClientEditLayout = () => {
  const saveRef = useRef(identity);
  const archiveRef = useRef(identity);
  const assignRef = useRef(identity);
  const removeRelRef = useRef(identity);

  const {id} = useParams();
  const {data} = useClient({id});
  const {t} = useTranslation('client', {keyPrefix: 'edit'});
  const nav = useNavigate();

  const breadcrumb = (
    getProp('fullName', data).chain(safe(not(isEmpty)))
    .alt((
      safe(hasProps(['firstName', 'middleName', 'lastName']), data)
      .map(({firstName, middleName, lastName}) => `${firstName} ${middleName} ${lastName}`)
      .chain(toBreadcrumbValue)
    ))
    .alt((
      safe(hasProps(['firstName', 'lastName']), data)
      .map(({firstName, lastName}) => `${firstName} ${lastName}`)
      .chain(toBreadcrumbValue)
    ))
    .alt(getProp('firstName', data).chain(toBreadcrumbValue))
    .alt(getProp('lastName', data).chain(toBreadcrumbValue))
    .alt(getProp('id', data).chain(toBreadcrumbValue))
    .alt(Maybe.Just(t`newClient`))
    .map(titleCase)
    .option(null)
  );

  return (
    <SidebarLayout>
      <Header>
        <>
          <Breadcrumbs>
            <RouteAsBreadcrumb route={ClientListRoute}/>
            <Nullable on={breadcrumb}>
              <Breadcrumbs.Item hasSlash={false}>
                <span className='font-semibold'>{breadcrumb}</span>
              </Breadcrumbs.Item>
            </Nullable>
          </Breadcrumbs>
          <div className='space-x-4'>
            <Button.Nd onClick={() => nav(ClientListRoute.props.path)}>{t`cancel`}</Button.Nd>
            <Button onClick={() => isFunction(saveRef.current) && saveRef.current()}>{t`save`}</Button>
          </div>
        </>
      </Header>
      
      <div className={'flex-1 flex-grow h-max'}>
        <ClientEditForm saveRef={saveRef} assignRef={assignRef} removeRelRef={removeRelRef} />
      </div>

      <Nullable on={id}>
        <section className={'flex p-6'}>
          <Button.NoBg onClick={() => isFunction(archiveRef.current) && archiveRef.current()} className={'bg-red-500 text-white w-min'}>{t`archive`}</Button.NoBg>
        </section>
      </Nullable>
    </SidebarLayout>
  )
};

export default ClientEditLayout;
