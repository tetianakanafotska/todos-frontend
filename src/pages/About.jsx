import React from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import Link from "@mui/material/Link";

function About() {
  return (
    <Box component="main" className="about">
      <Typography variant="h2" sx={{ margin: "40px 0 20px" }}>
        About
      </Typography>
      <Typography variant="body1" gutterBottom>
        A kanban app with a drag-and-drop feature. Manage your task in different
        stages: To Do, In Progress, Done. <br /> Upload your user profile
        picture and go!
      </Typography>

      <Typography>Check this project on Github:</Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          margin: "10px 0",
        }}
      >
        <GitHubIcon />
        <Link
          variant="body1"
          href="https://github.com/tetianakanafotska/flowboard-frontend"
        >
          Todo.
        </Link>
      </Box>
    </Box>
  );
}

export default About;
