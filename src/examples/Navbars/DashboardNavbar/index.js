import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import Breadcrumbs from "examples/Breadcrumbs";
import NotificationItem from "examples/Items/NotificationItem";
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";
import { useMaterialUIController, setTransparentNavbar, setMiniSidenav } from "context";
import { Avatar, Typography } from "@mui/material";
import axios from "axios"; // Import axios for API calls
import { useAuth } from "context/AuthContext";

function DashboardNavbar({ absolute, light, isMini }) {
  const [userDataString] = useState(localStorage.getItem("userData"));
  const userData = userDataString ? JSON.parse(userDataString) : null;

  let userType = "Lite User";
  if (userData?.user_count === 1 || userData?.user_count === 2) {
    userType = "Lite User";
  } else if ([3, 4, 5, 6].includes(userData?.user_count)) {
    userType = "Standard User";
  } else if (userData?.user_count === 7) {
    userType = "Premium User";
  }

  console.log("image", userData?.info?.profile_image);

  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator, darkMode } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const { profileImage, setProfileImage } = useAuth();
  const route = useLocation().pathname.split("/").slice(1);

  useEffect(() => {
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    window.addEventListener("scroll", handleTransparentNavbar);
    handleTransparentNavbar();

    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleCloseMenu = () => setOpenMenu(false);

  // Handle image upload
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      // Create FormData and append the file
      const formData = new FormData();
      formData.append("profile_image", file);

      // Make the API request to update the profile picture
      const token = userData?.token; // Assuming the token is stored in the user object
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

      setProfileImage(URL.createObjectURL(file) || userData?.info?.profile_image);
      if (response.data.profile_image) {
        const updatedUserData = {
          ...userData,
          info: { ...userData.info, profile_image: response.data.profile_image },
        };
        localStorage.setItem("userData", JSON.stringify(updatedUserData));
      }

      console.log("Profile picture updated:", response.data);
    } catch (error) {
      console.error("Error updating profile picture:", error);
    }
  };

  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      <NotificationItem icon={<Icon>email</Icon>} title="Check new messages" />
      <NotificationItem icon={<Icon>podcasts</Icon>} title="Manage Podcast sessions" />
      <NotificationItem icon={<Icon>shopping_cart</Icon>} title="Payment successfully completed" />
    </Menu>
  );

  const iconsStyle = ({ palette: { dark, white, text }, functions: { rgba } }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : dark.main;

      if (transparentNavbar && !light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    },
  });

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light, darkMode })}
    >
      {isMini ? null : (
        <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
          <MDBox color={light ? "white" : "inherit"}>
            <Link to="/authentication/sign-in/basic"></Link>
            <IconButton
              size="large"
              disableRipple
              color="inherit"
              sx={navbarMobileMenu}
              onClick={handleMiniSidenav}
            >
              <Icon
                sx={{
                  ...iconsStyle,
                  fontSize: "6.5rem",
                }}
              >
                {miniSidenav ? "reorder" : "menu"}
              </Icon>
            </IconButton>

            {renderMenu()}
          </MDBox>
        </MDBox>
      )}
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <MDBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
        </MDBox>
        <div
          style={{
            display: "flex",
            width: "98%",
            alignItems: "center",
            justifyContent: "flex-end",
            position: "absolute",
          }}
        >
          {/* Hidden file input for image upload */}
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            id="profile-image-upload"
            onChange={handleImageUpload}
          />
          {/* Container for Profile Pic and Text */}
          <label htmlFor="profile-image-upload" style={{ textAlign: "center" }}>
            <Avatar
              src={
                profileImage ||
                require("../../../assets/images/web-logo.jpeg")
              }
              alt="Profile"
              sx={{
                width: isMini ? 50 : 70,
                height: isMini ? 50 : 70,
                cursor: "pointer",
              }}
            />
            <Typography
              variant="caption"
              sx={{
                display: "block",
                marginTop: "4px",
                color: light ? "white" : "text.primary",
                fontWeight: "bold",
                fontFamily: "Arial, sans-serif",
                fontSize: "12px",
                textDecoration: "underline",
              }}
            >
              {userType}
            </Typography>
          </label>
        </div>
      </Toolbar>
    </AppBar>
  );
}

DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
