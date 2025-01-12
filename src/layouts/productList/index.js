import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function ProductList() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={6} mb={3}>
        <MDTypography variant="body1" paragraph>
          پروڈکٹ کی درخواست کرنے سے پہلے آپ کے لیے یہ انتہائی ضروری ہے کہ آپ تمام شرائط کو اچھی طرح
          سمجھ لیں اور فیصلہ کر لیں کہ آپ پروڈکٹ صرف ایک بار حاصل کر سکیں گے۔ اس بات کو یقینی بنائیں
          کہ آپ اپنی ضروریات کے مطابق تین یا سات اکاؤنٹس بنانے کے لیے تیار ہیں، کیونکہ پروڈکٹ صرف
          ایک بار دستیاب ہوگی۔
        </MDTypography>
        <MDTypography variant="body1" paragraph>
          اگر آپ کسی بڑی پروڈکٹ کا انتخاب کرنا چاہتے ہیں تو آپ کو پہلے سے مناسب منصوبہ بندی کرتے
          ہوئے تین یا سات اکاؤنٹس کا بندوبست کرنا ہوگا۔ دوبارہ درخواست دینے یا کوئی اور پروڈکٹ حاصل
          کرنے کی اجازت نہیں دی جائے گی، اس لیے درخواست سے پہلے اپنی حکمت عملی واضح کریں اور مکمل
          تیاری کے ساتھ آگے بڑھیں۔
        </MDTypography>
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
