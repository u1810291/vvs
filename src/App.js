import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import GlobalContext from "./context/globalContext";
import ProtectedRoute from "./feature/protected";
import { GraphQLClient, ClientContext } from "graphql-hooks";
import { createClient } from "graphql-ws";
import memCache from "graphql-hooks-memcache";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

import Login from "./layout/login";
import Dashboard from "./layout/dashboard";
import Object from "./layout/object";
import Keys from "./layout/keys";
import Tasks from "./layout/tasks";
import Drivers from "./layout/drivers";
import Clients from "./layout/clients";
import Objects from "./layout/objects";
import Modems from "./layout/modems";
import Create from "./layout/create";
import Driver from "./layout/driver";
import Client from "./layout/client";
import Key from "./layout/key";
import Modem from "./layout/modem";
import New from "./layout/new";
import Crew from "./layout/crew/crew";
import CreateCrew from './layout/crew/createCrew';
import Permission from './layout/permission/permissions';
import Breach from './layout/breach/breach';
import Breaches from './layout/breach/breaches';
import PermissionConfirmation from './layout/permission/permissionConfirmation';

import NotFound from "./layout/notFound";

const queryClient = new QueryClient();

function App() {
  const { globalToken, setGlobalToken } = useContext(GlobalContext);
  const client = new GraphQLClient({
    // returnJWT() and apply middleware
    url: "https://ec.swarm.testavimui.eu/v1/graphql",
    cache: memCache(),
    fullWsTransport: false,
    subscriptionClient: () =>
      createClient({
        url: "ws://ec.swarm.testavimui.eu/v1/graphql",
        options: {
          reconnect: true,
          lazy: true,
          inactivityTimeout: 30000,
          connectionParams: () => {
            const token = getAccessToken();
            return {
              headers: {
                "content-type": "application/json",
                "x-hasura-admin-secret": "secret",
                Authorization: globalToken
                  ? "Bearer" + String(globalToken)
                  : "",
              },
            };
          },
        },
      }),
  });

  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ClientContext.Provider value={globalToken ? client : null}>
            <Routes>
              <Route element={<ProtectedRoute />}>
                <Route path="/" exec element={<Login />} />
                <Route path="Dashboard" element={<Dashboard />} />
                <Route path="Keys" element={<Keys />} />
                <Route path="Tasks" element={<Tasks />} />
                <Route path="Drivers" element={<Drivers />} />
                <Route path="Clients" element={<Clients />} />
                <Route path="Objects" element={<Objects />} />
                <Route path="Modems" element={<Modems />} />
                <Route path="Create" element={<Create />} />
                <Route path="New" element={<New />} />
                <Route path="Driver/:id" element={<Driver />} />
                <Route path="Client/:id" element={<Client />} />
                <Route path="Modem/:id" element={<Modem />} />
                <Route path="Key/:id" element={<Key />} />
                <Route path="Object/:id" element={<Object />} />
                <Route path="Crew" element={<Crew />} />
                <Route path="CreateCrew" element={<CreateCrew />} />
                <Route path="Permissions" element={<Permission />} />
                <Route path="PermissionConfirmation" element={<PermissionConfirmation />} />
                <Route path="Breaches" element={<Breaches />} />
                <Route path="Breach" element={<Breach />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </ClientContext.Provider>
        </AuthProvider>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
