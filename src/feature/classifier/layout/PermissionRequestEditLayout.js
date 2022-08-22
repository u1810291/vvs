import Breadcrumbs from 'components/Breadcrumbs';
import Button from 'components/Button';
import Header from 'components/atom/Header';
import Nullable from 'components/atom/Nullable';
import {PermissionRequestListRoute} from '../routes';
import SidebarLayout from 'layout/SideBarLayout';
import {getProp, identity, isFunction} from 'crocks';
import {useCrewRequestFull} from '../api';
import {useNavigate, useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {useRef} from 'react';
import PermissionRequestEditForm from '../form/PermissionRequestEditForm';
import {Link} from 'react-router-dom';




const PermissionEditLayout = () => {
  const saveRef = useRef(identity);
  const removeRef = useRef(identity);
  const {id} = useParams();
  const {data} = useCrewRequestFull({id});
  const {t} = useTranslation('permission', {keyPrefix: 'edit'});
  const nav = useNavigate();

  const send = () => {
    isFunction(saveRef.current) && saveRef.current();
  };

  const remove = () => {
    if (!confirm('Are you sure you want to delete?')) return;
    isFunction(removeRef.current) && removeRef.current([{id}]);
  };

  const breadcrumb = (
    getProp('value', data)
    .alt(getProp('id', data))
    .option(t('new'))
  );

  return (
    <SidebarLayout>
      <Header>
        <>
          <Breadcrumbs>
            {/* <RouteAsBreadcrumb route={PermissionRequestListRoute}/> */}
            <Breadcrumbs.Item>
              <Link to={PermissionRequestListRoute.props.path}>
                {t('classifiers')}
              </Link>
            </Breadcrumbs.Item>
            <Nullable on={breadcrumb}>
              <Breadcrumbs.Item>
                <span className='font-semibold'>{breadcrumb}</span>
              </Breadcrumbs.Item>
            </Nullable>
          </Breadcrumbs>
          <div className='space-x-4'>
            <Button.Nd onClick={() => nav(PermissionRequestListRoute.props.path)}>{t`cancel`}</Button.Nd>
            <Button onClick={send}>{t`save`}</Button>
          </div>
        </>
      </Header>
      <div className='flex-1 flex-grow h-max'>
        <PermissionRequestEditForm saveRef={saveRef} removeRef={removeRef}/>
      </div>
      
      <Nullable on={id}>
        <section className={'flex p-6'}>
          <Button.NoBg onClick={remove} className={'bg-red-500 text-white w-min'}>{t`delete`}</Button.NoBg>
        </section>
      </Nullable>

    </SidebarLayout>
  )
};

export default PermissionEditLayout;
