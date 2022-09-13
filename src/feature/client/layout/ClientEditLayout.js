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
import {getProp, hasProps, identity, isFunction, safe, not, isEmpty, Maybe, pipe, flip} from 'crocks';
import {titleCase} from '@s-e/frontend/transformer/string';
import {useAuth} from 'context/auth';
import raw from 'raw.macro';
import NotificationSimple, {NOTIFICATION_ICON_CLASS_NAME} from 'feature/ui-notifications/components/NotificationSimple';
import {CheckCircleIcon, XCircleIcon} from '@heroicons/react/solid';
import {errorToText} from 'api/buildApiHook';
import {useNotification} from 'feature/ui-notifications/context';




const toBreadcrumbValue = pipe(
  a => String(a || '').trim(),
  safe(not(isEmpty)),
);

const ClientEditLayout = () => {
  const saveRef = useRef(identity);
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

  const auth = useAuth();
  const _archive = flip(auth.api)(raw('../api/graphql/ArchiveClientById.graphql'));
  const _createSettings = flip(auth.api)(raw('../api/graphql/CreateClientSettings.graphql'));
  const {notify} = useNotification();

  // save
  const save = () => {
    isFunction(saveRef.current) && saveRef.current((pk) => {
      _createSettings({id: pk['register']['user']['id']}).fork((error) => {
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
        // success
      })
    });
  }

  // archive
  const archive = () => {
    if (!confirm('Are you sure you want to archive the client?')) return;
    _archive({id, archived_at: new Date()}).fork((error) => {
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

  // unarchive
  const unarchive = () => {
    if (!confirm('Are you sure you want to restore the client?')) return;
    _archive({id, archived_at: null}).fork((error) => {
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
    <SidebarLayout>
      <Header>
        <>
          <Breadcrumbs>
            <RouteAsBreadcrumb route={ClientListRoute}/>
            <Nullable on={breadcrumb}>
              <Breadcrumbs.Item hideSlash>
                <span className='font-semibold'>{breadcrumb}</span>
              </Breadcrumbs.Item>
            </Nullable>
          </Breadcrumbs>
          <div className='space-x-4'>
            <Button.Nd onClick={() => nav(ClientListRoute.props.path)}>{t`cancel`}</Button.Nd>
            <Button onClick={save}>{t`save`}</Button>
          </div>
        </>
      </Header>
      
      <div className={'flex-1 flex-grow h-max'}>
        <ClientEditForm saveRef={saveRef} assignRef={assignRef} removeRelRef={removeRelRef} />
      </div>

      <Nullable on={id && !data?.archived_at}>
        <section className={'flex p-6'}>
          <Button.NoBg onClick={() => archive()} className={'bg-red-500 text-white w-min'}>{t`archive`}</Button.NoBg>
        </section>
      </Nullable>

      <Nullable on={id && data?.archived_at}>
        <section className={'flex flex-col p-6'}>
          {t`archived_at`}: {data?.archived_at}
          <Button.NoBg onClick={() => unarchive()} className={'bg-blue-500 text-white w-min'}>{t`restore`}</Button.NoBg>
        </section>
      </Nullable>
    </SidebarLayout>
  )
};

export default ClientEditLayout;
