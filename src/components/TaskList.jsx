import React from "react";
import { Card } from "@mui/material";
import TaskCard from "./TaskCard";
import { Draggable, Droppable } from "react-beautiful-dnd";

function TaskList({ listType, allTasks, setOpenEditor }) {
  return (
    <Droppable droppableId={listType}>
      {(provided) => (
        <Card
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="task-list-card"
          sx={{ mr: 3, p: "20px", bgcolor: "#eee" }}
          variant="elevation"
          elevation={2}
        >
          <h3>{listType}</h3>
          <div className="task-list-content">
            {allTasks
              .filter((task) => task.type === listType)
              .map((task, index) => (
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
          </div>
          {provided.placeholder}
        </Card>
      )}
    </Droppable>
  );
}

export default TaskList;
