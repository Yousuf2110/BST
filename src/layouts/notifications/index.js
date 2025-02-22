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
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDTypography from "components/MDTypography";

function ProductList() {
  const token = localStorage.getItem("authToken");
  const [openPurchaseModal, setOpenPurchaseModal] = useState(false);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [userCount, setUserCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
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

  const handleOpenPurchaseModal = (productId, category) => {
    setSelectedProductId(productId);
    setOpenPurchaseModal(true);
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
    setSelectedProduct(product);
    setOpenDetailsModal(true);
  };

  const handleCloseDetailsModal = () => {
    setOpenDetailsModal(false);
    setSelectedProduct(null);
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

  // Function to determine if "Buy Now" button should be disabled
  const isBuyButtonDisabled = (category) => {
    const catNum = parseInt(category);
    if (userCount <= 2) return catNum !== 1; // Can only buy category 1 if userCount is 1 or 2
    if (userCount <= 6) return catNum !== 3; // Can only buy category 3 if userCount is 3-6
    if (userCount >= 7) return catNum !== 7; // Can only buy category 7 if userCount is 7 or more
    return true; // Default disable if no condition matches
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
      <Grid container spacing={3}>
        {filteredProducts.length > 0 && (
          filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="150"
                  image={product?.image?.[0]}
                  alt={product.name}
                  onClick={() => handleOpenDetailsModal(product)}
                  style={{ cursor: "pointer" }}
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
                    disabled={isBuyButtonDisabled(product.category)}
                  >
                    Buy Now
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
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
            width: { xs: "90%", sm: "80%", md: 600 },
            maxWidth: "100%",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: { xs: 2, sm: 3, md: 4 },
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          {selectedProduct && (
            <>
              <MDBox>
                <Typography variant="subtitle1" sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}>
                  Product Images:
                </Typography>
                <Grid container spacing={2}>
                  {selectedProduct.image && selectedProduct.image.length > 0 ? (
                    selectedProduct.image.map((image, index) => (
                      <Grid item key={index}>
                        <Card>
                          <a href={image} target="_blank" rel="noopener noreferrer">
                            <CardMedia
                              component="img"
                              image={image}
                              alt={`Product Image ${index + 1}`}
                              sx={{ height: 200 }}
                            />
                          </a>
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
              <Typography variant="h5" gutterBottom sx={{ fontSize: { xs: "1.25rem", md: "1.5rem" } }} mt={2}>
                {selectedProduct.name}
              </Typography>
              <Typography variant="body1" gutterBottom sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}>
                {selectedProduct.description}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}>
                Category: {selectedProduct.category} Account(s)
              </Typography>
            </>
          )}
        </Box>
      </Modal>
      <ToastContainer />
    </DashboardLayout >
  );
}

export default ProductList;