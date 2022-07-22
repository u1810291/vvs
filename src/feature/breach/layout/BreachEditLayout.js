import React from 'react';
import {useParams} from 'react-router-dom';

import Header from 'components/atom/Header';
import Nullable from 'components/atom/Nullable';
import Breadcrumbs, {RouteAsBreadcrumb} from 'components/Breadcrumbs';

import SidebarLayout from 'layout/SideBarLayout';

import {BreachListRoute} from 'feature/breach/routes';
import {useBreach} from 'feature/breach/api/breachEditApi';
import BreachEditForm from 'feature/breach/form/BreachEditFrom';

import useLanguage from 'hook/useLanguage';

import {getProp} from 'crocks';

function BreachEditLayout() {
  const {t} = useLanguage();
  const {id} = useParams();
  const {data} = useBreach(id);
  const breadcrumb = (getProp('id', data).option(null));

  return (
    <SidebarLayout>
      <div className={'flex flex-col min-h-full'}>
        <Header>
          <Breadcrumbs>
            <RouteAsBreadcrumb route={BreachListRoute} />
            <Nullable on={breadcrumb}>
              <Breadcrumbs.Item>
                <span className={'font-semibold'}>{breadcrumb}</span>
              </Breadcrumbs.Item>
            </Nullable>
          </Breadcrumbs>
        </Header>
        <BreachEditForm />
      </div>
    </SidebarLayout>
  );
}

export default BreachEditLayout;
