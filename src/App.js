import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './feature/protected';
import Login from './layout/login';
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
import Crews from './layout/crew/crews';
import CreateCrew from './layout/crew/createCrew';
import Permission from './layout/permission/permissions';
import Breach from './feature/breach/layout/BreachLayout';
import Breaches from './feature/breach/layout/breaches';
import Dislocations from './layout/dislocation/dislocations';
import Dislocation from './layout/dislocation/dislocation';
import PermissionConfirmation from './layout/permission/permissionConfirmation';
import NewTaskLayout from './feature/task/layout/NewTaskLayout';
import DashboardLayout from './feature/dashboard/layout/DashboardLayout';
import NotFound from './layout/notFound';
import GoogleContextProvider from './context/googleApiContext';
import ObjectRoute from './feature/object/routes';
import ComboBoxLayout from './feature/examples/layout/ComboBoxLayout';
import CheckBoxLayout from './feature/examples/layout/CheckBoxLayout';

export const Routsies = (
  <>
    <Route path='/' exec element={<Login />} />
    <Route path='dashboard' element={<DashboardLayout />} />
    <Route path='keys' element={<Keys />} />
    <Route path='tasks' element={<Tasks />} />
    <Route path='new-task' element={<NewTaskLayout />} />
    <Route path='drivers' element={<Drivers />} />
    <Route path='clients' element={<Clients />} />
    {ObjectRoute}
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
    <Route path='crews' element={<Crews />} />
    <Route path='crew/edit/:id' element={<CreateCrew />} />
    <Route path='crew/new' element={<CreateCrew />} />
    <Route path='storybook/combobox' element={<ComboBoxLayout />} />
    <Route path='storybook/checkbox' element={<CheckBoxLayout />} />
    <Route path='*' element={<NotFound />} />
  </>
);

function App() {
  return (
    <GoogleContextProvider>
      <Router>
        <Routes>
          <Route element={<ProtectedRoute />}>
            {Routsies}
          </Route>
        </Routes>
      </Router>
    </GoogleContextProvider>
  );
};

export default App;
