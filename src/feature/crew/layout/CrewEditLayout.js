import Breadcrumbs, {RouteAsBreadcrumb} from 'components/Breadcrumbs';
import CrewEditForm from 'feature/crew/form/CrewEditForm';
import Header from 'components/atom/Header';
import Nullable from 'components/atom/Nullable';
import React, {useRef} from 'react';
import SideBarLayout from 'layout/SideBarLayout';
import {CrewListRoute} from 'feature/crew/routes';
import {flip, getProp, identity, isFunction} from 'crocks';
import {useCrew} from 'feature/crew/api/crewEditApi';
import {useNavigate, useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import Button from 'components/Button';
import DynamicStatus from '../../../components/atom/Status';
import {useNotification} from 'feature/ui-notifications/context';
import {useAuth} from 'context/auth';
import raw from 'raw.macro';
import NotificationSimple, {NOTIFICATION_ICON_CLASS_NAME} from 'feature/ui-notifications/components/NotificationSimple';
import {CheckCircleIcon, XCircleIcon} from '@heroicons/react/solid';
import {errorToText} from 'api/buildApiHook';

const CrewEditLayout = () => {
  const saveRef = useRef(identity);
  const removeRef = useRef(identity);
  const {id} = useParams();
  const navigate = useNavigate();
  const {swr, data} = useCrew({id});
  const {t} = useTranslation('crew', {keyPrefix: 'edit.header'});
  const {notify} = useNotification();

  const auth = useAuth();
  const _archive = flip(auth.api)(raw('../api/graphql/ArchiveById.graphql'));
  
  // save 
  const send = () => {isFunction(saveRef.current) && saveRef.current();};

  // archive
  const archive = () => {
    // if (!confirm('Are you sure you want to archive the crew?')) return;

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
      
      navigate(CrewListRoute.props.path);
   })
 }

  // unarchive
  const unarchive = () => {
    // if (!confirm('Are you sure you want to restore the crew?')) return;

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

      navigate(CrewListRoute.props.path);
   })
 }

  const breadcrumb = (
    getProp('name', data)
      .alt(getProp('id', data))
      .option(null)
  );

  const status = (
    getProp('status', data)
      .option(null)
  );

  return (
    <SideBarLayout>
      <div className='flex flex-col'>
        <Header>
          <Breadcrumbs>
            <RouteAsBreadcrumb route={CrewListRoute} />
            <Nullable on={breadcrumb}>
              <Breadcrumbs.Item hideSlash>
                <span className='font-semibold'>{breadcrumb}</span>
              </Breadcrumbs.Item>
              <Nullable on={status}>
                <DynamicStatus t={'crew'} className={'w-full px-2 text-xl items-center font-thin uppercase'} status={status} />
              </Nullable>
            </Nullable>
          </Breadcrumbs>
          <div className='space-x-4'>
            <Button.Sxl onClick={() => navigate(CrewListRoute.props.path)}>
              {t`button.cancel`}
            </Button.Sxl>
            <Button.Pxl onClick={send}>
              {t`button.save`}
            </Button.Pxl>
          </div>
        </Header>

        <CrewEditForm saveRef={saveRef} removeRef={removeRef} />

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
      </div>
    </SideBarLayout>
  );
};

export default CrewEditLayout;
