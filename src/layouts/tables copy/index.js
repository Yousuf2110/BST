// Material UI components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";

// Table Data
const authorsTableData = {
  columns: [
    { Header: "Author", accessor: "author", align: "left" },
    { Header: "Function", accessor: "function", align: "center" },
    { Header: "Status", accessor: "status", align: "center" },
    { Header: "Employed", accessor: "employed", align: "center" },
  ],
  rows: [
    {
      author: "John Doe",
      function: "Developer",
      status: "Active",
      employed: "01/01/2022",
    },
    {
      author: "Jane Smith",
      function: "Designer",
      status: "Active",
      employed: "02/15/2022",
    },
    {
      author: "Chris Johnson",
      function: "Manager",
      status: "Inactive",
      employed: "03/10/2021",
    },
    {
      author: "Lisa Adams",
      function: "Analyst",
      status: "Active",
      employed: "05/12/2020",
    },
  ],
};

function Tables() {
  const { columns, rows } = authorsTableData;

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
                  Withdraw History
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={true}
                  entriesPerPage={true}
                  showTotalEntries={true}
                  noEndBorder
                  customStyles={{
                    tableCell: { textAlign: "center" },
                    hoverRow: { backgroundColor: "rgba(0, 123, 255, 0.1)" },
                  }}
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Tables;
