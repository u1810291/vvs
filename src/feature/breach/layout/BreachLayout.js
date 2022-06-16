import React, {useState, useContext, useEffect, useCallback, useRef} from 'react';
import {Link} from 'react-router-dom';

import BreachForm from '../form/BreachFrom';
import Header from '../../../components/atom/Header';
import SidebarLayout from '../../../layout/sidebarLayout';
import Breadcrumbs from '../../../components/Breadcrumbs';

import useLanguage from '../../../hook/useLanguage';

function BreachLayout() {
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

export default BreachLayout;
