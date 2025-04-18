import React, { useState } from "react";
import { useHandleLogout } from "../utils/utils"; // Import the custom hook

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
  const handleLogout = useHandleLogout(); // Use the custom hook
  const userData = JSON.parse(localStorage.getItem("userData") ? localStorage.getItem("userData"): "{}"); // Parse user data from localStorage


  const rows = [
    {
      appNumber: "APP001",
      prospectId: "PROSO01",
      applicantName: "John Anderson",
      mobileNumber: "+1 (555) 123-4567",
      homeAddress: "123 Maple Street, Brooklyn, NY",
      officeAddress: "456 Business Ave, Manhattan, NY",
      loanDetails: "$50,000 - Business Expansion",
    },
    {
      appNumber: "APP002",
      prospectId: "PROSO02",
      applicantName: "Sarah Williams",
      mobileNumber: "+1 (555) 234-5678",
      homeAddress: "789 Oak Road, Queens, NY",
      officeAddress: "321 Corporate Blvd, Manhattan, NY",
      loanDetails: "$25,000 - Education",
    },
    {
      appNumber: "APP003",
      prospectId: "PROSO03",
      applicantName: "Michael Brown",
      mobileNumber: "+1 (555) 345-6789",
      homeAddress: "456 Pine Lane, Staten Island, NY",
      officeAddress: "789 Industry Park, Brooklyn, NY",
      loanDetails: "$75,000 - Property Purchase",
    },
    {
      appNumber: "APP004",
      prospectId: "PROSO04",
      applicantName: "Emily Davis",
      mobileNumber: "+1 (555) 456-7890",
      homeAddress: "234 Cedar Ave, Bronx, NY",
      officeAddress: "567 Office Tower, Manhattan, NY",
      loanDetails: "$30,000 - Debt Consolidation",
    },
    {
      appNumber: "APP005",
      prospectId: "PROSO05",
      applicantName: "Robert Wilson",
      mobileNumber: "+1 (555) 567-8901",
      homeAddress: "890 Elm Street, Brooklyn, NY",
      officeAddress: "123 Work Plaza, Queens, NY",
      loanDetails: "$100,000 - Business Startup",
    },
  ];

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
                156
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="textSecondary">
                Active Applications
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                38
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="textSecondary">
                Total Loan Amount
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                $2.4M
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
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.appNumber}</TableCell>
                <TableCell>{row.prospectId}</TableCell>
                <TableCell>{row.applicantName}</TableCell>
                <TableCell>{row.mobile_number}</TableCell>
                <TableCell>{row.homeAddress}</TableCell>
                <TableCell>{row.officeAddress}</TableCell>
                <TableCell>{row.loanDetails}</TableCell>
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
        <Typography color="textSecondary">Showing 5 of 156 entries</Typography>
        <Pagination count={10} variant="outlined" shape="rounded" />
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