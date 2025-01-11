import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";

const RewardList = () => {
  const userData = localStorage.getItem("userData");
  const user = userData ? JSON.parse(userData) : null;

  const userRankStar = user?.info?.rank_star;

  const getRowStatus = (rank) => {
    // If the rank is 0, it's non-active
    if (userRankStar === 0) {
      return "Non-active";
    }

    const rankNumber = parseInt(rank, 10); // Convert rank to number to compare

    // If the user's rank is equal to the rank in the row, it is active
    if (rankNumber === userRankStar) {
      return "Active";
    }

    // If the rank is lower than the user's rank, it is achieved
    if (rankNumber < userRankStar) {
      return "Achieved";
    }

    // If the rank is higher than the user's rank, it is non-active
    return "Non-active";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "success";
      case "Achieved":
        return "info";
      case "Upcoming":
        return "warning";
      case "Non-active":
        return "error";
      default:
        return "default";
    }
  };

  const tableData = {
    columns: [
      { Header: "Team", accessor: "team" },
      { Header: "Rank", accessor: "rank" },
      { Header: "Reward", accessor: "reward" },
      { Header: "Status", accessor: "status" },
    ],
    rows: [
      { team: "30/30", rank: "1 Star", reward: "E-Files", status: getRowStatus("1 Star") },
      {
        team: "100/100",
        rank: "2 Star",
        reward: "Trainer certificate",
        status: getRowStatus("2 Star"),
      },
      { team: "200/200", rank: "3 Star", reward: "5000", status: getRowStatus("3 Star") },
      { team: "500/500", rank: "4 Star", reward: "20000", status: getRowStatus("4 Star") },
      { team: "1100/1100", rank: "5 Star", reward: "30000", status: getRowStatus("5 Star") },
      { team: "2700/2700", rank: "6 Star", reward: "55000", status: getRowStatus("6 Star") },
      { team: "5500/5500", rank: "7 Star", reward: "130000", status: getRowStatus("7 Star") },
      { team: "12000/12000", rank: "8 Star", reward: "270000", status: getRowStatus("8 Star") },
      { team: "23000/23000", rank: "9 Star", reward: "550000", status: getRowStatus("9 Star") },
      { team: "37000/37000", rank: "10 Star", reward: "1250000", status: getRowStatus("10 Star") },
      { team: "50000/50000", rank: "11 Star", reward: "1600000", status: getRowStatus("11 Star") },
    ],
  };

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
                  Ranks & Rewards
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
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
                  // Add styles for making sure the table fits the screen
                  sx={{
                    overflowX: "auto", // Allows horizontal scrolling
                    tableLayout: "auto", // Adjust table columns width
                    minWidth: 1200, // Ensures the table is wide enough to fit 11 rows
                  }}
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
};

export default RewardList;
