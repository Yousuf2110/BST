import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { InputAdornment } from "@mui/material";
import MDTypography from "components/MDTypography";

function ProductList() {
  const token = localStorage.getItem("authToken");

  const [open, setOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null); // Track selected product ID
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    paymentScreenshot: null,
  });
  const [productsByCategory, setProductsByCategory] = useState({
    "1 Account": [],
    "3 Accounts": [],
    "7 Accounts": [],
  });

  useEffect(() => {
    // Fetch products from the API using axios
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://ecosphere-pakistan-backend.co-m.pk/api/user-products",
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("products", response?.data?.products);

        // Filter and categorize products
        const categorizedProducts = {
          "1 Account": response?.data?.products?.filter(
            (product) => parseInt(product.category) === 1
          ),
          "3 Accounts": response?.data?.products?.filter(
            (product) => parseInt(product.category) === 3
          ),
          "7 Accounts": response?.data?.products?.filter(
            (product) => parseInt(product.category) === 7
          ),
        };

        setProductsByCategory(categorizedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Error fetching products. Please try again.");
      }
    };

    fetchProducts();
  }, [token]);

  const handleOpen = (productId) => {
    setSelectedProductId(productId); // Set the selected product ID
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProductId(null); // Reset selected product ID
    setFormData({
      name: "",
      phone: "",
      address: "",
      paymentScreenshot: null,
    }); // Reset form data
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, paymentScreenshot: file });
    }
  };

  const handleSubmit = async () => {
    try {
      const formPayload = new FormData();
      formPayload.append("name", formData.name);
      formPayload.append("product_id", selectedProductId); // Use the selected product ID
      formPayload.append("phone", formData.phone);
      formPayload.append("address", formData.address);
      formPayload.append("payment_screenshot", formData.paymentScreenshot); // Append the file

      const response = await axios.post(
        "https://ecosphere-pakistan-backend.co-m.pk/api/buy-product",
        formPayload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Purchase successful:", response.data);
      toast.success("Purchase successful!"); // Show success toast
      handleClose(); // Close the modal after successful submission
    } catch (error) {
      console.error("Error purchasing product:", error);

      // Handle 409 Conflict (already purchased)
      if (error.response && error.response.status === 409) {
        toast.error("You have already purchased this product."); // Custom error message for 409
      } else {
        toast.error("Error purchasing product. Please try again."); // Generic error message
      }
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {/* Add ToastContainer to render toasts */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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
        {Object.entries(productsByCategory).map(([category, products]) => (
          <MDBox key={category} mb={4}>
            <Typography variant="h5" fontWeight="bold" mb={2}>
              {category}
            </Typography>
            <Grid container spacing={3}>
              {products.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="150"
                      image={product.image}
                      alt={product.name}
                    />
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold">
                        {product.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {product.description}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        style={{ color: "white" }}
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={() => handleOpen(product.id)} // Pass product ID to handleOpen
                      >
                        Buy Now
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </MDBox>
        ))}
      </MDBox>

      {/* Modal for the form */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" mb={2}>
            Purchase Form
          </Typography>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Address"
            name="address"
            placeholder="اپنے قریبی ڈاک خانہ کا مکمل پتہ لکھیں"
            value={formData.address}
            onChange={handleInputChange}
            margin="normal"
          />
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Payment Screenshot"
              value={formData.paymentScreenshot ? formData.paymentScreenshot.name : ""}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Button component="label" startIcon={<PhotoCamera />} size="small">
                      Upload
                      <input type="file" accept="image/*" hidden onChange={handleImageChange} />
                    </Button>
                  </InputAdornment>
                ),
              }}
              disabled
            />
            {formData.paymentScreenshot && (
              <Box
                sx={{
                  mt: 2,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  src={URL.createObjectURL(formData.paymentScreenshot)}
                  alt="Payment Screenshot"
                  style={{ maxWidth: "100%", maxHeight: "150px" }}
                />
              </Box>
            )}
          </Box>
          <Button
            style={{ color: "#fff" }}
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </DashboardLayout>
  );
}

export default ProductList;
