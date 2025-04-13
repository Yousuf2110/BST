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
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import BadgeIcon from "@mui/icons-material/Badge";

// Material-UI icons
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";

// Layout and Footer
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function CreateAccount() {
  const token = localStorage.getItem("authToken");
  const [formData, setFormData] = useState({
    username: "",
    pinToken: "",
    email: "",
    number: "",
    underUserId: "",
    direction: "right",
    bank: "",
    accountTitle: "",
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
      token: formData?.pinToken,
      name: formData.username,
      email: formData.email,
      mobile: formData.number,
      sponsor: formData.underUserId,
      position: formData.direction,
      bank: formData.bank,
      account_title: formData.accountTitle,
    };

    try {
      const response = await axios.post(
        "https://backend.salespronetworks.com/api/create-user",
        payload,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        alert("User Joined Successfully ✔️");
        setFormData({
          username: "",
          pinToken: "",
          email: "",
          number: "",
          underUserId: "",
          direction: "right",
          bank: "",
          accountTitle: "",
          termsAccepted: false,
        });
      } else {
        toast.error(response.data.message || "Failed to create the account.");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(
          error.response.data.message || "Error connecting to the server. Please try again."
        );
      } else {
        toast.error("Error connecting to the server. Please try again.");
      }
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
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
              تمام ڈیٹا تسلی سے لکھ کر چیک کریں اور پھر "Create Account" پر کلک کریں۔ اکاؤنٹ بننے کے
              بعد ڈیٹا چینج نہیں ہوتا !
            </MDTypography>
          </MDBox>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
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
                    startAdornment: <VpnKeyIcon sx={{ mr: 1 }} />,
                  }}
                />
              </Grid>
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
                  placeholder="نئے صارف کا اکاؤنٹ نمبر لکھیں"
                  value={formData.number}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: <AccountBalanceIcon sx={{ mr: 1 }} />,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  fullWidth
                  variant="outlined"
                  sx={{
                    "& .MuiInputLabel-root": { color: "gray" },
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                >
                  <InputLabel id="payment-method-label" sx={{ fontWeight: "bold" }}>
                    Payment Method
                  </InputLabel>
                  <Select
                    labelId="payment-method-label"
                    name="bank"
                    value={formData.bank || ""}
                    onChange={handleChange}
                    label="Payment Method"
                    sx={{
                      height: "30px",
                    }}
                  >
                    <MenuItem value="jazzcash">JazzCash</MenuItem>
                    <MenuItem value="easypaisa">EasyPaisa</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Account Title"
                  name="accountTitle"
                  variant="outlined"
                  placeholder="یہاں اپنے اکاؤنٹ کا نام لکھیں۔"
                  value={formData.accountTitle}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: <BadgeIcon sx={{ mr: 1 }} />,
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
