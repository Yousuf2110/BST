// ECommerceProductRequest.js
import React from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import DataTable from "examples/Tables/DataTable";



function ECommerceProductRequest() {
  const staticRequests = [
    {
      product_id: "1001",
      user_email: "ali@gmail.com",
      phone: "+92 300 1234567",
      payment_screenshot: (
        <a href="#screenshot1" target="_blank" rel="noopener noreferrer">
          <button
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              padding: "6px 12px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "0.875rem",
            }}
          >
            View ScreenShot
          </button>
        </a>
      ),
      product_name: "Wireless Headphones",
      status: <MDTypography variant="caption" color="info" fontWeight="medium">PENDING</MDTypography>,
    },
    {
      product_id: "1002",
      user_email: "sana@yahoo.com",
      phone: "+92 311 2345678",
      payment_screenshot: (
        <a href="#screenshot2" target="_blank" rel="noopener noreferrer">
          <button
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              padding: "6px 12px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "0.875rem",
            }}
          >
            View ScreenShot
          </button>
        </a>
      ),
      product_name: "Smart Watch Pro",
      status: <MDTypography variant="caption" color="warning" fontWeight="medium">PROCESSING</MDTypography>,
    },
    {
      product_id: "1003",
      user_email: "usman@outlook.com",
      phone: "+92 322 3456789",
      payment_screenshot: "N/A",
      product_name: "Bluetooth Speaker",
      status: <MDTypography variant="caption" color="error" fontWeight="medium">FAILED</MDTypography>,
    },
    {
      product_id: "1004",
      user_email: "zara@gmail.com",
      phone: "+92 333 4567890",
      payment_screenshot: (
        <a href="#screenshot4" target="_blank" rel="noopener noreferrer">
          <button
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              padding: "6px 12px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "0.875rem",
            }}
          >
            View ScreenShot
          </button>
        </a>
      ),
      product_name: "Digital Camera",
      status: <MDTypography variant="caption" color="success" fontWeight="medium">DONE</MDTypography>,
    },
    {
      product_id: "1005",
      user_email: "fahad@gmail.com",
      phone: "+92 344 5678901",
      payment_screenshot: (
        <a href="#screenshot5" target="_blank" rel="noopener noreferrer">
          <button
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              padding: "6px 12px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "0.875rem",
            }}
          >
            View ScreenShot
          </button>
        </a>
      ),
      product_name: "Mini Drone",
      status: <MDTypography variant="caption" color="info" fontWeight="medium">PENDING</MDTypography>,
    },
    {
      product_id: "1006",
      user_email: "nida@live.com",
      phone: "+92 355 6789012",
      payment_screenshot: "N/A",
      product_name: "UltraBook Laptop",
      status: <MDTypography variant="caption" color="warning" fontWeight="medium">SHIPPED</MDTypography>,
    },
    {
      product_id: "1007",
      user_email: "tariq@gmail.com",
      phone: "+92 366 7890123",
      payment_screenshot: (
        <a href="#screenshot7" target="_blank" rel="noopener noreferrer">
          <button
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              padding: "6px 12px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "0.875rem",
            }}
          >
            View ScreenShot
          </button>
        </a>
      ),
      product_name: "Smartphone X",
      status: <MDTypography variant="caption" color="success" fontWeight="medium">DELIVERED</MDTypography>,
    },
    {
      product_id: "1008",
      user_email: "amna@yahoo.com",
      phone: "+92 377 8901234",
      payment_screenshot: (
        <a href="#screenshot8" target="_blank" rel="noopener noreferrer">
          <button
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              padding: "6px 12px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "0.875rem",
            }}
          >
            View ScreenShot
          </button>
        </a>
      ),
      product_name: "Pro Tablet",
      status: <MDTypography variant="caption" color="info" fontWeight="medium">PENDING</MDTypography>,
    },
    {
      product_id: "1009",
      user_email: "imran@outlook.com",
      phone: "+92 388 9012345",
      payment_screenshot: "N/A",
      product_name: "Mechanical Keyboard",
      status: <MDTypography variant="caption" color="warning" fontWeight="medium">PROCESSING</MDTypography>,
    },
    {
      product_id: "1010",
      user_email: "saima@gmail.com",
      phone: "+92 399 0123456",
      payment_screenshot: (
        <a href="#screenshot10" target="_blank" rel="noopener noreferrer">
          <button
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              padding: "6px 12px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "0.875rem",
            }}
          >
            View ScreenShot
          </button>
        </a>
      ),
      product_name: "Gaming Mouse",
      status: <MDTypography variant="caption" color="success" fontWeight="medium">DONE</MDTypography>,
    },
  ];

  // ✅ Table Data
  const tableData = {
    columns: [
      { Header: "ID", accessor: "product_id", align: "left" },
      { Header: "Email", accessor: "user_email", align: "center" },
      { Header: "Mobile", accessor: "phone", align: "center" },
      { Header: "View ScreenShot", accessor: "payment_screenshot", align: "center" },
      { Header: "Product Name", accessor: "product_name", align: "center" },
      { Header: "Status", accessor: "status", align: "center" },
    ],
    rows: staticRequests,
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
                  Product Requests
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={tableData}
                  isSorted
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default ECommerceProductRequest;