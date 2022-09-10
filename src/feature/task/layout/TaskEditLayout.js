import React from 'react';
import Breadcrumbs, {RouteAsBreadcrumb} from 'components/Breadcrumbs';
import Header from 'components/atom/Header';
import SideBarLayout from 'layout/SideBarLayout';
import {TaskListRoute} from '../routes';
import Button from 'components/Button';

import {useTranslation} from 'react-i18next';

import TaskEditForm from '../form/TaskEditForm';

const TaskEditLayout = () => {
  const {t} = useTranslation('task');

  return (
    <SideBarLayout>
      <div className='flex flex-col min-h-screen overflow-hidden'>
        <Header>
          <Breadcrumbs>
            <RouteAsBreadcrumb route={TaskListRoute} />
          </Breadcrumbs>
          <div className='space-x-4'>
            <Button.Dxl>
              {t`button.archive`}
            </Button.Dxl>
            <span className='text-slate-400 py-1 p-6'>
              {t`button.assignCrew`}
            </span>
          </div>
        </Header>
        <div className='flex flex-row w-full justify-between'>
          <TaskEditForm/>
        </div>
      </div>
    </SideBarLayout>
  );
}

export default TaskEditLayout;
