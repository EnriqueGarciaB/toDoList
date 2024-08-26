import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Tasks from "./components/Tasks";

import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  return (
    <Router>
      <div>
        <Header isAuthenticated={isAuthenticated} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/tasks"
            element={
              <PrivateRoute>
                <Tasks />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
