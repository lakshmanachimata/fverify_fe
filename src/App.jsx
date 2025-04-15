import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignInScreen from "./components/SignInScreen";
import DashboardLayout from "./components/DashboardLayout";
import ProspectsDashboard from "./components/ProspectsDashboard";
import UsersDashboard from "./components/UsersDashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInScreen />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="prospects" element={<ProspectsDashboard />} />
          <Route path="users" element={<UsersDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;