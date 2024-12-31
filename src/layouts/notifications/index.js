/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function ComingSoon() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox display="flex" alignItems="center" justifyContent="center" height="100vh">
        <Card
          sx={{
            p: 4,
            borderRadius: 4,
            boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
            maxWidth: "500px",
          }}
        >
          <Typography variant="h2" component="h1" fontWeight="bold" sx={{ mb: 2 }}>
            Coming Soon 🚀
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            We are working hard to bring you something amazing! Stay tuned for updates.
          </Typography>
          <Box
            sx={{
              mt: 2,
              height: "5px",
              width: "100%",
              background: "linear-gradient(to right, #4285f4, #34a853, #fbbc05, #ea4335)",
              borderRadius: "5px",
              animation: "loading 2s infinite",
            }}
          ></Box>
          <style>{`
            @keyframes loading {
              0% { width: 0%; }
              50% { width: 75%; }
              100% { width: 100%; }
            }
          `}</style>
        </Card>
      </MDBox>
    </DashboardLayout>
  );
}

export default ComingSoon;
