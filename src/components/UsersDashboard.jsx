import React, { useState } from "react";
import { useHandleLogout } from "../utils/utils"; // Import the custom hook

import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

const UsersDashboard = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const handleLogout = useHandleLogout(); // Use the custom hook

  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    role: "",
    status: "",
    mobileNumber: "",
  });

  const [users, setUsers] = useState([
    {
      username: "John Anderson",
      role: "Administrator",
      status: "Active",
      mobileNumber: "+1 (555) 123-4567",
    },
    {
      username: "Sarah Wilson",
      role: "Manager",
      status: "Active",
      mobileNumber: "+1 (555) 234-5678",
    },
    {
      username: "Michael Brown",
      role: "User",
      status: "Inactive",
      mobileNumber: "+1 (555) 345-6789",
    },
    {
      username: "Emily Davis",
      role: "Manager",
      status: "Active",
      mobileNumber: "+1 (555) 456-7890",
    },
    {
      username: "David Miller",
      role: "User",
      status: "Active",
      mobileNumber: "+1 (555) 567-8901",
    },
  ]);

  const handleOpenDialog = (isEdit = false, index = null) => {
    setIsEditMode(isEdit);
    setEditIndex(index);

    if (isEdit && index !== null) {
      setNewUser(users[index]);
    } else {
      setNewUser({
        username: "",
        password: "",
        role: "",
        status: "",
        mobileNumber: "",
      });
    }

    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewUser({
      username: "",
      password: "",
      role: "",
      status: "",
      mobileNumber: "",
    });
    setIsEditMode(false);
    setEditIndex(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveUser = () => {
    if (isEditMode && editIndex !== null) {
      // Update existing user
      setUsers((prevUsers) =>
        prevUsers.map((user, index) =>
          index === editIndex
            ? {
                ...user,
                ...newUser,
                password: newUser.password || user.password, // Keep old password if not changed
              }
            : user
        )
      );
    } else {
      // Add new user
      setUsers((prevUsers) => [...prevUsers, newUser]);
    }

    handleCloseDialog();
  };

  return (
    <Box sx={{ padding: 4 }}>
      {/* Header */}
       <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 2,
              }}
            >
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Users Management
      </Typography>
       <Button
          variant="outlined"
          color="secondary"
          onClick={handleLogout}
        >
          Logout
        </Button>
        </Box>
      {/* Table */}
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Mobile Number</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      backgroundColor:
                        user.status === "Active" ? "green" : "gray",
                      color: "white",
                      textTransform: "none",
                      pointerEvents: "none",
                    }}
                  >
                    {user.status}
                  </Button>
                </TableCell>
                <TableCell>{user.mobileNumber}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    sx={{ marginRight: 1 }}
                    onClick={() => handleOpenDialog(true, index)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Create User Button */}
      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: 3 }}
        startIcon={<span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>+</span>}
        onClick={() => handleOpenDialog(false)}
      >
        Create User
      </Button>

      {/* Create/Edit User Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>{isEditMode ? "Edit User" : "Create New User"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={newUser.username}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={newUser.password}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
            placeholder={isEditMode ? "Leave blank to keep current password" : ""}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select
              name="role"
              value={newUser.role}
              onChange={handleInputChange}
              variant="outlined"
            >
              <MenuItem value="Administrator">Administrator</MenuItem>
              <MenuItem value="Manager">Manager</MenuItem>
              <MenuItem value="User">User</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={newUser.status}
              onChange={handleInputChange}
              variant="outlined"
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Mobile Number"
            name="mobileNumber"
            value={newUser.mobileNumber}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveUser} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UsersDashboard;