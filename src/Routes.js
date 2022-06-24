import React from 'react';
import {Route} from 'react-router-dom';

import KeyFeature from 'feature/key/routes';
import TaskFeature from 'feature/task/routes';
import CrewFeature from 'feature/crew/routes';
import LoginFeature from 'feature/login/routes';
import ModemFeature from 'feature/modem/routes';
import ObjectFeature from 'feature/object/routes';
import DashboardFeature from 'feature/dashboard/routes';
import PermissionFeature from 'feature/permission/routes';

import NotFoundLayout from './layout/NotFoundLayout';

const Routes = (
  <>
    {LoginFeature}
    {DashboardFeature}
    {TaskFeature}
    {ObjectFeature}
    {CrewFeature}
    {PermissionFeature}
    {KeyFeature}
    {ModemFeature}
    <Route isHidden path='*' element={<NotFoundLayout />} />
  {
    /**
     * TODO: redo like LoginFeature, like ObjectFeature
     *
      import Drivers from './layout/driver/drivers';
      import Clients from './layout/client/clients';
      import Driver from './layout/driver/driver';
      import Client from './layout/client/client';
      import Breach from './feature/breach/layout/BreachLayout';
      import Breaches from './feature/breach/layout/breaches';
      import Dislocations from './layout/dislocation/dislocations';
      import Dislocation from './layout/dislocation/dislocation';
      <Route path='drivers' element={<Drivers />} />
      <Route path='clients' element={<Clients />} />
      <Route path='driver/:id' element={<Driver />} />
      <Route path='client/:id' element={<Client />} />
      <Route path='dislocation/:id' element={<Dislocation />} />
      <Route path='dislocations' element={<Dislocations />} />
      <Route path='breach' element={<Breach />} />
      <Route path='breaches' element={<Breaches />} />
     */
  }
  </>
);

export default Routes;
