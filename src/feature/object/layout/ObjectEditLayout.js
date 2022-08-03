import Breadcrumbs, {RouteAsBreadcrumb} from 'components/Breadcrumbs';
import Button from 'components/Button';
import Header from 'components/atom/Header';
import Nullable from 'components/atom/Nullable';
import ObjectEditForm from '../form/ObjectEditForm';
import ObjectRoute from '../routes';
import SidebarLayout from 'layout/SideBarLayout';
import {getProp, identity, isFunction} from 'crocks';
import {useObject} from '../api';
import {useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {useRef} from 'react';

const ObjectEditLayout = () => {
  const saveRef = useRef(identity);
  const params = useParams();
  const {data} = useObject(params?.id);
  const {t} = useTranslation('object', {keyPrefix: 'edit'});

  const send = () => {
    isFunction(saveRef.current) && saveRef.current();
  };

  const breadcrumb = (
    getProp('name', data)
    .alt(getProp('id', data))
    .option(null)
  );

  return (
    <SidebarLayout>
      <Header>
        <>
          <Breadcrumbs>
            <RouteAsBreadcrumb route={ObjectRoute}/>
            <Nullable on={breadcrumb}>
              <Breadcrumbs.Item>
                <span className='font-semibold'>{breadcrumb}</span>
              </Breadcrumbs.Item>
            </Nullable>
          </Breadcrumbs>
          <div className='space-x-4'>
            <Button.Nd>{t`cancel`}</Button.Nd>
            <Button onClick={send}>{t`save`}</Button>
          </div>
        </>
      </Header>
      <ObjectEditForm saveRef={saveRef}/>
    </SidebarLayout>
  )
};

export default ObjectEditLayout;
