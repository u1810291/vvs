import React from 'react';
import {Route} from 'react-router-dom';

import TaskFeature from './feature/task/routes';
import CrewFeature from './feature/crew/routes';
import LoginFeature from 'feature/login/routes';
import ObjectFeature from './feature/object/routes';
import DashboardFeature from './feature/dashboard/routes';
import PermissionFeature from './feature/permission/routes';

import NotFoundLayout from './layout/NotFoundLayout';

const Routes = (
  <>
    {TaskFeature}
    {CrewFeature}
    {LoginFeature}
    {ObjectFeature}
    {DashboardFeature}
    {PermissionFeature}
    <Route isHidden path='*' element={<NotFoundLayout />} />
  {
    /**
     * TODO: redo like LoginFeature, like ObjectFeature
     *
      import Keys from './layout/key/keys';
      import Drivers from './layout/driver/drivers';
      import Clients from './layout/client/clients';
      import Modems from './layout/modem/modems';
      import Driver from './layout/driver/driver';
      import Client from './layout/client/client';
      import Key from './layout/key/key';
      import Modem from './layout/modem/modem';
      import Breach from './feature/breach/layout/BreachLayout';
      import Breaches from './feature/breach/layout/breaches';
      import Dislocations from './layout/dislocation/dislocations';
      import Dislocation from './layout/dislocation/dislocation';
      <Route path='keys' element={<Keys />} />
      <Route path='drivers' element={<Drivers />} />
      <Route path='clients' element={<Clients />} />
      <Route path='modems' element={<Modems />} />
      <Route path='driver/:id' element={<Driver />} />
      <Route path='client/:id' element={<Client />} />
      <Route path='modem/:id' element={<Modem />} />
      <Route path='key/:id' element={<Key />} />
      <Route path='dislocation/:id' element={<Dislocation />} />
      <Route path='dislocations' element={<Dislocations />} />
      <Route path='breach' element={<Breach />} />
      <Route path='breaches' element={<Breaches />} />
     */
  }
  </>
);

export default Routes;
