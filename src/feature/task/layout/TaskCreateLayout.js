import React, {useRef} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import TaskCreateForm from '../form/TaskCreateForm';
import Header from '../../../components/atom/Header';
import Breadcrumbs, {RouteAsBreadcrumb} from '../../../components/Breadcrumbs';
import SideBarLayout from '../../../layout/SideBarLayout';

// import Nullable from '../../../components/atom/Nullable';
import Button from '../../../components/Button';
import {identity, isFunction} from 'crocks';
import {useTranslation} from 'react-i18next';
import {TaskListRoute} from '../routes';

const TaskCreateLayout = () => {
  const saveRef = useRef(identity);
  const removeRef = useRef(identity);
  const {id} = useParams();
  const navigate = useNavigate();
  // const {data} = useCrew({id});
  const {t} = useTranslation('task', {keyPrefix: 'create.header'});
  const send = () => { isFunction(saveRef.current) && saveRef.current(); };

  // const breadcrumb = (
  //   getProp('name', data)
  //     .alt(getProp('id', data))
  //     .option(null)
  // );

  return (
    <SideBarLayout>
      <div className='flex flex-col min-h-full'>
        <Header>
          <Breadcrumbs>
            <RouteAsBreadcrumb route={TaskListRoute} />
            {/*<Nullable on={breadcrumb}>*/}
            {/*  <Breadcrumbs.Item>*/}
            {/*    <span className='font-semibold'>{breadcrumb}</span>*/}
            {/*  </Breadcrumbs.Item>*/}
            {/*</Nullable>*/}
          </Breadcrumbs>
          <div className='space-x-4'>
            <Button.Sxl onClick={() => navigate(TaskListRoute.props.path)}>
              {t`button.cancel`}
            </Button.Sxl>
            <Button.Pxl onClick={send}>
              {t`button.save`}
            </Button.Pxl>
          </div>
        </Header>
        <TaskCreateForm />
      </div>
    </SideBarLayout>
  );
};

export default TaskCreateLayout;
