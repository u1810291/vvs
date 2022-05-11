import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import GlobalContext from "./context/globalContext";
import ProtectedRoute from "./feature/protected";
import { GraphQLClient, ClientContext } from "graphql-hooks";
import { createClient } from "graphql-ws";
import memCache from "graphql-hooks-memcache";

import Login from "./layout/login";
import Dashboard from "./layout/dashboard";
import Object from "./layout/object";
import Keys from "./layout/keys";
import Tasks from "./layout/tasks";
import Drivers from "./layout/drivers";
import Clients from "./layout/clients";
import Objects from "./layout/objects";
import Create from "./layout/create";
import Driver from "./layout/driver";
import Client from "./layout/client";
import Key from "./layout/key";
import New from "./layout/new";

import NotFound from "./layout/notFound";

function App() {
  const {globalToken, setGlobalToken} = useContext(GlobalContext);
  console.log('got token ', globalToken);
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
              Authorization: globalToken ? "Bearer" + String(globalToken) : "",
            },
          }
          },
        },
      }),
  });

  return (
    <Router>
      <AuthProvider>
        {/* <GlobalProvider> */}
          <ClientContext.Provider value={globalToken ? client : null}>
            <Routes>
              <Route element={<ProtectedRoute />}>
                <Route path="/" exec element={<Login />} />
                <Route path="Dashboard" element={<Dashboard />} />
                <Route path="Keys" element={<Keys />} />
                <Route path="Tasks" element={<Tasks />} />
                <Route path="Object" element={<Object />} />
                <Route path="Drivers" element={<Drivers />} />
                <Route path="Clients" element={<Clients />} />
                <Route path="Objects" element={<Objects />} />
                <Route path="Create" element={<Create />} />
                <Route path="New" element={<New />} />
                <Route path="Driver/:id" element={<Driver />} />
                <Route path="Client/:id" element={<Client />} />
                <Route path="Key" element={<Key />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </ClientContext.Provider>
        {/* </GlobalProvider> */}
      </AuthProvider>
    </Router>
  );
}

export default App;
