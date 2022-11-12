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

  const downloadOfficialReport = () => {
    console.log(queryData);
  }

  const downloadIncidentReport = () => {

  }

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
                      <Button.NoBg onClick={() => downloadOfficialReport()}>
                        <svg className='mr-2' width='20' height='24' viewBox='0 0 20 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                          <path d='M1.74362 0V12.985H0V19.8233H4.89527e-05L1.74323 21.5665L1.74362 24H19.8672V5.01659L14.8506 0H1.74362ZM17.3194 19.0733H0.749976V13.735H17.3194V19.0733ZM15.2245 1.81038L18.0563 4.6416H15.2245V1.81038Z' fill='#D7DEE6'/>
                          <path d='M6.39819 14.5308H6.21437H4.72681V18.2222H5.42736V17.0298H6.25242L6.41464 17.0269C6.91928 17.0269 7.25474 16.9456 7.42063 16.7837C7.58653 16.6211 7.6693 16.2929 7.6693 15.7985C7.6693 15.3012 7.58251 14.9651 7.40854 14.7915C7.23461 14.6172 6.89768 14.5308 6.39819 14.5308ZM6.8296 16.3303C6.74388 16.4035 6.54248 16.4402 6.22534 16.4402H5.42736V15.1204H6.29567C6.59489 15.1204 6.78018 15.1577 6.8512 15.2324C6.92261 15.3071 6.95812 15.5005 6.95812 15.8125C6.95812 16.0849 6.91526 16.257 6.8296 16.3303Z' fill='#D7DEE6'/>
                          <path d='M9.93066 14.5308H8.11572V18.2222H9.95226C10.5345 18.2222 10.9092 18.091 11.0747 17.8289C11.2402 17.5667 11.3237 16.9741 11.3237 16.0527C11.3237 15.4888 11.2197 15.094 11.0139 14.8684C10.8074 14.6428 10.4463 14.5308 9.93066 14.5308ZM10.4646 17.4011C10.3664 17.5556 10.1496 17.6325 9.81419 17.6325H8.81628V15.1203H9.85744C10.1837 15.1203 10.3914 15.1936 10.4796 15.3415C10.5679 15.4895 10.6122 15.8359 10.6122 16.3801C10.6122 16.9067 10.5631 17.2473 10.4646 17.4011Z' fill='#D7DEE6'/>
                          <path d='M11.835 18.2222H12.5351V16.7046H14.1904V16.115H12.5351V15.1203H14.2798V14.5308H11.835V18.2222Z' fill='#D7DEE6'/>
                        </svg>
                        {t`button.downloadOfficialReport`}
                      </Button.NoBg>
                      <Button.NoBg onClick={() => downloadIncidentReport()}>
                        <svg className='mr-2' width='20' height='24' viewBox='0 0 20 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                          <path d='M1.74362 0V12.985H0V19.8233H4.89527e-05L1.74323 21.5665L1.74362 24H19.8672V5.01659L14.8506 0H1.74362ZM17.3194 19.0733H0.749976V13.735H17.3194V19.0733ZM15.2245 1.81038L18.0563 4.6416H15.2245V1.81038Z' fill='#D7DEE6'/>
                          <path d='M6.39819 14.5308H6.21437H4.72681V18.2222H5.42736V17.0298H6.25242L6.41464 17.0269C6.91928 17.0269 7.25474 16.9456 7.42063 16.7837C7.58653 16.6211 7.6693 16.2929 7.6693 15.7985C7.6693 15.3012 7.58251 14.9651 7.40854 14.7915C7.23461 14.6172 6.89768 14.5308 6.39819 14.5308ZM6.8296 16.3303C6.74388 16.4035 6.54248 16.4402 6.22534 16.4402H5.42736V15.1204H6.29567C6.59489 15.1204 6.78018 15.1577 6.8512 15.2324C6.92261 15.3071 6.95812 15.5005 6.95812 15.8125C6.95812 16.0849 6.91526 16.257 6.8296 16.3303Z' fill='#D7DEE6'/>
                          <path d='M9.93066 14.5308H8.11572V18.2222H9.95226C10.5345 18.2222 10.9092 18.091 11.0747 17.8289C11.2402 17.5667 11.3237 16.9741 11.3237 16.0527C11.3237 15.4888 11.2197 15.094 11.0139 14.8684C10.8074 14.6428 10.4463 14.5308 9.93066 14.5308ZM10.4646 17.4011C10.3664 17.5556 10.1496 17.6325 9.81419 17.6325H8.81628V15.1203H9.85744C10.1837 15.1203 10.3914 15.1936 10.4796 15.3415C10.5679 15.4895 10.6122 15.8359 10.6122 16.3801C10.6122 16.9067 10.5631 17.2473 10.4646 17.4011Z' fill='#D7DEE6'/>
                          <path d='M11.835 18.2222H12.5351V16.7046H14.1904V16.115H12.5351V15.1203H14.2798V14.5308H11.835V18.2222Z' fill='#D7DEE6'/>
                        </svg>
                        {t`button.downloadIncidentReport`}
                      </Button.NoBg>
                      <Button.Pxl onClick={allowToReturn}>{t`button.allowToReturn`}</Button.Pxl>
                    </div>
                  )
                ],
                [propEq('status', STATUS.FINISHED), () => (
                  <div className='space-x-4'>
                    <Button.NoBg onClick={() => downloadOfficialReport()}>
                      <svg className='mr-2' width='20' height='24' viewBox='0 0 20 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path d='M1.74362 0V12.985H0V19.8233H4.89527e-05L1.74323 21.5665L1.74362 24H19.8672V5.01659L14.8506 0H1.74362ZM17.3194 19.0733H0.749976V13.735H17.3194V19.0733ZM15.2245 1.81038L18.0563 4.6416H15.2245V1.81038Z' fill='#D7DEE6'/>
                        <path d='M6.39819 14.5308H6.21437H4.72681V18.2222H5.42736V17.0298H6.25242L6.41464 17.0269C6.91928 17.0269 7.25474 16.9456 7.42063 16.7837C7.58653 16.6211 7.6693 16.2929 7.6693 15.7985C7.6693 15.3012 7.58251 14.9651 7.40854 14.7915C7.23461 14.6172 6.89768 14.5308 6.39819 14.5308ZM6.8296 16.3303C6.74388 16.4035 6.54248 16.4402 6.22534 16.4402H5.42736V15.1204H6.29567C6.59489 15.1204 6.78018 15.1577 6.8512 15.2324C6.92261 15.3071 6.95812 15.5005 6.95812 15.8125C6.95812 16.0849 6.91526 16.257 6.8296 16.3303Z' fill='#D7DEE6'/>
                        <path d='M9.93066 14.5308H8.11572V18.2222H9.95226C10.5345 18.2222 10.9092 18.091 11.0747 17.8289C11.2402 17.5667 11.3237 16.9741 11.3237 16.0527C11.3237 15.4888 11.2197 15.094 11.0139 14.8684C10.8074 14.6428 10.4463 14.5308 9.93066 14.5308ZM10.4646 17.4011C10.3664 17.5556 10.1496 17.6325 9.81419 17.6325H8.81628V15.1203H9.85744C10.1837 15.1203 10.3914 15.1936 10.4796 15.3415C10.5679 15.4895 10.6122 15.8359 10.6122 16.3801C10.6122 16.9067 10.5631 17.2473 10.4646 17.4011Z' fill='#D7DEE6'/>
                        <path d='M11.835 18.2222H12.5351V16.7046H14.1904V16.115H12.5351V15.1203H14.2798V14.5308H11.835V18.2222Z' fill='#D7DEE6'/>
                      </svg>
                      {t`button.downloadOfficialReport`}
                    </Button.NoBg>
                    <Button.NoBg onClick={() => downloadIncidentReport()}>
                      <svg className='mr-2' width='20' height='24' viewBox='0 0 20 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path d='M1.74362 0V12.985H0V19.8233H4.89527e-05L1.74323 21.5665L1.74362 24H19.8672V5.01659L14.8506 0H1.74362ZM17.3194 19.0733H0.749976V13.735H17.3194V19.0733ZM15.2245 1.81038L18.0563 4.6416H15.2245V1.81038Z' fill='#D7DEE6'/>
                        <path d='M6.39819 14.5308H6.21437H4.72681V18.2222H5.42736V17.0298H6.25242L6.41464 17.0269C6.91928 17.0269 7.25474 16.9456 7.42063 16.7837C7.58653 16.6211 7.6693 16.2929 7.6693 15.7985C7.6693 15.3012 7.58251 14.9651 7.40854 14.7915C7.23461 14.6172 6.89768 14.5308 6.39819 14.5308ZM6.8296 16.3303C6.74388 16.4035 6.54248 16.4402 6.22534 16.4402H5.42736V15.1204H6.29567C6.59489 15.1204 6.78018 15.1577 6.8512 15.2324C6.92261 15.3071 6.95812 15.5005 6.95812 15.8125C6.95812 16.0849 6.91526 16.257 6.8296 16.3303Z' fill='#D7DEE6'/>
                        <path d='M9.93066 14.5308H8.11572V18.2222H9.95226C10.5345 18.2222 10.9092 18.091 11.0747 17.8289C11.2402 17.5667 11.3237 16.9741 11.3237 16.0527C11.3237 15.4888 11.2197 15.094 11.0139 14.8684C10.8074 14.6428 10.4463 14.5308 9.93066 14.5308ZM10.4646 17.4011C10.3664 17.5556 10.1496 17.6325 9.81419 17.6325H8.81628V15.1203H9.85744C10.1837 15.1203 10.3914 15.1936 10.4796 15.3415C10.5679 15.4895 10.6122 15.8359 10.6122 16.3801C10.6122 16.9067 10.5631 17.2473 10.4646 17.4011Z' fill='#D7DEE6'/>
                        <path d='M11.835 18.2222H12.5351V16.7046H14.1904V16.115H12.5351V15.1203H14.2798V14.5308H11.835V18.2222Z' fill='#D7DEE6'/>
                      </svg>
                      {t`button.downloadIncidentReport`}
                    </Button.NoBg>
                  </div>
                )],
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
