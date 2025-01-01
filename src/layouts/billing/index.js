import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button"; // Added for back button
import axios from "axios";

// Material Dashboard 2 React components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function TreeView() {
  const [treeData, setTreeData] = useState(null);
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const token = localStorage.getItem("authToken");
  const [leadId, setLeadId] = useState(null);

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
        setCurrentUser(response.data.tree.user); // Set the initial main user
      } catch (err) {
        setError("Failed to load tree data. Please try again.");
        console.error("Error fetching tree data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTreeData();
  }, [token]);

  const handleUserClick = (user) => {
    setCurrentUser(user);
    if (user?.email) {
      setLeadId(user.email);
    }
  };

  const handleBackClick = () => {
    setCurrentUser(treeData?.user); // Go back to the root user
  };

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
    const isMainUser = node?.id === treeData?.user?.id;
    console.log("xx-node", node);
    return (
      <Box
        onClick={() => !isMainUser && handleUserClick(node)}
        sx={{ cursor: isMainUser ? "not-allowed" : "pointer", textAlign: "center" }}
      >
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
          {leadId}
        </Typography>
      </Box>
    );
  };

  const { user, left, right } = currentUser ? currentUser : treeData; // Use currentUser or fallback to the main user

  return (
    <Box sx={{ textAlign: "center", padding: "20px" }}>
      {currentUser && currentUser !== treeData?.user && (
        <Button
          variant="outlined"
          color="primary"
          sx={{ marginBottom: "20px", color: "#000" }}
          onClick={handleBackClick}
        >
          Back
        </Button>
      )}

      <Grid container justifyContent="center">
        <Grid item xs={12}>
          {renderNode(user, "blue")}
        </Grid>
      </Grid>

      <Typography
        variant="body1"
        sx={{ marginTop: "20px", fontSize: { xs: "0.8rem", sm: "1rem" } }}
      >
        Left Users: {count.left_count || 0} | Right Users: {count.right_count || 0}
      </Typography>

      <Grid container spacing={4} justifyContent="center" sx={{ marginTop: "40px" }}>
        <Grid item xs={6} sm={4} md={3} textAlign="center">
          {left ? renderNode(left.user, "purple") : <Typography>No Left User</Typography>}
        </Grid>
        <Grid item xs={6} sm={4} md={3} textAlign="center">
          {right ? renderNode(right.user, "purple") : <Typography>No Right User</Typography>}
        </Grid>
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
