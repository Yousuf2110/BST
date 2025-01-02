import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";

// Material Dashboard 2 React components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function TreeView() {
  const [treeData, setTreeData] = useState(null);
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchTreeData = async () => {
      try {
        const response = await axios.get("https://ecosphere-pakistan-backend.co-m.pk/api/my-tree", {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`,
          },
        });

        setTreeData(response.data.tree);
        setCount(response.data);
      } catch (err) {
        setError("Failed to load tree data. Please try again.");
        console.error("Error fetching tree data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTreeData();
  }, [token]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!treeData) {
    return <Typography>Error loading tree data. Tree data is empty.</Typography>;
  }

  const renderNode = (node, color) => {
    return (
      <Box sx={{ textAlign: "center" }}>
        <Avatar
          sx={{
            margin: "0 auto",
            bgcolor: color,
            width: { xs: 40, sm: 50 },
            height: { xs: 40, sm: 50 },
            fontSize: { xs: "0.8rem", sm: "1rem" },
          }}
        >
          {node?.name?.charAt(0) || "?"}
        </Avatar>
        <Typography
          variant="body2"
          sx={{ marginTop: "10px", fontSize: { xs: "0.75rem", sm: "1rem" } }}
        >
          {node?.email || "No Email"}
        </Typography>
      </Box>
    );
  };

  const { user, left, right } = treeData;

  const renderRightUsers = () => {
    if (right) {
      return (
        <Grid item xs={6} sm={4} md={3} textAlign="center">
          {renderNode(right.user, "purple")}
        </Grid>
      );
    }
    return null;
  };

  return (
    <Box sx={{ textAlign: "center", padding: "20px" }}>
      {/* Main User */}
      <Typography variant="h6" sx={{ marginBottom: "20px" }}>
        Main User
      </Typography>
      {user ? renderNode(user, "blue") : <Typography>No Main User</Typography>}

      <Typography
        variant="body1"
        sx={{ marginTop: "20px", fontSize: { xs: "0.8rem", sm: "1rem" } }}
      >
        Left Users: {count.left_count || 0} | Right Users: {count.right_count || 0}
      </Typography>

      {/* Left and Right Users */}
      <Grid container spacing={4} justifyContent="center" sx={{ marginTop: "40px" }}>
        <Grid item xs={6} sm={4} md={3} textAlign="center">
          {left ? renderNode(left.user, "purple") : <Typography>No Left User</Typography>}
        </Grid>
        {renderRightUsers()}
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
