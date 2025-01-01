import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate

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
  const [resetFormData, setResetFormData] = useState({
    user_email: "",
    account_number: "",
    transaction_id: "",
    amount: "",
    payment_screenshot: null,
  });
  const { login } = useAuth();
  const navigate = useNavigate(); // Initialize useNavigate

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

        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }
    } catch (err) {
      handleApiError(err);
    }
  };

  const handleApiError = (err) => {
    if (err.response) {
      toast.error(err.response.data.message || "An error occurred.");
    } else if (err.request) {
      toast.error("No response from server. Please check your internet connection.");
    } else {
      toast.error("Something went wrong. Please try again.");
    }
    console.error(err);
  };

  // Other functions (handleResetPassword, handleFileChange, etc.) remain unchanged.

  return (
    <BasicLayout image={bgImage}>
      <ToastContainer position="top-right" autoClose={3000} />
      <Card>
        {!isResetPassword && (
          <MDBox
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
            mx={2}
            mt={-3}
            p={2}
            mb={1}
            textAlign="center"
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
            <>{/* Reset Password Form */}</>
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
                <MDButton variant="gradient" color="info" fullWidth type="submit">
                  Login
                </MDButton>
              </MDBox>
            </form>
          )}
          <MDBox mt={2} textAlign="center">
            <Button onClick={() => setIsResetPassword(!isResetPassword)} color="primary">
              {!isResetPassword && "Reset Password"}
            </Button>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
