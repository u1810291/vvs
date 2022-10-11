import Breadcrumbs, {RouteAsBreadcrumb} from 'components/Breadcrumbs';
import Button from 'components/Button';
import Header from 'components/atom/Header';
import React, {useMemo} from 'react';
import SideBarLayout from 'layout/SideBarLayout';
import TaskEditForm from '../form/TaskEditForm';
import TaskStatusTag from '../component/TaskStatusTag';
import useTask from '../api/useTask';
import {TaskListRoute} from '../routes';
import {getPropOr, identity, Result, pipe, tap, pathSatisfies, and, propEq} from 'crocks';
import {useNavigate, useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {errorToText} from 'api/buildApiHook';
import {useNotification} from 'feature/ui-notifications/context';
import ErrorNotification from 'feature/ui-notifications/components/ErrorNotification';
import SuccessNotification from 'feature/ui-notifications/components/SuccessNotification';
import {caseMap} from '@s-e/frontend/flow-control';
import {STATUS} from '../consts';
import raw from 'raw.macro';
import useSubscription from 'hook/useSubscription';

const TASK_GQL = raw('../api/graphql/SubscribeTaskById.graphql');

const TaskEditLayout = () => {
  const {t} = useTranslation('task');
  const {id} = useParams();
  const navigate = useNavigate();
  const {data: queryData, remove, update, mutate} = useTask({id});
  const {data: {events_by_pk: data} = {}} = useSubscription(TASK_GQL, useMemo(() => ({id}), [id]));
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

  console.log(queryData);

  const allowToReturn = () => {
    update(Result.of({id, crew_id: data?.crew?.id, status: 'FINISHED'})).fork(
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
      <div className='flex flex-col h-screen overflow-hidden'>
        <Header>
          <Breadcrumbs>
            <RouteAsBreadcrumb route={TaskListRoute} />
            <Breadcrumbs.Item hideSlash>
              <span>{getPropOr(t`edit.untitledTask`, 'name', data)}</span>
              <TaskStatusTag.Lg className='ml-4 uppercase' {...data}/>
            </Breadcrumbs.Item>
          </Breadcrumbs>
          {
            caseMap(
              () => (
                <div className='space-x-4'> 
                  <Button.Dxl onClick={archive}>{t`button.cancel`}</Button.Dxl>
                  <span className='text-slate-400 py-1 p-6'>{t`button.assignCrew`}</span>
                </div>
              ),
              [
                [
                  and(propEq('status', STATUS.INSPECTION_DONE), pathSatisfies(['crew', 'id'])),
                  () => (
                    <div className='space-x-4'> 
                      <Button.Pxl onClick={allowToReturn}>{t`button.allowToReturn`}</Button.Pxl>
                    </div>
                  )
                ],
                [propEq('status', STATUS.FINISHED), () => null],
              ],
              data
            )
          }
        </Header>
        <div className='flex flex-row w-full justify-between h-full overflow-hidden'>
          <TaskEditForm taskQuery={queryData} task={data} />
        </div>
      </div>
    </SideBarLayout>
  );
}

export default TaskEditLayout;
