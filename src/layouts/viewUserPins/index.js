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

function ViewUserPins() {
  const [rows, setRows] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const token = localStorage.getItem("authToken");

  const columns = [
    { Header: "Id", accessor: "id", align: "center" },
    { Header: "User Email", accessor: "userEmail", align: "left" },
    { Header: "Pin", accessor: "pin", align: "left" },
    { Header: "Status", accessor: "status", align: "center" },
  ];

  useEffect(() => {
    axios
      .get("https://ecosphere-pakistan-backend.co-m.pk/api/view-pins", {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const fetchedData = response.data.pins;

        const formattedRows = fetchedData
          .filter((item) => item.status.toLowerCase() !== "used") // Exclude used pins
          .map((item) => ({
            id: item.id,
            userEmail: item.user_email || "N/A", // Handle missing data
            pin: item.pin || "N/A", // Handle missing data
            status: (
              <span
                style={{
                  color: "gray",
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
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
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
                  Pins List
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={true}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
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

export default ViewUserPins;
