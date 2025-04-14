import React from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const SignInScreen = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = () => {
    // Add authentication logic here if needed
    navigate("/dashboard");
  };

  return (
    <Grid container style={{ height: "100vh" }}>
      {/* Left Section */}
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
          {/* Email Input */}
          <TextField
            fullWidth
            label="Email"
            type="email"
            placeholder="Enter your email"
            margin="normal"
            variant="outlined"
          />

          {/* Password Input */}
          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            margin="normal"
            variant="outlined"
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

          {/* Role Selection */}
          <Select
            fullWidth
            displayEmpty
            defaultValue=""
            variant="outlined"
            margin="normal"
            sx={{ mt: 2 }}
          >
            <MenuItem value="" disabled>
              Select your role
            </MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="user">User</MenuItem>
          </Select>

          {/* Remember Me and Forgot Password */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 2,
            }}
          >
            <FormControlLabel control={<Checkbox />} label="Remember me" />
            <Button href="/forgot-password" variant="text" color="primary">
              Forgot Password?
            </Button>
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