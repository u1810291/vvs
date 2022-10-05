import Breadcrumbs, {RouteAsBreadcrumb} from 'components/Breadcrumbs';
import Button from 'components/Button';
import Header from 'components/atom/Header';
import Nullable from 'components/atom/Nullable';
import {PermissionListRoute} from '../routes';
import SidebarLayout from 'layout/SideBarLayout';
import {flip, getProp, identity, isFunction} from 'crocks';
import {usePermission} from '../api';
import {useNavigate, useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import React, {useRef} from 'react';
import PermissionEditForm from '../form/PermissionEditForm';
import DynamicStatus from '../../../components/atom/Status';
import {useAuth} from '../../../context/auth';
import raw from 'raw.macro';

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

  const auth = useAuth();
  const _do = flip(auth.api)(raw('../api/graphql/UpdatePermissionById.graphql'));

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
                  <Button onClick={() => _do({id, status: 'REJECTED'}).fork(console.error, console.log)}>
                    {t`button.reject`}
                  </Button>
                  <Button onClick={() => _do({id, status: 'ALLOWED'}).fork(console.error, console.log)}>
                    {t`button.approve`}
                  </Button>
                </>
              ) : (
                <Button onClick={saveRef.current}>send</Button>
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
