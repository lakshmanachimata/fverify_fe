import { useNavigate } from "react-router-dom";
import axios from "axios";
import { verifyDomain } from "../App";

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