import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignInScreen from "./components/SignInScreen";
import ProspectsDashboard from "./components/ProspectsDashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInScreen />} />
        <Route path="/dashboard" element={<ProspectsDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;