import React, { useState, useEffect } from "react";
import { getProspects, useHandleLogout,getProspectCount,createProspect,updateProspect } from "../utils/utils"; // Import the API function and logout hook

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
  const [isEditMode, setIsEditMode] = useState(false); // Track if the dialog is in edit mode
  const [selectedProspect, setSelectedProspect] = useState(null); 

  const handleSaveProspect = async (prospectData) => {
    try {
      if (isEditMode) {
        // Call API to update the prospect
        await updateProspect(userData.token, orgId, prospectData); // Assume `updateProspect` is implemented
        alert("Prospect updated successfully!");
      } else {
        // Call API to create a new prospect
        await createProspect(userData.token, orgId, prospectData);
        alert("Prospect created successfully!");
      }
      setOpenDialog(false); // Close the dialog
      setPage(1); // Reset to the first page
    } catch (error) {
      alert("Error saving prospect: " + error.message); // Handle error
    }
  };

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
        setProspects(data || []); // Update prospects state
      } catch (error) {
        alert("Error fetching prospects: " + error.message); // Handle error
      }
    };

    fetchProspects();
  }, [page, userData.token, orgId, limit]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleOpenDialog = (prospectData = null) => {
    if (prospectData) {
      setIsEditMode(true); // Set edit mode
      setSelectedProspect(prospectData); // Set the selected prospect's data
    } else {
      setIsEditMode(false); // Set create mode
      setSelectedProspect(null); // Clear selected prospect data
    }
    setOpenDialog(true); // Open the dialog
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleEmploymentTypeChange = (event, newType) => {
    if (newType !== null) {
      setEmploymentType(newType);
      setSelectedProspect((prev) => ({
        ...prev,
        employment_type: newType,
      }));
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
              <TableCell sx={{ fontWeight: "bold" }}>Prospect ID</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Applicant Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Age</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Mobile Number</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Home Address</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Office Address</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Employment Type</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {prospects.map((prospect, index) => (
            <TableRow key={index}>
              <TableCell>{prospect.prospect_id}</TableCell>
              <TableCell>{prospect.applicant_name}</TableCell>
              <TableCell>{prospect.age}</TableCell>
              <TableCell>{prospect.mobile_number}</TableCell>
              <TableCell>{prospect.residential_address}</TableCell>
              <TableCell>{prospect.office_address}</TableCell>
              <TableCell>{prospect.employment_type}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  onClick={() => handleOpenDialog(prospect)}
                >
                  Edit
                </Button>
              </TableCell>
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
        onClick={() => handleOpenDialog(null)}
      >
        Create New Prospect
      </Button>

      {/* Dialog for New Prospect Form */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="md">
  <DialogTitle>{isEditMode ? "Edit Prospect" : "Create New Prospect"}</DialogTitle>
  <DialogContent>
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        label="Applicant Name"
        fullWidth
        value={selectedProspect?.applicant_name || ""}
        onChange={(e) =>
          setSelectedProspect((prev) => ({
            ...prev,
            applicant_name: e.target.value,
          }))
        }
      />
      <TextField
        label="Prospect ID"
        fullWidth
        value={selectedProspect?.prospect_id || ""}
        onChange={(e) =>
          setSelectedProspect((prev) => ({
            ...prev,
            prospect_id: e.target.value,
          }))
        }
        disabled={isEditMode} // Disable editing Prospect ID in edit mode
      />
      <RadioGroup
        row
        value={selectedProspect?.gender || ""}
        onChange={(e) =>
          setSelectedProspect((prev) => ({
            ...prev,
            gender: e.target.value,
          }))
        }
      >
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="other" control={<Radio />} label="Other" />
      </RadioGroup>
      <TextField
        label="Age"
        fullWidth
        value={selectedProspect?.age || ""}
         inputMode="numeric"
         onChange={(e) =>
          setSelectedProspect((prev) => ({
            ...prev,
            age: e.target.value.replace(/\D/g, ""), // Remove non-numeric characters
          }))
        }
      />
      <TextField
        label="Residential Address"
        fullWidth
        value={selectedProspect?.residential_address || ""}
        onChange={(e) =>
          setSelectedProspect((prev) => ({
            ...prev,
            residential_address: e.target.value,
          }))
        }
      />
      <TextField
        label="Years of Stay"
        fullWidth
        value={selectedProspect?.years_of_stay || ""}
         inputMode="numeric"
        onChange={(e) =>
          setSelectedProspect((prev) => ({
            ...prev,
            years_of_stay: e.target.value,
          }))
        }
      />
      <TextField
        label="Number of Family Members"
        fullWidth
        value={selectedProspect?.number_of_family_members || ""}
         inputMode="numeric"
        onChange={(e) =>
          setSelectedProspect((prev) => ({
            ...prev,
            number_of_family_members: e.target.value,
          }))
        }
      />
      {/* Employment Type Toggle */}
      <ToggleButtonGroup
        value={selectedProspect?.employment_type || employmentType}
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
          <TextField label="Office Address" value={selectedProspect?.office_address } 
                  onChange={(e) =>
                    setSelectedProspect((prev) => ({
                      ...prev,
                      office_address: e.target.value,
                    }))
                  }
                  fullWidth />
          <TextField label="Years of Working in Current Office"  value={selectedProspect?.years_in_current_office} inputMode="numeric" 
                  onChange={(e) =>
                    setSelectedProspect((prev) => ({
                      ...prev,
                      years_in_current_office: e.target.value,
                    }))
                  }
                  fullWidth />
          <TextField label="Role of Applicant" value={selectedProspect?.role} 
                  onChange={(e) =>
                    setSelectedProspect((prev) => ({
                      ...prev,
                      role: e.target.value,
                    }))
                  }
                  fullWidth />
          <TextField label="EMP ID" value={selectedProspect?.emp_id}  
                  onChange={(e) =>
                    setSelectedProspect((prev) => ({
                      ...prev,
                      emp_id: e.target.value,
                    }))
                  }
                  fullWidth />
          <TextField label="Previous Experience"   value={selectedProspect?.previous_experience }  inputMode="numeric"
                  onChange={(e) =>
                    setSelectedProspect((prev) => ({
                      ...prev,
                      previous_experience: e.target.value,
                    }))
                  } fullWidth />
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField label="Gross Salary" value={selectedProspect?.gross_salary }
                    onChange={(e) =>
                      setSelectedProspect((prev) => ({
                        ...prev,
                        gross_salary: e.target.value,
                      }))
                    }
                    inputMode="numeric"
                     fullWidth />
            <TextField label="Net Salary"  value={selectedProspect?.net_salary } 
                    onChange={(e) =>
                      setSelectedProspect((prev) => ({
                        ...prev,
                        net_salary: e.target.value,
                      }))
                    }
                    inputMode="numeric"
                    fullWidth />
          </Box>
        </>
      )}
      {employmentType === "business" && (
        <>
          <TextField label="Business Address" value={selectedProspect?.office_address || ""} 
                  onChange={(e) =>
                    setSelectedProspect((prev) => ({
                      ...prev,
                      office_address: e.target.value,
                    }))
                  }
                  fullWidth />
          <TextField label="Years in Business"  value={selectedProspect?.years_in_current_office} inputMode="number"
                  onChange={(e) =>
                    setSelectedProspect((prev) => ({
                      ...prev,
                      years_in_current_office: e.target.value,
                    }))
                  }
                   fullWidth />
          <TextField label="Type of Business" value={selectedProspect?.role}  
                  onChange={(e) =>
                    setSelectedProspect((prev) => ({
                      ...prev,
                      role: e.target.value,
                    }))
                  }
                  fullWidth />
          <TextField label="Annual Turnover" value={selectedProspect?.gross_salary } 
                  onChange={(e) =>
                    setSelectedProspect((prev) => ({
                      ...prev,
                      gross_salary: e.target.value,
                    }))
                  }
                  fullWidth />
        </>
      )}
    </Box>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseDialog} color="secondary">
      Cancel
    </Button>
    <Button
      variant="contained"
      color="primary"
      onClick={() => handleSaveProspect(selectedProspect)}
    >
      {isEditMode ? "Update" : "Save"}
    </Button>
  </DialogActions>
</Dialog>
    </Box>
  );
};

export default ProspectsDashboard;