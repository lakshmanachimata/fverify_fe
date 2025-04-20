import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { signInUser, useErrorDialog } from "../utils/utils";

const SignInScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("lowner"); // State for username
  const [password, setPassword] = useState("testpwd"); // State for password
  const navigate = useNavigate();
  const { showErrorDialog, ErrorDialog } = useErrorDialog(); // Use the error dialog hook

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = async () => {
    try {
     const data = await signInUser(username,password, localStorage.getItem('orgId')); // Call the API
      // Store the response data in localStorage
      localStorage.setItem("userData", JSON.stringify(data));
      // Navigate to the dashboard
      navigate("/dashboard/prospects");
    }
    catch (error) {
      console.error("Login failed:", error);
      let alertMsg = "Login failed. Please check your credentials and try again.";
      if (error.response && error.response.status === 401) {
        alertMsg = error.response?.data?.error ? error.response?.data?.error : "Invalid username or password.";
      } else if (error.response && error.response.status === 403) {
        alertMsg = "Your account is inactive. Please contact support.";
      }
      showErrorDialog(alertMsg);
    }
};

  return (
    <Grid container style={{ height: "100vh" }}>
      {/* Left Section */}
      <ErrorDialog />

      <Grid
        item
        xs={12}
        md={6}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffffff",
          padding: "2rem",
        }}
      >
        <img
          src="/path/to/logo.png"
          alt="Logo"
          style={{ marginBottom: "2rem", width: "150px" }}
        />
        <img
          src="/path/to/welcome-image.png"
          alt="Welcome"
          style={{ width: "80%", marginBottom: "1rem" }}
        />
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Welcome Back
        </Typography>
        <Typography color="textSecondary">
          Sign in to continue to your account
        </Typography>
      </Grid>

      {/* Right Section */}
      <Grid
        item
        xs={12}
        md={6}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Sign In
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          Please enter your details
        </Typography>

        <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
          {/* Username Input */}
          <TextField
            fullWidth
            label="User Name"
            type="text"
            placeholder="Enter your user name"
            margin="normal"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          {/* Password Input */}
          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            margin="normal"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 2,
            }}
          >
            {/* <Button href="/forgot-password" variant="text" color="primary">
              Forgot Password?
            </Button> */}
          </Box>

          {/* Sign In Button */}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, py: 1 }}
            onClick={handleSignIn}
          >
            Sign In
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignInScreen;