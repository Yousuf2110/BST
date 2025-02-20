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
import IconButton from "@mui/icons-material/PhotoCamera";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { InputAdornment } from "@mui/material";
import MDTypography from "components/MDTypography";

function ProductList() {
  const token = localStorage.getItem("authToken");
  const [openPurchaseModal, setOpenPurchaseModal] = useState(false);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [userCount, setUserCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("1 Account");
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
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://backend.salespronetworks.com/api/user-products", {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`,
          },
        });
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
        setFilteredProducts(categorizedProducts["1 Account"]);
        setUserCount(response?.data?.userCount || 0);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Error fetching products. Please try again.");
      }
    };
    fetchProducts();
  }, [token]);

  const handleOpenPurchaseModal = (productId, category) => {
    if (
      (category === "1" && userCount >= 1) ||
      (category === "3" && userCount >= 3) ||
      (category === "7" && userCount >= 7)
    ) {
      setSelectedProductId(productId);
      setOpenPurchaseModal(true);
    } else {
      toast.error(`You need at least ${category.split(" ")[0]} users to purchase this product.`);
    }
  };

  const handleClosePurchaseModal = () => {
    setOpenPurchaseModal(false);
    setSelectedProductId(null);
    setFormData({
      name: "",
      phone: "",
      address: "",
      paymentScreenshot: null,
    });
  };

  const handleOpenDetailsModal = (product) => {
    setSelectedProduct(product); // Set the selected product
    setOpenDetailsModal(true); // Open the details modal
  };

  const handleCloseDetailsModal = () => {
    setOpenDetailsModal(false); // Close the details modal
    setSelectedProduct(null); // Clear the selected product
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
      await axios.post("https://backend.salespronetworks.com/api/buy-product", formPayload, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Purchase successful!");
      handleClosePurchaseModal();
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

  const handleCategoryClick = (category) => {
    setFilteredProducts(productsByCategory[category]);
    setSelectedCategory(category);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {/* Category Buttons */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleCategoryClick("1 Account")}
        style={{ margin: "10px", color: "white" }}
      >
        1 Account
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleCategoryClick("3 Accounts")}
        style={{ margin: "10px", color: "white" }}
      >
        3 Accounts
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleCategoryClick("7 Accounts")}
        style={{ margin: "10px", color: "white" }}
      >
        7 Accounts
      </Button>
      {/* Product List */}
      <Typography style={{ marginTop: 10, marginBottom: 10 }} variant="h5" fontWeight="bold">
        {`${selectedCategory} Products`}
      </Typography>
      <Grid container spacing={3}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="150"
                  image={product?.image?.[0]}
                  alt={product.name}
                  onClick={() => handleOpenDetailsModal(product)} // Open details modal on click
                  style={{ cursor: "pointer" }} // Add pointer cursor to indicate clickable
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
                    onClick={() => handleOpenPurchaseModal(product.id, product.category)}
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
          ))
        ) : (
          <Typography style={{
            marginTop: 15
          }}>No products available in this category.</Typography>
        )}
      </Grid>

      {/* Purchase Form Modal */}
      <Modal open={openPurchaseModal} onClose={handleClosePurchaseModal}>
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
          }}
        >
          <Typography variant="h6">Purchase Form</Typography>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="upload-payment-screenshot"
            type="file"
            onChange={handleImageChange}
          />
          <label htmlFor="upload-payment-screenshot">
            <Button
              variant="contained"
              color="primary"
              component="span"
              style={{ color: "white", marginBottom: 10 }}
            >
              Upload Payment Screenshot
            </Button>
          </label>
          {formData.paymentScreenshot && (
            <Typography variant="body2">
              File uploaded: {formData.paymentScreenshot.name}
            </Typography>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={isLoading}
            sx={{ mt: 2 }}
            style={{ width: "100%", color: "white" }}
          >
            {isLoading ? "Loading..." : "Submit"}
          </Button>
        </Box>
      </Modal>
      {/* Product Details Modal */}
      <Modal
        open={openDetailsModal}
        onClose={handleCloseDetailsModal}
        aria-labelledby="product-details-modal"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: {
              xs: "90%", // 90% width on extra-small screens (mobile)
              sm: "80%", // 80% width on small screens
              md: 600,   // Fixed 600px width on medium and larger screens
            },
            maxWidth: "100%", // Ensures it doesn't overflow on small screens
            bgcolor: "background.paper",
            boxShadow: 24,
            p: {
              xs: 2,    // Smaller padding on mobile
              sm: 3,    // Medium padding on small screens
              md: 4,    // Full padding on medium and larger screens
            },
            maxHeight: "90vh", // Limits height to 90% of viewport height
            overflowY: "auto", // Adds scroll if content overflows
          }}
        >
          {selectedProduct && (
            <>
              {/* Product Name and Description */}
              <Typography variant="h5" gutterBottom sx={{ fontSize: { xs: "1.25rem", md: "1.5rem" } }}>
                {selectedProduct.name}
              </Typography>
              <Typography variant="body1" gutterBottom sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}>
                {selectedProduct.description}
              </Typography>
              <Typography variant="h6" sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}>
                Price: ${selectedProduct.price}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}>
                Category: {selectedProduct.category} Account(s)
              </Typography>

              {/* Multi-Image Display */}
              <MDBox mt={2}>
                <Typography variant="subtitle1" sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}>
                  Product Images:
                </Typography>
                <Grid container spacing={2}>
                  {selectedProduct.image && selectedProduct.image.length > 0 ? (
                    selectedProduct.image.map((image, index) => (
                      <Grid item key={index} xs={6} sm={4}> {/* 2 columns on mobile, 3 on larger screens */}
                        <Card>
                          <CardMedia
                            component="img"
                            height="140"
                            image={image}
                            alt={`Product Image ${index + 1}`}
                            sx={{
                              objectFit: "cover",
                              height: { xs: 100, md: 140 }, // Smaller images on mobile
                            }}
                          />
                        </Card>
                      </Grid>
                    ))
                  ) : (
                    <Typography sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}>
                      No images available for this product.
                    </Typography>
                  )}
                </Grid>
              </MDBox>
            </>
          )}
        </Box>
      </Modal>
      <ToastContainer />
    </DashboardLayout>
  );
}

export default ProductList;
