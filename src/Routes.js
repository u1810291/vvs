import React from 'react';
import {Route} from 'react-router-dom';

import KeyFeature from 'feature/key/routes';
import TaskFeature from 'feature/task/routes';
import CrewFeature from 'feature/crew/routes';
import LoginFeature from 'feature/login/routes';
import ModemFeature from 'feature/modem/routes';
import ObjectFeature from 'feature/object/routes';
import DriverFeature from 'feature/driver/routes';
import DashboardFeature from 'feature/dashboard/routes';
import PermissionFeature from 'feature/permission/routes';
import DislocationFeature from 'feature/dislocation/routes';

import NotFoundLayout from './layout/NotFoundLayout';

const Routes = (
  <>
    {LoginFeature}
    {DashboardFeature}
    {TaskFeature}
    {ObjectFeature}
    {CrewFeature}
    {PermissionFeature}
    {DriverFeature}
    {KeyFeature}
    {ModemFeature}
    {DislocationFeature}
    <Route isHidden path='*' element={<NotFoundLayout />} />
  {
    /**
     * TODO: redo like LoginFeature, like ObjectFeature
     *
      import Clients from './layout/client/clients';
      import Client from './layout/client/client';
      import Breach from './feature/breach/layout/BreachLayout';
      import Breaches from './feature/breach/layout/breaches';
      <Route path='clients' element={<Clients />} />
      <Route path='client/:id' element={<Client />} />
      <Route path='breach' element={<Breach />} />
      <Route path='breaches' element={<Breaches />} />
     */
  }
  </>
);

export default Routes;
