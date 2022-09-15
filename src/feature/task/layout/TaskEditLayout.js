import Breadcrumbs, {RouteAsBreadcrumb} from 'components/Breadcrumbs';
import Button from 'components/Button';
import Header from 'components/atom/Header';
import React from 'react';
import SideBarLayout from 'layout/SideBarLayout';
import TaskEditForm from '../form/TaskEditForm';
import TaskStatusTag from '../component/TaskStatusTag';
import {useTaskEdit} from '../api';
import useTask from '../api/useTask';
import {TaskListRoute} from '../routes';
import {getPropOr} from 'crocks';
import {useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';


const TaskEditLayout = () => {
  const {t} = useTranslation('task');
  const {id} = useParams();
  const {data} = useTask({id});
  const list = useTaskEdit({filters: {id}});

  console.log('data1: ', list.data)

  return (
    <SideBarLayout>
      <div className='flex flex-col min-h-screen overflow-hidden'>
        <Header>
          <Breadcrumbs>
            <RouteAsBreadcrumb route={TaskListRoute} />
            <Breadcrumbs.Item hideSlash>
              <span>{getPropOr(t`edit.untitledTask`, 'name', data)}</span>
              <TaskStatusTag.Lg className='ml-4 uppercase' {...data}/>
            </Breadcrumbs.Item>
          </Breadcrumbs>
          <div className='space-x-4'>
            <Button.Dxl>{t`button.archive`}</Button.Dxl>
            <span className='text-slate-400 py-1 p-6'>{t`button.assignCrew`}</span>
          </div>
        </Header>
        <div className='flex flex-row w-full justify-between'>
          {list?.data ?
              <TaskEditForm data={list?.data}/>
            : null}
        </div>
      </div>
    </SideBarLayout>
  );
}

export default TaskEditLayout;
