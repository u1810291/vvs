import React from 'react';
import {Link} from 'react-router-dom';

import BreachForm from '../form/BreachEditFrom';
import Header from '../../../components/atom/Header';
import SidebarLayout from '../../../layout/SideBarLayout';
import Breadcrumbs from '../../../components/Breadcrumbs';

import useLanguage from '../../../hook/useLanguage';

function BreachEditLayout() {
  const {t} = useLanguage();
  return (
    <SidebarLayout>
      <Header>
        <Breadcrumbs>
          <Breadcrumbs.Item><Link to={'/breaches'}>{t('breach.breaches')}</Link></Breadcrumbs.Item>
          <Breadcrumbs.Item><Link to={'/breach'}>{t('breach.breach')}</Link></Breadcrumbs.Item>
        </Breadcrumbs>
      </Header>
      <BreachForm />
    </SidebarLayout>
  );
}

export default BreachEditLayout;
