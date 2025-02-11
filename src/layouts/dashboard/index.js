import React, { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import WalletIcon from "@mui/icons-material/Wallet";
import MDTypography from "components/MDTypography";
import { Dialog, DialogContent, DialogTitle, Icon, Typography } from "@mui/material";
import "./styles.css";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
};

function Dashboard() {
  const [data, setData] = useState({
    current_income: "0",
    reward_income: 0,
    total_income: 0,
    available_pins: 0,
  });

  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [showTermsModal, setShowTermsModal] = useState(false);

  const handleOpenModal = (content) => {
    setModalContent(content);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const userData = localStorage.getItem("userData");
  let user = null;

  if (userData) {
    try {
      user = JSON.parse(userData);
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://backend.salespronetworks.com/api/user-dashboard",
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
      <MDBox pt={-2} pb={0}>
        <MDTypography
          variant="h5"
          color="textSecondary"
          fontFamily="'Arial', sans-serif"
          style={{ marginTop: "-10px" }}
        >
          <span style={{ paddingLeft: "20px" }}>Welcome</span>
          <br />
          <span style={{ paddingLeft: "50px" }}>
            {"    "}
            {user?.info.name}
          </span>
        </MDTypography>
      </MDBox>
      <MDBox py={0}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={6}>
            <MDBox mb={1.5}>
              <div class="dashboard-item">
                <div class="dashboard-item-header">
                  <div class="header-left">
                    <h6 style={{ fontSize: 22 }} class="title">
                      Current Income
                    </h6>
                    <h3 class="ammount">
                      <span style={{ fontSize: 22 }}>{`${parseFloat(
                        data?.current_income || "0"
                      ).toFixed(0)}`}</span>
                    </h3>
                  </div>
                  <div class="right-content">
                    <LeaderboardIcon sx={{ height: 40, width: 40 }} color="inherit" />
                  </div>
                </div>
                <div class="dashboard-item-body"></div>
              </div>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <MDBox mb={1.5}>
              <div class="dashboard-item">
                <div class="dashboard-item-header">
                  <div class="header-left">
                    <h6 style={{ fontSize: 22 }} class="title">
                      Reward Income
                    </h6>
                    <h3 class="ammount">
                      <span style={{ fontSize: 22 }}>{`${parseFloat(
                        data?.reward_income || "0"
                      ).toFixed(0)}`}</span>
                    </h3>
                  </div>
                  <div class="right-content">
                    <EmojiEventsIcon sx={{ height: 40, width: 40 }} />
                  </div>
                </div>
                <div class="dashboard-item-body"></div>
              </div>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <MDBox mb={1.5}>
              <div class="dashboard-item">
                <div class="dashboard-item-header">
                  <div class="header-left">
                    <h6 style={{ fontSize: 22 }} class="title">
                      Total Income
                    </h6>
                    <h3 class="ammount">
                      <span style={{ fontSize: 22 }}>{`${parseFloat(
                        data?.total_income || "0"
                      ).toFixed(0)}`}</span>
                    </h3>
                  </div>
                  <div class="right-content">
                    <WalletIcon sx={{ height: 40, width: 40 }} />
                  </div>
                </div>
                <div class="dashboard-item-body"></div>
              </div>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <MDBox mb={1.5}>
              <div class="dashboard-item">
                <div class="dashboard-item-header">
                  <div class="header-left">
                    <h6 style={{ fontSize: 22 }} class="title">
                      Available Pins
                    </h6>
                    <h3 class="ammount">
                      <span style={{ fontSize: 22 }}>{`${parseFloat(
                        data?.available_pins || "0"
                      ).toFixed(0)}`}</span>
                    </h3>
                  </div>
                  <div class="right-content">
                    <ConfirmationNumberIcon sx={{ height: 40, width: 40 }} />
                  </div>
                </div>
                <div class="dashboard-item-body"></div>
              </div>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox mt={3} p={2} bgcolor="gray" display="flex" justifyContent="center" gap={2}>
        <Button
          variant="contained"
          style={{ backgroundColor: "white", color: "black" }}
          onClick={() =>
            handleOpenModal({
              title: "Privacy Policy",
            })
          }
        >
          Privacy Policy
        </Button>
        <Button
          variant="contained"
          style={{ backgroundColor: "white", color: "black" }}
          onClick={() =>
            handleOpenModal({
              title: "Contact Us",
              body: `
        Helpline Number: 03135178113 (WhatsApp)
        
        السلام علیکم،
        کسی بھی قسم کی معلومات یا ٹیکنیکل مسائل کے حل کے لیے آپ اس نمبر پر ہم سے رابطہ کر سکتے ہیں۔
        ہماری ٹیم آپ کی رہنمائی کے لیے دستیاب ہے اور آپ کو ایک گھنٹے کے اندر جواب فراہم کردے گی!
        شکریہ۔
      `,
            })
          }
        >
          Contact Us
        </Button>
      </MDBox>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={modalStyle}>
          <IconButton style={{ position: "absolute", top: 8, right: 8 }} onClick={handleCloseModal}>
            <CloseIcon />
          </IconButton>
          <MDTypography variant="h6" color="textPrimary" mb={2}>
            {modalContent.title}
          </MDTypography>
          <MDTypography variant="body1" color="textSecondary" whiteSpace="pre-line">
            {modalContent.body}
          </MDTypography>
        </Box>
      </Modal>
    </DashboardLayout>
  );
}

export default Dashboard;
