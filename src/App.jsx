import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignInScreen from "./components/SignInScreen";
import DashboardLayout from "./components/DashboardLayout";
import ProspectsDashboard from "./components/ProspectsDashboard";
import UsersDashboard from "./components/UsersDashboard";
import OrgIdValidator from "./components/OrgIdValidator"; // New component
export const verifyDomain = "http://localhost:9000"; // Base URL for API requests

const App = () => {
  const [userRole, setUserRole] = useState(null); // State to store user role
  const [userStatus, setUserStatus] = useState(null); // State to store user role

  useEffect(() => {
    // Retrieve user data from localStorage after login
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData?.role) {
      setUserRole(userData.role); // Set the user role in state
      setUserStatus(userData.status); // Set the user role in state
    }
  }, []);

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
        <Route
          path="/dashboard"
          element={
            userRole || userStatus != 'Active'? (
              <DashboardLayout />
            ) : (
              <Navigate to={`/?orgId=${localStorage.getItem('orgId')}`} replace /> // Redirect if no role
            )
          }
        >
          <Route path="prospects" element={<ProspectsDashboard />} />
          <Route path="users" element={<UsersDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;