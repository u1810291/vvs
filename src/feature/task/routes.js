import {lazy} from 'react';
import i18next from 'i18next';
import {getExactHiddenRoute, getExactRoute} from 'util/react';

import EN from './i18n/en.json';
import LT from './i18n/lt.json';
// import {Route, Navigate} from 'react-router-dom';

// TODO: Adjust translations column names regarding response data
i18next.addResourceBundle('en', 'task', EN);
i18next.addResourceBundle('lt', 'task', LT);

export const TaskCreateRoute = getExactHiddenRoute('task', 'menu.edit', '/task/new', lazy(() => import('./layout/TaskCreateLayout')), null, ['admin', 'master_operator', 'operator']);
export const TaskEditRoute = getExactHiddenRoute('task', 'menu.edit', '/task/edit/:id', lazy(() => import('./layout/TaskEditLayout')), null, ['admin', 'master_operator', 'operator']);
export const TaskListRoute = getExactRoute('task', 'menu.list', '/task', lazy(() => import('./layout/TaskListLayout')), null, ['admin', 'master_operator', 'operator']);

const TaskRoute = (
  <>
    {TaskCreateRoute}
    {TaskEditRoute}
    {/* <Route exact path='/task/edit' isHidden element={<Navigate replace to={TaskListRoute.props.path} />}/> */}
  </>
);

export default TaskRoute;
