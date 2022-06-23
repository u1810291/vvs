import React from 'react';
import {Route} from 'react-router-dom';

import CrewRoute from './feature/crew/routes';
import LoginFeature from 'feature/login/routes';
import ObjectFeature from './feature/object/routes';
import DashboardFeature from './feature/dashboard/routes';

import Index from './layout/NotFoundLayout';

const Routes = (
  <>
    {CrewRoute}
    {LoginFeature}
    {ObjectFeature}
    {DashboardFeature}
    <Route isHidden path='*' element={<Index />} />
  {
    /**
     * TODO: redo like LoginFeature, like ObjectFeature
     *
      import Keys from './layout/key/keys';
      import Tasks from './layout/tasks';
      import Drivers from './layout/driver/drivers';
      import Clients from './layout/client/clients';
      import Modems from './layout/modem/modems';
      import Create from './layout/create';
      import Driver from './layout/driver/driver';
      import Client from './layout/client/client';
      import Key from './layout/key/key';
      import Modem from './layout/modem/modem';
      import New from './layout/new';
      import Permission from './layout/permission/permissions';
      import Breach from './feature/breach/layout/BreachLayout';
      import Breaches from './feature/breach/layout/breaches';
      import Dislocations from './layout/dislocation/dislocations';
      import Dislocation from './layout/dislocation/dislocation';
      import PermissionConfirmation from './layout/permission/permissionConfirmation';
      import NewTaskLayout from './feature/task/layout/NewTaskLayout';
      <Route path='keys' element={<Keys />} />
      <Route path='tasks' element={<Tasks />} />
      <Route path='new-task' element={<NewTaskLayout />} />
      <Route path='drivers' element={<Drivers />} />
      <Route path='clients' element={<Clients />} />
      <Route path='modems' element={<Modems />} />
      <Route path='create' element={<Create />} />
      <Route path='new' element={<New />} />
      <Route path='driver/:id' element={<Driver />} />
      <Route path='client/:id' element={<Client />} />
      <Route path='modem/:id' element={<Modem />} />
      <Route path='key/:id' element={<Key />} />
      <Route path='dislocation/:id' element={<Dislocation />} />
      <Route path='permissions' element={<Permission />} />
      <Route path='permission-confirmation' element={<PermissionConfirmation />} />
      <Route path='dislocations' element={<Dislocations />} />
      <Route path='breach' element={<Breach />} />
      <Route path='breaches' element={<Breaches />} />
     */
  }
  </>
);

export default Routes;
