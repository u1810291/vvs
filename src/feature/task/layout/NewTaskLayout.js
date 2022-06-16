import React, {useCallback} from 'react';
import {Link, useNavigate} from 'react-router-dom';

import NewTaskForm from '../form/newTaskForm';
import Header from '../../../components/atom/Header';
import Breadcrumbs from '../../../components/Breadcrumbs';
import SidebarLayout from '../../../layout/sidebarLayout';
import HeaderButtonGroup from '../../../components/headers/HeaderButtonGroup';

import useLanguage from '../../../hook/useLanguage';

const NewTaskLayout = () => {
  const {t} = useLanguage();
  const navigate = useNavigate();
  const onCancelButton = useCallback(() => {
    navigate('/tasks')
  }, []);
  const onSaveButton = useCallback(() => {

  }, []);

  return (
    <SidebarLayout>
      <div className='flex flex-col min-h-full'>
        <Header>
          <Breadcrumbs>
            <Breadcrumbs.Item><Link to={'/tasks'}>{t('eurocash.tasks')}</Link></Breadcrumbs.Item>
            <Breadcrumbs.Item><Link to={'/newTask'}>{t('eurocash.newTask')}</Link></Breadcrumbs.Item>
          </Breadcrumbs>
          <HeaderButtonGroup
            saveButtonText={'eurocash.createNewTask'}
            cancelButtonText={'eurocash.cancel'}
            onSaveButton={onSaveButton}
            onCancelButton={onCancelButton}
            twSaveButton={'text-white bg-slate-600'}
            twCancelButton={'mr-4 bg-gray-200 text-gray-500'}
          />
        </Header>
        <NewTaskForm />
      </div>
    </SidebarLayout>
  );
};

export default NewTaskLayout;
