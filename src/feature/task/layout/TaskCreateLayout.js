import React, {useRef} from 'react';
import {useNavigate} from 'react-router-dom';

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
  const navigate = useNavigate();
  const {t} = useTranslation('task', {keyPrefix: 'create.header'});
  const save = () => { isFunction(saveRef.current) && saveRef.current(); };

  return (
    <SideBarLayout>
      <div className='flex flex-col min-h-full'>
        <Header>
          <Breadcrumbs>
            <RouteAsBreadcrumb route={TaskListRoute} />
            <Breadcrumbs.Item hideSlash>
              <span className='font-semibold'>{t`newtask`}</span>
             </Breadcrumbs.Item>
          </Breadcrumbs>
          <div className='space-x-4'>
            <Button.Sxl onClick={() => navigate(TaskListRoute.props.path)}>
              {t`button.cancel`}
            </Button.Sxl>
            <Button.Pxl onClick={save}>
              {t`button.save`}
            </Button.Pxl>
          </div>
        </Header>
        <TaskCreateForm saveRef={saveRef} />
      </div>
    </SideBarLayout>
  );
};

export default TaskCreateLayout;
