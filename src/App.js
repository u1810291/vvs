import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalProvider } from "./context/globalContext";
import { AuthProvider } from "./context/authContext";
import ProtectedRoute from "./feature/protected";

import Login from "./layout/login";
import Navigation from "./layout/navigation";
import Dashboard from "./layout/dashboard";
import Object from "./layout/object";
import Filter from "./layout/filter";
import DriversList from "./layout/driversList";
import ClientsList from "./layout/clientsList";
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
            <Route path="Navigation" element={<Navigation />} />
            <Route path="Dashboard" element={<Dashboard />} />
            <Route path="Filter" element={<Filter />} />
            <Route path="Object" element={<Object />} />
            <Route path="DriversList" element={<DriversList />} />
            <Route path="ClientsList" element={<ClientsList />} />
            <Route path="Objects" element={<Objects />} />
            <Route path="Create" element={<Create />} />
            <Route path="New" element={<New />} />
            <Route path="Driver" element={<Driver />} />
            <Route path="Client/:id" element={<Client />} /> {/* /:id */}
            <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </GlobalProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
