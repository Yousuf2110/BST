import React, { useState } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

// @mui material components
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material-UI icons
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";

// Layout and Footer
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

function CreateAccount() {
  const [formData, setFormData] = useState({
    username: "",
    pinToken: "",
    email: "",
    number: "",
    underUserId: "",
    direction: "right",
    termsAccepted: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, termsAccepted: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.termsAccepted) {
      toast.error("Please accept the terms and conditions.");
      return;
    }

    const payload = {
      token: "12345678",
      name: formData.username,
      email: formData.email,
      mobile: formData.number,
      sponsor: formData.underUserId,
      position: formData.direction,
    };

    try {
      // API call to create account
      const response = await axios.post(
        "https://ecosphere-pakistan-backend.co-m.pk/api/register",
        payload,
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );

      // Check if API response is successful
      if (response.data) {
        toast.success("Account created successfully!");
        setFormData({
          username: "",
          pinToken: "",
          email: "",
          number: "",
          underUserId: "",
          direction: "right",
          termsAccepted: false,
        });
      } else {
        toast.error(response.data.message || "Failed to create the account.");
      }
    } catch (error) {
      // Error handling
      toast.error("Error connecting to the server. Please try again.");
    }
  };

  return (
    <DashboardLayout>
      <ToastContainer />
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
              Create Account
            </MDTypography>
            <MDTypography variant="body2" color="textSecondary">
              تمام ڈیٹا تسلی سے لکھ کر چیک کریں اور پھر &quot;اکاؤنٹ کریئیٹ&quot; پر کلک کریں، بعد
              میں کمپنی ذمہ دار نہیں ہوگی۔
            </MDTypography>
          </MDBox>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Username"
                  name="username"
                  variant="outlined"
                  placeholder="یہاں نام لکھیں"
                  value={formData.username}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: <PersonIcon sx={{ mr: 1 }} />,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Pin/Token"
                  name="pinToken"
                  variant="outlined"
                  placeholder="یہاں نئے صارف کا پن کوڈ لکھیں"
                  value={formData.pinToken}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: <LockIcon sx={{ mr: 1 }} />,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="New user Gmail"
                  name="email"
                  type="email"
                  variant="outlined"
                  placeholder="یہاں نئے صارف کی جی میل لکھیں"
                  value={formData.email}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: <EmailIcon sx={{ mr: 1 }} />,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Account Number"
                  name="number"
                  type="number"
                  variant="outlined"
                  placeholder="نئے کلائنٹ کا ایزی پیسہ یا جیز کیش نمبر درج کریں۔"
                  value={formData.number}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: <PhoneIcon sx={{ mr: 1 }} />,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Under User ID"
                  name="underUserId"
                  variant="outlined"
                  placeholder="جس کے نیچے اکاؤنٹ لگانا ہے، اس کی جی میل لکھیں"
                  value={formData.underUserId}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: <PersonIcon sx={{ mr: 1 }} />,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <MDBox textAlign="left">
                  <RadioGroup
                    name="direction"
                    value={formData.direction}
                    onChange={handleChange}
                    row
                  >
                    <FormControlLabel value="right" control={<Radio />} label="Right" />
                    <FormControlLabel value="left" control={<Radio />} label="Left" />
                  </RadioGroup>
                </MDBox>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.termsAccepted}
                      onChange={handleCheckboxChange}
                      name="termsAccepted"
                    />
                  }
                  label="I accept the Terms and Conditions"
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
                    Create Account
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

export default CreateAccount;
