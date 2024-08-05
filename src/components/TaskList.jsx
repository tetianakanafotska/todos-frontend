import React from "react";
import { Button } from "@mui/material";
import TaskCard from "./TaskCard";
import { Draggable, Droppable } from "react-beautiful-dnd";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import { CardContent } from "@mui/material";
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
      className="task-list-card"
      sx={{
        mr: 3,
        p: "10px",
        bgcolor: "#F1F1F1",
      }}
      elevation={2}
    >
      <Typography
        variant="h6"
        component="h3"
        sx={{ margin: "5px 0 10px 16px", color: "black.light" }}
      >
        {getName(taskType)}
      </Typography>
      <CardContent
        sx={{ maxHeight: "70vh", overflow: "scroll", pb: "0", pt: "0" }}
      >
        <Droppable droppableId={taskType}>
          {(provided) => (
            <div
              className="task-list-content"
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
      </CardContent>

      <Button
        variant="contained"
        size="large"
        sx={{
          display: "flex",
          justifyContent: "center",
          margin: "5px auto 0px",
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
