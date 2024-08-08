import React from "react";
import { Button } from "@mui/material";
import TaskCard from "./TaskCard";
import { Draggable, Droppable } from "react-beautiful-dnd";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

function TaskList({ taskType, tasks }) {
  const navigate = useNavigate();

  const getName = (name) => {
    const nameMap = {
      toDo: "To Do",
      inProgress: "In Progress",
      done: "Done",
    };
    return nameMap[name] || "";
  };

  return (
    <Card
      sx={{
        mr: 3,
        mb: 2,
        p: "18px",
        bgcolor: "#F1F1F1",
      }}
      elevation={2}
    >
      <Typography
        variant="subtitle1"
        component="h3"
        sx={{ margin: "0 0 10px 0px", color: "black.light" }}
      >
        {getName(taskType)}
      </Typography>

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
      <Button
        variant="contained"
        size="large"
        sx={{
          display: "flex",
          justifyContent: "center",
          margin: "5px auto 3px",
          padding: "6px 16px",
          bgcolor: "primary.light",
          color: "black.main",
          "&:hover": {
            bgcolor: "primary.main",
          },
        }}
        startIcon={<AddCircleOutlineIcon />}
        onClick={() => {
          navigate(`/addTask/${taskType}`);
        }}
      >
        Add a task
      </Button>
    </Card>
  );
}

export default TaskList;
