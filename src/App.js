import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalProvider } from "./context/globalContext";
import { AuthProvider } from "./context/authContext";
import ProtectedRoute from "./feature/protected";

import Login from "./layout/login";
import Dashboard from "./layout/dashboard";
import Object from "./layout/object";
import Tasks from "./layout/tasks";
import Drivers from "./layout/drivers";
import Clients from "./layout/clients";
import Objects from "./layout/objects";
import Create from "./layout/create";
import Driver from "./layout/driver";
import Client from "./layout/client";
import New from "./layout/new";

import NotFound from "./layout/notFound";

function App() {
  return (
    <Router>
      <AuthProvider>
        <GlobalProvider>
          <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" exec element={<Login />} />
            <Route path="Dashboard" element={<Dashboard />} />
            <Route path="Tasks" element={<Tasks />} />
            <Route path="Object" element={<Object />} />
            <Route path="Drivers" element={<Drivers />} />
            <Route path="Clients" element={<Clients />} />
            <Route path="Objects" element={<Objects />} />
            <Route path="Create" element={<Create />} />
            <Route path="New" element={<New />} />
            <Route path="Driver" element={<Driver />} />
            <Route path="Client" element={<Client />} /> {/* /:id */}
            <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </GlobalProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
