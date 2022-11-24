import Breadcrumbs, {RouteAsBreadcrumb} from 'components/Breadcrumbs';
import Button from 'components/Button';
import DynamicStatus from '../../../components/atom/Status';
import ErrorNotification from 'feature/ui-notifications/components/ErrorNotification';
import Header from 'components/atom/Header';
import Nullable from 'components/atom/Nullable';
import PermissionEditForm from '../form/PermissionEditForm';
import React, {useMemo} from 'react';
import SidebarLayout from 'layout/SideBarLayout';
import SuccessNotification from 'feature/ui-notifications/components/SuccessNotification';
import raw from 'raw.macro';
import {PermissionListRoute} from '../routes';
import {errorToText} from 'api/buildApiHook';
import {getProp, identity, isFunction, isSame, pipe, tap, getPath} from 'crocks';
import {useAuth} from '../../../context/auth';
import {useNavigate, useParams} from 'react-router-dom';
import {useNotification} from 'feature/ui-notifications/context';
import {usePermission} from '../api';
import {useTranslation} from 'react-i18next';
import {permissionStatus} from 'constants/statuses';


const PermissionEditLayout = () => {
  const {id} = useParams();
  const {data} = usePermission({id});
  const {t} = useTranslation('permission', {keyPrefix: 'edit'});
  const send = () => {
    isFunction(saveRef.current) && saveRef.current();
  };

  const breadcrumb = (
    getPath(['request', 'value'], data)
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
              <Breadcrumbs.Item hideSlash>
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
                  <Nullable on={isSame(data?.status, permissionStatus.PERMISSION_ASKED)}>
                    <Button className='bg-red-700 w-40 hover:bg-red-800' onClick={update('PREREJECTED')}>{t`button.reject`}</Button>
                  </Nullable>

                  <Nullable on={isSame(data?.status, permissionStatus.PERMISSION_ALLOWED)}>
                    <Button className='bg-red-700 w-40 hover:bg-red-800' onClick={update('CANCELLED')}>{t`button.reject`}</Button>
                  </Nullable>

                  <Nullable on={isSame(data?.status, permissionStatus.PERMISSION_ASKED)}>
                    <Button className='w-40' onClick={update('ALLOWED')}>{t`button.approve`}</Button>
                  </Nullable>
                </>
              ) : (
                <Button onClick={send}>send</Button>
              )
            }
          </div>
        </>
      </Header>
      <PermissionEditForm />
    </SidebarLayout>
  );
};

export default PermissionEditLayout;
