import React from "react";
import { Card, Button } from "@mui/material";
import TaskCard from "./TaskCard";
import { Draggable, Droppable } from "react-beautiful-dnd";
import CardActions from "@mui/material/CardActions";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useNavigate } from "react-router-dom";

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
        p: "20px",
        bgcolor: "#eee",
      }}
      variant="elevation"
      elevation={2}
    >
      <h3 className="task-list-title">{getName(taskType)}</h3>
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
      <CardActions>
        <Button
          color="black"
          size="medium"
          aria-label="add a task"
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => {
            navigate(`/addTask/${taskType}`);
          }}
        >
          Add a task
        </Button>
      </CardActions>
    </Card>
  );
}

export default TaskList;
