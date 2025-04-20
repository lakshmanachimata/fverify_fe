import React, { useState, useEffect } from "react";
import { getProspects, useHandleLogout,getProspectCount } from "../utils/utils"; // Import the API function and logout hook

import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  RadioGroup,
  FormControlLabel,
  Radio,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { Search, FilterList, Download } from "@mui/icons-material";

const ProspectsDashboard = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [employmentType, setEmploymentType] = useState("employee");
  const [prospects, setProspects] = useState([]); // State to store prospects
  const [totalProspects, setTotalProspects] = useState(0); // Total number of prospects
  const [page, setPage] = useState(1); // Current page for pagination
  const [limit] = useState(10); // Number of items per page
  const handleLogout = useHandleLogout(); // Use the custom hook
  const userData = JSON.parse(localStorage.getItem("userData") || "{}"); // Parse user data from localStorage
  const orgId = localStorage.getItem("orgId");


  useEffect(() => {
    const fetchProspectCount = async () => {
      try {
        const count = await getProspectCount(userData.token, orgId); // Call the API
        setTotalProspects(count || 0); // Update total prospects
      } catch (error) {
        console.error("Failed to fetch prospect count:", error);
      }
    };

    fetchProspectCount();
  }, [userData.token, orgId]);

  useEffect(() => {
    const fetchProspects = async () => {
      try {
        const skip = (page - 1) * limit; // Calculate skip value based on page
        const data = await getProspects(userData.token, orgId, skip, limit); // Call the API
        setProspects(data?.prospects || []); // Update prospects state
      } catch (error) {
        alert("Error fetching prospects: " + error.message); // Handle error
      }
    };

    fetchProspects();
  }, [page, userData.token, orgId, limit]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleEmploymentTypeChange = (event, newType) => {
    if (newType !== null) {
      setEmploymentType(newType);
    }
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
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Prospects Dashboard
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            Manage your prospects and loan applications
          </Typography>
        </Box>
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
      {/* Summary Cards */}
      <Grid container spacing={2} sx={{ marginBottom: 4 }}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="textSecondary">
                Total Prospects
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                {totalProspects}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Search and Filter */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <TextField
            placeholder="Search prospects..."
            variant="outlined"
            size="small"
          />
          <Button variant="outlined" startIcon={<FilterList />} size="small">
            Filter
          </Button>
        </Box>
        <IconButton>
          <Download />
        </IconButton>
      </Box>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>App Number</TableCell>
              <TableCell>Prospect ID</TableCell>
              <TableCell>Applicant Name</TableCell>
              <TableCell>Mobile Number</TableCell>
              <TableCell>Home Address</TableCell>
              <TableCell>Office Address</TableCell>
              <TableCell>Loan Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {prospects.map((prospect, index) => (
              <TableRow key={index}>
                <TableCell>{prospect.appNumber}</TableCell>
                <TableCell>{prospect.prospectId}</TableCell>
                <TableCell>{prospect.applicantName}</TableCell>
                <TableCell>{prospect.mobileNumber}</TableCell>
                <TableCell>{prospect.homeAddress}</TableCell>
                <TableCell>{prospect.officeAddress}</TableCell>
                <TableCell>{prospect.loanDetails}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 2,
        }}
      >
        <Typography color="textSecondary">
          Showing {prospects.length} of {totalProspects} entries
        </Typography>
        <Pagination
          count={Math.ceil(totalProspects / limit)}
          page={page}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
        />
      </Box>

      {/* Create New Prospect Button */}
      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: 3 }}
        onClick={handleOpenDialog}
      >
        Create New Prospect
      </Button>

      {/* Dialog for New Prospect Form */}
      <Dialog
  open={openDialog}
  onClose={handleCloseDialog}
  fullWidth
  maxWidth="md"
  sx={{
    border: "2px solid #ccc", // Add a border
    borderRadius: "8px", // Optional: Add rounded corners
  }}
>
  <DialogTitle>Prospect Details</DialogTitle>
  <DialogContent>
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField label="Applicant Name" fullWidth />
      <RadioGroup row>
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="other" control={<Radio />} label="Other" />
      </RadioGroup>
      <TextField label="Age" fullWidth />
      <TextField label="Residential Address" fullWidth />
      <TextField label="Years of Stay" fullWidth />
      <TextField label="Number of Family Members" fullWidth />

      {/* Employment Type Toggle */}
      <ToggleButtonGroup
        value={employmentType}
        exclusive
        onChange={handleEmploymentTypeChange}
        sx={{ marginTop: 2 }}
      >
        <ToggleButton value="employee">Employee</ToggleButton>
        <ToggleButton value="business">Business</ToggleButton>
      </ToggleButtonGroup>

      {/* Employment/Business Fields */}
      {employmentType === "employee" && (
        <>
          <TextField label="Office Address" fullWidth />
          <TextField label="Years of Working in Current Office" fullWidth />
          <TextField label="Role of Applicant" fullWidth />
          <TextField label="EMP ID" fullWidth />
          <TextField label="Previous Experience" fullWidth />
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField label="Gross Salary" fullWidth />
            <TextField label="Net Salary" fullWidth />
          </Box>
        </>
      )}
      {employmentType === "business" && (
        <>
          <TextField label="Business Address" fullWidth />
          <TextField label="Years in Business" fullWidth />
          <TextField label="Type of Business" fullWidth />
          <TextField label="Annual Turnover" fullWidth />
        </>
      )}
    </Box>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseDialog} color="secondary">
      Cancel
    </Button>
    <Button variant="contained" color="primary">
      Save
    </Button>
  </DialogActions>
</Dialog>
    </Box>
  );
};

export default ProspectsDashboard;