import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Icon from "@mui/material/Icon";
import LinearProgress from "@mui/material/LinearProgress";

const UserCountCheck = () => {
  const [userCount, setUserCount] = useState(null);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const userDataString = localStorage.getItem("userData");

    try {
      if (userDataString) {
        const userData = JSON.parse(userDataString);

        if (userData && typeof userData.user_count === "number") {
          setUserCount(userData.user_count);
          setIsValid(true);
        } else {
          console.error("Invalid or missing user_count in userData");
          setIsValid(false);
        }
      } else {
        console.error("No userData found in localStorage");
        setIsValid(false);
      }
    } catch (error) {
      console.error("Error parsing userData:", error);
      setIsValid(false);
    }
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card sx={{ overflow: "hidden" }}>
              <MDBox
                sx={{
                  position: "relative",
                  background: "linear-gradient(120deg, #e0f7fa 0%, #f5f5f5 100%)",
                  height: "100%",
                  py: 8,
                }}
              >
                {/* Decorative Elements */}
                <MDBox
                  sx={{
                    position: "absolute",
                    top: "15%",
                    left: "10%",
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    background: "rgba(33, 150, 243, 0.1)",
                    zIndex: 0,
                  }}
                />
                <MDBox
                  sx={{
                    position: "absolute",
                    bottom: "20%",
                    right: "15%",
                    width: "120px",
                    height: "120px",
                    borderRadius: "50%",
                    background: "rgba(33, 150, 243, 0.15)",
                    zIndex: 0,
                  }}
                />

                <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={12} md={8} lg={6}>
                    <MDBox
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      justifyContent="center"
                      p={4}
                      sx={{
                        position: "relative",
                        zIndex: 1,
                        background: "rgba(255, 255, 255, 0.85)",
                        backdropFilter: "blur(10px)",
                        borderRadius: "16px",
                        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
                      }}
                    >
                      {/* Conditional Rendering Based on user_count */}
                      {isValid ? (
                        userCount > 6 ? (
                          <>
                            {/* Image 2: Coming Soon */}
                            <MDBox
                              display="flex"
                              justifyContent="center"
                              alignItems="center"
                              mb={3}
                            >
                              <MDBox
                                sx={{
                                  width: "60px",
                                  height: "60px",
                                  borderRadius: "50%",
                                  background: "linear-gradient(45deg, #2196F3, #0D47A1)",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  color: "white",
                                  fontSize: 30,
                                }}
                              >
                                <Icon>award</Icon>
                              </MDBox>
                            </MDBox>

                            <MDTypography
                              variant="h2"
                              fontWeight="bold"
                              color="primary"
                              textAlign="center"
                              mb={1}
                            >
                              Coming Soon
                            </MDTypography>

                            <MDTypography
                              variant="h6"
                              color="dark"
                              textAlign="center"
                              fontWeight="light"
                              mb={3}
                            >
                              Ranks & Rewards Experience
                            </MDTypography>

                            <MDTypography variant="body1" color="text" textAlign="center" mb={4}>
                              We're building an exceptional rewards system to recognize your
                              achievements and team growth. Track your progress, earn rewards, and
                              unlock exclusive benefits.
                            </MDTypography>

                            <MDBox width="100%" mb={2}>
                              <MDTypography
                                variant="button"
                                color="text"
                                fontWeight="medium"
                                mb={1}
                              >
                                Development Progress: 75%
                              </MDTypography>
                              <LinearProgress
                                variant="determinate"
                                value={75}
                                color="primary"
                                sx={{ height: 8, borderRadius: 4 }}
                              />
                            </MDBox>

                            <MDBox
                              display="flex"
                              justifyContent="space-between"
                              width="100%"
                              mt={2}
                              p={2}
                              sx={{
                                borderRadius: "12px",
                                background: "rgba(33, 150, 243, 0.05)",
                                border: "1px dashed rgba(33, 150, 243, 0.5)",
                              }}
                            >
                              <MDBox display="flex" alignItems="center">
                                <Icon sx={{ color: "primary.main", mr: 1 }}>calendar_today</Icon>
                                <MDTypography variant="button" fontWeight="medium" color="text">
                                  Estimated Launch
                                </MDTypography>
                              </MDBox>
                              <MDTypography variant="button" fontWeight="bold" color="primary">
                                Coming Next Month
                              </MDTypography>
                            </MDBox>
                          </>
                        ) : (
                          <>
                            {/* Image 1: Not Eligible */}
                            <MDBox
                              display="flex"
                              justifyContent="center"
                              alignItems="center"
                              mb={3}
                            >
                              <MDBox
                                sx={{
                                  width: "60px",
                                  height: "60px",
                                  borderRadius: "50%",
                                  background: "linear-gradient(45deg, #FFC107, #E6B31E)",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  color: "white",
                                  fontSize: 30,
                                }}
                              >
                                <Icon>error_outline</Icon>
                              </MDBox>
                            </MDBox>

                            <MDTypography
                              variant="h2"
                              fontWeight="bold"
                              color="warning"
                              textAlign="center"
                              mb={1}
                            >
                              Not Eligible
                            </MDTypography>

                            <MDTypography variant="body1" color="text" textAlign="center" mb={4}>
                              Please upgrade your rank to Medium or Premium to access these
                              exclusive courses.
                            </MDTypography>
                          </>
                        )
                      ) : (
                        <>
                          {/* Error Screen */}
                          <MDBox display="flex" justifyContent="center" alignItems="center" mb={3}>
                            <MDBox
                              sx={{
                                width: "60px",
                                height: "60px",
                                borderRadius: "50%",
                                background: "linear-gradient(45deg, #F44336, #E53935)",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                color: "white",
                                fontSize: 30,
                              }}
                            >
                              <Icon>error</Icon>
                            </MDBox>
                          </MDBox>

                          <MDTypography
                            variant="h2"
                            fontWeight="bold"
                            color="error"
                            textAlign="center"
                            mb={1}
                          >
                            Invalid Data
                          </MDTypography>

                          <MDTypography
                            variant="h6"
                            color="dark"
                            textAlign="center"
                            fontWeight="light"
                            mb={3}
                          >
                            Unable to retrieve user count.
                          </MDTypography>

                          <MDTypography variant="body1" color="text" textAlign="center" mb={4}>
                            Please ensure your data is correctly stored in localStorage.
                          </MDTypography>
                        </>
                      )}
                    </MDBox>
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
};

export default UserCountCheck;
