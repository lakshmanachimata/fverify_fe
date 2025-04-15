import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";

const OrgIdValidator = ({ children }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const orgIdParam = searchParams.get("orgId");
    if (!orgIdParam) {
      setOpenDialog(true); // Show dialog if orgId is missing
    }
  }, [searchParams]);

  const handleDialogClose = () => {
    setOpenDialog(false);
    // Optionally redirect to a different page or reload
    // window.location.href = "/";
  };

  return (
    <>
      {children}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <Typography>
            Please try again with a proper orgId query parameter in the URL.
          </Typography>
          <Typography sx={{ marginTop: 2, fontWeight: "bold" }}>
            Example URL: {`${window.location.origin}?orgId=12345`}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary" variant="contained">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default OrgIdValidator;