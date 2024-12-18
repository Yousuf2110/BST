import React, { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material-UI icons
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

// Layout and Footer
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

function ResetPassword() {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, termsAccepted: e.target.checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
      alert("Please accept the terms and conditions.");
      return;
    }
    console.log("Form Submitted:", formData);
  };

  return (
    <DashboardLayout>
      <MDBox display="flex" alignItems="center" justifyContent="center" minHeight="100vh">
        <Card
          sx={{
            maxWidth: 500,
            width: "100%",
            padding: 4,
            borderRadius: 3,
            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
          }}
        >
          <MDBox textAlign="center" mb={3}>
            <MDTypography variant="h4" fontWeight="bold" color="textPrimary" gutterBottom>
              Reset Password
            </MDTypography>
            <MDTypography variant="body2" color="textSecondary">
              Recover Your Account with a New Password
            </MDTypography>
          </MDBox>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Old Password"
                  name="oldPassword"
                  variant="outlined"
                  value={formData.oldPassword}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: <LockIcon sx={{ mr: 1 }} />,
                  }}
                  type="password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="New Password"
                  name="newPassword"
                  variant="outlined"
                  value={formData.newPassword}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: <LockIcon sx={{ mr: 1 }} />,
                  }}
                  type="password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Confirm Password"
                  name="confirmPassword"
                  variant="outlined"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: <LockIcon sx={{ mr: 1 }} />,
                  }}
                  type="password"
                />
              </Grid>
              <Grid item xs={12}>
                <MDBox textAlign="center" mt={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                      background: "linear-gradient(90deg, #ff512f, #dd2476)",
                      color: "#fff",
                      fontWeight: "bold",
                      padding: "12px",
                      textTransform: "uppercase",
                      "&:hover": {
                        background: "linear-gradient(90deg, #dd2476, #ff512f)",
                      },
                    }}
                  >
                    Reset Password
                  </Button>
                </MDBox>
              </Grid>
            </Grid>
          </form>
        </Card>
      </MDBox>
    </DashboardLayout>
  );
}

export default ResetPassword;
