import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// @mui material components
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material-UI icons
import LockIcon from "@mui/icons-material/Lock";

// Layout and Footer
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New Password and Confirm Password do not match.");
      return;
    }

    try {
      setIsLoading(true);
      const payload = new URLSearchParams();
      payload.append("old_password", formData.oldPassword);
      payload.append("new_password", formData.newPassword);

      const response = await axios.post(
        "https://ecosphere-pakistan-backend.co-m.pk/api/change-password",
        payload,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        toast.success("Password changed successfully!");
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        toast.error(response.data.message || "Something went wrong!");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to change the password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
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
              Change Password
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
                    disabled={isLoading}
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
                    {isLoading ? "Submitting..." : "Reset Password"}
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

export default ChangePassword;
