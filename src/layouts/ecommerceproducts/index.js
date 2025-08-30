// ProductList.js
import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Chip,
  Container,
  Grid,
  Modal,
  Box,
  TextField,
  IconButton,
} from "@mui/material";
import { AddShoppingCart, Close } from "@mui/icons-material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import WalletIcon from "@mui/icons-material/Wallet";
import MDBox from "components/MDBox";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";


// ✅ Reusable ProductCard Component
const ProductCard = ({ product, onBuyClick }) => {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        boxShadow: 3,
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: 6,
        },
      }}
    >
      {/* Image */}
      <CardMedia
        component="img"
        height="180"
        image={product.img}
        alt={product.title}
        sx={{ objectFit: "cover" }}
      />

      {/* Content */}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="h6"
          fontWeight="bold"
          gutterBottom
          sx={{ fontSize: "1rem" }}
        >
          {product.title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            mb: 2,
          }}
        >
          {product.description}
        </Typography>

        {/* Price Display */}
        <Box sx={{ mb: 1 }}>
          <Chip
            label={product.salePrice}
            sx={{
              bgcolor: "#e91e63",
              color: "white",
              fontWeight: "bold",
              borderRadius: "20px",
              px: 1.5,
              fontSize: "0.9rem",
            }}
          />
        </Box>

        {/* Buy Now Button */}
        <Button
          fullWidth
          variant="contained"
          startIcon={<AddShoppingCart />}
          onClick={() => onBuyClick(product)}
          style={{color: 'white'}}
          sx={{
            bgcolor: "#1976d2",
            "&:hover": {   bgcolor: "##1976d2"},
            py: 0.8,
            textTransform: "uppercase",
            fontWeight: "bold",
            fontSize: "0.85rem",
            mt: 1,
          }}
        >
          Buy Now
        </Button>
      </CardContent>
    </Card>
  );
};

