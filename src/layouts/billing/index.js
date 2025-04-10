import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ManIcon from "@mui/icons-material/Man";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function TreeView() {
  const [treeData, setTreeData] = useState(null);
  const [history, setHistory] = useState([]);
  const [currentNode, setCurrentNode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [memberCounts, setMemberCounts] = useState({ left_count: 0, right_count: 0 });
  const [error, setError] = useState(null);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchTreeData = async () => {
      try {
        const response = await axios.get("https://backend.salespronetworks.com/api/my-tree", {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`,
          },
        });

        setTreeData(response.data.tree);
        const counts = countMembers(response.data.tree);
        setMemberCounts(counts);
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

  const countMembers = (node) => {
    let leftCount = 0;
    let rightCount = 0;

    const traverse = (node, side) => {
      if (!node) return;
      if (side === "left") leftCount++;
      if (side === "right") rightCount++;
      traverse(node.left, side);
      traverse(node.right, side);
    };

    traverse(node.left, "left");
    traverse(node.right, "right");

    return { left_count: leftCount, right_count: rightCount };
  };

  const handleNodeClick = (node) => {
    if (node) {
      setHistory((prevHistory) => [...prevHistory, currentNode]);
      setCurrentNode(node);
      const counts = countMembers(node);
      setMemberCounts(counts);
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
              width: { xs: 50, sm: 60 },
              height: { xs: 50, sm: 60 },
              fontSize: { xs: "1.5rem", sm: "2rem" },
            }}
          >
            <ManIcon sx={{ fontSize: "2.5rem", color: "white" }} />
          </Avatar>

          <Typography
            variant="body2"
            sx={{ marginTop: "10px", fontSize: { xs: "0.9rem", sm: "1rem" }, fontWeight: "bold" }}
          >
            {node.user.name || "Unknown User"}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "gray",
            }}
          >
            <EmailRoundedIcon sx={{ fontSize: "1rem", marginRight: "5px" }} />
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
              sx={{
                textAlign: "center",
                cursor: "pointer",
                padding: "10px",
                borderRadius: "8px",
                "&:hover": { backgroundColor: "#f0f0f0" },
              }}
              onClick={() => handleNodeClick(node.left)}
            >
              <Avatar
                sx={{
                  margin: "0 auto",
                  bgcolor: "green",
                  width: { xs: 50, sm: 60 },
                  height: { xs: 50, sm: 60 },
                  fontSize: "1.25rem",
                }}
              >
                <ManIcon sx={{ fontSize: "5rem", color: "white" }} />
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
                <WarningAmberIcon sx={{ fontSize: "1.5rem", color: "white" }} />
              </Avatar>
              <Typography variant="body2" sx={{ marginTop: "10px", fontSize: "0.9rem" }}>
                {"No User"}
              </Typography>
            </Box>
          )}

          {/* Right User */}
          {node.right ? (
            <Box
              sx={{
                textAlign: "center",
                cursor: "pointer",
                padding: "10px",
                borderRadius: "8px",
                "&:hover": { backgroundColor: "#f0f0f0" },
              }}
              onClick={() => handleNodeClick(node.right)}
            >
              <Avatar
                sx={{
                  margin: "0 auto",
                  bgcolor: "blue",
                  width: { xs: 50, sm: 60 },
                  height: { xs: 50, sm: 60 },
                  fontSize: "1.25rem",
                }}
              >
                <ManIcon sx={{ fontSize: "1.5rem", color: "white" }} />
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
                <WarningAmberIcon sx={{ fontSize: "1.5rem", color: "white" }} />
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

  const handleGoBack = () => {
    if (history.length > 0) {
      const previousNode = history[history.length - 1];
      setHistory((prevHistory) => prevHistory.slice(0, -1));
      setCurrentNode(previousNode);
      const counts = countMembers(previousNode);
      setMemberCounts(counts);
    }
  };

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
            onClick={handleGoBack}
            style={{
              padding: "10px 20px",
              backgroundColor: "#1976d2",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Go Back
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