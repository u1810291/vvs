import React from 'react';
import {Route} from 'react-router-dom';
import NotFoundLayout from './layout/NotFoundLayout';
import DeniedLayout from 'layout/DeniedLayout';
import DashboardFeature from 'feature/dashboard/routes';
import LoginFeature from 'feature/login/routes';
import KeyBoxFeature from 'feature/keybox/routes';
import TaskFeature from 'feature/task/routes';
import CrewFeature from 'feature/crew/routes';
import ModemFeature from 'feature/modem/routes';
import ClientFeature from 'feature/client/routes';
import HelpFeature from 'feature/help/routes';
import ObjectFeature from 'feature/object/routes';
import DriverFeature from 'feature/driver/routes';
import BreachFeature from 'feature/breach/routes';
import PermissionFeature from 'feature/permission/routes';
import DislocationFeature from 'feature/dislocation/routes';
import SettingFeature from 'feature/setting/routes';
import UserFeature from 'feature/user/routes';
import ClassifierFeature from 'feature/classifier/routes';



const Routes = (
  <>
    {LoginFeature}
    {DashboardFeature}
    {TaskFeature}
    {PermissionFeature}
    {BreachFeature}
    {CrewFeature}
    {DriverFeature}
    {DislocationFeature}
    {ObjectFeature}
    {ModemFeature}
    {KeyBoxFeature}
    {ClientFeature}
    {HelpFeature}
    {SettingFeature}
    {ClassifierFeature}
    {UserFeature}
    <Route isHidden path='/denied' element={<DeniedLayout />} />
    <Route isHidden path='*' element={<NotFoundLayout />} />
  </>
);

export default Routes;
