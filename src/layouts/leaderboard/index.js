import React, { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import CircularProgress from "@mui/material/CircularProgress"; // For loader

const LeadBoard = () => {
  const [tableData, setTableData] = useState({ columns: [], rows: [] });
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null); // State to track errors
  const userData = localStorage.getItem("userData");

  // Parse user data once
  let user = null;
  try {
    user = userData ? JSON.parse(userData) : null;
  } catch (err) {
    console.error("Error parsing user data:", err);
    setError("Failed to parse user data.");
  }

  useEffect(() => {
    // Ensure this function runs only once
    const fetchData = async () => {
      try {
        // Validate token
        const token = user?.token;
        if (!token) {
          throw new Error("No token available.");
        }

        console.log("Fetching leaderboard data...");
        const response = await axios.get(
          "https://backend.salespronetworks.com/api/leaderboard/top-earners",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Log API response for debugging
        console.log("API Response:", response.data);

        // Process API data
        const apiData = response.data?.data;
        if (!apiData || !Array.isArray(apiData)) {
          throw new Error("Invalid API data format.");
        }

        // Filter and map the data
        const filteredData = apiData.filter((item) => parseInt(item.earning) >= 1000);

        const mappedRows = filteredData.map((item, index) => ({
          index: index + 1,
          profileImage: item.profile_image
            ? item.profile_image.replace(/\\/g, "/")
            : "/default-image.png",
          name: item.name || "N/A",
          rank: item.rank || 0,
          earning: `${parseInt(item.earning).toLocaleString()}` || "0",
        }));
        setTableData({
          columns: [
            { Header: "#", accessor: "index" },
            {
              Header: "Profile Image",
              accessor: "profileImage",
              Cell: ({ value }) => {
                const src = value ? value : "../../assets/images/logo-2.png";

                return (
                  <img
                    src={src}
                    alt="Profile"
                    style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                  />
                );
              },
            },
            { Header: "Name", accessor: "name" },
            { Header: "Rank", accessor: "rank" },
            { Header: "Earning", accessor: "earning" },
          ],
          rows: mappedRows,
        });
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
        setError("Failed to load leaderboard data.");
      } finally {
        setLoading(false); // Stop loading regardless of success or failure
      }
    };

    // Call the API only once
    fetchData();
  }, []); // Empty dependency array ensures this runs only once

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Leaderboard
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {/* Show loader while data is loading */}
                {loading && (
                  <MDBox display="flex" justifyContent="center" alignItems="center" height="200px">
                    <CircularProgress />
                  </MDBox>
                )}

                {/* Show error message if there's an error */}
                {error && (
                  <MDTypography variant="body2" textAlign="center" color="error">
                    {error}
                  </MDTypography>
                )}

                {/* Show table if data is loaded and no error */}
                {!loading && !error && tableData.rows.length === 0 ? (
                  <MDTypography variant="body2" textAlign="center">
                    No data available.
                  </MDTypography>
                ) : (
                  <DataTable
                    table={tableData}
                    isSorted={true}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                    sx={{
                      overflowX: "auto",
                      tableLayout: "auto",
                      minWidth: 1200,
                    }}
                  />
                )}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
};

export default LeadBoard;
