import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

import BasicLayout from "layouts/authentication/components/BasicLayout";

import logo from "assets/images/logo-2.png";
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

function Basic() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://ecosphere-pakistan-backend.co-m.pk/api/login",
        {
          email: username,
          password: password,
        },
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );

      if (response.status === 200) {
        const token = response.data.token;
        if (token) {
          localStorage.setItem("authToken", token); // Store token in localStorage
        }

        toast.success("Login Successful! Redirecting to dashboard...", {
          position: "top-right",
          autoClose: 2000,
        });
        navigate("/dashboard");
      } else {
        toast.error("Login failed. Unexpected response from server.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (err) {
      toast.error("Login failed. Please check your credentials.", {
        position: "top-right",
        autoClose: 3000,
      });
      console.error(err);
    }
  };

  return (
    <BasicLayout image={bgImage}>
      <ToastContainer />
      <Card>
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
        <MDBox pt={4} pb={3} px={3}>
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
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
