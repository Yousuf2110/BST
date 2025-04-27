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
import { useAuth } from "context/AuthContext";
import { Avatar, CircularProgress, Toolbar, Typography } from "@mui/material";

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
  const [profileImage, setProfileImage] = useState(null); // State for profile image
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const { setProfileImage: setGlobalProfileImage } = useAuth();

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
        setProfileImage(response.data?.profile_image); // Set initial profile image
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Handle image upload
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsLoading(true); // Show loader

    try {
      // Create FormData and append the file
      const formData = new FormData();
      formData.append("profile_image", file);

      // Make the API request to update the profile picture
      const token = user?.info?.token; // Assuming the token is stored in the user object
      const response = await axios.post(
        "https://backend.salespronetworks.com/api/update-profile-picture",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Update local state with the uploaded image
      setProfileImage(URL.createObjectURL(file) || userData?.info?.profile_image);

      // Update global state if needed
      setGlobalProfileImage(URL.createObjectURL(file) || userData?.info?.profile_image);

      // Update user data in localStorage
      if (response.data.profile_image) {
        const updatedUserData = {
          ...user,
          info: { ...user.info, profile_image: response.data.profile_image },
        };
        localStorage.setItem("userData", JSON.stringify(updatedUserData));
      }

      console.log("Profile picture updated:", response.data);
    } catch (error) {
      console.error("Error updating profile picture:", error);
    } finally {
      setIsLoading(false); // Hide loader
    }
  };

  // Determine userType based on user_count
  const determineUserType = (userCount) => {
    if ([1, 2].includes(userCount)) {
      return "Lite User";
    } else if ([3, 4, 5, 6].includes(userCount)) {
      return "Medium User";
    } else if (userCount === 7) {
      return "Premium User";
    } else {
      return "Lite User";
    }
  };

  const userType = determineUserType(user?.user_count || 1);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Toolbar>
        <div
          style={{
            display: "flex",
            width: "98%",
            alignItems: "center",
            justifyContent: "flex-end",
            position: "absolute",
          }}
        >
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            id="profile-image-upload"
            onChange={handleImageUpload} // Handle image upload
          />
          <label
            htmlFor="profile-image-upload"
            style={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {isLoading ? (
              <CircularProgress size={70} />
            ) : (
              <Avatar
                src={profileImage || undefined}
                alt="Profile"
                sx={{
                  width: 70,
                  height: 70,
                  cursor: "pointer",
                  border: "4px solid orange",
                  borderRadius: "50%",
                }}
              />
            )}
            <Typography
              variant="caption"
              sx={{
                display: "block",
                marginTop: "8px", // Adjust spacing as needed
                color: "#000",
                fontWeight: "bold",
                fontFamily: "Arial, sans-serif",
                fontSize: "20px",
                textDecoration: "underline",
              }}
            >
              {userType || "Lite User"}
            </Typography>
          </label>
        </div>
      </Toolbar>
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
                count={`${parseFloat(data?.current_income || "0").toFixed(0)}`}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon={<EmojiEventsIcon />}
                title="Reward Income"
                count={`${parseFloat(data?.reward_income || "0").toFixed(0)}`}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon={<WalletIcon />}
                title="Total Income"
                count={`${parseFloat(data?.total_income || "0").toFixed(0)}`}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="confirmation_number"
                title="Available Pins"
                count={`${parseFloat(data?.available_pins || "0").toFixed(0)}`}
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
