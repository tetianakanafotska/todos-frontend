import React from "react";
import TaskCard from "./TaskCard";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

function TaskList({ taskType, tasks }) {
  const navigate = useNavigate();

  const getName = (name) => {
    const nameMap = {
      toDo: "To do",
      inProgress: "In progress",
      done: "Done",
    };
    return nameMap[name] || "";
  };

  return (
    <Card
      sx={{
        mr: 3,
        mb: 2,
        p: "14px",
        bgcolor: "#F1F1F1",
        boxShadow: "none",
        position: "relative",
      }}
    >
      <Typography
        variant="subtitle1"
        component="h3"
        sx={{ margin: "10px 0 5px 10px", color: "black.light" }}
      >
        {getName(taskType)}
      </Typography>

      {tasks.length > 0 && <div id="total-badge">{tasks.length}</div>}

      <Droppable droppableId={taskType}>
        {(provided) => (
          <div
            style={{ maxHeight: "70vh", overflow: "scroll", minHeight: "1px" }}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.map((task, index) => (
              <Draggable key={task._id} draggableId={task._id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TaskCard task={task} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <CardActions sx={{ display: "flex", justifyContent: "center", p: "0" }}>
        <Fab
          size="small"
          aria-label="add task"
          onClick={() => {
            navigate(`/addTask/${taskType}`);
          }}
          sx={{
            boxShadow: "0 0 7px 1px rgba(211, 211, 211, 0.3)",
            bgcolor: "grey.300",
            color: "grey.600",
            "&:hover": {
              bgcolor: "grey.300",
              boxShadow: "0 0 4px 2px rgba(150, 150, 150, 0.35)",
            },
          }}
        >
          <AddIcon />
        </Fab>
      </CardActions>
    </Card>
  );
}

export default TaskList;
