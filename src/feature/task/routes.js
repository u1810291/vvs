import {lazy} from 'react';
import i18next from 'i18next';
import {getExactHiddenRoute, getExactRoute} from 'util/react';

import EN from './i18n/en.json';
import LT from './i18n/lt.json';

// TODO: Adjust translations column names regarding response data
i18next.addResourceBundle('en', 'task', EN);
i18next.addResourceBundle('lt', 'task', LT);

export const TaskCreateRoute = getExactHiddenRoute('task', 'menu.edit', '/task/new', lazy(() => import('./layout/TaskCreateLayout')), null);
export const TaskEditRoute = getExactHiddenRoute('task', 'menu.edit', '/task/edit/:id', lazy(() => import('./layout/TaskEditLayout')), null);
export const TaskListRoute = getExactRoute('task', 'menu.list', '/task', lazy(() => import('./layout/TaskListLayout')), null);

const TaskRoute = (
  <>
    {TaskCreateRoute}
    {TaskEditRoute}
  </>
);

export default TaskRoute;
