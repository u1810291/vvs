import React from 'react';
import {Route} from 'react-router-dom';

import KeyBoxFeature from 'feature/keybox/routes';
import TaskFeature from 'feature/task/routes';
import CrewFeature from 'feature/crew/routes';
import LoginFeature from 'feature/login/routes';
import ModemFeature from 'feature/modem/routes';
import ClientFeature from 'feature/client/routes';
import ObjectFeature from 'feature/object/routes';
import DriverFeature from 'feature/driver/routes';
import BreachFeature from 'feature/breach/routes';
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
    {KeyBoxFeature}
    {ModemFeature}
    {ClientFeature}
    {BreachFeature}
    {DislocationFeature}
    <Route isHidden path='*' element={<NotFoundLayout />} />
  </>
);

export default Routes;
