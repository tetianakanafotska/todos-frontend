import React from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

function About() {
  return (
    <Box component="main" className="about">
      <Typography variant="h2" gutterBottom>
        About
      </Typography>
      <Typography variant="body1" gutterBottom>
        A kanban app with a drag-and-drop feature. Manage your task in different
        stages: To Do, In Progress, Done. <br /> Upload your user profile
        picture and go!
      </Typography>
    </Box>
  );
}

export default About;
