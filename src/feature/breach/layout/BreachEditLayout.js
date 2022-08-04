import React from 'react';
import {useParams} from 'react-router-dom';

import Header from 'components/atom/Header';
import Nullable from 'components/atom/Nullable';
import Breadcrumbs, {RouteAsBreadcrumb} from 'components/Breadcrumbs';

import SidebarLayout from 'layout/SideBarLayout';

import {BreachListRoute} from 'feature/breach/routes';
import BreachEditForm from 'feature/breach/form/BreachEditFrom';

function BreachEditLayout() {
  const {id: breachId} = useParams();
  return (
    <SidebarLayout>
      <div className={'flex flex-col min-h-full'}>
        <Header>
          <Breadcrumbs>
            <RouteAsBreadcrumb route={BreachListRoute} />
            <Nullable on={breachId}>
              <Breadcrumbs.Item>
                <span className={'font-semibold'}>{breachId}</span>
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
