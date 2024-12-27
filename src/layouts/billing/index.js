/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// Material Dashboard 2 React components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function TreeView() {
  const middleNodes = [
    { email: "Mujtaba673@gmail.com", color: "purple" },
    { email: "Mujtaba671@gmail.com", color: "purple" },
  ];

  const bottomNodes = [...Array(5)].map(() => ({
    email: "Mujtaba669@gmail.com".replace(/@/, " @ "),
    color: "brown",
  }));

  const leftCount = 1; // Only one left-side middle node
  const rightCount = 1 + bottomNodes.length; // Right-side middle node + bottom nodes

  return (
    <Box sx={{ textAlign: "center", padding: "20px" }}>
      {/* Root Node */}
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <Avatar
            sx={{
              margin: "0 auto",
              bgcolor: "blue",
              width: 50,
              height: 50,
              fontSize: "1rem",
            }}
          />
          <Typography variant="body2" sx={{ marginTop: "10px" }}>
            Mujtaba669@gmail.com
          </Typography>
        </Grid>
      </Grid>

      {/* User Counts */}
      <Typography variant="body1" sx={{ marginTop: "20px" }}>
        Left Users: {leftCount} | Right Users: {rightCount}
      </Typography>

      {/* Middle Nodes */}
      <Grid container spacing={4} justifyContent="center" sx={{ marginTop: "40px" }}>
        {middleNodes.map((node, index) => (
          <Grid item xs={4} textAlign="center" key={index}>
            <Avatar sx={{ margin: "0 auto", bgcolor: node.color, width: 40, height: 40 }} />
            <Typography variant="body2" sx={{ marginTop: "10px" }}>
              {node.email}
            </Typography>
          </Grid>
        ))}
      </Grid>

      {/* Bottom Nodes */}
      <Grid container spacing={2} justifyContent="center" sx={{ marginTop: "40px" }}>
        {bottomNodes.map((node, index) => (
          <Grid item xs={2} key={index} textAlign="center">
            <Avatar sx={{ margin: "0 auto", bgcolor: node.color, width: 30, height: 30 }} />
            <Typography variant="body2" sx={{ marginTop: "10px" }}>
              {node.email}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

function ViewTree() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <TreeView />
    </DashboardLayout>
  );
}

export default ViewTree;
