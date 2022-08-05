import Breadcrumbs, {RouteAsBreadcrumb} from 'components/Breadcrumbs';
import Button from 'components/Button';
import Header from 'components/atom/Header';
import Nullable from 'components/atom/Nullable';
import {PermissionListRoute} from '../routes';
import SidebarLayout from 'layout/SideBarLayout';
import {getProp, identity, isFunction} from 'crocks';
import {useCrewRequestFull} from '../api';
import {useNavigate, useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {useRef} from 'react';
import PermissionRoute from '../routes';
import PermissionRequestEditForm from '../form/PermissionRequestEditForm';

const PermissionEditLayout = () => {
  const saveRef = useRef(identity);
  const {id} = useParams();
  const {data} = useCrewRequestFull({id});
  const {t} = useTranslation('permission', {keyPrefix: 'edit'});
  const nav = useNavigate();

  const send = () => {
    isFunction(saveRef.current) && saveRef.current();
  };

  const breadcrumb = (
    getProp('value', data)
    .alt(getProp('id', data))
    .option(null)
  );

  return (
    <SidebarLayout>
      <Header>
        <>
          <Breadcrumbs>
            <RouteAsBreadcrumb route={PermissionRoute}/>
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
      <PermissionRequestEditForm saveRef={saveRef}/>
    </SidebarLayout>
  )
};

export default PermissionEditLayout;
