import Breadcrumbs, {RouteAsBreadcrumb} from 'components/Breadcrumbs';
import Button from 'components/Button';
import Header from 'components/atom/Header';
import Nullable from 'components/atom/Nullable';
import {PermissionListRoute} from '../routes';
import SidebarLayout from 'layout/SideBarLayout';
import {getProp, identity, isFunction} from 'crocks';
import {asyncUpdatePermissionRequestById, usePermission} from '../api';
import {useNavigate, useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import React, {useRef} from 'react';
import PermissionEditForm from '../form/PermissionEditForm';
import DynamicStatus from '../../crew/component/CrewStatus';
import {useAuth} from '../../../context/auth';
import useAsync from '../../../hook/useAsync';

const PermissionEditLayout = () => {
  const saveRef = useRef(identity);
  const {id} = useParams();
  const {data} = usePermission({id});

  const {token} = useAuth();

  const {t} = useTranslation('permission', {keyPrefix: 'edit'});
  const nav = useNavigate();
  const send = () => {
    isFunction(saveRef.current) && saveRef.current();
  };

  const breadcrumb = (
    getProp('crew_id', data)
    .alt(getProp('id', data))
    .option(null)
  );

  const status = (
    getProp('status', data)
      .option(null)
  );

  // NOTE: Temporary solution on how to allow and reject permission requests
  const [responseRejectPermissionRequest, forkRejectPermissionRequest] = useAsync(
    asyncUpdatePermissionRequestById({token: `Bearer ${token}`, id, status: 'REJECTED'}),
    identity
  );
  const [responseApprovePermissionRequest, forkApprovePermissionRequest] = useAsync(
    asyncUpdatePermissionRequestById({token: `Bearer ${token}`, id, status: 'ALLOWED'}),
    identity
  );

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
            <Button.Dxl onClick={forkRejectPermissionRequest}>
              {t`button.reject`}
            </Button.Dxl>
            <Button.Pxl onClick={forkApprovePermissionRequest}>
              {t`button.approve`}
            </Button.Pxl>
          </div>
        </>
      </Header>
      <PermissionEditForm saveRef={saveRef}/>
    </SidebarLayout>
  );
};

export default PermissionEditLayout;
