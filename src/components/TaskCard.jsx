import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

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
      sx={{
        mb: 1,
        p: "25px 20px 20px",
        position: "relative",
        bgcolor: "#fff",
      }}
    >
      <Chip label={task.priority} value={task.priority} />
      <Typography
        variant="body1"
        component="h4"
        sx={{ margin: "15px 0 10px", fontWeight: "700" }}
      >
        {task.title}
      </Typography>
      <Typography
        variant="subtitle2"
        sx={{ fontWeight: "inherit" }}
        gutterBottom
      >
        {task.description}
      </Typography>
      <Typography
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          margin: "10px 0 5px",
          fontSize: "0.95rem",
          fontWeight: "500",
        }}
      >
        <AccessTimeIcon sx={{ width: "17px" }} />
        {convertDates(task.createdAt, task.dueAt)}
      </Typography>

      <IconButton
        id="btn-edit-task"
        onClick={() => {
          navigate(`tasks/${task._id}`);
        }}
        aria-label="edit the task"
      >
        <EditIcon sx={{ width: 17, height: 17 }} />
      </IconButton>
    </Paper>
  );
}

export default TaskCard;
