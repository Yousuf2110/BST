import React, { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

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
import Footer from "examples/Footer";

function PinRequest() {
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
              PIN Request
            </MDTypography>
            <MDTypography variant="body2" color="textSecondary">
              اد رکھیں جعلی ٹرانزیکشن آئ ڈی یا جعلی پن ریکوسٹ لگانے سے آپ کا اکاؤنٹ بلاک ہوسکتا ہے
              تسلی سے درست معلومات درج کریں تاکہ دشواری کا سامنا نہ کرنا پڑے
            </MDTypography>
          </MDBox>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Account #"
                  name="username"
                  variant="outlined"
                  placeholder="اُس میں لکھ دیں کہ پیمنٹ والے اکاؤنٹ کا نمبر درج کریں۔"
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
                  label="Trx ID"
                  name="trxId"
                  variant="outlined"
                  placeholder="یہاں اپنی ٹرانزیکشن آئی ڈی ڈالیں۔"
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
                  label="Amount"
                  name="amount"
                  type="number"
                  variant="outlined"
                  placeholder="یہاں پن کی قیمت لکھیں۔"
                  value={formData.email}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: <EmailIcon sx={{ mr: 1 }} />,
                  }}
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
                    Request Pin
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

export default PinRequest;
