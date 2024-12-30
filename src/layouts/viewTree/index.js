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

  const bottomNodes = [...Array(4)].map(() => ({
    email: "Mujtaba669@gmail.com".replace(/@/, " @ "),
    color: "brown",
  }));

  const leftCount = 1;
  const rightCount = 1 + bottomNodes.length;

  return (
    <Box sx={{ textAlign: "center", padding: "20px" }}>
      {/* Root Node */}
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <Avatar
            sx={{
              margin: "0 auto",
              bgcolor: "blue",
              width: { xs: 40, sm: 50 }, // Responsive size for avatar
              height: { xs: 40, sm: 50 },
              fontSize: { xs: "0.8rem", sm: "1rem" }, // Adjusted font size
            }}
          />
          <Typography
            variant="body2"
            sx={{ marginTop: "10px", fontSize: { xs: "0.75rem", sm: "1rem" } }}
          >
            Mujtaba669@gmail.com
          </Typography>
        </Grid>
      </Grid>

      {/* User Counts */}
      <Typography
        variant="body1"
        sx={{ marginTop: "20px", fontSize: { xs: "0.8rem", sm: "1rem" } }}
      >
        Left Users: {leftCount} | Right Users: {rightCount}
      </Typography>

      {/* Middle Nodes */}
      <Grid container spacing={4} justifyContent="center" sx={{ marginTop: "40px" }}>
        {middleNodes.map((node, index) => (
          <Grid item xs={6} sm={4} md={3} textAlign="center" key={index}>
            <Avatar
              sx={{
                margin: "0 auto",
                bgcolor: node.color,
                width: { xs: 30, sm: 40 },
                height: { xs: 30, sm: 40 },
              }}
            />
            <Typography
              variant="body2"
              sx={{ marginTop: "10px", fontSize: { xs: "0.75rem", sm: "1rem" } }}
            >
              {node.email}
            </Typography>
          </Grid>
        ))}
      </Grid>

      {/* Bottom Nodes */}
      <Grid container spacing={2} justifyContent="center" sx={{ marginTop: "40px" }}>
        {bottomNodes.map((node, index) => (
          <Grid item xs={3} sm={2} md={1.5} key={index} textAlign="center">
            <Avatar
              sx={{
                margin: "0 auto",
                bgcolor: node.color,
                width: { xs: 20, sm: 30 },
                height: { xs: 20, sm: 30 },
              }}
            />
            <Typography
              variant="body2"
              sx={{ marginTop: "10px", fontSize: { xs: "0.6rem", sm: "0.75rem" } }}
            >
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
