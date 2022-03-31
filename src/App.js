import React, { useState, useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch,
  Link,
} from "react-router-dom";
import Login from "./layout/login";
import NotFound from "./layout/notFound";

function App() {
  return (
      <Router>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
      </Router>
  );
}

export default App;
