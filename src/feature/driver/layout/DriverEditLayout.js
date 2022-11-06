import Breadcrumbs, {RouteAsBreadcrumb} from 'components/Breadcrumbs';
import Button from 'components/Button';
import Header from 'components/atom/Header';
import Nullable from 'components/atom/Nullable';
import DriverRoute, {DriverListRoute} from '../routes';
import SidebarLayout from 'layout/SideBarLayout';
import {useNavigate, useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {useRef} from 'react';
import DriverEditForm from '../form/DriverEditForm';
import useDriver from 'feature/driver/api/useDriver';
import {flip, identity, isFunction, Maybe} from 'crocks';
import {titleCase} from '@s-e/frontend/transformer/string';
import DriverOnlineTag from '../component/DriverOnlineTag';
import {getName} from 'feature/user/utils';
import {useNotification} from 'feature/ui-notifications/context';
import NotificationSimple, {NOTIFICATION_ICON_CLASS_NAME} from 'feature/ui-notifications/components/NotificationSimple';
import {CheckCircleIcon, XCircleIcon} from '@heroicons/react/solid';
import {errorToText} from 'api/buildApiHook';
import {useAuth} from 'context/auth';
import raw from 'raw.macro';



const DriverEditLayout = () => {
  const saveRef = useRef(identity);
  const {id} = useParams();
  const {data} = useDriver({id});
  const {t} = useTranslation('driver', {keyPrefix: 'edit'});
  const nav = useNavigate();

  const breadcrumb = (
    getName(data)
    .alt(Maybe.Just(t`newDriver`).map(titleCase))
    .option(null)
  );

  const auth = useAuth();
  const _createSettings = flip(auth.api)(raw('../api/graphql/CreateDriverSettings.graphql'));
  const _archive = flip(auth.api)(raw('../api/graphql/ArchiveById.graphql'));
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
    // if (!confirm('Are you sure you want to archive the user?')) return;
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

      nav(DriverListRoute.props.path);
   })
 }

  // unarchive
  const unarchive = () => {
    // if (!confirm('Are you sure you want to restore the user?')) return;
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

      nav(DriverListRoute.props.path);
   })
 }

  return (
    <SidebarLayout>
      <Header>
        <>
          <Breadcrumbs>
            <RouteAsBreadcrumb route={DriverRoute}/>
            <Nullable on={breadcrumb}>
              <Breadcrumbs.Item hideSlash>
                <span className='font-semibold'>{breadcrumb}</span>
              </Breadcrumbs.Item>
            </Nullable>
            <Breadcrumbs.Item hideSlash>
              <DriverOnlineTag {...data} />
            </Breadcrumbs.Item>
          </Breadcrumbs>
          <div className='space-x-4'>
            <Button.Nd onClick={() => nav(DriverListRoute.props.path)}>{t`cancel`}</Button.Nd>
            <Button onClick={save}>{t`save`}</Button>
          </div>
        </>
      </Header>

      <DriverEditForm saveRef={saveRef}/>

      <Nullable on={id && !data?.archived_at}>
        <section className={'flex p-6'}>
          <Button.NoBg onClick={() => archive()} className={'bg-red-500 text-white w-min'}>{t`archive`}</Button.NoBg>
        </section>
      </Nullable>

      <Nullable on={id && data?.archived_at}>
        <section className={'flex flex-col p-6'}>
          {/* {t`archived_at`}: {data?.archived_at} */}
          <Button.NoBg onClick={() => unarchive()} className={'bg-blue-500 text-white w-min'}>{t`restore`}</Button.NoBg>
        </section>
      </Nullable>

    </SidebarLayout>
  )
};

export default DriverEditLayout;
