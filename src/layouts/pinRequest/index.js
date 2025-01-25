import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import { CircularProgress } from "@mui/material";

function PinRequest() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("authToken");
  const [formData, setFormData] = useState({
    accountNumber: "",
    trxId: "",
    amount: "",
    paymentScreenshot: "",
  });
  const [paymentMethod, setPaymentMethod] = useState({
    account_number: "",
    account_title: "",
    bank_name: "",
  });

  const columns = [
    { Header: "Id", accessor: "id", align: "center" },
    { Header: "Account number", accessor: "accountNumber", align: "left" },
    { Header: "Trx Id", accessor: "transactionId", align: "left" },
    { Header: "User Email", accessor: "userEmail", align: "center" },
    { Header: "Amount", accessor: "amount", align: "center" },
    {
      Header: "Screenshot",
      accessor: "screenshot",
      align: "center",
    },
    { Header: "Status", accessor: "status", align: "center" },
  ];

  useEffect(() => {
    const fetchPaymentMethod = async () => {
      try {
        const response = await axios.get(
          "https://backend.salespronetworks.com/api/payment-method",
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data) {
          setPaymentMethod(response?.data?.payment_method);
        } else {
          toast.error("Failed to fetch payment method details.");
        }
      } catch (error) {
        toast.error("Error fetching payment method: " + error.message);
      }
    };

    fetchPaymentMethod();
  }, [token]);

  useEffect(() => {
    const fetchPins = async () => {
      try {
        const response = await axios.get(
          "https://backend.salespronetworks.com/api/user-pins",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const fetchedData = response.data.pins;
        const formattedRows = fetchedData.map((item) => ({
          id: item.id,
          accountNumber: item.account_number,
          transactionId: item.transaction_id,
          userEmail: item.user_email,
          amount: item.amount,
          screenshot: (
            <a href={item?.payment_screenshot} target="_blank">View Screenshot</a>
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
              {item.status?.toUpperCase()}
            </span>
          ),
        }));
        setRows(formattedRows);
      } catch (error) {
        toast.error("Error fetching PIN requests: " + error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPins();
  }, [token]);

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
      toast.error("All fields are required.");
      return;
    }

    const formPayload = new FormData();
    formPayload.append("account_number", accountNumber);
    formPayload.append("transaction_id", trxId);
    formPayload.append("amount", amount);
    formPayload.append("payment_screenshot", paymentScreenshot);

    try {
      const response = await axios.post(
        "https://backend.salespronetworks.com/api/pin-request",
        formPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data) {
        toast.success("PIN request submitted successfully!");
        setFormData({
          accountNumber: "",
          trxId: "",
          amount: "",
          paymentScreenshot: "",
        });
      }
    } catch (error) {
      toast.error("Error submitting request: " + error.message);
    }
  };

  return (
    <DashboardLayout>
      <ToastContainer />
      <DashboardNavbar />
      <MDBox
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        gap={2}
      >
        <MDBox
          sx={{
            textAlign: "center",
            mb: 4,
            padding: 2,
            border: "1px solid #ddd",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <MDTypography
            variant="h4"
            fontWeight="bold"
            color="textPrimary"
            sx={{
              mb: 1,
              fontSize: "1.8rem",
              color: "#333",
            }}
          >
            Request a PIN for Your Account
          </MDTypography>
          <MDTypography
            variant="body2"
            color="textSecondary"
            sx={{
              mb: 1,
              fontSize: "1rem",
              color: "#666",
            }}
          >
            اپنی پن خریدنے کی ادائیگی یہاں اس نمبر پر بھیجنی ہے۔
          </MDTypography>
          <MDTypography
            variant="body2"
            color="textSecondary"
            sx={{
              fontSize: "1rem",
              color: "#444",
              lineHeight: 1.6,
            }}
          >
            <strong>Account Title:</strong> {paymentMethod.account_title} <br />
            <strong>Bank:</strong> {paymentMethod.bank_name} <br />
            <strong>Account Number:</strong> {paymentMethod.account_number}
          </MDTypography>
        </MDBox>

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
            <MDTypography variant="h5" fontWeight="bold" color="textPrimary" gutterBottom>
              PIN Request
            </MDTypography>
            <MDTypography variant="body2" color="textSecondary">
              یاد رکھیں جعلی ٹرانزیکشن آئ ڈی یا جعلی پن ریکوسٹ لگانے سے اپکی سروس معطل ہو جائے گے تسلی سے درست معلومات درج کریں تاکہ دشواری کا سامنا نہ کرنا پڑے
            </MDTypography>
          </MDBox>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Account number"
                  name="accountNumber"
                  type="number"
                  variant="outlined"
                  value={formData.accountNumber}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: <AccountCircleIcon sx={{ mr: 1 }} />,
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
                  value={formData.trxId}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: <ReceiptIcon sx={{ mr: 1 }} />,
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
                  value={formData.amount}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: <AttachMoneyIcon sx={{ mr: 1 }} />,
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
                  InputProps={{
                    startAdornment: <UploadFileIcon sx={{ mr: 1 }} />,
                  }}
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
      <br />
      <br />
      <br />
      <MDBox>
        {loading ? (
          <CircularProgress />
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
    </DashboardLayout>
  );
}

export default PinRequest;
