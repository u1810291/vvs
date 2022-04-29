import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalProvider } from "./context/globalContext";
import { AuthProvider } from "./context/authContext";
import ProtectedRoute from "./feature/protected";

import Login from "./layout/login";
import Dashboard from "./layout/dashboard";
import Filter from "./layout/filter";
import TaskList from "./layout/taskList";
import DriversList from "./layout/driversList";
import Create from "./layout/create";
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
            <Route path="Filter" element={<Filter />} />
            <Route path="TaskList" element={<TaskList />} />
            <Route path="DriversList" element={<DriversList />} />
            <Route path="Create" element={<Create />} />
            <Route path="New" element={<New />} />
            <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </GlobalProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
