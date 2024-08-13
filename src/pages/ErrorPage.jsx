import { Box, Typography } from "@mui/material";
import React from "react";

function ErrorPage() {
  return (
    <Box
      component="main"
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "primary.main",
        color: "#fff",
      }}
    >
      <Typography
        variant="h1"
        sx={{ fontSize: "8rem !important", mb: "10px", mt: "-150px" }}
      >
        404.
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: "300" }}>
        This page does not exist.
      </Typography>
    </Box>
  );
}

export default ErrorPage;