// Main ProductList Component
function ProductList() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // ✅ Fixed: Removed extra spaces in image URLs
  const products = [
  
    {

      id: 7,
      img: "https://backend.salespronetworks.com//storage//screenshots//6c844c74-2489-42d3-9f20-c5497268186c.jpg", // ✅ Fixed
      title: "Smartphone X",
      description: "Latest smartphone with triple camera, 128GB storage, and fast charging.",
      price: "$699.99",
      salePrice: "$599.99",
    },
    {
      id: 8,
      img: "https://backend.salespronetworks.com//storage//screenshots//6c844c74-2489-42d3-9f20-c5497268186c.jpg", // ✅ Fixed
      title: "Pro Tablet",
      description: "10-inch tablet with stylus support and high-resolution display.",
      price: "$399.99",
      salePrice: "$349.99",
    },
 
    {
      id: 10,
      img: "https://backend.salespronetworks.com//storage//screenshots//6c844c74-2489-42d3-9f20-c5497268186c.jpg", // ✅ Fixed
      title: "Gaming Mouse",
      description: "High-DPI gaming mouse with customizable buttons and ergonomic design.",
      price: "$79.99",
      salePrice: "$59.99",
    },
     {

      id: 7,
      img: "https://backend.salespronetworks.com//storage//screenshots//6c844c74-2489-42d3-9f20-c5497268186c.jpg", // ✅ Fixed
      title: "Smartphone X",
      description: "Latest smartphone with triple camera, 128GB storage, and fast charging.",
      price: "$699.99",
      salePrice: "$599.99",
    },
    {
      id: 8,
      img: "https://backend.salespronetworks.com//storage//screenshots//6c844c74-2489-42d3-9f20-c5497268186c.jpg", // ✅ Fixed
      title: "Pro Tablet",
      description: "10-inch tablet with stylus support and high-resolution display.",
      price: "$399.99",
      salePrice: "$349.99",
    },
 
    {
      id: 10,
      img: "https://backend.salespronetworks.com//storage//screenshots//6c844c74-2489-42d3-9f20-c5497268186c.jpg", // ✅ Fixed
      title: "Gaming Mouse",
      description: "High-DPI gaming mouse with customizable buttons and ergonomic design.",
      price: "$79.99",
      salePrice: "$59.99",
    },
     {

      id: 7,
      img: "https://backend.salespronetworks.com//storage//screenshots//6c844c74-2489-42d3-9f20-c5497268186c.jpg", // ✅ Fixed
      title: "Smartphone X",
      description: "Latest smartphone with triple camera, 128GB storage, and fast charging.",
      price: "$699.99",
      salePrice: "$599.99",
    },
    {
      id: 8,
      img: "https://backend.salespronetworks.com//storage//screenshots//6c844c74-2489-42d3-9f20-c5497268186c.jpg", // ✅ Fixed
      title: "Pro Tablet",
      description: "10-inch tablet with stylus support and high-resolution display.",
      price: "$399.99",
      salePrice: "$349.99",
    },
 
    {
      id: 10,
      img: "https://backend.salespronetworks.com//storage//screenshots//6c844c74-2489-42d3-9f20-c5497268186c.jpg", // ✅ Fixed
      title: "Gaming Mouse",
      description: "High-DPI gaming mouse with customizable buttons and ergonomic design.",
      price: "$79.99",
      salePrice: "$59.99",
    },
     {

      id: 7,
      img: "https://backend.salespronetworks.com//storage//screenshots//6c844c74-2489-42d3-9f20-c5497268186c.jpg", // ✅ Fixed
      title: "Smartphone X",
      description: "Latest smartphone with triple camera, 128GB storage, and fast charging.",
      price: "$699.99",
      salePrice: "$599.99",
    },
    {
      id: 8,
      img: "https://backend.salespronetworks.com//storage//screenshots//6c844c74-2489-42d3-9f20-c5497268186c.jpg", // ✅ Fixed
      title: "Pro Tablet",
      description: "10-inch tablet with stylus support and high-resolution display.",
      price: "$399.99",
      salePrice: "$349.99",
    },
 
    {
      id: 10,
      img: "https://backend.salespronetworks.com//storage//screenshots//6c844c74-2489-42d3-9f20-c5497268186c.jpg", // ✅ Fixed
      title: "Gaming Mouse",
      description: "High-DPI gaming mouse with customizable buttons and ergonomic design.",
      price: "$79.99",
      salePrice: "$59.99",
    },
  ];

  // ✅ Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const handleBuyClick = (product) => {
    setSelectedProduct(product);
    setOpenModal(true);
    // Optional: reset form when opening
    setFormData({ name: "", phone: "", email: "", address: "" });
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedProduct(null);
  };

  // ✅ Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <Container maxWidth="xl" sx={{ py: 5 }}>
        <MDBox py={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  icon="leaderboard"
                  title="Current Income"
                  count={`120`}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="success"
                  icon={<EmojiEventsIcon />}
                  title="Reward Income"
                  count={`120`}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="primary"
                  icon={<WalletIcon />}
                  title="Total Income"
                  count={`120`}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="dark"
                  icon="confirmation_number"
                  title="Available Pins"
                  count={`120`}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>


        {/* Product Grid */}
        <Grid container spacing={3} justifyContent="center">
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={2.4} key={product.id}>
              <ProductCard product={product} onBuyClick={handleBuyClick} />
            </Grid>
          ))}
        </Grid>

        {/* Purchase Modal */}
        <Modal open={openModal} onClose={handleCloseModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "90%", sm: 500 },
              bgcolor: "background.paper",
              borderRadius: 3,
              boxShadow: 24,
              p: 4,
            }}
          >
            {/* Close Button */}
            <IconButton
              onClick={handleCloseModal}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                color: "text.secondary",
              }}
            >
              <Close />
            </IconButton>

            {/* Modal Title */}
            <Typography
              variant="h5"
              component="h2"
              fontWeight="bold"
              gutterBottom
              align="center"
            >
              Complete Your Purchase
            </Typography>

            {/* Product Info */}
            {selectedProduct && (
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <CardMedia
                  component="img"
                  image={selectedProduct.img}
                  alt={selectedProduct.title}
                  sx={{ width: 120, height: 50, borderRadius: 1, mr: 2 }}
                  style={{width: '133px', height: '50px', objectFit: 'cover'}}
                />
                <Box>
                  <Typography variant="body1" fontWeight="bold">
                    {selectedProduct.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedProduct.salePrice} (Was: {selectedProduct.price})
                  </Typography>
                </Box>
              </Box>
            )}

            {/* Form */}
            <Box component="form" noValidate autoComplete="off">
              <TextField
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                variant="outlined"
                required
              />
              <TextField
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                type="tel"
                fullWidth
                margin="normal"
                variant="outlined"
                required
              />
              <TextField
                label="Email Address"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                type="email"
                fullWidth
                margin="normal"
                variant="outlined"
                required
              />
              <TextField
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                multiline
                rows={3}
                fullWidth
                margin="normal"
                variant="outlined"
                required
              />
              <TextField
                label="Real Price"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                type="number"
                fullWidth
                margin="normal"
                variant="outlined"
                required
              />

              <TextField
                label="Sale Price"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                type="number"
                fullWidth
                margin="normal"
                variant="outlined"
                required
              />


              {/* Submit Button */}
              <Button
                variant="contained"
                fullWidth
                size="large"
                 style={{color: 'white'}}
                sx={{
                  mt: 3,
                  py: 1.2,
                  bgcolor: "#1976d2",
                  color: "white", // 👈 Ensures text is white
                  fontWeight: "bold",
                  fontSize: "1rem",
                  "&:hover": {
                    bgcolor: "##1976d2",
                  },
                }}
              >
                Confirm Purchase
              </Button>
            </Box>
          </Box>
        </Modal>
      </Container>
    </DashboardLayout>

  );
}

export default ProductList;