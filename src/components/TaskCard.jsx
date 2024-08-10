import { IconButton, Box, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import CircleIcon from "@mui/icons-material/Circle";

function TaskCard({ task }) {
  const navigate = useNavigate();

  const convertDates = (createdAt, dueAt) => {
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
      });
    };
    const createdAtFormatted = formatDate(createdAt);
    const dueAtFormatted = formatDate(dueAt);
    if (dueAt) {
      return `${createdAtFormatted} - ${dueAtFormatted}`;
    } else return createdAtFormatted;
  };

  return (
    <Paper
      elevation={0}
      onClick={() => navigate(`/tasks/${task._id}`)}
      sx={{
        m: "8px 8px 15px 8px",
        p: "15px",
        position: "relative",
        bgcolor: "#fff",
        boxShadow: "0 0 7px 1px rgba(211, 211, 211, 0.2)",
      }}
    >
      <Chip label={task.priority} value={task.priority} disableeffects="true" />
      <Typography
        variant="body1"
        component="h4"
        sx={{ margin: "10px 0 5px", fontWeight: "700" }}
      >
        {task.title}
      </Typography>
      <Typography
        variant="subtitle2"
        sx={{ fontWeight: "inherit", lineHeight: "1.5" }}
      >
        {task.description}
      </Typography>
      <Typography
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          margin: "10px 0 5px",
          fontSize: "0.83rem",
          fontWeight: "400",
        }}
      >
        <AccessTimeIcon sx={{ width: "17px" }} />
        {convertDates(task.createdAt, task.dueAt)}
      </Typography>

      <IconButton
        onClick={() => navigate(`tasks/${task._id}`)}
        aria-label="edit the task"
        sx={{
          position: "absolute",
          top: "8px",
          right: "9px",
          width: 30,
          height: 30,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <CircleIcon sx={{ fontSize: 5, marginRight: "5px" }} />
        <CircleIcon sx={{ fontSize: 5 }} />
      </IconButton>
    </Paper>
  );
}

export default TaskCard;
