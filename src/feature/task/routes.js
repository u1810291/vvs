import {lazy} from 'react';
import i18next from 'i18next';
import EN from './i18n/en.json';
import LT from './i18n/lt.json';
import {getExactHiddenRoute, getExactRoute} from 'util/react';

// TODO: Adjust translations column names regarding response data
i18next.addResourceBundle('en', 'task', EN);
i18next.addResourceBundle('lt', 'task', LT);

export const TaskEditRoute = getExactHiddenRoute('task', 'menu.edit', '/task/:id', lazy(() => import('./layout/TaskEditLayout')), null);
export const TaskListRoute = getExactRoute('task', 'menu.list', '/task', lazy(() => import('./layout/TaskListLayout')), null);

const TaskRoute = (
  <>
    {TaskEditRoute}
    {TaskListRoute}
  </>
);

export default TaskRoute;
