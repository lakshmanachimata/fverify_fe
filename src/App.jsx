import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignInScreen from "./components/SignInScreen";
import DashboardLayout from "./components/DashboardLayout";
import ProspectsDashboard from "./components/ProspectsDashboard";
import UsersDashboard from "./components/UsersDashboard";
import OrgIdValidator from "./components/OrgIdValidator"; // New component
export const verifyDomain = "http://localhost:9000"; // Base URL for API requests

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Wrap only SignInScreen with OrgIdValidator */}
        <Route
          path="/"
          element={
            <OrgIdValidator>
              <SignInScreen />
            </OrgIdValidator>
          }
        />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="prospects" element={<ProspectsDashboard />} />
          <Route path="users" element={<UsersDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;