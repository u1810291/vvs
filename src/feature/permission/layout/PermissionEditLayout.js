import Breadcrumbs, {RouteAsBreadcrumb} from 'components/Breadcrumbs';
import Button from 'components/Button';
import Header from 'components/atom/Header';
import Nullable from 'components/atom/Nullable';
import {PermissionListRoute} from '../routes';
import SidebarLayout from 'layout/SideBarLayout';
import {getProp, identity, isFunction} from 'crocks';
import {usePermission} from '../api';
import {useNavigate, useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {useRef} from 'react';
import PermissionEditForm from '../form/PermissionEditForm';

const PermissionEditLayout = () => {
  const saveRef = useRef(identity);
  const {id} = useParams();
  const {data} = usePermission({id});
  
  console.log(id, data);
  
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
            </Nullable>
          </Breadcrumbs>
          <div className='space-x-4'>
            <Button.Nd onClick={() => nav(PermissionListRoute.props.path)}>{t`cancel`}</Button.Nd>
            <Button onClick={send}>{t`save`}</Button>
          </div>
        </>
      </Header>
      <PermissionEditForm saveRef={saveRef}/>
    </SidebarLayout>
  )
};

export default PermissionEditLayout;
