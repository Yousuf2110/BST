import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

function ProductList() {
  return (
    <DashboardLayout>
      <MDBox mt={6} mb={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={8}>
            <MDBox
              display="flex"
              alignItems="center"
              justifyContent="center"
              height="200px"
              borderRadius="lg"
              bgcolor="info.main"
              color="white"
              p={3}
            >
              <MDTypography variant="h4" fontWeight="medium">
                Coming Soon
              </MDTypography>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default ProductList;
