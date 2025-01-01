import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import LockIcon from "@mui/icons-material/Lock";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import BasicLayout from "layouts/authentication/components/BasicLayout";

import logo from "assets/images/logo-2.png";
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { useAuth } from "context/AuthContext";
import MDTypography from "components/MDTypography";

function Basic() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [bgColors, setBgColors] = useState({
    card: "info",
    button: "info",
  });
  const [resetFormData, setResetFormData] = useState({
    user_email: "",
    account_number: "",
    transaction_id: "",
    amount: "",
    payment_screenshot: null,
  });
  const { login } = useAuth();

  // Array of available Material-UI colors
  const availableColors = ["info", "success", "warning", "error", "primary", "secondary"];

  // Function to get random color from available colors
  const getRandomColor = () => {
    return availableColors[Math.floor(Math.random() * availableColors.length)];
  };

  // Effect for changing colors every 2 seconds
  useEffect(() => {
    const colorInterval = setInterval(() => {
      setBgColors({
        card: getRandomColor(),
        button: getRandomColor(),
      });
    }, 2000);

    // Cleanup interval on component unmount
    return () => clearInterval(colorInterval);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    try {
      const response = await axios.post("https://ecosphere-pakistan-backend.co-m.pk/api/login", {
        email: username,
        password: password,
      });

      if (response.status === 200) {
        const token = response.data.token;
        const userRole = response.data?.info?.role;

        if (userRole !== "user") {
          toast.error("You do not have permission to log in.");
          return;
        }

        if (token) {
          localStorage.setItem("authToken", token);
          login(token);
        }

        localStorage.setItem("userData", JSON.stringify(response.data));
        toast.success("Login Successful!");
      }
    } catch (err) {
      handleApiError(err);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (
      !resetFormData.user_email ||
      !resetFormData.account_number ||
      !resetFormData.transaction_id ||
      !resetFormData.amount ||
      !resetFormData.payment_screenshot
    ) {
      toast.error("Please fill in all fields and upload the payment screenshot.");
      return;
    }

    const formData = new FormData();
    Object.keys(resetFormData).forEach((key) => {
      formData.append(key, resetFormData[key]);
    });

    try {
      const response = await axios.post(
        "https://ecosphere-pakistan-backend.co-m.pk/api/reset-password",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response?.data) {
        setResetFormData({
          user_email: "",
          account_number: "",
          transaction_id: "",
          amount: "",
          payment_screenshot: null,
        });

        toast.success("Password reset request submitted successfully!");

        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) {
          fileInput.value = "";
        }

        setTimeout(() => {
          setIsResetPassword(false);
        }, 1500);
      }
    } catch (err) {
      handleApiError(err);
    }
  };

  const handleApiError = (err) => {
    if (err.response) {
      const errorMessage =
        err.response.data?.message || "An error occurred while processing your request.";
      toast.error(errorMessage);
    } else if (err.request) {
      toast.error("No response from server. Please check your internet connection.");
    } else {
      toast.error("Something went wrong. Please try again.");
    }
    console.error("Reset password error:", err);
  };

  const handleFileChange = (e) => {
    setResetFormData((prev) => ({
      ...prev,
      payment_screenshot: e.target.files[0],
    }));
  };

  const handleResetFormChange = (e) => {
    const { name, value } = e.target;
    setResetFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <BasicLayout image={bgImage}>
      <ToastContainer position="top-right" autoClose={3000} />
      <Card>
        {!isResetPassword && (
          <MDBox
            variant="gradient"
            bgColor={bgColors.card}
            borderRadius="lg"
            coloredShadow={bgColors.card}
            mx={2}
            mt={-3}
            p={2}
            mb={1}
            textAlign="center"
            sx={{
              transition: "all 0.5s ease",
            }}
          >
            <MDBox
              component="img"
              src={logo}
              alt="background"
              borderRadius="lg"
              width="60%"
              height="60"
              sx={{ objectFit: "cover" }}
            />
          </MDBox>
        )}

        <MDBox pt={4} pb={3} px={3} position="relative">
          {isResetPassword ? (
            <>
              <MDBox textAlign="center" mb={3}>
                <MDTypography variant="h4" fontWeight="bold" color="textPrimary" gutterBottom>
                  Reset Password
                </MDTypography>
                <MDTypography variant="body2" color="textSecondary">
                  اہم نوٹ : یاد رکھیں جس اکاؤنٹ کا پاسورڈ ریسیٹ کرنا ہے اس ہی اکاؤنٹ نمبر سے 30 روپے
                  کمپنی کے نمبر پر بھیج کر ریکوسٹ لگائیں جعلی ریکوسٹ لگانے پر آپ کی پاسورڈ ریسیٹ کی
                  سروس معطل ہو جائے گی
                </MDTypography>
              </MDBox>
              <form onSubmit={handleResetPassword}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="user_email"
                      variant="outlined"
                      value={resetFormData.user_email}
                      onChange={handleResetFormChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Account Number"
                      name="account_number"
                      variant="outlined"
                      value={resetFormData.account_number}
                      onChange={handleResetFormChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Transaction ID"
                      name="transaction_id"
                      variant="outlined"
                      value={resetFormData.transaction_id}
                      onChange={handleResetFormChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Amount"
                      name="amount"
                      type="number"
                      variant="outlined"
                      value={resetFormData.amount}
                      onChange={handleResetFormChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      component="label"
                      variant="outlined"
                      startIcon={<CloudUploadIcon />}
                      fullWidth
                    >
                      Upload Payment Screenshot
                      <input type="file" hidden accept="image/*" onChange={handleFileChange} />
                    </Button>
                    {resetFormData.payment_screenshot && (
                      <MDTypography variant="caption" color="success">
                        File selected: {resetFormData.payment_screenshot.name}
                      </MDTypography>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <MDButton
                      variant="gradient"
                      color={bgColors.button}
                      fullWidth
                      type="submit"
                      sx={{
                        transition: "all 0.5s ease",
                      }}
                    >
                      Submit Reset Request
                    </MDButton>
                  </Grid>
                </Grid>
              </form>
            </>
          ) : (
            <form onSubmit={handleLogin}>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  label="User Name"
                  fullWidth
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="password"
                  label="Password"
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </MDBox>
              <MDBox mt={4} mb={1}>
                <MDButton
                  variant="gradient"
                  color={bgColors.button}
                  fullWidth
                  type="submit"
                  sx={{
                    transition: "all 0.5s ease",
                  }}
                >
                  Login
                </MDButton>
              </MDBox>
            </form>
          )}
          <MDBox mt={2} textAlign="center">
            <Button
              onClick={() => setIsResetPassword(!isResetPassword)}
              color={bgColors.button}
              sx={{
                transition: "all 0.5s ease",
              }}
            >
              {isResetPassword ? "" : "Reset Password"}
            </Button>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
