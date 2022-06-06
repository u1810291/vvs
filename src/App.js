import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import GlobalContext from "./context/globalContext";
import ProtectedRoute from "./feature/protected";
import { GraphQLClient, ClientContext } from "graphql-hooks";
import memCache from "graphql-hooks-memcache";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { SubscriptionClient } from "subscriptions-transport-ws";

import Login from "./layout/login";
import Dashboard from "./layout/dashboard";
import Object from "./layout/object/object";
import Keys from "./layout/key/keys";
import Tasks from "./layout/tasks";
import Drivers from "./layout/driver/drivers";
import Clients from "./layout/client/clients";
import Objects from "./layout/object/objects";
import Modems from "./layout/modem/modems";
import Create from "./layout/create";
import Driver from "./layout/driver/driver";
import Client from "./layout/client/client";
import Key from "./layout/key/key";
import Modem from "./layout/modem/modem";
import New from "./layout/new";
import Crews from "./layout/crew/crew";
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
    url: "https://ec.swarm.testavimui.eu/v1/graphql",
    headers: {
      "x-hasura-admin-secret": "secret",
    },
    cache: memCache(),
    subscriptionClient: new SubscriptionClient(
      "ws://ec.swarm.testavimui.eu/v1/graphql",
      {
        reconnect: true,
        lazy: true,
        inactivityTimeout: 30000,
        connectionParams: {
          headers: {
            "content-type": "application/json",
            "x-hasura-admin-secret": "secret",
            Authorization: globalToken ? "Bearer" + String(globalToken) : "",
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
                <Route path="Crews" element={<Crews />} />
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
