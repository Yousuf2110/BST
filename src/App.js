import { useState, useEffect, useMemo } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MDBox from "components/MDBox";
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";
import themeDark from "assets/theme-dark";
import themeDarkRTL from "assets/theme-dark/theme-rtl";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import routes from "routes";
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";
import brandWhite from "assets/images/logo-2.png";
import brandDark from "assets/images/logo-ct-dark.png";
import { AuthProvider } from "context/AuthContext";
import ProtectedRoute from "protectedRoutes";
import SignIn from "layouts/authentication/sign-in";
import { IconButton, Typography } from "@mui/material"; // For Material-UI components
import VisibilityIcon from "@mui/icons-material/Visibility"; // Eye icon
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"; // Hidden eye icon

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();

  // Retrieve user data from localStorage
  let user = null;
  const userData = localStorage.getItem("userData");
  if (userData) {
    try {
      user = JSON.parse(userData);
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }

  // State to toggle visibility of user info
  const [showUserInfo, setShowUserInfo] = useState(true);

  // Filter routes based on user permissions
  const filteredRoutes = useMemo(() => {
    if (!user?.product) {
      return routes.filter(
        (route) => !["product-lists", "product-request", "add-product"].includes(route.key)
      );
    }
    return routes;
  }, [user?.product]);

  // Initialize RTL cache
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });
    setRtlCache(cacheRtl);
  }, []);

  // Handle sidenav toggle on mouse enter/leave
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Open configurator
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Update document direction
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Reset scroll position on route change
  useEffect(() => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
  }, [pathname]);

  // Render routes
  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return (
          <Route
            exact
            path={route.route}
            element={<ProtectedRoute>{route.component}</ProtectedRoute>}
            key={route.key}
          />
        );
      }
      return null;
    });

  // Render content
  const renderContent = () => (
    <>
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
            brandName={
              // <>
              //   {/* Display user info based on showUserInfo state */}
              //   {showUserInfo ? (
              //     <>
              //       {user?.info?.name || "Guest"}
              //       <br />
              //       {user?.info?.email || "No Email"}
              //       <br />
              //       {user?.info?.mobile || "No Mobile"}
              //     </>
              //   ) : (
              //     <>
              //       <>********</>
              //       <br />
              //       <>********</>
              //       <br />
              //       <>********</>
              //     </>
              //   )}
              //   {/* Toggle visibility icon */}
              //   <IconButton onClick={() => setShowUserInfo(!showUserInfo)}>
              //     {showUserInfo ? <VisibilityOffIcon /> : <VisibilityIcon />}
              //   </IconButton>
                <>
                    {user?.info?.name || "Guest"}
                    <br />
                    {user?.info?.email || "No Email"}
                    <br />
                    {user?.info?.mobile || "No Mobile"}
                  </>
              </>
            }
            routes={filteredRoutes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
        </>
      )}
      {layout === "vr" && <Configurator />}
      <Routes>
        <Route exact path="/authentication/sign-in" element={<SignIn />} />
        {getRoutes(filteredRoutes)}
        <Route exact path="*" element={<Navigate to="/authentication/sign-in" />} />
      </Routes>
    </>
  );

  return direction === "rtl" ? (
    <CacheProvider value={rtlCache}>
      <ThemeProvider theme={darkMode ? themeDarkRTL : themeRTL}>{renderContent()}</ThemeProvider>
    </CacheProvider>
  ) : (
    <AuthProvider>
      <ThemeProvider theme={darkMode ? themeDark : theme}>{renderContent()}</ThemeProvider>
    </AuthProvider>
  );
}
