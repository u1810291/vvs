import React from 'react';
import Breadcrumbs, {RouteAsBreadcrumb} from 'components/Breadcrumbs';
import Header from 'components/atom/Header';
import SideBarLayout from 'layout/SideBarLayout';
import {TaskListRoute} from '../routes';
import Button from 'components/Button';

import {useTranslation} from 'react-i18next';
// import {pipe} from 'crocks/helpers';
// import {chain, option} from 'crocks/pointfree';
// import {safe, getProp} from 'crocks';
// import {isArray, isObject} from 'crocks/predicates';
import {useTaskEdit} from '../api';

import TaskEditForm from '../form/TaskEditForm';
import {useParams} from 'react-router-dom';

const AlarmLayout = () => {
  const {id} = useParams();
  const {t} = useTranslation('task');

  const list = useTaskEdit({filters: {id}});

  console.log(id);
  // console.log(pipe(safe(isObject), chain(getProp('data')), chain(safe(isArray)), option([]))(list));
  
  console.log(list?.data);

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

export default AlarmLayout;
