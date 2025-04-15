import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";
import SignInScreen from "./components/SignInScreen";
import DashboardLayout from "./components/DashboardLayout";
import ProspectsDashboard from "./components/ProspectsDashboard";
import UsersDashboard from "./components/UsersDashboard";
import OrgIdValidator from "./components/OrgIdValidator"; // New component

const App = () => {
  return (
    <Router>
      <OrgIdValidator>
        <Routes>
          <Route path="/" element={<SignInScreen />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="prospects" element={<ProspectsDashboard />} />
            <Route path="users" element={<UsersDashboard />} />
          </Route>
        </Routes>
      </OrgIdValidator>
    </Router>
  );
};

export default App;