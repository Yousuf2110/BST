import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import { useState, useEffect } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

function WithDrawHistory() {
  const token = localStorage.getItem("authToken");
  const [tableData, setTableData] = useState({
    columns: [
      { Header: "ID", accessor: "id", align: "left" },
      { Header: "Email", accessor: "user_email", align: "center" },
      { Header: "Amount", accessor: "total_amount", align: "center" },
      { Header: "Status", accessor: "status", align: "center" },
      { Header: "Updated At", accessor: "updated_at", align: "center" },
    ],
    rows: [],
  });
  const [loading, setLoading] = useState(true);
  const [noData, setNoData] = useState(false);

  const formatDate = (dateString) => {
    try {
      const cleanDate = dateString.split(".")[0].replace("T", " ");
      return cleanDate || "N/A";
    } catch (error) {
      return "N/A";
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://backend.salespronetworks.com/api/user-withdraws",
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const mappedRows = response.data?.withdraws?.map((item, index) => {
          return {
            id: index + 1,
            user_email: item.user_email || "N/A",
            total_amount: item.total_amount,
            status: (
              <MDTypography
                variant="caption"
                color={item.status === "approved" ? "success" : "info"}
                fontWeight="medium"
              >
                {item.status === "approved" ? "SUCCESS" : item.status?.toUpperCase() || "N/A"}
              </MDTypography>
            ),
            updated_at: formatDate(item.updated_at),
          };
        });

        if (mappedRows.length === 0) {
          setNoData(true);
        }

        setTableData((prevState) => ({
          ...prevState,
          rows: mappedRows,
        }));
      } catch (error) {
        console.error("Error fetching withdrawals:", error);
        setNoData(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

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
                  Withdraws List
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {loading ? (
                  <Grid container justifyContent="center">
                    <CircularProgress />
                  </Grid>
                ) : noData ? (
                  <Grid container justifyContent="center">
                    <MDTypography variant="h6" color="textSecondary">
                      No data available
                    </MDTypography>{" "}
                  </Grid>
                ) : (
                  <DataTable
                    table={tableData}
                    isSorted={true}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
                )}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default WithDrawHistory;
