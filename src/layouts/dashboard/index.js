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
    current_income: "0.00",
    reward_income: 0,
    total_income: 0,
    available_pins: 0,
  });

  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const handleOpenModal = (content) => {
    setModalContent(content);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const userData = localStorage.getItem("userData");
  const user = userData ? JSON.parse(userData) : null;

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
      <MDBox mt={3} p={2} bgcolor="gray" display="flex" justifyContent="center" gap={2}>
        <Button
          variant="contained"
          style={{ backgroundColor: "white", color: "black" }}
          onClick={() =>
            handleOpenModal({
              title: "Privacy Policy",
              // body: "This is the Privacy Policy content. Replace this with the actual policy details.",
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
