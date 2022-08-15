import React, {useRef} from 'react';

import {useTranslation} from 'react-i18next';
import {useNavigate, useParams} from 'react-router-dom';

import SideBarLayout from 'layout/SideBarLayout';

import Button from 'components/Button';
import Header from 'components/atom/Header';
import Nullable from 'components/atom/Nullable';
import Breadcrumbs, {RouteAsBreadcrumb} from 'components/Breadcrumbs';

import {DislocationListRoute} from 'feature/dislocation/routes';
import {useDisclocation} from 'feature/dislocation/api/dislocationEditApi';
import DislocationEditForm from 'feature/dislocation/form/DislocationEditForm';

import {getProp, identity, isFunction} from 'crocks';

const DislocationEditLayout = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const saveRef = useRef(identity);
  const removeRef = useRef(identity);
  const {data} = useDisclocation({id});
  const {t} = useTranslation('dislocation', {keyPrefix: 'edit.header'});

  const breadcrumb = (
    getProp('name', data)
      .alt(getProp('id', data))
      .option(null)
  );

  const send = () => isFunction(saveRef.current) && saveRef.current();

  return (
    <SideBarLayout>
      <div className='flex flex-col min-h-full'>
        <Header>
          <Breadcrumbs>
            <RouteAsBreadcrumb route={DislocationListRoute} />
            <Nullable on={breadcrumb}>
              <Breadcrumbs.Item>
                <span className='font-semibold'>{breadcrumb}</span>
              </Breadcrumbs.Item>
            </Nullable>
          </Breadcrumbs>
          <div className='space-x-4'>
            <Button.Sxl onClick={() => navigate(DislocationListRoute.props.path)}>
              {t`button.cancel`}
            </Button.Sxl>
            <Button.Pxl onClick={send}>
              {t`button.save`}
            </Button.Pxl>
          </div>
        </Header>
        <DislocationEditForm saveRef={saveRef} removeRef={removeRef} />
      </div>
    </SideBarLayout>
  );
};

export default DislocationEditLayout;
