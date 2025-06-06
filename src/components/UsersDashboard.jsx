import React, { useState, useEffect } from "react";
import { createUser, getRoles, getStatuses, getUsers, updateUser, useErrorDialog, useHandleLogout } from "../utils/utils"; // Import the custom hook

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
  const userData = JSON.parse(localStorage.getItem("userData") ? localStorage.getItem("userData"): "{}"); // Parse user data from localStorage
  const orgId = localStorage.getItem("orgId");
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [statuses , setStatuses]  =  useState([]);
  const { showErrorDialog, ErrorDialog } = useErrorDialog(); // Use the error dialog hook

  const [newUser, setNewUser] = useState({
    userid: "",
    username: "",
    password: "",
    role: "",
    status: "",
    mobile_number: "",
    remarks: "",
    uid: "",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers(userData.token, orgId); // Call the API
        setUsers(data); // Update the state with the fetched users
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers(); // Fetch users on component mount
  }, [userData.token, orgId]);


  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const data = await getRoles(orgId); // Call the API
        setRoles(data); // Update the state with the fetched roles
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchRoles(); // Fetch users on component mount
  }, [orgId]);

  useEffect(() => {
    const fetStatuses = async () => {
      try {
        const data = await getStatuses(orgId); // Call the API
        setStatuses(data); // Update the state with the fetched statuses
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetStatuses(); // Fetch users on component mount
  }, [orgId]);




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
        mobile_number: "",
        uid: "",
        remarks: "",
        userid: "",
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
      mobile_number: "",
      uid: "",
      remarks: "",
      userid: "",
    });
    setIsEditMode(false);
    setEditIndex(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveUser = async () =>  {
    if (isEditMode && editIndex !== null) {  
      try {
        const cdata = await updateUser(newUser, userData.token ,localStorage.getItem('orgId')); // Call the API
        const data = await getUsers(userData.token, orgId); // Call the API
        setUsers(data); // Update the state with the fetched users
      }
      catch (error) {
        let alertMsg = "Invalid user update request.";
        if (error.response && error.response.status === 400) {
          alertMsg = error.response?.data?.error ? error.response?.data?.error : "Session expired. Please login again.";
        }else if (error.response && error.response.status === 401) {
          alertMsg = error.response?.data?.error ? error.response?.data?.error : "Session expired. Please login again.";
        } else if (error.response && error.response.status === 403) {
          alertMsg = error.response?.data?.error ? error.response?.data?.error : "Your account is inactive. Please contact support.";
        }
        showErrorDialog(alertMsg); // Show error dialog
      }
    } else {
    try {
      const cdata = await createUser(newUser, userData.token ,localStorage.getItem('orgId'),); // Call the API
      const data = await getUsers(userData.token, orgId); // Call the API
      setUsers(data); // Update the state with the fetched users
    }
    catch (error) {
      let alertMsg = "Invalid user create request.";
      if (error.response && error.response.status === 400) {
        alertMsg = error.response?.data?.error ? error.response?.data?.error : "Session expired. Please login again.";
      }else if (error.response && error.response.status === 401) {
        alertMsg = error.response?.data?.error ? error.response?.data?.error : "Session expired. Please login again.";
      } else if (error.response && error.response.status === 403) {
        alertMsg = error.response?.data?.error ? error.response?.data?.error : "Your account is inactive. Please contact support.";
      }
      showErrorDialog(alertMsg); // Show error dialog
    }
  };
  handleCloseDialog();
}

  return (
    <Box sx={{ padding: 4 }}>
      <ErrorDialog />
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

      <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 2,
      }}>
     {/* Display Username */}
     <Typography variant="body1" sx={{ marginRight: 2 }}>
        {userData.username}
      </Typography>

       <Button
          variant="outlined"
          color="secondary"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
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
              <TableRow key={user.uid}>
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
                    }}>
                    {user.status}
                  </Button>
                </TableCell>
                <TableCell>{user.mobile_number}</TableCell>
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
            label="userid"
            name="userid"
            type="text"
            disabled={isEditMode? true : false}
            value={newUser.userid}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Username"
            name="username"
            disabled={isEditMode? true : false}
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
            placeholder="Leave blank to keep the same password"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select
              name="role"
              value={newUser.role}
              onChange={handleInputChange}
              variant="outlined"
            >
            {roles.map((role, index) => (
                  <MenuItem key={index} value={role}>
                    {role}
                  </MenuItem>
                ))}
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
             {statuses.map((role, index) => (
                  <MenuItem key={index} value={role}>
                    {role}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Mobile Number"
            name="mobile_number"
            value={newUser.mobile_number}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Remarks"
            name="remarks"
            value={newUser.remarks}
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