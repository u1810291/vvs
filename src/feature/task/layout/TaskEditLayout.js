import Breadcrumbs, {RouteAsBreadcrumb} from 'components/Breadcrumbs';
import Button from 'components/Button';
import Header from 'components/atom/Header';
import React from 'react';
import SideBarLayout from 'layout/SideBarLayout';
import TaskEditForm from '../form/TaskEditForm';
import TaskStatusTag from '../component/TaskStatusTag';
import useTask from '../api/useTask';
import {TaskListRoute} from '../routes';
import {getPropOr, identity, Result, pipe, tap,} from 'crocks';
import {useNavigate, useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {errorToText} from 'api/buildApiHook';
import {useNotification} from 'feature/ui-notifications/context';
import ErrorNotification from 'feature/ui-notifications/components/ErrorNotification';
import SuccessNotification from 'feature/ui-notifications/components/SuccessNotification';


const TaskEditLayout = () => {
  const {t} = useTranslation('task');
  const {id} = useParams();
  const navigate = useNavigate();
  const {data, remove} = useTask({id});
  const {notify} = useNotification();

  const archive = () => {
    remove(Result.of({id})).fork(
      e => notify(
        <ErrorNotification>
          {errorToText(identity, e)}
        </ErrorNotification>
      ),
      pipe(
        tap(() => notify(<SuccessNotification />)),
        tap(() => navigate(TaskListRoute.props.path)),
      )
    )
  };

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
            <Button.Dxl onClick={archive}>{t`button.archive`}</Button.Dxl>
            <span className='text-slate-400 py-1 p-6'>{t`button.assignCrew`}</span>
          </div>
        </Header>
        <div className='flex flex-row w-full justify-between'>
          <TaskEditForm />
        </div>
      </div>
    </SideBarLayout>
  );
}

export default TaskEditLayout;
