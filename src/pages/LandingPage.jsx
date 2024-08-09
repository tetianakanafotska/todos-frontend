import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";

function LandingPage() {
  return (
    <Container>
      <Box>
        <img src="" alt="Logo" />
      </Box>
      <Box>
        <Typography variant="h1">Your Personal Productivity Space.</Typography>
        <Button>Okaaay let's goo</Button>
        <Box>
          <img src="" alt="dashboard screenshot" />
        </Box>
        <Typography variant="h2">Simple. Modern. Effective.</Typography>
        <Typography variant="h4">
          Sleek design keeps you focused on what matters—your productivity. No
          clutter, no distractions—just a clean, modern workspace tailored for
          you. This is your personal space to plan, prioritize, and achieve your
          goals.
        </Typography>
        <Typography>Effortless Drag and Drop</Typography>
        <Typography>
          Move tasks with a simple drag and drop. Whether you're organizing your
          day or adjusting your priorities, our drag-and-drop feature makes
          managing your tasks intuitive and quick. Just click, drag, and drop—no
          extra steps, no hassle.{" "}
        </Typography>
        <Typography>Priority Tags for Focused Workflow</Typography>
        <Typography>
          Stay on top of what matters most with customizable priority tags.
          Assign tags like "High," "Medium," and "Low" to your tasks, helping
          you focus on what needs immediate attention. This feature ensures that
          your most important tasks are always front and center, keeping you
          organized and on track.
        </Typography>
      </Box>
    </Container>
  );
}

export default LandingPage;
