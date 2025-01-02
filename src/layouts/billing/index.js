import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";
import PersonIcon from "@mui/icons-material/Person";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

// Material Dashboard 2 React components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function TreeView() {
  const [treeData, setTreeData] = useState(null);
  const [currentNode, setCurrentNode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [memberCounts, setMemberCounts] = useState({});
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
        setMemberCounts({
          left_count: response.data.left_count,
          right_count: response.data.right_count,
        });
        setCurrentNode(response.data.tree);
      } catch (err) {
        setError("Failed to load tree data. Please try again.");
        console.error("Error fetching tree data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTreeData();
  }, [token]);

  const handleNodeClick = (node) => {
    if (node) {
      setCurrentNode(node);
    }
  };

  const renderTree = (node) => {
    if (!node) return null;

    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Box sx={{ textAlign: "center" }}>
          <Avatar
            sx={{
              margin: "0 auto",
              bgcolor: "purple",
              width: { xs: 60, sm: 70 },
              height: { xs: 60, sm: 70 },
              fontSize: { xs: "0.8rem", sm: "1rem" },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {node.user.name?.charAt(0) || <PersonIcon />}
            {node.user.email?.charAt(0)}
          </Avatar>

          <Typography
            variant="body2"
            sx={{ marginTop: "10px", fontSize: { xs: "0.75rem", sm: "1rem" } }}
          >
            {node.user.name || "Unknown User"}
          </Typography>
          <Typography
            variant="caption"
            sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <MailOutlineIcon sx={{ fontSize: "1rem", marginRight: "5px" }} />
            {node.user.email || "No Email"}
          </Typography>
        </Box>

        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
            marginTop: "20px",
          }}
        >
          {/* Left User */}
          {node.left ? (
            <Box
              sx={{ textAlign: "center", cursor: "pointer", padding: "10px", borderRadius: "8px" }}
              onClick={() => handleNodeClick(node.left)}
            >
              <Avatar
                sx={{
                  margin: "0 auto",
                  bgcolor: "green",
                  width: { xs: 50, sm: 60 },
                  height: { xs: 50, sm: 60 },
                  fontSize: { xs: "0.8rem", sm: "1rem" },
                }}
              >
                {node.left.user.email?.charAt(0) || <PersonIcon />}
              </Avatar>
              <Typography variant="body2" sx={{ marginTop: "10px", fontSize: "0.9rem" }}>
                {node.left.user.email || "No User"}
              </Typography>
            </Box>
          ) : (
            <Box sx={{ textAlign: "center", padding: "10px", borderRadius: "8px" }}>
              <Avatar
                sx={{
                  margin: "0 auto",
                  bgcolor: "grey",
                  width: { xs: 50, sm: 60 },
                  height: { xs: 50, sm: 60 },
                }}
              >
                <ErrorOutlineIcon />
              </Avatar>
              <Typography variant="body2" sx={{ marginTop: "10px", fontSize: "0.9rem" }}>
                {"No User"}
              </Typography>
            </Box>
          )}

          {/* Right User */}
          {node.right ? (
            <Box
              sx={{ textAlign: "center", cursor: "pointer", padding: "10px", borderRadius: "8px" }}
              onClick={() => handleNodeClick(node.right)}
            >
              <Avatar
                sx={{
                  margin: "0 auto",
                  bgcolor: "blue",
                  width: { xs: 50, sm: 60 },
                  height: { xs: 50, sm: 60 },
                  fontSize: { xs: "0.8rem", sm: "1rem" },
                }}
              >
                {node.right.user.email?.charAt(0) || <PersonIcon />}
              </Avatar>
              <Typography variant="body2" sx={{ marginTop: "10px", fontSize: "0.9rem" }}>
                {node.right.user.email || "No User"}
              </Typography>
            </Box>
          ) : (
            <Box sx={{ textAlign: "center", padding: "10px", borderRadius: "8px" }}>
              <Avatar
                sx={{
                  margin: "0 auto",
                  bgcolor: "grey",
                  width: { xs: 50, sm: 60 },
                  height: { xs: 50, sm: 60 },
                }}
              >
                <ErrorOutlineIcon />
              </Avatar>
              <Typography variant="body2" sx={{ marginTop: "10px", fontSize: "0.9rem" }}>
                {"No User"}
              </Typography>
            </Box>
          )}
        </div>
      </div>
    );
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

  return (
    <div>
      <Typography
        variant="body1"
        sx={{ marginTop: "20px", fontSize: "1rem", width: "100%", textAlign: "center" }}
      >
        Left Users: {memberCounts.left_count || 0} | Right Users: {memberCounts.right_count || 0}
      </Typography>
      {currentNode && renderTree(currentNode)}

      {currentNode !== treeData && (
        <Box sx={{ textAlign: "center", marginTop: "20px" }}>
          <button
            onClick={() => setCurrentNode(treeData)}
            style={{
              padding: "10px 20px",
              backgroundColor: "#1976d2",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Back to Main Tree
          </button>
        </Box>
      )}
    </div>
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
