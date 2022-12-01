import Breadcrumbs from 'components/Breadcrumbs';
import Button from 'components/Button';
import Header from 'components/atom/Header';
import Nullable from 'components/atom/Nullable';
import ObjectEditForm from '../form/ObjectEditForm';
import SidebarLayout from 'layout/SideBarLayout';
import {Maybe, getProp, identity, isFunction, safe, flip} from 'crocks';
import {NavLink, useNavigate, useParams} from 'react-router-dom';
import {ObjectListRoute} from '../routes';
import {hasLength} from '@s-e/frontend/pred';
import {useObject} from '../api';
import {useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {useNotification} from 'feature/ui-notifications/context';
import {useAuth} from 'context/auth';
import raw from 'raw.macro';
import {CheckCircleIcon, XCircleIcon} from '@heroicons/react/solid';
import NotificationSimple, {NOTIFICATION_ICON_CLASS_NAME} from 'feature/ui-notifications/components/NotificationSimple';

const ObjectEditLayout = () => {
  const saveRef = useRef(identity);
  const {id} = useParams();
  const {data} = useObject({id});
  const {t} = useTranslation('object', {keyPrefix: 'edit'});
  const {t: tglobal} = useTranslation();
  const nav = useNavigate();
  const {notify} = useNotification();

  const send = () => {
    isFunction(saveRef.current) && saveRef.current();
  };
  
  const auth = useAuth();
  const _archive = flip(auth.api)(raw('../api/graphql/ArchiveById.graphql'));

  // archive
  const archive = () => {
    // if (!confirm('Are you sure you want to archive the object?')) return;

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
      
      nav(ObjectListRoute.props.path);
    })
  }

  // unarchive
  const unarchive = () => {
    // if (!confirm('Are you sure you want to restore the object?')) return;

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
      
      nav(ObjectListRoute.props.path);
    })
  }

  const breadcrumb = (
    getProp('name', data)
    .chain(safe(hasLength))
    .alt(getProp('id', data).chain(safe(hasLength)))
    .alt(Maybe.Just(t('new')))
    .option(null)
  );

  return (
    <SidebarLayout>
      <Header>
        <>
          <Breadcrumbs>
            <Breadcrumbs.Item>
              <NavLink to={ObjectListRoute.props.path}>
                {tglobal(ObjectListRoute.props.translationKey, {ns: ObjectListRoute.props.translationNs})}
              </NavLink>
            </Breadcrumbs.Item>
            <Nullable on={breadcrumb}>
              <Breadcrumbs.Item hideSlash>
                <span className='font-semibold'>{breadcrumb}</span>
              </Breadcrumbs.Item>
            </Nullable>
          </Breadcrumbs>
          <div className='space-x-4'>
            <Button.Nd onClick={() => nav(ObjectListRoute.props.path)}>{t`cancel`}</Button.Nd>
            <Button onClick={send}>{t`save`}</Button>
          </div>
        </>
      </Header>

      <ObjectEditForm saveRef={saveRef}/>

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

export default ObjectEditLayout;
