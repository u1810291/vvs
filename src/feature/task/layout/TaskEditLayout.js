import Breadcrumbs, {RouteAsBreadcrumb} from 'components/Breadcrumbs';
import Button from 'components/Button';
import Header from 'components/atom/Header';
import React, {useMemo} from 'react';
import SideBarLayout from 'layout/SideBarLayout';
import TaskEditForm from '../form/TaskEditForm';
import TaskStatusTag from '../component/TaskStatusTag';
import useTask from '../api/useTask';
import {TaskListRoute} from '../routes';
import {flip, getPath, map, chain, getPropOr, identity, Result, pipe, tap, pathSatisfies, and, propEq, objOf} from 'crocks';
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
import {useAuth} from 'context/auth';
import maybeToAsync from 'crocks/Async/maybeToAsync';

const TASK_GQL = raw('../api/graphql/SubscribeTaskById.graphql');
const UPDATE_CREW_STATUS = `
  mutation ($crewId: uuid!) {
    update_crew_by_pk (pk_columns: {id: $crewId}, _set: {status: DRIVE_BACK}) {
      id
    }
  }
`;

const TaskEditLayout = () => {
  const {t} = useTranslation('task');
  const {id} = useParams();
  const navigate = useNavigate();
  const {data: queryData, remove, update, mutate} = useTask({id});
  const {data: {events_by_pk: data} = {}} = useSubscription(TASK_GQL, useMemo(() => ({id}), [id]));
  const {notify} = useNotification();
  const {api} = useAuth();

  const archive = () => {
    remove(Result.of({id})).fork(
      e => notify(
        <ErrorNotification>
          {errorToText(identity, e)}
        </ErrorNotification>
      ),
      pipe(
        tap(() => notify(<SuccessNotification />)),
        tap(() => navigate(-1)),
        tap(() => {
          pipe(
            getPath(['crew', 'id']),
            map(objOf('crewId')),
            maybeToAsync('unable to retrieve'),
            chain(flip(api)(UPDATE_CREW_STATUS))
          )(data).fork(
            // e => notify(
            //   <ErrorNotification>
            //     {errorToText(identity, e)}
            //   </ErrorNotification>
            // ),
            identity,
            identity,
          )
        })
      )
    )
  };

  const updateStatus = (status) => {
    if (!confirm(t('Are you sure you want to perform this task?'))) return;

    update(Result.of({id, crew_id: data?.crew?.id, status: status})).fork(
      e => notify(
        <ErrorNotification>
          {errorToText(identity, e)}
        </ErrorNotification>
      ),
      pipe(
        tap(() => notify(<SuccessNotification />)),
      )
    )
  }

  const allowToReturn = () => {
    update(Result.of({id, crew_id: data?.crew?.id, status: 'FINISHED'})).fork(
      e => notify(
        <ErrorNotification>
          {errorToText(identity, e)}
        </ErrorNotification>
      ),
      pipe(
        tap(() => notify(<SuccessNotification />)),
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
                  <Button.NoBg className='text-slate-400 py-1 p-6'>{t`button.assignCrew`}</Button.NoBg>
                </div>
              ),
              [
                [
                  and(propEq('status', STATUS.WAIT_FOR_APPROVAL), pathSatisfies(['crew', 'id'])),
                  () => (
                    <div className='space-x-4'> 
                      <Button.Dxl onClick={archive}>{t`button.cancel`}</Button.Dxl>
                      <Button.NoBg onClick={() => updateStatus('ON_THE_ROAD')} className='text-slate-400 py-1 p-6'>{t`button.waiting_for_approval`}</Button.NoBg>
                    </div>
                  )
                ],
                [
                  and(propEq('status', STATUS.ON_THE_ROAD), pathSatisfies(['crew', 'id'])),
                  () => (
                    <div className='space-x-4'> 
                      <Button.Dxl onClick={archive}>{t`button.cancel`}</Button.Dxl>
                      <Button.NoBg onClick={() => updateStatus('INSPECTION')} className='text-slate-400 py-1 p-6'>{t`button.crew_on_the_way`}</Button.NoBg>
                    </div>
                  )
                ],
                [
                  and(propEq('status', STATUS.INSPECTION), pathSatisfies(['crew', 'id'])),
                  () => (
                    <div className='space-x-4'> 
                      <Button.Dxl onClick={archive}>{t`button.cancel`}</Button.Dxl>
                      <Button.NoBg onClick={() => updateStatus('INSPECTION_DONE')} className='text-slate-400 py-1 p-6'>{t`button.crew_is_inspecting_the_facility`}</Button.NoBg>
                    </div>
                  )
                ],
                [
                  and(propEq('status', STATUS.INSPECTION_DONE), pathSatisfies(['crew', 'id'])),
                  () => (
                    <div className='space-x-4'> 
                      <Button.Pxl onClick={allowToReturn}>{t`button.allowToReturn`}</Button.Pxl>
                    </div>
                  )
                ],
                [propEq('status', STATUS.FINISHED), () => null],
                [propEq('status', STATUS.CANCELLED), () => null],
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
