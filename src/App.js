import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import GlobalContext from './context/globalContext';
import ProtectedRoute from './feature/protected';
import { GraphQLClient, ClientContext } from 'graphql-hooks';
import memCache from 'graphql-hooks-memcache';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { SubscriptionClient } from 'subscriptions-transport-ws';

import Login from './layout/login';
import Object from './layout/object/object';
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
import ObjectList from './layout/object/list';

import ComboBoxLayout from './feature/examples/layout/ComboBoxLayout';
import CheckBoxLayout from './feature/examples/layout/CheckBoxLayout';

const queryClient = new QueryClient();

function App() {
  const { globalToken, setGlobalToken } = useContext(GlobalContext);
  const client = new GraphQLClient({
    url: 'https://ec.swarm.testavimui.eu/v1/graphql',
    headers: {
      'x-hasura-admin-secret': 'secret',
    },
    cache: memCache(),
    subscriptionClient: new SubscriptionClient(
      'ws://ec.swarm.testavimui.eu/v1/graphql',
      {
        reconnect: true,
        lazy: true,
        inactivityTimeout: 30000,
        connectionParams: {
          headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': 'secret',
            Authorization: globalToken ? 'Bearer' + String(globalToken) : '',
          },
        },
      }
    ),
  });

  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ClientContext.Provider value={globalToken ? client : null}>
            <GoogleContextProvider>
              <Routes>
                <Route element={<ProtectedRoute />}>
                  <Route path='/' exec element={<Login />} />
                  <Route path='dashboard' element={<DashboardLayout />} />
                  <Route path='keys' element={<Keys />} />
                  <Route path='tasks' element={<Tasks />} />
                  <Route path='new-task' element={<NewTaskLayout />} />
                  <Route path='drivers' element={<Drivers />} />
                  <Route path='clients' element={<Clients />} />
                  <Route path='object' element={<ObjectList />} />
                  <Route path='modems' element={<Modems />} />
                  <Route path='create' element={<Create />} />
                  <Route path='new' element={<New />} />
                  <Route path='driver/:id' element={<Driver />} />
                  <Route path='client/:id' element={<Client />} />
                  <Route path='modem/:id' element={<Modem />} />
                  <Route path='key/:id' element={<Key />} />
                  <Route path='object/:id' element={<Object />} />
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
                </Route>
              </Routes>
            </GoogleContextProvider>
          </ClientContext.Provider>
        </AuthProvider>
      </QueryClientProvider>
    </Router>
  );
};

export default App;
