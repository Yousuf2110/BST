// @mui material components
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// Material Dashboard 2 React components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

function TreeView() {
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

      {/* Middle Nodes */}
      <Grid container spacing={4} justifyContent="center" sx={{ marginTop: "40px" }}>
        <Grid item xs={4} textAlign="center">
          <Avatar sx={{ margin: "0 auto", bgcolor: "purple", width: 40, height: 40 }} />
          <Typography variant="body2" sx={{ marginTop: "10px" }}>
            Mujtaba673@gmail.com
          </Typography>
        </Grid>
        <Grid item xs={4} textAlign="center">
          <Avatar sx={{ margin: "0 auto", bgcolor: "purple", width: 40, height: 40 }} />
          <Typography variant="body2" sx={{ marginTop: "10px" }}>
            Mujtaba671@gmail.com
          </Typography>
        </Grid>
      </Grid>

      {/* Bottom Nodes */}
      <Grid container spacing={2} justifyContent="center" sx={{ marginTop: "40px" }}>
        {[...Array(5)].map((_, index) => (
          <Grid item xs={2} key={index} textAlign="center">
            <Avatar sx={{ margin: "0 auto", bgcolor: "brown", width: 30, height: 30 }} />
            <Typography variant="body2" sx={{ marginTop: "10px" }}>
              {"Mujtaba669@gmail.com".replace(/@/, " @ ")}
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
      <TreeView />
    </DashboardLayout>
  );
}

export default ViewTree;
