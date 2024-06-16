import React from "react";
import { Card } from "@mui/material";
import TaskCard from "./TaskCard";
import { Draggable, Droppable } from "react-beautiful-dnd";

function TaskList({ listType, tasks, setOpenEditor }) {
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
      <h3 className="task-list-title">{getName(listType)}</h3>
      <Droppable droppableId={listType}>
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
                    <TaskCard setOpenEditor={setOpenEditor} task={task} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Card>
  );
}

export default TaskList;
