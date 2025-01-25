import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

function ViewPin() {
  const [rows, setRows] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("authToken");

  const columns = [
    { Header: "Id", accessor: "id", align: "center" },
    { Header: "Account #", accessor: "accountNumber", align: "left" },
    { Header: "Trx Id", accessor: "transactionId", align: "left" },
    { Header: "User Email", accessor: "userEmail", align: "center" },
    { Header: "Amount", accessor: "amount", align: "center" },
    { Header: "Screenshot", accessor: "screenshot", align: "center" },
    { Header: "Status", accessor: "status", align: "center" },
  ];

  useEffect(() => {
    axios
      .get("https://backend.salespronetworks.com/api/user-pins", {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const fetchedData = response.data.pins;
        const formattedRows = fetchedData.map((item) => ({
          id: item.id,
          accountNumber: item.account_number,
          transactionId: item.transaction_id,
          userEmail: item.user_email,
          amount: item.amount,
          screenshot: (
            <img
              src={item.screenshot_url}
              alt="screenshot"
              style={{ width: "100px", height: "auto", cursor: "pointer" }}
              onClick={() => setSelectedImage(item.screenshot_url)}
            />
          ),
          status: (
            <span
              style={{
                color:
                  item.status.toLowerCase() === "approve"
                    ? "green"
                    : item.status.toLowerCase() === "reject"
                      ? "red"
                      : item.status.toLowerCase() === "pending"
                        ? "orange"
                        : "black",
                fontWeight: "bold",
                textTransform: "capitalize",
              }}
            >
              {item.status}
            </span>
          ),
        }));
        setRows(formattedRows);
      })
      .catch(() => {
        setRows([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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
                  Pins List
                </MDTypography>
              </MDBox>
              <MDBox pt={3} display="flex" justifyContent="center" alignItems="center">
                {loading ? (
                  <CircularProgress />
                ) : rows.length === 0 ? (
                  <MDTypography variant="h6" color="text">
                    No Data Available
                  </MDTypography>
                ) : (
                  <DataTable
                    table={{ columns, rows }}
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
      {selectedImage && (
        <Modal
          open={!!selectedImage}
          onClose={() => setSelectedImage(null)}
          aria-labelledby="view-screenshot"
          aria-describedby="view-screenshot-modal"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <img src={selectedImage} alt="Screenshot" style={{ width: "100%", height: "auto" }} />
          </Box>
        </Modal>
      )}
    </DashboardLayout>
  );
}

export default ViewPin;
