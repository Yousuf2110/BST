import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";

function ViewPin() {
  const [rows, setRows] = useState([]);
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
      .get("https://ecosphere-pakistan-backend.co-m.pk/api/user-pins", {
        headers: {
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
              style={{ width: "100px", height: "auto" }}
            />
          ),
          status: (
            <span
              style={{
                color: item.status === "Active" ? "green" : "red",
                fontWeight: "bold",
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
    </DashboardLayout>
  );
}

export default ViewPin;
