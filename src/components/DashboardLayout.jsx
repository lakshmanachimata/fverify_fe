import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Box, List, ListItem, ListItemText, Typography, Divider } from "@mui/material";
import { People, SupervisedUserCircle } from "@mui/icons-material";

const DashboardLayout = () => {
  const location = useLocation();
  const userData = JSON.parse(localStorage.getItem("userData"));
  const userRole = userData?.role;
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Left Navigation Menu */}
      <Box
        sx={{
          width: "250px",
          backgroundColor: "#f9f9f9",
          borderRight: "1px solid #ddd",
          padding: 2,
        }}
      >
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Dashboard
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <List>
          {/* Prospects Link */}
          <ListItem
            button
            component={Link}
            to="/dashboard/prospects"
            sx={{
              backgroundColor: location.pathname === "/dashboard/prospects" ? "#e0e0e0" : "transparent",
              borderRadius: "4px",
              mb: 1,
            }}
          >
            <People sx={{ marginRight: 1 }} />
            <ListItemText primary="Prospects" />
          </ListItem>
          {/* Users Link */}
          {(["Admin", "Owner", "Operations Lead", "Operations Executive"].includes(userRole)) && (
          <ListItem
            button
            component={Link}
            to="/dashboard/users"
            sx={{
              backgroundColor: location.pathname === "/dashboard/users" ? "#e0e0e0" : "transparent",
              borderRadius: "4px",
            }}
          >
            <SupervisedUserCircle sx={{ marginRight: 1 }} />
            <ListItemText primary="Users" />
          </ListItem>
          )}
        </List>
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, padding: 3, backgroundColor: "#fff" }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;