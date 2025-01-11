// import React, { useState } from "react";
// import Grid from "@mui/material/Grid";
// import Card from "@mui/material/Card";
// import CardMedia from "@mui/material/CardMedia";
// import CardContent from "@mui/material/CardContent";
// import CardActions from "@mui/material/CardActions";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import Modal from "@mui/material/Modal";
// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
// import IconButton from "@mui/material/IconButton";
// import PhotoCamera from "@mui/icons-material/PhotoCamera";
// import MDBox from "components/MDBox";
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import { InputAdornment } from "@mui/material";

// // Sample product data categorized by number of accounts
// const productsByCategory = {
//   "1 Account": [
//     {
//       id: 1,
//       title: "Basic Plan",
//       description: "Perfect for individual use with 1 account.",
//       image: "https://via.placeholder.com/150",
//     },
//   ],
//   "3 Accounts": [
//     {
//       id: 2,
//       title: "Family Plan",
//       description: "Ideal for small families with 3 accounts.",
//       image: "https://via.placeholder.com/150",
//     },
//   ],
//   "7 Accounts": [
//     {
//       id: 2,
//       title: "Family Plan",
//       description: "Ideal for small families with 3 accounts.",
//       image: "https://via.placeholder.com/150",
//     },
//   ],
// };

// function ProductList() {
//   const [open, setOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     address: "",
//     paymentScreenshot: null,
//   });

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData({ ...formData, paymentScreenshot: URL.createObjectURL(file) });
//     }
//   };

//   const handleSubmit = () => {
//     console.log("Form Submitted:", formData);
//     setOpen(false);
//   };

//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <MDBox mt={6} mb={3}>
//         {Object.entries(productsByCategory).map(([category, products]) => (
//           <MDBox key={category} mb={4}>
//             <Typography variant="h5" fontWeight="bold" mb={2}>
//               {category}
//             </Typography>
//             <Grid container spacing={3}>
//               {products.map((product) => (
//                 <Grid item xs={12} sm={6} md={4} key={product.id}>
//                   <Card>
//                     <CardMedia
//                       component="img"
//                       height="150"
//                       image={product.image}
//                       alt={product.title}
//                     />
//                     <CardContent>
//                       <Typography variant="h6" fontWeight="bold">
//                         {product.title}
//                       </Typography>
//                       <Typography
//                         variant="body2"
//                         color="text.secondary"
//                         sx={{
//                           overflow: "hidden",
//                           textOverflow: "ellipsis",
//                           whiteSpace: "nowrap",
//                         }}
//                       >
//                         {product.description}
//                       </Typography>
//                     </CardContent>
//                     <CardActions>
//                       <Button
//                         style={{ color: "white" }}
//                         variant="contained"
//                         color="primary"
//                         fullWidth
//                         onClick={handleOpen}
//                       >
//                         Buy Now
//                       </Button>
//                     </CardActions>
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid>
//           </MDBox>
//         ))}
//       </MDBox>

//       {/* Modal for the form */}
//       <Modal open={open} onClose={handleClose}>
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: 400,
//             bgcolor: "background.paper",
//             boxShadow: 24,
//             p: 4,
//             borderRadius: 2,
//           }}
//         >
//           <Typography variant="h6" mb={2}>
//             Purchase Form
//           </Typography>
//           <TextField
//             fullWidth
//             label="Name"
//             name="name"
//             value={formData.name}
//             onChange={handleInputChange}
//             margin="normal"
//           />
//           <TextField
//             fullWidth
//             label="Phone"
//             name="phone"
//             value={formData.phone}
//             onChange={handleInputChange}
//             margin="normal"
//           />
//           <TextField
//             fullWidth
//             label="Address"
//             name="address"
//             placeholder="اپنے قریبی ڈاک خانہ کا مکمل پتہ لکھیں"
//             value={formData.address}
//             onChange={handleInputChange}
//             margin="normal"
//           />
//           <Box sx={{ mt: 2 }}>
//             <TextField
//               fullWidth
//               label="Payment Screenshot"
//               value={formData.paymentScreenshot ? "Screenshot Selected" : ""}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <Button component="label" startIcon={<PhotoCamera />} size="small">
//                       Upload
//                       <input type="file" accept="image/*" hidden onChange={handleImageChange} />
//                     </Button>
//                   </InputAdornment>
//                 ),
//               }}
//               disabled
//             />
//             {formData.paymentScreenshot && (
//               <Box
//                 sx={{
//                   mt: 2,
//                   display: "flex",
//                   justifyContent: "center",
//                 }}
//               >
//                 <img
//                   src={formData.paymentScreenshot}
//                   alt="Payment Screenshot"
//                   style={{ maxWidth: "100%", maxHeight: "150px" }}
//                 />
//               </Box>
//             )}
//           </Box>
//           <Button
//             style={{ color: "#fff" }}
//             variant="contained"
//             color="primary"
//             fullWidth
//             sx={{ mt: 2 }}
//             onClick={handleSubmit}
//           >
//             Submit
//           </Button>
//         </Box>
//       </Modal>
//     </DashboardLayout>
//   );
// }

// export default ProductList;

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function ComingSoon() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox display="flex" alignItems="center" justifyContent="center" height="100vh">
        <Card
          sx={{
            p: 4,
            borderRadius: 4,
            boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
            maxWidth: "500px",
          }}
        >
          <Typography variant="h2" component="h1" fontWeight="bold" sx={{ mb: 2 }}>
            Coming Soon 🚀
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            ہم آپ کے لیے کچھ شاندار لانے کے لیے محنت کر رہے ہیں! اپڈیٹس کے لیے ہمارے ساتھ رہیں۔
          </Typography>
          <Box
            sx={{
              mt: 2,
              height: "5px",
              width: "100%",
              background: "linear-gradient(to right, #4285f4, #34a853, #fbbc05, #ea4335)",
              borderRadius: "5px",
              animation: "loading 2s infinite",
            }}
          ></Box>
          <style>{`
            @keyframes loading {
              0% { width: 0%; }
              50% { width: 75%; }
              100% { width: 100%; }
            }
          `}</style>
        </Card>
      </MDBox>
    </DashboardLayout>
  );
}

export default ComingSoon;
