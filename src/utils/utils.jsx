import { useNavigate } from "react-router-dom";
import axios from "axios";
import { verifyDomain } from "../App";
import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";

export const useHandleLogout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.setItem("userData", null);

    // Navigate to the sign-in page with orgId
    navigate("/?orgId=" + localStorage.getItem("orgId"));
  };

  return handleLogout;
};

export const useErrorDialog = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const showErrorDialog = (msg) => {
    console.log("Error Dialog Triggered:", msg); // Debugging log
    setMessage(msg);
    setOpen(true);
  };

  const closeErrorDialog = () => {
    setOpen(false);
    setMessage("");
  };

  const ErrorDialog = () => (
    <Dialog open={open} onClose={closeErrorDialog} fullWidth maxWidth="sm">
      <DialogTitle>Error</DialogTitle>
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeErrorDialog} color="primary" variant="contained">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );

  return { showErrorDialog, ErrorDialog };
};


export const getUsers = async (token, orgId) => {
  try {
    const response = await axios.get(`${verifyDomain}/api/v1/users`, {
      headers: {
        Authorization: "Bearer "+ token, // Authorization header with user token
        org_id: orgId, // Organization ID header
      },
    });

    // Return the response data
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; // Re-throw the error for handling in the calling function
  }
};

export const getRoles = async (orgId) => {
  try {
    const response = await axios.get(`${verifyDomain}/api/v1/users/roles`, {
      headers: {
        org_id: orgId, // Organization ID header
      },
    });

    // Return the response data
    return response.data;
  } catch (error) {
    console.error("Error fetching roles:", error);
    throw error; // Re-throw the error for handling in the calling function
  }
};

export const getStatuses = async (orgId) => {
  try {
    const response = await axios.get(`${verifyDomain}/api/v1/users/statuses`, {
      headers: {
        org_id: orgId, // Organization ID header
      },
    });

    // Return the response data
    return response.data;
  } catch (error) {
    console.error("Error fetching statuses:", error);
    throw error; // Re-throw the error for handling in the calling function
  }
};

export const signInUser = async (username, password, org_id) => {
  try {
    const response = await axios.post(`${verifyDomain}/api/v1/users/login`, {
      username,
      password,
      org_id
    });

    // Return the response data
    return response.data;
  } catch (error) {
    console.error("Error fetching signin:", error);
    throw error; // Re-throw the error for handling in the calling function
  }
};


export const updateUser = async (newUser, token,org_id) => {
  try {
    const response = await axios.put(`${verifyDomain}/api/v1/users/uid/${newUser.uid}`, 
      {
        userid : newUser.userid,
        username : newUser.username,
        password: newUser.password,
        role:  newUser.role,
        status:newUser.status,
        mobile_number:newUser.mobile_number,
        org_id: org_id,
        remarks:newUser.remarks,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Authorization header with user token
          org_id: org_id, // Organization ID header
        },
      }
  );
    // Return the response data
    return response.data;
  } catch (error) {
    console.error("Error fetching signin:", error);
    throw error; // Re-throw the error for handling in the calling function
  }
};



export const createUser = async (newUser, token, org_id) => {
  try {
    const response = await axios.post(`${verifyDomain}/api/v1/users`,
      {
        userid: newUser.userid,
        username: newUser.username,
        password: newUser.password,
        role: newUser.role,
        status: newUser.status,
        mobile_number: newUser.mobile_number,
        org_id: org_id,
        remarks: newUser.remarks,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Authorization header with user token
          org_id: org_id, // Organization ID header
        },
      }
    );

    // Return the response data
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error; // Re-throw the error for handling in the calling function
  }
};

export const getProspects = async (token, orgId, skip = 0, limit = 10) => {
  try {
    const response = await axios.get(`${verifyDomain}/api/v1/prospects`, {
      headers: {
        Authorization: `Bearer ${token}`, // Authorization header with user token
        org_id: orgId, // Organization ID header
      },
      params: {
        skip, // Query parameter for pagination
        limit, // Query parameter for pagination
      },
    });

    // Return the response data
    return response.data;
  } catch (error) {
    console.error("Error fetching prospects:", error);
    throw error; // Re-throw the error for handling in the calling function
  }
};
export const getProspectCount = async (token, orgId) => {
  try {
    const response = await axios.get(`${verifyDomain}/api/v1/prospects/count`, {
      headers: {
        Authorization: `Bearer ${token}`, // Authorization header with user token
        org_id: orgId, // Organization ID header
      },
    });

    // Return the count from the response
    return response.data.count;
  } catch (error) {
    console.error("Error fetching prospect count:", error);
    throw error; // Re-throw the error for handling in the calling function
  }
};