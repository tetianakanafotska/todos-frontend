import React from "react";
import { CircularProgress, Box, Typography } from "@mui/material";

function Loading() {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress size={50} thickness={3} />
      <Typography sx={{ color: "primary.main", mt: "30px" }}>
        Verifying user...
      </Typography>
    </Box>
  );
}

export default Loading;
