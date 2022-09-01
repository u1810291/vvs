import Breadcrumbs, {RouteAsBreadcrumb} from 'components/Breadcrumbs';
import Button from 'components/Button';
import Header from 'components/atom/Header';
import Nullable from 'components/atom/Nullable';
import DriverRoute, {DriverListRoute} from '../routes';
import SidebarLayout from 'layout/SideBarLayout';
import {useNavigate, useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {useRef} from 'react';
import DriverEditForm from '../form/DriverEditForm';
import useDriver from 'feature/driver/api/useDriver';
import {identity, isFunction, Maybe} from 'crocks';
import {titleCase} from '@s-e/frontend/transformer/string';
import DriverOnlineTag from '../component/DriverOnlineTag';
import {getName} from 'feature/user/utils';

const DriverEditLayout = () => {
  const saveRef = useRef(identity);
  const {id} = useParams();
  const {data} = useDriver({id});
  const {t} = useTranslation('driver', {keyPrefix: 'edit'});
  const nav = useNavigate();

  const breadcrumb = (
    getName(data)
    .alt(Maybe.Just(t`newDriver`).map(titleCase))
    .option(null)
  );

  return (
    <SidebarLayout>
      <Header>
        <>
          <Breadcrumbs>
            <RouteAsBreadcrumb route={DriverRoute}/>
            <Nullable on={breadcrumb}>
              <Breadcrumbs.Item hasSlash={false}>
                <span className='font-semibold'>{breadcrumb}</span>
              </Breadcrumbs.Item>
            </Nullable>
            <Breadcrumbs.Item hasSlash={false}>
              <DriverOnlineTag {...data} />
            </Breadcrumbs.Item>
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
