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
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

function ViewUserPins() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const token = localStorage.getItem("authToken");

  const columns = [
    { Header: "Id", accessor: "id", align: "center" },
    { Header: "User Email", accessor: "userEmail", align: "left" },
    { Header: "Pin", accessor: "pin", align: "left" },
    { Header: "Status", accessor: "status", align: "center" },
  ];

  useEffect(() => {
    axios
      .get("https://backend.salespronetworks.com/api/view-pins", {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const fetchedData = response.data.pins;

        const formattedRows = fetchedData
          .filter((item) => item.status.toLowerCase() !== "used")
          .map((item) => ({
            id: item.id,
            userEmail: item.user_email || "N/A",
            pin: item.pin || "N/A",
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
      })
      .finally(() => setLoading(false));
  }, [token]);

  const handleTermsModalClose = () => {
    setShowTermsModal(false);
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
                  Pins List
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {loading ? (
                  <MDBox display="flex" justifyContent="center" alignItems="center" p={3}>
                    <CircularProgress />
                  </MDBox>
                ) : rows.length > 0 ? (
                  <DataTable
                    table={{ columns, rows }}
                    isSorted={true}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
                ) : (
                  <MDBox display="flex" justifyContent="center" alignItems="center" p={3}>
                    <MDTypography variant="h6" color="textSecondary">
                      No data available
                    </MDTypography>
                  </MDBox>
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
      <Modal open={showTermsModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: {
              xs: "90%", // 90% width on extra small screens (mobile)
              sm: "80%", // 80% width on small screens
              md: "500px", // Fixed width on medium and larger screens
            },
            maxWidth: "500px", // Maximum width to avoid overly wide modals
            bgcolor: "background.paper",
            boxShadow: 24,
            p: {
              xs: 2, // Smaller padding on mobile
              sm: 3, // Medium padding on small screens
              md: 4, // Larger padding on medium and larger screens
            },
            borderRadius: 2,
            maxHeight: "90vh", // Limit height to 90% of the viewport height
            overflowY: "auto", // Enable scrolling if content overflows
          }}
        >
          <Typography variant="h6" mb={2}>
            Terms and Conditions
          </Typography>
          <MDTypography variant="body1" paragraph>
            پروڈکٹ کی درخواست کرنے سے پہلے آپ کے لیے یہ انتہائی ضروری ہے کہ آپ تمام شرائط کو اچھی
            طرح سمجھ لیں اور فیصلہ کر لیں کہ آپ پروڈکٹ صرف ایک بار حاصل کر سکیں گے۔ اس بات کو یقینی
            بنائیں کہ آپ اپنی ضروریات کے مطابق تین یا سات اکاؤنٹس بنانے کے لیے تیار ہیں، کیونکہ
            پروڈکٹ صرف ایک بار دستیاب ہوگی۔
          </MDTypography>
          <MDTypography variant="body1" paragraph>
            اگر آپ کسی بڑی پروڈکٹ کا انتخاب کرنا چاہتے ہیں تو آپ کو پہلے سے مناسب منصوبہ بندی کرتے
            ہوئے تین یا سات اکاؤنٹس کا بندوبست کرنا ہوگا۔ دوبارہ درخواست دینے یا کوئی اور پروڈکٹ
            حاصل کرنے کی اجازت نہیں دی جائے گی، اس لیے درخواست سے پہلے اپنی حکمت عملی واضح کریں اور
            مکمل تیاری کے ساتھ آگے بڑھیں۔
          </MDTypography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleTermsModalClose}
            sx={{ mt: 2, color: "#fff" }}
          >
            OK
          </Button>
        </Box>
      </Modal>
    </DashboardLayout>
  );
}

export default ViewUserPins;
