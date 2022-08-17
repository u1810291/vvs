import Breadcrumbs, {RouteAsBreadcrumb} from 'components/Breadcrumbs';
import Button from 'components/Button';
import Header from 'components/atom/Header';
import Nullable from 'components/atom/Nullable';
import {DriverListRoute} from '../routes';
import SidebarLayout from 'layout/SideBarLayout';
import {useNavigate, useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {useRef} from 'react';
import DriverRoute from '../routes';
import DriverEditForm from '../form/DriverEditForm';
import useDriver from 'feature/driver/api/useDriver';
import {getProp, hasProps, identity, isFunction, safe, not, isEmpty} from 'crocks';
import {useNotification} from 'feature/ui-notifications/context';

const DriverEditLayout = () => {
  const saveRef = useRef(identity);
  const {id} = useParams();
  const {data, error} = useDriver({id});
  const {t} = useTranslation('object', {keyPrefix: 'edit'});
  const nav = useNavigate();
  const {notify} = useNotification();

  const breadcrumb = (
    getProp('fullName', data).chain(safe(not(isEmpty)))
    .alt((
      safe(hasProps(['firstName', 'middleName', 'lastName']), data)
      .map(({firstName, middleName, lastName}) => `${firstName} ${middleName} ${lastName}`)
      .chain(safe(not(isEmpty)))
    ))
    .alt((
      safe(hasProps(['firstName', 'lastName']), data)
      .map(({firstName, lastName}) => `${firstName} ${lastName}`)
      .chain(safe(not(isEmpty)))
    ))
    .alt(getProp('firstName', data).chain(safe(not(isEmpty))))
    .alt(getProp('lastName', data).chain(safe(not(isEmpty))))
    .alt(getProp('id', data).chain(safe(not(isEmpty))))
    .option(null)
  );

  return (
    <SidebarLayout>
      <Header>
        <>
          <Breadcrumbs>
            <RouteAsBreadcrumb route={DriverRoute}/>
            <Nullable on={breadcrumb}>
              <Breadcrumbs.Item>
                <span className='font-semibold'>{breadcrumb}</span>
              </Breadcrumbs.Item>
            </Nullable>
          </Breadcrumbs>
          <div className='space-x-4'>
            <Button.Nd onClick={() => nav(DriverListRoute.props.path)}>{t`cancel`}</Button.Nd>
            <Button onClick={() => isFunction(saveRef.current) && saveRef.current()}>{t`save`}</Button>
          </div>
        </>
      </Header>
      <DriverEditForm saveRef={saveRef}/>
    </SidebarLayout>
  )
};

export default DriverEditLayout;
