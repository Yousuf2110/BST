import React, { useEffect, useState } from "react";
import axios from "axios"; // Install axios if not already installed: npm install axios
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";

const LeadBoard = () => {
  const [tableData, setTableData] = useState({ columns: [], rows: [] });
  const userData = localStorage.getItem("userData");
  let user = null;

  if (userData) {
    try {
      user = JSON.parse(userData);
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "green";
      case "Achieved":
        return "yellow";
      case "Upcoming":
        return "blue";
      case "Non-active":
        return "#A9A9A9";
      default:
        return "#A9A9A9";
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = user?.token;
        const response = await axios.get(
          "https://backend.salespronetworks.com/api/leaderboard/top-earners",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const apiData = response.data?.data;
        const mappedRows = apiData.map((item) => ({
          name: item.name || "N/A",
          email: item.email || "N/A",
          rank: item.rank || "N/A",
          earning: `$${parseFloat(item.earning).toFixed(2)}` || "N/A", // Format earnings as currency
        }));

        // Set the table data
        setTableData({
          columns: [
            { Header: "Name", accessor: "name" },
            { Header: "Email", accessor: "email" },
            { Header: "Rank", accessor: "rank" },
            { Header: "Earning", accessor: "earning" },
          ],
          rows: mappedRows,
        });
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      }
    };

    fetchData();
  }, [user]);

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
                {tableData.rows.length === 0 ? (
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
                    columns={tableData.columns.map((column) => ({
                      Header: column.Header,
                      accessor: column.accessor,
                      Cell: (props) => {
                        const { value } = props;
                        if (column.accessor === "status") {
                          return (
                            <MDTypography
                              variant="caption"
                              color={getStatusColor(value)}
                              fontWeight="medium"
                            >
                              {value}
                            </MDTypography>
                          );
                        }
                        return value;
                      },
                    }))}
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
