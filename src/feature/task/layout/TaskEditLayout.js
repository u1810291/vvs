import React from 'react';
import Breadcrumbs, {RouteAsBreadcrumb} from 'components/Breadcrumbs';
import Header from 'components/atom/Header';
import SideBarLayout from 'layout/SideBarLayout';
import {TaskListRoute} from '../routes';
import Button from 'components/Button';

import {useTranslation} from 'react-i18next';
import {pipe} from 'crocks/helpers';
import {chain, option} from 'crocks/pointfree';
import {safe, getProp} from 'crocks';
import {isArray, isObject} from 'crocks/predicates';
import {useTasks} from '../api';

import TaskEditForm from '../form/TaskEditForm';

const AlarmLayout = () => {
  const {t} = useTranslation('task');
  const list = useTasks({id: '5163909f-fcf0-4d93-be72-b75848ce4e4a'});
  console.log(pipe(safe(isObject), chain(getProp('data')), chain(safe(isArray)), option([]))(list));
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
