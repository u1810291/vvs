import {lazy} from 'react';
import i18next from 'i18next';
import {getExactHiddenRoute, getExactRoute} from 'util/react';

import EN from './i18n/en.json';
import LT from './i18n/lt.json';

i18next.addResourceBundle('en', 'classifier', EN);
i18next.addResourceBundle('lt', 'classifier', LT);


// task cancellations
export const TaskCancellationCreateRoute = getExactHiddenRoute('classifier', 'menu.create', '/classifier/task-cancellation/new', lazy(() => import('./layout/TaskCancellationEditLayout')), null, ['admin', 'master_operator']);
export const TaskCancellationEditRoute = getExactHiddenRoute('classifier', 'menu.edit', '/classifier/task-cancellation/:id', lazy(() => import('./layout/TaskCancellationEditLayout')), null, ['admin', 'master_operator']);
export const TaskCancellationListRoute = getExactRoute('classifier', 'menu.list', '/classifier/task-cancellation', lazy(() => import('./layout/TaskCancellationListLayout')), null, ['admin', 'master_operator']);

// task types
export const TaskTypeCreateRoute = getExactHiddenRoute('classifier', 'menu.create', '/classifier/task-type/new', lazy(() => import('./layout/TaskTypeEditLayout')), null, ['admin', 'master_operator']);
export const TaskTypeEditRoute = getExactHiddenRoute('classifier', 'menu.edit', '/classifier/task-type/:id', lazy(() => import('./layout/TaskTypeEditLayout')), null, ['admin', 'master_operator']);
export const TaskTypeListRoute = getExactHiddenRoute('classifier', 'menu.list', '/classifier/task-type', lazy(() => import('./layout/TaskTypeListLayout')), null, ['admin', 'master_operator']);

// permission requests
export const PermissionRequestCreateRoute = getExactHiddenRoute('classifier', 'menu.create', '/classifier/permission-request/new', lazy(() => import('./layout/PermissionRequestEditLayout')), null, ['admin', 'master_operator']);
export const PermissionRequestEditRoute = getExactHiddenRoute('classifier', 'menu.edit', '/classifier/permission-request/:id', lazy(() => import('./layout/PermissionRequestEditLayout')), null, ['admin', 'master_operator']);
export const PermissionRequestListRoute = getExactHiddenRoute('classifier', 'menu.list', '/classifier/permission-request', lazy(() => import('./layout/PermissionRequestListLayout')), null, ['admin', 'master_operator']);


const ClassifierRoute = (
  <>
    {TaskCancellationCreateRoute}
    {TaskCancellationEditRoute}

    {PermissionRequestListRoute}
    {PermissionRequestCreateRoute}
    {PermissionRequestEditRoute}

    {TaskTypeListRoute}
    {TaskTypeCreateRoute}
    {TaskTypeEditRoute}
  </>
);

export default ClassifierRoute;
