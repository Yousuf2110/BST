import React, { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import WalletIcon from "@mui/icons-material/Wallet";

function Dashboard() {
  const [data, setData] = useState({
    current_income: "0.00",
    reward_income: 0,
    total_income: 0,
    available_pins: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://ecosphere-pakistan-backend.co-m.pk/api/user-dashboard",
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={6}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Current Income"
                count={`${data?.current_income || "0"}`}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon={<EmojiEventsIcon />}
                title="Reward Income"
                count={`${data?.reward_income || "0"}`}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon={<WalletIcon />}
                title="Total Income"
                count={`  ${data?.total_income || "0"}`}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="confirmation_number"
                title="Available Pins"
                count={data?.available_pins || "0"}
              />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Dashboard;
