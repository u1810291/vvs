import Breadcrumbs, {RouteAsBreadcrumb} from 'components/Breadcrumbs';
import Button from 'components/Button';
import DynamicStatus from '../../../components/atom/Status';
import ErrorNotification from 'feature/ui-notifications/components/ErrorNotification';
import Header from 'components/atom/Header';
import Nullable from 'components/atom/Nullable';
import PermissionEditForm from '../form/PermissionEditForm';
import React, {useMemo, useRef} from 'react';
import SidebarLayout from 'layout/SideBarLayout';
import SuccessNotification from 'feature/ui-notifications/components/SuccessNotification';
import raw from 'raw.macro';
import {PermissionListRoute} from '../routes';
import {errorToText} from 'api/buildApiHook';
import {getProp, identity, isFunction, pipe, tap} from 'crocks';
import {useAuth} from '../../../context/auth';
import {useNavigate, useParams} from 'react-router-dom';
import {useNotification} from 'feature/ui-notifications/context';
import {usePermission} from '../api';
import {useTranslation} from 'react-i18next';

const PermissionEditLayout = () => {
  const saveRef = useRef(identity);
  const {id} = useParams();
  const {data} = usePermission({id});
  const {t} = useTranslation('permission', {keyPrefix: 'edit'});
  const send = () => {
    isFunction(saveRef.current) && saveRef.current();
  };

  const breadcrumb = (
    getProp('crew_id', data)
    .alt(getProp('id', data))
    .option(null)
  );

  const {notify} = useNotification();
  const navigate = useNavigate();
  const status = getProp('status', data).option(null);
  const {api} = useAuth();
  const update = useMemo(() => status => () => (
    api({id, status}, raw('../api/graphql/UpdatePermissionStatusById.graphql')).fork(
      error => notify(
        <ErrorNotification>
          {errorToText(identity, error)}
        </ErrorNotification>
      ),
      pipe(
        () => notify(<SuccessNotification/>),
        tap(() => navigate(PermissionListRoute.props.path)),
      ),
    )
  ), [notify, api, navigate]);

  return (
    <SidebarLayout>
      <Header>
        <>
          <Breadcrumbs>
            <RouteAsBreadcrumb route={PermissionListRoute}/>
            <Nullable on={breadcrumb}>
              <Breadcrumbs.Item>
                <span className='font-semibold'>{breadcrumb}</span>
              </Breadcrumbs.Item>
              <Nullable on={status}>
                <DynamicStatus
                  className='w-full px-2 text-xl items-center font-thin uppercase'
                  status={status}
                  t={'permission'}
                />
              </Nullable>
            </Nullable>
          </Breadcrumbs>
          <div className='space-x-4'>
            {
              id ? (
                <>
                  <Button onClick={update('REJECTED')}>{t`button.reject`}</Button>
                  <Button onClick={update('ALLOWED')}>{t`button.approve`}</Button>
                </>
              ) : (
                <Button onClick={send}>send</Button>
              )
            }
          </div>
        </>
      </Header>
      <PermissionEditForm saveRef={saveRef}/>
    </SidebarLayout>
  );
};

export default PermissionEditLayout;
