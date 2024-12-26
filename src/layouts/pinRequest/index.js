import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function PinRequest() {
  const token = localStorage.getItem("authToken");
  const [formData, setFormData] = useState({
    accountNumber: "",
    trxId: "",
    amount: "",
    paymentScreenshot: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "paymentScreenshot" && files && files[0]) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { accountNumber, trxId, amount, paymentScreenshot } = formData;

    if (!accountNumber || !trxId || !amount || !paymentScreenshot) {
      toast.error("All fields are required. Please fill in all details.");
      return;
    }

    const formPayload = new FormData();
    formPayload.append("account_number", accountNumber);
    formPayload.append("transaction_id", trxId);
    formPayload.append("amount", amount);
    formPayload.append("payment_screenshot", paymentScreenshot);

    try {
      const response = await axios.post(
        "https://ecosphere-pakistan-backend.co-m.pk/api/pin-request",
        formPayload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        toast.success("PIN Request Successful!");
        setFormData({
          accountNumber: "",
          trxId: "",
          amount: "",
          paymentScreenshot: "",
        });
      } else {
        toast.error(response.data.message || "Something went wrong.");
      }
    } catch (error) {
      toast.error("Network error: " + error.message);
    }
  };

  return (
    <DashboardLayout>
      <ToastContainer />
      <MDBox display="flex" alignItems="center" justifyContent="center" minHeight="100vh">
        <Card
          sx={{
            maxWidth: 500,
            width: "100%",
            padding: 4,
            borderRadius: 3,
            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
          }}
        >
          <MDBox textAlign="center" mb={3}>
            <MDTypography variant="h4" fontWeight="bold" color="textPrimary" gutterBottom>
              PIN Request
            </MDTypography>
            <MDTypography variant="body2" color="textSecondary">
              اد رکھیں جعلی ٹرانزیکشن آئ ڈی یا جعلی پن ریکوسٹ لگانے سے آپ کا اکاؤنٹ بلاک ہوسکتا ہے
              تسلی سے درست معلومات درج کریں تاکہ دشواری کا سامنا نہ کرنا پڑے
            </MDTypography>
          </MDBox>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Account #"
                  name="accountNumber"
                  type="number"
                  variant="outlined"
                  placeholder="اُس میں لکھ دیں کہ پیمنٹ والے اکاؤنٹ کا نمبر درج کریں۔"
                  value={formData.accountNumber}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: <PersonIcon sx={{ mr: 1 }} />,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Trx ID"
                  name="trxId"
                  type="text"
                  variant="outlined"
                  placeholder="یہاں اپنی ٹرانزیکشن آئی ڈی ڈالیں۔"
                  value={formData.trxId}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: <LockIcon sx={{ mr: 1 }} />,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Amount"
                  name="amount"
                  type="number"
                  variant="outlined"
                  placeholder="یہاں پن کی قیمت لکھیں۔"
                  value={formData.amount}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: <EmailIcon sx={{ mr: 1 }} />,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Payment Screenshot"
                  name="paymentScreenshot"
                  type="file"
                  variant="outlined"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <MDBox textAlign="center" mt={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                      background: "linear-gradient(90deg, #ff512f, #dd2476)",
                      color: "#fff",
                      fontWeight: "bold",
                      padding: "12px",
                      textTransform: "uppercase",
                      "&:hover": {
                        background: "linear-gradient(90deg, #dd2476, #ff512f)",
                      },
                    }}
                  >
                    Request Pin
                  </Button>
                </MDBox>
              </Grid>
            </Grid>
          </form>
        </Card>
      </MDBox>
    </DashboardLayout>
  );
}

export default PinRequest;
