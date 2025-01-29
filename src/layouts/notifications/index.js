import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [userCount, setUserCount] = useState(0);
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
  const [showTermsModal, setShowTermsModal] = useState(false); // State to control terms modal

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://backend.salespronetworks.com/api/user-products",
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("products", response?.data);

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
        setUserCount(response?.data?.userCount || 0);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Error fetching products. Please try again.");
      }
    };

    fetchProducts();
  }, [token]);

  const handleOpen = (productId, category) => {
    if (
      (category === "1" && userCount >= 1) ||
      (category === "3" && userCount >= 3) ||
      (category === "7" && userCount >= 7)
    ) {
      setSelectedProductId(productId);
      setOpen(true);
    } else {
      toast.error(`You need at least ${category.split(" ")[0]} users to purchase this product.`);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProductId(null);
    setFormData({
      name: "",
      phone: "",
      address: "",
      paymentScreenshot: null,
    });
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
    setIsLoading(true);
    try {
      const formPayload = new FormData();
      formPayload.append("name", formData.name);
      formPayload.append("product_id", selectedProductId);
      formPayload.append("phone", formData.phone);
      formPayload.append("address", formData.address);
      formPayload.append("payment_screenshot", formData.paymentScreenshot);

      await axios.post(
        "https://backend.salespronetworks.com/api/buy-product",
        formPayload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Purchase successful!");
      handleClose();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error purchasing product:", error);
      if (error.response && error.response.status === 409) {
        toast.error("You have already purchased product.");
      } else {
        toast.error("Error purchasing product. Please try again.");
      }
    }
  };

  const handleTermsModalClose = () => {
    setShowTermsModal(false);
  };
  const modalMessage = localStorage.getItem('productMessage');
  useEffect(() => {
    if (modalMessage) {
      setShowTermsModal(true)
    }
  }, [])

  return (
    <DashboardLayout>
      <DashboardNavbar />
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

      {/* Terms and Conditions Modal */}
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
            {modalMessage}
          </MDTypography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleTermsModalClose}
            sx={{ mt: 2, color: '#fff' }}
          >
            OK
          </Button>
        </Box>
      </Modal>

      {/* Product List */}
      {!showTermsModal && (
        <MDBox mt={6} mb={3}>
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
                          onClick={() => handleOpen(product.id, product.category)}
                          disabled={
                            (product.category === "1" && userCount < 1) ||
                            (product.category === "3" && userCount < 3) ||
                            (product.category === "7" && userCount < 7)
                          }
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
      )}

      {/* Purchase Form Modal */}
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
            {isLoading ? "Loading..." : "Submit"}
          </Button>
        </Box>
      </Modal>
    </DashboardLayout>
  );
}

export default ProductList;