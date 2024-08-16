import React from "react";
import Typography from "@mui/material/Typography";
import { Box, List, ListItem } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import Link from "@mui/material/Link";

function About() {
  return (
    <Box component="main" className="main-container">
      <Typography
        variant="h3"
        component="h1"
        sx={{ marginBottom: "20px", fontWeight: "bold" }}
      >
        How It Works:
      </Typography>
      <List sx={{ marginBottom: "20px" }}>
        <ListItem sx={{ pl: "0" }}>
          <Typography>
            <strong>Organize:</strong> Create tasks and arrange them in three
            straightforward sections: To Do, In Progress, and Done.
          </Typography>
        </ListItem>
        <ListItem sx={{ pl: "0" }}>
          <Typography>
            <strong>Prioritize:</strong> Use color-coded priority tags to
            highlight what's important.
          </Typography>
        </ListItem>
        <ListItem sx={{ pl: "0" }}>
          <Typography>
            <strong>Achieve:</strong> Watch your progress as you drag tasks
            across your board.
          </Typography>
        </ListItem>
      </List>
      <Typography gutterBottom>
        Upload your user profile picture and go!
      </Typography>
      <Typography component="p" sx={{ marginTop: "30px", fontWeight: "700" }}>
        Check this project on GitHub:
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginTop: "10px",
        }}
      >
        <GitHubIcon sx={{ fontSize: "24px" }} />
        <Link
          href="https://github.com/tetianakanafotska/flowboard-frontend"
          variant="body1"
          color="primary"
          sx={{ fontWeight: "bold" }}
          underline="hover"
        >
          Todo.
        </Link>
      </Box>
    </Box>
  );
}

export default About;
